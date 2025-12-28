# SQS - Simple Queue Service

## What is SQS service?

* oldest offering
* fully managed service, used to decouple applications
* unlimited throughput, unlimited number of messages in queue
* retention period from 1 minute to 14 days, by default is 4 days
* low latency (<10 ms on publish and receive)
* message size is from 1B to 256KB per message, there is a Java Client Library that supports message size up to 2GB (a reference to S3)
* at least one delivery (can have duplicate messages)
* best effort ordering (can have out of order messages)
* can be used in combination with ASG (`ApproximateNumberOfMessages` metric)

## What is Queue?

It enables applications, microservices, and distributed  systems to communicate with each other by exchanging messages in a decoupled and scalable manner.

## How does it work?

Producers send (SendMessage API) messages to a queue, then Consumers polls messages (it receive up to 10 at a time with batch action), process the messages, delete (DeleteMessage API) the messages
The message is persisted in SQS until a consumer deletes it.

## What is going on when message is processed by part of Consumers?

???

## Who can be a Consumer?

* EC2 instance
* Servers
* AWS Lambda

## What security practices can be used?

* in-flight encryption using HTTPS
* at-rest encryption using KMS keys
* client-side encryption if the client wants to perform encryption/decryption itself

* IAM Policies to regulate access to the SQS API
* SQS Access Policies (similar to S3 bucket policies)
  * cross-account access to SQS queue
  * allowing other services (SNS, S3, ...) to write to an SQS queue

## What is Dead-letter queue?

An SQS Dead Letter Queue (DLQ) is a special queue used in AWS SQS to store messages that cannot be successfully processed after a defined number of attempts. It helps ensure no messages are lost and provides a way to debug and analyze why certain messages failed processing.

You can configure the `Maximum Receive Count` for the source queue. If a message is retrieved from the queue more times than this value and still fails processing, it is sent to the DLQ.

It helps ensure no messages are lost and provides a way to debug and analyze why certain messages failed processing.

## What is Message Visibility Timeout?

After a message is polled by a consumer, it becomes invisible to other consumers
After the message visibility timeout is over, the message is "visible" in SQS
If a message is not processed within the visibility timeout, it will be processed potentially twice.
A consumer could call the ChangeMessageVisibility API to get more time (the timeout is for Queue but not for a message)

By default, the "message visibility timeout" is 30 seconds.

## What is Long Polling?

When a consumer requests messages from a queue, it can optionally "wait" for messages to arrive if there are none in the queue. If a receive request collects the maximum number of messages, it returns immediately.

Long polling decreases the number of API calls made to SQS while increasing the efficiency and reducing latency of your application.

Wait time can be between 1 sec to 20 sec (20 preferable).

Long polling can be enabled at the queue level or at the API Level using WaitTimeSeconds.

## What is FIFO queue?

FIFO = First In First Out

Limit throughput: 300 msg/s without batching, 3000 msg/s with batching.

It supports "exactly-once send capacity" by removing duplicates using Deduplication ID

## What solution architectures do you know?

* SQS as a buffer to database writes
  * when you app experience issues with insert transactions to a DB (RDS, Aurora, DynamoDB) because it's overloaded
  * solution: you app sends messages to an SQS Queue, another set of EC2 instances read message and insert them in the DB and only when a message is processed you can delete the message
* SQS to decouple between application tiers
  * frontend app sends messages to an SQS Queue and backend app reads the messages from the Queue and process them.
