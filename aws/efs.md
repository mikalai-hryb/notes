# AWS EFS - Elastic File System

Managed NFS (Network File System) that can be mounted on many EC2 in multi-AZ.
It's highly available, scalable, expensive (3 x gp2), pay for use.
Provides a scalable, shared file storage solution.

* It uses NFSv4.1 protocol.
* It uses security group to control access to EFS.
* EFS compatible only with Linux based AMI (not Windows).
* It's a POSIX-compliant file system (~Linux) that has a standard file API.
* You can use encryption at rest using KMS.
* File system scales automatically, pay-per-use, no capacity planing.

## What are use cases for EFS?

Content management, web serving, data sharing, Wordpress

## How EFS can scale?

It supports 1000s of concurrent NFS client.
It supports 10GB+/s throughput
It can grow to Petabyte-scale network file system automatically

1 PB = 1,024 TB = 1,048,576 GB

## What are Performance Modes?

* General Purpose -- latency-sensitive use-cases (web server, CMS, etc...)
* Max I/O -- higher latency, higher throughput, highly parallel (big data, media processing)

## What are Throughput Modes?

* Bursting - throughput that scales with the amount of storage in your file system
* Provisioned - set your throughput regardless of storage size, ex: 1 GiB/s for TB storage
* Elastic - automatically scales throughput up or down based on your workloads (it's good for unpredictable workloads)

## What are Storage Classes?

* EFS Standard storage- uses solid state drive (SSD) storage to deliver the lowest levels of latency for frequently accessed files
* EFS Infrequent access (IA) - a cost-optimized storage class for data that is accessed only a few times each quarter.
* EFS Archive - a cost-optimized storage class for data that is accessed a few times each year or less.

To move files between storage tiers you can implement lifecycle policies.
