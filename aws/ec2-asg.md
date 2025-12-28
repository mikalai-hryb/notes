# ASG - Auto Scaling Group

## What is ASG?

An Auto Scaling Group (ASG) in AWS is a feature of Amazon EC2 Auto Scaling that helps you manage and automatically scale your fleet of EC2 instances.

It ensures high availability, fault tolerance, and cost-efficiency.

ASG is free, you only pay for underlying EC2 instances.

## What is the goal of Auto Scaling Group?

* `scale out (add EC2 instances)` to match an increased load
* `scale in (remove EC2 instances)` to match a decreased load
* Ensure we have a minimum or maximum number of EC2 instances running
* Automatically register new instances to a load balancer
* Re-create an EC2 instance in case a previous one is terminated (ex: if unhealthy) with the help of health checks (target groups health checks or EC2 health checks)

## What is Launch Template?

Launch Template is a resource in Amazon EC2 that simplifies and standardizes the creation and configuration of EC2 instances.

It contains an information of how to launch EC2 instances within your ASG.

* AMI + Instance Type
* EC2 User Data
* EBS Volumes
* Security Groups
* SSH Key Pair
* IAM Roles for your EC2 Instances
* Network + Subnet information
* LB information

* Min Size
* Max Size
* Desired Capacity (also called Initial Capacity because with this number the group is started)
* Scaling Policies (scale ASG based on CloudWatch Alarms - Average CPU or Custom Metric)

## What are Scaling Policies?

* Dynamic Scaling
  * Target Tracking Scaling (based on a target metric value)
    * Simple to set up
    * ex: I want the average ASG CPU to stay at around 40%
  * Simple / Step Scaling (based on Alarm and takes an action or set of steps/actions for Step Scaling)
    * When a CloudWatch Alarm is triggered (ex: CPU > 70%), then add 2 units
    * When a CloudWatch Alarm is triggered (ex: CPU < 30%), then remove 1
* Schedule Scaling (Scheduled Actions)
  * Anticipate a scaling based on known usage patterns
  * ex: Increase the min capacity to 10 at 5 pm on Fridays
* Predicting Scaling
  * Continuously forecast load and schedule scaling ahead (analyze historical load(metrics), generate forecast, schedule scaling actions)

## What are good metrics to scale on?

It depends on what an application does but here are some common metrics

* `CPUUtilization` - Average CPU utilization across your instances
* `RequestCountPerTarget` - to make sure the number of requests per EC2 instance is stable
* Average Network In/Out - if you application is network bound
* Any custom metric - that you push using CloudWatch

## What is Scaling Cooldown?

After a scaling activity happens, you are in the cooldown period (300 sec by default).
During this cooldown period, the ASG will not launch or terminate additional instances (to allow for metrics to stabilize).

Note: Use a ready-to-use AMI to reduce configuration time in order to be serving request faster and reduce the cooldown period.
