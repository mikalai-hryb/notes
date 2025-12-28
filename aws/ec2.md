# AWS EC2 - Elastic Compute Cloud

EC2 is Infrastructure as a Service

## Useful links

* [https://aws.amazon.com/ec2/instance-types/]
* [https://instances.vantage.sh/]

## Are you paying for stopped instance?

No, you don't pay for stopped instance.
However, you pay for the attached EBS volumes if you have them.
And for Elastic IP address that is associated with a stopped EC2 instance.

## What does EC2 consist of?

* Renting virtual machines (EC2)
* Storing data on virtual drivers (EBS)
* Distributing load across machines (ELB)
* Scaling the services using an auto-scaling group (ASG)

## What OS does EC2 support?

* Linux
* Windows
* Mac OS

## What storage types does AWS offer in context of EC2?

* Network-attached (EBS and EFS)
* Hardware (EC2 Instance Store)

## What is EC2 User Data?

* It's possibility to bootstrap instances using EC2 User Data script
* That script is **only run once** at the instance **first start**
* User Data script runs with the **root user**

Bootstrapping means launching commands when a machine starts, it's used to automate boot tasks such as:

* Installing updates
* Installing software
* Download common file from the internet
* and so on

## What is Instance Type?

Instance type is hardware specifications of a virtual machine instance.
It specifies the compute, memory, storage, and networking capacity of an instance.

For example, `m5.2xlarge`

* m - instance class
* 5 - generation (AWS improves them over time)
* 2xlarge - size within the instance class

## What Instance Families(Types) do you know?

* General Purpose
  * provide good balance between Compute, Memory and Networking
  * diversity of workloads (web servers, code repositories)

* Compute Optimized (CPU)
  * good for compute-intensive tasks (high performance processors)
  * batch processing workloads
  * media transcoding
  * high performance web servers
  * high performance computing (HPC)
  * Scientific modeling & machine learning
  * dedicated gaming servers

* Memory Optimized (RAM)
  * good for workloads that process large data sets in memory
  * high performance, relational/non-relational databases
  * distributed web scale cache stores (ElasticCache)
  * in-memory databases optimized for BI (Business Intelligence)
  * applications performing real-time processing of big unstructured data

* Storage Optimized
  * storage-intensive tasks that require high, sequential read and write access to large data sets on local storage
  * high frequency online transaction processing (OLTP) systems
  * relational and NoSQL databases
  * Cache for in-memory databases (Redis)
  * Data warehousing applications
  * Distributed file systems

## What are Security groups?

Security groups are acting as a "firewall" on EC2 instances.

Security groups only contain `allow` rules.
Security groups rules can reference by IP or by security group.

They regulate:

* Protocol
* Ports
* authorized IP ranges

Notes about SGs:

* Can be attached to multiple instances
* Locked down/bound to a region/VPC combination
* Does live "outside" the EC2 - if traffic is blocked the EC2 instance won't see it
* It's good practice to maintain one separate security group for SSH access
* If an application is not accessible because of time out, then it's security group issue
* If you application gives a "connection refused" error, then it's an application error or it's not launched
* All `inbound` traffic is `blocked` by default (it has no inbound rules by default)
* All `outbound` traffic is `authorized` by default (it has one rule that allows all outbound traffic by default)
* You can reference security groups from other security groups
  * For inbound rules, the EC2 instances associated with a security group can receive inbound traffic from the private IP addresses of the EC2 instances associated with the referenced security group
  * For example, you have SG1 which reference SG1(self) and SG2 in the inbound rules. The instances with attached SG1 OR SG2 will be able to send traffic to this instance if outbound rule allows it. It means regardless of the IP of our EC2 instances, because they have the right security group attached to them, they're able to communicate straight through to other instances.

## Why EC2 Instance does need instance profile but not IAM Role? What's the difference?

???

## What are classic ports?

* 22 = SSH (Security Shell) - log into a Linux instance
* 21 = FTP (File Transfer Protocol)
* 22 = SFTP (Secure File Transfer Protocol)
* 80 = HTTP
* 443 = HTTPS
* 3389 = RDP (Remote Desktop Protocol) - log into a Windows instance

## Which Protocols you can specify in Security Group rules?

Security Groups make it possible to create traffic allow rules based on IPs, protocols and optionally ports.
IPs are associated with Layer 3 (Network) of the OSI-model and Ports with Layer 4 (Transport).
The protocols you can filter on are a little tougher - you can select some from layer 3 (e.g. ICMP), layer 4 (e.g. TCP/UDP) or layer 5+ (HTTP,...) in the console. If you select one of the layer 5+ protocols, it will actually set TCP or UDP for you.

* TCP (layer 4)
* UDP (layer 4)
* ICMP (layer 3)
* ALL (most likely used in egress to specify all outbound traffic, as I understand, it's combination of TCP + UDP +ICMP)

## How can we connect to an EC2 Instance?

* Instance Connect
  * SSH agent must be running
  * AMI must have `ec2-instance-connect` package installed
  * Instance Profile must have the right permissions (`ec2-instance-connect:SendSSHPublicKey` action)
  * key-pair must be attached
  * the right user is used (ubuntu, ec2-user, so on)
* SSM agent (some SSM permissions in Instance Profile, for example, `AmazonSSMFullAccess`)
* SSH (need to set key pair)
  * SSH agent must be running
  * key-pair must be attached (PEM (Privacy-Enhanced Mail) format or OpenSSH Native Format)
  * the right user is used (ubuntu, ec2-user, so on)
* EC2 Serial Console

## What client are used to connect to Linux, Windows, MacOS machines?

* SSH client for Linux, MacOS and Windows >= 10
* PuTTY client for Windows <10 and Windows >= 10

## How to provide AWS credentials to a EC2 instance?

You need to link an IAM role via instance profile

## What are EC2 Instances Purchasing Options?

* On-Demand Instances - short-term un-interrupted workloads, predictable pricing, pay by second
  * billing per second, after the first minute (Linux, Windows)
  * billing per hour - all other OS
  * the highest cost but no upfront payments
* Reserved (1 & 3 years)
  * Reserved Instances - long workloads (databases, jenkins servers, and so on)
    * up to 72% discount compared to On-Demand
    * you reserve specific attributes (Instance Type, Region, Tenancy, OS)
    * reservation period - 1 (+discount) or 3 (+++discount) years
    * payment options - No Upfront(+), Partial Upfront(++), All Upfront(+++)
    * you can buy and sell in the Reserved Instance Marketplace
  * Convertible Reserved Instances - long workloads with flexible instances
    * you can change the EC2 Instance Type, Instance Family, OS, Scope (Region and Zone)
    * up to 66% discount because of flexibility
* Savings Plans (1 & 3 years) - commitment to an amount of usage, long workload, more modern approach
  * up to 72% discount
  * commit to a certain type of usage (for example, 10$/hour for 1 or 3 years)
  * usage beyond EC2 Saving Plans is billed at the On-Demand price
  * locked to a specific instance family & AWS region (e.g., M5 in us-east-1)
  * flexible across Instance Size, OS, Tenancy (Host, Dedicated, Default)
* Spot Instances - short workloads, cheap, can lose instances (less reliable)
  * up to 90% discount
  * you can lose at any point of time if your max price is less than the current spot price
  * MOST const-efficient instances in AWS
  * useful for workloads that are resilient to failure
    * batch jobs
    * data analysis
    * image processing
    * distributed workloads
  * not suitable for critical jobs or databases
* Dedicated Hosts - book an entire physical server, control instance placement
  * a physical server with EC2 instance capacity fully dedicated to your use
  * allows you address compliance requirements and use your existing server-bound software licenses
  * you can pay per second (On-Demand) or 1or3 years (Reserved)
  * the most expensive option
  * useful for software that have complicated licensing model
* Dedicated Instances - no other customers will share your hardware
  * instances run on hardware that's dedicated to you
  * may share hardware with other instances in same account
  * no control over instance placement (can move hardware after Stop/Start)
  * per instance billing
* Capacity Reservations - reserve capacity in a specific AZ for any duration
  * you always have access to EC2 capacity when you need it
  * no time commitment, no billing discounts
  * you can combine with Regional Reserved Instances and Saving Plans to benefit from billing discount
  * you're charged at On-Demand rate whether you run instances or not
  * suitable for short-term, uninterrupted workloads that needs to be in a specific AZ

## Are you charged for using public IPv4 addresses?

Yes, starting 2024.02.01 there's a charge for all (RDS, LB) public Ipv4 created in you account (~3.6$ per month).

You are charged for both in-use (associated) or idle Elastic IP address.
[https://aws.amazon.com/vpc/pricing/] - go to Public IPv4 Address, go to examples.

## How do Spot Instances work?

You set up `max spot price`. If current price < max, you will get the instance.
Spot Instances are not great for databases or critical jobs.
Spot price varies based on the AZ.

If the current spot price > your max spot price you can choose to `stop`, `terminate` or `hibernate` your instance with a 2 minutes grace period.

## How does the Spot Instance look?

* Max price
* Desired number of instances
* Launch specification (ami and so on)
* Request type: one-type | persistent
* Valid from, Valid until

## How to close a persistent Spot Request?

If you have a persistent Spot request, to close it you need to first cancel the Spot Request and then terminate the associated instances.

## What is Spot Fleets?

Spot Fleet = set of Spot Instances + (optional) On-Demand Instances.

The Spot Fleet will try to meet the target capacity with price constrains

* define possible launch pools: Instance Type, OS, AZ
* can have multiple launch pools
* Spot Fleet stops launching instances when reaching capacity or max cost

## What are strategies to allocate Spot Instances?

* `diversified`: distributed across all pools (great for availability, long workloads)
* `capacityOptimized`: pool with the optimal capacity for the number of instances
* `priceCapacityOptimized` (recommended): pools with highest capacity available, then select the pool with the lowest price (best choice for most workloads)
* `lowestPrice` (no longer available): from the pool with the lowest price (cost optimization, short workloads)

## What is Elastic IP address?

An Elastic IP address is a static IP address designed for dynamic cloud computing.
An Elastic IP address is associated with your AWS account.
It's a public IP address, which is reachable from the internet.

Without Elastic IP when you stop/start EC2 instance you will get a new IP address all the time.
To have the same (fixed) IP address you need to associate an Elastic IP address.

You can have only 5 Elastic IP in you account (can be increased).

You can rapidly remap the address from a failed instance to another working instance.

It's better to use a random public IP and register a DNS name to it.

## Can I add my own public IP address range to AWS?

???

## What are Placement Groups?

Placement Groups controls how our EC2 instances are placed within AWS Infrastructure.

There are 3 strategies for the Placement Groups:

* Cluster (high performance (great networking), but high risk) - cluster instances into a low-latency group in a single Availability Zone
  * Big Data jobs that needs to complete fast
  * application that needs extremely low latency and high network throughput
* Spread - spread instances across different underlying hardware (max 7 instances per group per AZ) - critical applications
  * Can span across Availability Zones(AZ)
  * reduced risk of simultaneous failure
  * application that needs to maximize high availability
  * Critical applications where each instance must be isolated from failure from each other
* Partition - spread instances across many different partitions (which rely on different sets of racks) within an AZ. Scales to 100s of EC2 instances per group (Hadoop, Cassandra, Kafka)
  * up to 7 partitions per AZ
  * Can span across multiple AZs in the same region
  * Up to 100s of EC2 instances
  * The instances in a partition don't share racks with the instances in the other partitions
  * a partition failure can affect many EC2 but won't affect other partitions
  * Use cases: HDFS, HBase, Cassandra, Kafka

## What is Elastic Network Interfaces (ENI)?

ENI represents a virtual network card.
It's a logical component in a VPC.

Each ENI can have the following attributes:

* primary private IPv4, one or more secondary IPv4
* can also have one Elastic IP (IPv4) per private IPv4 or one Public IPv4
* one ore more security groups
* MAC address

You can create ENI independently and attach them on the fly (move them) on EC2 instances for failover
ENI is bound to a specific availability zone (AZ)

## What actions can be taken regarding an EC2 Instance?

* stop - the data on disk (EBS) is kept intact until the next start
* terminate - any EBS volumes (root) also set-up to be destroyed is lost
* hibernate - the in-memory(RAM) state is preserved

## What is going on when an instance starts?

The OS boots & User Data script is run

For the following start only OS boot up happens

## What is going on when an instance hibernates?

The in-memory(RAM) state is preserved. OS is actually just frozen (hibernated)
It means the instance boot is much faster.
Under the hood the RAM state is written to a file in the root EBS volume (must be encrypted and have enough space).
Eventually the instance is stopped but when we return it back the instance will have the same state as before the hibernation process.

Hibernation is supported by instances with less than 150 GB RAM
Not supported by bare metal instances.
Root volume must be encrypted EBS (not Instance Store)
An instance cannot be hibernated more than 60 days.

## What is AMI?

AMI = Amazon Machine Image is a customization of an EC2 instance

You can add your own software, configuration, OS, monitoring and so on.
Faster boot/configuration time because all you software is pre-packaged.

AMI are built for a specific region (and can be copy across regions).

## What are types of AMI?

* Public AMI: AWS provided
* You own AMI: you make and maintain them yourself
* AWS Marketplace AMI: an AMI someone else made (and potentially sells)

## How AMI Process (from an EC2 instance) look?

* Start an EC2 instance and customize it
* Customize instance
* Stop the instance (for data integrity)
* Build an AMI - this will also create EBS Snapshots
* Launch instances from other AMIs

## What EC2 Instance Store?

Instance Store is high-performance hardware disk, ephemeral storage.

If the instance is stopped, terminated, or fails, all data in the instance store is lost.
Data persists during reboots.
Instance store provides very low latency and high throughput, as the storage is physically attached to the host hardware.

## What are use cases for EC2 Instance Store?

As it's an ephemeral storage, the buffer, a cache, scratch data, temporary content

## What is a Root Volume in EC2 instance?

The root volume is the primary storage volume that contains the operating system (OS) and is used to boot the instance.

Only gp2/gp3 and io1/io2 Block Express EBS Volumes can be used as Root Volumes.

## What is the difference between EBS vs EFS?

* EBS
  * one instance (except io1/io2 multi-attach)
  * are locked to 1 AZ
  * you can migrate EBS volume across AZs with the help of snapshots
  * EBS backups use IO (use when application traffic is low)
  * root EBS volumes are terminated by default
* EFS
  * mounting 100s of instances across AZ or Region
  * it shares website files
  * only for Linux instances (POSIX)
  * EFS has a higher price point than EBS (you can leverage Storage Tier for cost savings)
