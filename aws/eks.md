# EKS - Elastic Kubernetes Service

## How does it work?

It's a way to launch managed Kubernetes Cluster on AWS
It's an alternative to ECS, similar goal but different API

Kubernetes is cloud-agnostic, it means it can be easily migrated to another cloud.

## What Node Type do exist in EKS?

* Managed Node Group
  * AWS creates and manages Nodes (EC2 instances) for you
  * These Nodes are part of ASG managed by EKS
  * Supports On-Demand or Spot instances
* Self-Managed Nodes
  * Nodes created by you and registered to the EKS Cluster and managed by an ASG
  * You can use prebuilt AMI (Amazon EKS Optimized AMI)
  * Supports On-Demand or Spot instances
* Fargate
  * no maintenance required, no nodes managed

## How Data can be handled in EKS?

Need to specify `StorageClass` resource
Use CSI (Container Storage Interface) compliant driver

* EBS
* EFS (works with Fargate)
* FSx for Lustre
* FSx for NetApp ONTAP
