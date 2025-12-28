# AWS - Amazon Web Services

## How many tags can I assign to AWS resources

50 tags is the current maximum tag limit for most AWS resource.

10 tags is for AWS S3 Object.

## What are AMI permissions?

IAM API keys

Access Key ID
Secret Access Key

## Where you can see the costs?

Billing and Cost Management Service

## What is Outposts?

???

## What are Vertical and Horizontal Scalability?

Vertical scalability means increasing the size of the instance (ex: from t2.micro to t2.large).
Vertical scalability is very common for non distributed systems, such as a database.
There is usually a limit how much you can vertically scale (hardware limit).

Horizontal scalability means increasing the number of instances/systems for your application.
Horizontal scaling implies distributed systems.

## What is High Availability?

High availability means running your application / system in at least 2 data centers (== Availability Zones).
The goal of high availability is to survive a data center loss.

## What are Active and Passive High Availability?

* Active
  * for horizontal scaling
  * Active-active signifies a configuration where multiple nodes in a network are simultaneously active and operational
* Passive
  * for RDS Multi AZ
  * Active-passive represents a configuration where one node serves as the active instance, handling all incoming requests, while others remain passive, operating in standby mode

## How do High Availability and Scalability look for EC2?

* Horizontal Scaling: increase/decrease (scale out/scale/in) number of instances
  * AutoScaling Group
  * Load Balancer

* High Availability: run instances across multi AZ
  * AutoScaling Group multi AZ
  * Load Balancer multi AZ

## What are patterns of application communication?

* SQS: queue model (async communication)
* SNS: pub/sub model
* Kineses: real-time streaming model (sync communication)
