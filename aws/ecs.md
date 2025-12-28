# AWS ECS - Elastic Container Service

## What does it mean "launch Docker containers on AWS"?

Launch ECS Tasks on ECS Clusters.

## What are ECS Launch Types?

* EC2
* Fargate
* External

## What does EC2 Launch Type mean?

You must provision & maintain the infrastructure (the EC2 instances).

Each EC2 instance must run the ECS Agent to register in the ECS Cluster.

## What does Fargate Launch Type mean?

You do not provision the infrastructure (no EC2 instances).

It's all Serverless.

You just create task definitions and AWS runs ECS tasks for you based on the CPU/RAM you need.

To scale, just increase the number of tasks.

## What permissions (roles) do we need to use ECS?

* EC2 Instance Profile (EC2 Launch Type only):
  * Instance level; Applies to the entire EC2 instance
  * Used by the **ECS agent**
  * Make API calls to ECS (register EC2 instance with ECS or retrieve task metadata)
  * Provide task role credentials to containers
  * Configure SSM
* ECS Task Execution Role
  * Task level; Applies to actions needed to start and manage tasks
  * Defined in the task definition (`executionRoleArn`)
  * Used by ECS Service for lifecycle management of tasks
  * Pull Docker images from ECR
  * Send container logs to CloudWatch Logs
* ECS Task Role:
  * Task level; Applies to the application logic inside containers
  * Defined in the task definition (`taskRoleArn`)
  * Used by the application or code running inside the containers
  * Access AWS services like S3, DynamoDB, or RDS
  * Good practice is to use different roles for the different ECS Services

## What options do you have when your ECS Services need some storage?

* EFS
  * Works for both EC2 and Fargate Launch Types
  * Tasks running in any AZ will share the same data in the EFS file system
  * Fargate + EFS = Serverless
* S3 (cannot be mounted as a file system)

## What are ECS Cluster Capacity providers?

* FARGATE (FargateProvider type)
* FARGATE_SPOT (FargateProvider type)
* any name but it has to be connected to an ASG (ASGProvider type)

## What is ECS Cluster?

A logical grouping of infrastructure that ECS uses to deploy and manage your containers.
Provides the infrastructure (EC2 instances or Fargate) where your tasks/services will run.

## What is ECS Task Definition?

It is a JSON configuration file that defines the parameters and settings required to deploy and execute containers as ECS Tasks.

A blueprint that defines how your containers should run (image, CPU/memory, environment, etc.).

Task Definitions resources do not cost any money.

## What is ECS Task?

An instance of a task definition that is deployed on a cluster.
A task represents the runtime of one or more containers.

## What is ECS Service?

A persistent service that runs and manages one or more copies of a task definition.
Ensures your containers remain running as expected.
If a container stops or crashes, ECS automatically restarts it (depending on your configurations).

Supports scaling (via AWS Auto Scaling) to ensure you can adjust the number of tasks based on demand. Works with Application Load Balancers (ALBs) to distribute traffic across your containers.

## What is ECS Service Auto Scaling?

Automatically increase/decrease the desired number of ECS tasks

* Target Tracking - scale based on target value for a specific CloudWatch metric
  * ECS Service Average CPU Utilization
  * ECS Service Average Memory Utilization (scale on RAM)
  * ALB Request Count Per Target - metric coming from
* Step Scaling - scale based on a specific CloudWatch Alarm
* Scheduling Scaling - scale based on a specific data/time (predictable changes)

## How can we scale EC2 instances for EC2 Launch Type?

* Auto Scaling Group scaling
  * scale your ASG on CPU Utilization
  * add EC2 instances over time
* ECS Cluster Capacity Provider (newer and more advanced feature)
  * it paired with an ASG
  * add EC2 instances when you are missing capacity

## What solution architectures do you know?

* ECS Tasks invoked by EventBridge
  * We have ECS Cluster backed by Fargate and EventBridge
  * EventBridge listens for some events (for example, file upload on S3)
  * EventBridge runs an ECS Task (you can define a rule in EventBridge)
  * Task gets an object, process it, sends the result to, for example, DynamoDB
* ECS Tasks invoked by EventBridge Schedule
  * We have ECS Cluster backed by Fargate and EventBridge
  * We schedule a rule to be triggered every, for example, 1 hour
  * EventBridge rule runs an ECS Task
  * Task do some batch processing against files in S3
* ECS - SQS Queue
  * ECS Task pull messages from SQS Queue
  * We can enable ECS Service Auto Scaling (the more messages we have in SQS Queue the more Task we have for processing these messages)
* ECS - Intercept Stopped Tasks using EventBridge
  * For example, you want to react to tasks being exited or started in ECS Cluster
  * EventBridge listens for these events
  * EventBridge can send these events to SNS topic
  * SNS topic, for example, can send emails to Administrators
