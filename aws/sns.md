# SNS - Simple Notification Server

## How does it work?

It implements pub/sub (publish-subscribe) model.

Pub/sub messaging instantly pushes asynchronous event notifications when messages are published to the message topic. Subscribers are notified when a message is available.

## What are options of publishing?

* Topic Publish
  * create a topic
  * create a subscription (or many)
  * publish to the topic
* Direct publish
  * create a platform application
  * create a platform endpoint
  * publish to the platform endpoint
  * works with Google GCM, Apple APNS, Amazon ADM, ...

## What are SNS Subscribers?

* Standard
  * email(email-json)
  * SMS and Mobile Notifications
  * HTTP(S) Endpoints
  * SQS Queue
  * Lambda
  * Kinesis Data Firehose
* FIFO
  * SQS Queue

## What are SNS Publishers?

* CloudWatch Alarms
* AutoScalingGroup Notifications
* CloudFormation State Changes
* AWS Budgets
* S3 Bucket Events
* AWS DMS (New replication)
* Lambda
* DynamoDB
* RDS Events
* ...

## What security practices can be used?

* in-flight encryption using HTTPS
* at-rest encryption using KMS keys
* client-side encryption if the client wants to perform encryption/decryption itself

* IAM Policies to regulate access to the SNS API
* SNS Access Policies (similar to S3 bucket policies)
  * cross-account access to SNS topics
  * allowing other services (SNS, S3, ...) to write to an SNS topic

## What is FIFO topic?

FIFO = First In First Out

Ordering by Message Group ID (all messages in the same group are ordered)
Deduplication using a Deduplication ID or Content Based Deduplication

It can only have SQS Standard and SQS FIFO queues as subscribers.
Limited throughput (the same as for SQS)

## What is Message Filtering in SNS?

JSON policy used to filter messages sent to SNS topic's subscriptions

We can use a few Filter Policies to send different messages to different subscribers (ex: SQS queues)

## What solution architectures do you know?

* [Fanout Pattern](https://aws.amazon.com/blogs/compute/messaging-fanout-pattern-for-serverless-architectures-using-amazon-sns/) (SNS + SQS)
  * push once in SNS, receive in all SQS queues that are subscribers
  * fully decoupled, no data loss
  * ability to add more SQS subscribers over time
  * make sure SQS queue access policy allows for SNS to write
  * support cross-region delivery
  * ex: s3 support only one event rule for a prefix, to send S3 Event to multiple SQS queues you need to use Fanout Pattern
* SNS to S3 through Kinesis Data Firehose
* SNS FIFO + SQS FIFO Fanout Pattern
  * fanout + ordering + deduplication
