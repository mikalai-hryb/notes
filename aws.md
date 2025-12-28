# AWS

## General

<u>AWS</u> is a cloud provider, which offers reliable, scalable, and
inexpensive cloud computing services.
**bold**

### AWS Regions

* <u>region</u> is a cluster of data centers
* name examples: _us-east-1_, _eu-west-3_
* a region has availability zones (min 3, max 6, usually 3)
* most of AWS services are region-scoped

### AWS Availability Zones (AZ)

* <u>AZ</u> is one or more
[discrete data centers](./general-terms.md#discrete-data-center) with
redundant power, networking and connectivity
* AZs are separated from each other
* AZs are connected with high bandwidth, ultra-low latency networking
* examples: _ap-southeast-2a_, _ap-southeast-2b_,
_ap-southeast-2c_

### AWS Data Centers

* <u>data center</u> is a physical location that stores computing machines
and their related hardware equipment.

### AWS Points of Presence (edge locations & regional edge caches)

* 400+ edge locations
* 13 regional edge caches
* 90+ cities across 40+ countries

### How to choose an AWS Region?

* <b>Compliance</b> with data governance and legal requirements
* <b>Proximity</b> to customers
* <b>Available services</b> within a region
* <b>Pricing</b> (pricing varies region to region)

### Global Services

* IAM
* Route 53
* CloudFront
* WAF
* Budgets

### Region-scoped services

* Lambda
* EC2
* ...

## IAM

Users or Groups can be assigned policies.

### Policy

<u>Policy</u> is a set of permissions (JSON document). Policies define the
permissions of the users.

In AWS you should apply/follow **least privilege principle**.

#### Policy consists of the following elements

* <u>Version</u> - defines the version of the policy language, current value is
  **2012-10-17**
* <u>Statement</u> - contain a single statement or an array of individual
  statements
  * <u>Sid</u> - statement id
  * <u>Principal</u> - account/user/role to which this policy applied to
  * <u>Effect</u> - whether the statement allows or denies access
  * <u>Action</u> - list of actions this policy allows or denies
  * <u>Resource</u> - list of resources to which the actions applied to
  * <u>Condition</u> - conditions for when this policy is in effect

#### Policy types

* <u>Identity-based policy</u> - grands permissions to an identity (user, group
or role)
  * managed policies
    * AWS managed
    * Customer managed
  * inline policies
* <u>Resource-based policy</u> - attached to a resource such as an Amazon S3
bucket, grants the specified principal permission to perform actions on that
resource. Resource-based policies are inline policies. There are no managed
resource-based policies.
* IAM permissions boundaries
* Service control policies (SCPs)
* Access control lists (ACLs)
* Session policies

### Entity

<u>Entities</u> - IAM resource objects that AWS uses for authentication:

* IAM users
* federated users
* assumed IAM roles

### Identity

<u>Identities</u> - IAM resource objects that are used to identify and group.
You can attach a policy to an IAM identity. These include:

* users
* groups
* roles

### IAM Role

`IAM Role` - IAM identity that defines a set of permissions for making
requests to AWS services, and will be used by an AWS service

### Login

#### Password Policy

<u>Password Policy</u> - set of rules how the password should look like and be
updated.

#### MFA

<u>MFA</u> - Multi Factor Authentication

* MFA = password you know + security device you own
* main benefit of MFA is if a password is stolen or hacked, the account is not
compromised because the hacker will need to also get a hold of the physical
device

#### MFA devices options in AWS

* Virtual MFA device
  * Google Authenticator
  * Authy
* Universal 2nd factor (U2F) Security Key
  * YubiKey
* Hardware Key Fob MFA Device
* Hardware Key Fob MFA Device for AWS GovCloud(US)

### IAM Credentials Report

**_IAM Credentials Report_** - IAM Security Tool that lists all your AWS
account's IAM Users and the status of their various credentials.

## EC2

<u>Instance</u> - virtual computing environment or
[virtual server](./general-terms.md#virtual-server).

* EC2 instance is virtual machine but it is attached to a real hardware server

<u>Instance type</u> - a configuration of CPU, memory, storage, and
[networking capacity](./general-terms.md#network-capacity) for your instances.

<u>EC2</u> - Elastic Compute Cloud - infrastructure as a Service

* renting virtual machines (EC2)
* storing data on virtual drivers (EBS - elastic block store)
* distributing load across machines (ELB - elastic load balancer)
* scaling the services using an auto-scaling group (ASG)

Storage can be attached

* network (EBS & EFS - Elastic File System )
* hardware (EC2 Instance Store)

EC2 configuration

* CPU
* RAM
* Storage
* Network - speed and public IP address
* Firewall rules: security groups
* Bootstrap script: EC2 User Data

We can [bootstrap](./general-terms.md#bootstrap) EC2 instances using User Data
script. The script uses root user.

[VPS](./general-terms.md#vps) does not allow to change core or OS. Resources
are allocated dynamically. Examples: openVZ, Virtuozzo, FreeBSD.

[VDS](./general-terms.md#vds) uses hypervisor (virtual machine manager). It's
really full virtualization. It allows configuring everything, like a physical
server. A fixed amount of resources is allocated to VDS.
Examples: VMware, KVM, XEN, Hyper-v.

### Instance types

Example: <i>m5.2xlarge</i>

* m - instance class
* 5 - generation
* 2xlarge - size within the instance class

<u>General Purpose</u> - is great for a diversity of workloads, they have
balance between compute, memory and networking.

<u>Compute Optimized</u> - is great for compute-intensive tasks that require
high-performance processors, such as batch processing workloads, media
transcoding (converting files from one format to another), high performance web
servers.

<u>Memory optimized</u> provides fast performance for workloads that process
large data sets in memory.

#### In-Memory DBs

* Redis
* SQLite
* Microsoft SQL Server

### Root Device Volume

The root device volume contains the image used to boot the instance when you
launch an instance

### Security groups

<u>Security groups</u> are acting as a "firewall" on EC2 instances.

#### Security groups regulate

* access to ports
* authorized IP ranges
* control of inbound network (from other to the instance)
* control of outbound network (from the instance to other)

SG good to know:

* it can be attached to multiple instances
* an instance can have multiple SGs
* locked down to a region/VPC combination
* if traffic is blocked it means the instance even won't see traffic, it's kind of living outside EC2
* it's good to maintain one separate security group for SSH
* connection timed out -> SG issue (most likely)
* connection refused -> app issue or it's not launched
* all inbound (incoming/source) traffic is blocked by default
* all outbound (outgoing/destination) traffic is authorized by default
* Amazon EC2 blocks traffic on port 25(SMTP) by default
* Security groups are stateful
  * if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules and vice versa
  * Response traffic from the instance for the command is not tracked as a new request, but rather as an established connection, and is allowed to flow out of the instance, even if your outbound security group rules restrict outbound ICMP traffic.
* multiple security groups within an instance are effectively aggregated to create one set of rules to determine if traffic is allowed or not
* Security groups cannot block DNS requests to or from the Route 53 Resolver
* source/destination can be
  * single IP (/32 prefix)
  * IP range
  * current SG
  * SG from the same VPC
  * SG for a peered VPC

#### Ports

* 22 = SSH (secure shell) - log into a Linux instance
* 21 = FTP (File Transfer Protocol) - upload files into a file share
* 22 = SFTP (Secure File Transfer Protocol) - upload files using SSH
* 80 = HTTP - access unsecured websites
* 443 = HTTPS - access secured websites
* 3389 = RDP (Remote Desktop Protocol) - log into a Windows instance

inbound rules allow connectivity from outside into EC2 instance

#### IP protocol number

1 - ICMP
6 - TCP
17 - UDP

???

* To connect to ec2 instance we need to check VPC and subnet. The subnet should have a route table. In this route table should be a route with 0.0.0.0 Destination and an Internet gateway as a Target.
* The permission file (.pem) to connect to the instance via SSH should have 0400 rights (chmod 0400 abc.pem)

### Placement group strategies

<u>Placement groups</u> are used to influence the placement of a group of
interdependent instances to meet the needs of your workload.

* `cluster` placement group - is a logical grouping of instances within a single
AZ, low-latency, high network throughput, it's nice for
[HPC](./general-terms.md#hpc) apps
  * many instances is allowed to launch
* `partition` - spread across partitions (which rely on different sets of racks)
within an AZ (up to 7 partitions for AZ). The group is limited only by
the limits of the account. It's nice for large distributed and replicated
workloads
  * each group is divided into logical segments called partitions
  * each partition has its own set of racks
  * each rack has its own network and power source
  * no two partitions within a placement group share the same racks
  * group can have partitions in multiple AZs in the same Region
  * group can have a maximum of 7 partitions per AZ
  * number of instances that can be launched into a partition placement group is
  limited only by the limits of the account
* `spread` placement group - is a group of instances that are each placed on
distinct hardware. It's nice for a small number of critical instances that
should be kept separate from each other
  * rack spread placement group can span multiple AZs in the same Region
  * max 7 instances per AZ per group (if Region has 3 AZs, 3x7 = 21)

different AZs, max 7 instances per AZ per group

Use cases are big data applications with HDFS, HBase, Cassandra, Kafka

### ENI

<u>ENI</u> - Elastic Network Interface - logical component in a VPC that
represents a virtual network card. ENI is what gives EC2 instances access to
the network, for example Eth0.

### Hibernate

The EC2 Instance Root Volume type must be an EBS volume and must be encrypted to
ensure the protection of sensitive content.

* when we stop EC2 instance the EBS is kept intact
* for termination the EBS volumes are set-up to be destroyed

### Storage types

* EBS
* Instance Store
* EFS
* S3

#### Root Storage Device

Every time you launch an instance from an AMI, a root storage device is created
for that instance. The root storage device contains all the information
necessary (image) to boot the instance.

#### EBS

<u>EBS</u> - Elastic Block Storage is a network drive you can attach to your
instances while they run. It's bound to a specific AZ.

* it's a network drive
* it's a block-level storage volume
* can be attached to a running instance
* you can think of EBS as a "network USB stick"
* it's locked to an AZ
  * to attach to an instance from another AZ we need to make a snapshot first
  and then restore an EBS volume from thi snapshot and finally attach it
* EBS allows the instance to persist data, even after thier termination
* we have to provision capacity(size in GBs, [IOPS](./general-terms.md#iops))
  * the capacity can be increased over time
* root EBS volume is deleted (delete-on-termination attribute is enabled)
* attached EBS volumes are not deleted (delete-on-termination attribute is
disabled)
* has multi-attach feature (io1 / io2, and other limitations)
* EBS is recommended when for running databases on EC2 instances
* EBS volumes can be encrypted (data-at-rest encryption). If EC2 + EBS is used
the AWS provides data-in-transit encryption (from EC2 to EBS)
* Cloudwatch metrics:  bandwidth, throughput, latency, and average queue length

##### Snapshots

<u>Snapshot</u> is an incremental backup of an EBS volume at a point in time,
which means that only the blocks on the device that have changed after your most
recent snapshot are saved.

EBS snapshot archive

* archive tier is 75% cheaper
* takes 24-72 hours to restore

There is a possibility to recover deleted snapshot (retention can be set
between 1 and 365 days)

FSR - Fast Snapshot Restore (it consts many)

##### Volume Types

* gp2 / gp3 - general purpose SSD volume, balanced price and performance
* io1 / io2 - highest-performance SSD volume, I/O intensive workloads,
consistent IOPS rate, highest level of volume durability
* st1 - throughput optimized HDD, for frequent accessed, throughput-intensive
workloads, low cost
* sc1 - cold HDD, for lees frequently accessed workloads, lowest cost

##### Multi-attach

Multi-attach - attach the same EBS volume to multiple EC2 instances in
the same AZ

* same AZ
* each instance has full read/write permissions to the volume
* up to 16 EC2 instances at a time
* for cluster-aware file systems

##### EBS Encryption

* Data at rest is encrypted
* all the data in flight moving between instance and volume is encrypted
* all snapshot are encrypted
* all volumes created from snapshot are encrypted

Encryption has a minimal impact on latency
EBS Encryption leverages keys from KMS (AES-256)

To encrypt un encrypted EBS volume

1) create snapshot
2) using copy encrypt the snapshot
3) create new ebs volume from the snapshot
4) attach the new volume

#### Instance Store

<u>EC2 instance Store</u> - high-performance hardware disk, temporary
block-level storage for your instance

* better I/O performance
* they are ephemeral [0-23] (you will lose once stop/hibernate/terminate
instance but not reboot)
* it's a disk that is physically attached to the host computer
* it's a block-level storage
* we can use backups and replication to increase durability
* is not durable long-term place to store your data
* instance store volumes are attached only at instance launch
* max 10GB for root volume

#### EFS

<u>EFS</u> - Elastic File System.

* it's managed by [NFS](./general-terms.md#nfs)
* it works with EC2 instances in multi-AZ
* it's file-level storage
* highly available, scalable, expensive (3x gp2)
* POSIX filesystem
* it has higher price point than EBS
* can leverage EFS-IA for cost savings

#### S3

<u>S3</u> - Simple Storage Service, it's reliable and inexpensive data storage
infrastructure. It is designed to make web-scale computing easier by enabling
you to store and retrieve any amount of data, at any time, from within EC2 or
anywhere on the web.

Within EC2 is used to store EBS Snapshots.

#### Other info

Characteristics of volumes

* size
* throughput
* IOPS (I/O Ops Per Sec)

Only gp2/gp3 and io1/io2 can be used as boot volumes
Boot volume is where root OS is going to be running

gp2/gp3
size: 1GiB -16TiB
gp3:

* baseline of 3 000 IOPS and throughput of 125 MiB/s
* IOPS up to 16 000
* throughput up to 1000
* IPOS and throughput are not linked

gp2:
small gp2 have up to 3000 IOPS
volume size and IOPS are linked (3 IOPS per GB)

Provisioned IOPS
io1/io2 (4GiB - 16 TiB)
max 64000 for Nitro EC2 and 32000 for other
for both you can increase IOPS independently from storage size
io2 have more durability and more IPOS per GiB (at the same price as io1)

io2 block Express (4GiB - 64 TiB)

* sub-millisecond latency
* max IOPS 256 000 with IOPS:GiB ratio of 1000:1
* supports EBS Multi-attach (same AZ)
* user should care about backups and replication

HDD

* can't be a boot volume
* 125GiB to 16TiB
* Throughput Optimized HDD (st1)
  * max throughput 500 MiB/s - max IOPS 500
* cold HDD (sc1)
  * for data that is infrequently accessed
  * max throughput 250 MiB/s - max IOPS 250

### EBS vs EFS vs Instance store

Scalability - application/system can handle greater by adapting.

Vertical scalability - increasing  the size of the instance.
Vertical scalability is very common for non distributed  systems such as a DB.

Horizontal scalability - increasing the number of instants/systems for your app.

High Availability - running your app/system in at least 2 data centers (AZs).

The goal of HA is survive if a data center loss.

### AMI

AMI - Amazon Machine Image, it represents a customization of an EC2 instance.
It's a supported and maintained image provided by AWS that provides the
information required to launch an instance.

* faster boot/configuration time because software is pre-packaged
* AMI can be build for a specific region but later it can be copied across
regions

AMI includes

* EBS snapshot(s) or template for the root volume of the instance for
instance-store-backed AMIs
* launch permissions (which AWS account can launch the instances)
* block device mapping that specifies the volumes to attach to the instance

#### Types

* a public AMI (aws provided)
* your own AMIs
* AMI Marketplace

#### Types (in terms of store)

* an Amazon EBS-backed AMI
* an instance store-backed AMI

## ALB - Application Load Balancer

* It's layer 7 (HTTP)
* Load balancing to multiple HTTP applications across machines (target groups)
* Load balancing to multiple applications on the same machine (ex: containers)
* Supports for HTTP/2 and WebSocket
* Supports redirects (from HTTP to HTTPS for example)
* Routing tables to different target groups
  * Routing based on path in URL
  * Routing based on hostname in URL
  * Routing based on Query String, Headers
* ALB are great fit for micro services & container-based application (Docker,
ECS)
* Has a port mapping feature to redirect to a dynamic port in ECS

Target groups

* EC2 instances (can by managed by ASG) - HTTP
* ECS tasks - HTTP
* Lambda - HTTP request is translated into a JSON event
* IP addresses - must be private IPs

* Can have these headers
X-Forwarded-For - client IP
X-Forwarded-Port - client Port
X-forwarded-Proto - client Protocol

## NLB - Network Load Balancer

* It's layer 4
  * Forward TCP & UDP traffic to instances
  * Handles millions of requests per seconds
  * Les latency ~ 100ms (vs 400 ms for ALB)
* NLB has one static IP per AZ and supports assigning Elastic IP
* NLB are used for extreme performance, TCP or UDP traffic
* Not included in the AWS free tier
* Health checks support TCP, HTTP and HTTPS protocols

Target groups

* EC2 instances
* IP addresses - must be private IPs
* Application Load Balancer (we can have NLB in front of ALB)

Only Network Load Balancer provides both static DNS name and static IP. While,
Application Load Balancer provides a static DNS name but it does NOT provide a
static IP. The reason being that AWS wants your Elastic Load Balancer to be
accessible using a static endpoint, even if the underlying infrastructure that
AWS manages changes.

## GLB - Gateway Load Balancer

* Deploy, scale, and manage a fleet of 3rd party network virtual appliances in
AWS
* Examples: Firewall, Intrusion detection, Deep package inspection Systems
(DPI systems), payload manipulation, ...
* Operates at layer 3 (Network Layer) - IP packets
* Combines the following functions:
  * Transparent Network Gateway - single entry and exit point for all traffic
  * Load Balancer - distributes traffic to your virtual appliances
* Uses the GENEVE protocol on port 6081

Target groups

* EC2 instances
* IP addresses - must be private IPs

## Sticky Sessions (Session Affinity)

Usually, LBs do a spread of all the requests across all the EC2 instances.
But LB allows to implement stickiness - always redirect client requests to the
same instance behind a load balancer.

It works for CLB, ALB, NLB

There are 2 types of cookies

* application-based cookies
* duration-based cookies

## Cross-Zone Load Balancing

When cross-zone load balancing is on, each load balancer node distributes
traffic across the registered targets in all registered Availability Zones.

When cross-zone load balancing is off, each load balancer node distributes
traffic only across the registered targets in its Availability Zone.

* ALB
  * Enabled by default all the time (can be disabled at the Target Group level)
  * No charges for inter AZ data
* NLB
  * Disabled by default
  * You pay charges ($) for inter AZ data if enabled
* CLB
  * Disabled by default
  * No charges for inter AZ data if enabled

## SSL/TLS

* SSL/TLS Certificate allows traffic between your clients and your LB to be
encrypted in transit (in-flight encryption)
* SSL refers to Secure Sockets Layers, used to encrypt connections
* TLS refers to Transport Layer Security, which is a newer version
  * Nowadays, TLS certificates are mainly used, but people still refer as SSL
* Public SSL/TLS Certificates are issued by Certificate Authorities (CA)
  * Comodo, Symantec, GoDaddy, GlobalSign, Digicert, Letencrypt, ...
* SSL/TLS Certificate has an expiration date (you set) and must be renewed
* The load balancer uses an X.509 certificate (SSL/TLS server certificate)
* You can manage certificates using ACM (AWS Certificate Manager)
* HTTPS listener:
  * you must specify a default certificate
  * you can add an optional list of certs to support multiple domains
  * Clients can use SNI(Server Name Indication) to specify the hostname they
  reach
  * Ability to specify a security policy to support older versions of
  SSL/TLS (legacy clients)

### [SNI](./general-terms.md#sni)

* SNI solves the problem of loading multiple SSL/TLS Certificates onto one web
server (to server multiple websites)
* It's 'newer' protocol, and requires the client to indicate the hostname of
the target server in the initial SSL handshake
* The server will then find the correct certificate, or return the default one
* It only works for ALB, NLB and CloudFront

ALB & NLB

* Supports multiple listeners with multiple SSL/TLS Certificates
* Uses SNI to make it work

### Security Policy

Elastic Load Balancing uses a Secure Socket Layer (SSL) negotiation
configuration, known as a security policy, to negotiate SSL connections between
a client and the load balancer. A security policy is a combination of
SSL protocols, SSL ciphers, and the Server Order Preference option.

A security policy determines which ciphers and protocols are supported during
SSL negotiations between a client and a load balancer.

### Deregistration Delay

* It's called Connection Draining for CLB
* It's time to complete "in-flight requests" while the instance is
de-registering or unhealthy
* Stops sending new requests to the EC2 instances which is de-registering

## ASG

The goal of ASG

* scale out (add EC2 instances) to match an increased load
* scale in (remove EC2 instances) to match a decreased load
* ensure we have a min and max number of EC2 instances running
* automatically register new instances to a load balancer
* re-create an EC2 instance in case a previous one terminated (or if unhealthy)

ASG are free (you pay for underlying EC2 instances)

### ASG Template

A launch template contains info on how to launch EC2 instances within ASG

* Launch Template
  * AMI + Instance Type
  * EC2 User Data
  * EBS Volumes
  * Security Groups
  * SSH Key Pair
  * IAM Roles for your EC2 Instances
  * Network + Subnets Information
  * Load Balancer Information
* Mix Size / Max Size / Initial Capacity
* Scaling Policies

It's possible to scale an ASG based on CloudWatch alarms

* An alarm monitors a metric (such as Average CPU, or a custom metric)
* Metrics such aa Average CPU are computed for the overall ASG instances
* Based on the alarm:
  * we can create scale-out policies (increase)
  * we can create scale-in polices (decrease)

### ASG Scaling Groups

Dynamic Scaling Policies

* target tracking scaling
  * most simple and easy to set-up
  * ex: I want the average ASG CPU to stay at around 40%
* simple
  * when a CloudWatch alarm is triggered (ex CPU > 70%), then add 2 units
  * when a CloudWatch alarm is triggered (ex CPU < 30%), then remove 1
* step scaling
  * when a CloudWatch alarm is triggered and metric is very high, then add 10
  units
  * when a CloudWatch alarm is triggered and metric is not so high, then add 2

Predictive Scaling

* Predictive scaling: continuously forecast load and schedule scaling ahead

Scheduled actions

* anticipate a scaling based on known usage patterns
* ex: increase the min capacity to 10 at 5 pm on Friday

#### Good metrics to scale on

* CPUUtilization: Average CPU utilization across your instances
* RequestCountPerTarget: to make sure the number of requests per EC2 instances
is stable
* Average Network In / Out (if your app is network bound)
* Any custom metric (that you push using CloudWatch)

Scaling cooldown - a period after a scaling activity (default 300 secs)
During the cooldown period the ASG will not launch or terminate additional
instances (to allow metrics to stabilize)

Advice: Use a ready-to-use AMI to reduce configuration time in order to be
serving request faster and reduce the cooldown period.

> Although the Load Balancer metrics are every 1 minute, if you used EC2
metrics (like CPU) they are only every 5 minutes by default unless you change
your CloudWatch settings to turn on detailed monitoring to get metrics every
minute. You pay extra for detailed metrics.

## RDS - Relational Database Service

* it's managed DB service for DB use SQL as a query language
  * Postgres
  * MySQL
  * MariaDB
  * Oracle
  * Microsoft SQL Server
  * Aurora (AWS Proprietary database)
* RDS is a managed service
  * automated provisioning, OS patching
  * continuous backups and restore to specific timestamp (Point in Time Restore)
  * monitoring dashboards
  * read replicas for improved read performance
  * multi AZ setup for DR (Disaster Recovery)
  * maintenance windows for upgrades
  * scaling capability (vertical and horizontal)
  * storage backed by EBS (gp2 or io 1)
* BUT you cannot SSH into your instance

### RDS - Storage Auto Scaling

* helps to increase storage dynamically
* you have to set Maximum Storage Threshold (max limit for DB storage)
* automatically modify storage if:
  * free storage is less than 10% of allocated storage
  * low-storage lasts at least 5 minutes
  * 6 hours have passed since last modification

### RDS Read Replicas vs Multi AZ

* we can create up to 15 Read Replicas (Aurora) and 5 Read Replicas for all other
  * within AZ
  * cross AZ
  * cross Region
* replication is ASYNC (so reads are eventually consistent)
* replicas can be promoted to their own DB
* apps must update the connection string to leverage read replicas

#### RDS Read Replicas - Use Cases

* you need to run extra reads (analytics, report) but you don't want to
interfere in DB load, you need to bring up a replica

#### RDS Read Replicas - Network Cost

* in AWS there is a network cost when data goes from one AZ to another
* for RDS Read Replicas within the same region, you don't pay that fee

#### RDS Multi AZ (Disaster Recovery)

* SYNC replication (the standby is synchronously being updated after any
change to the master instance)
* One DNS name - automatic app failover to standby
* increase availability
* Failover in case of loss of AZ, loss of network, instance or storage failure
* no manual intervention in apps
* not used for scaling (no read, to writes)

#### RDS - From Single-AZ to Multi-AZ

* zero downtime operation (no need to stop the instance)
* just click on "modify"
  * snapshot is taken
  * a new DB is restored from the snapshot in a new AZ
  * synchronization is established between the two DBs

### RDS Custom

* Managed Oracle and Microsoft SQL Server
  * configure settings
  * install patches
  * enable native features
  * access the underlying EC2 Instance using SSH or SSM Session Manager
* it's better to deactivate automation mode to perform your customization and to
take a DB snapshot before

#### RDS vs RDS Custom

* RDS: entire DB and OS to be managed by AWS
* RDS Custom: full admin access to the underlying OS and the DB

## DNS

DNS - domain name system which translates the human friendly hostname into the
machine IP address

### DNS Terminologies

* Domain Register: Amazon Route 53, GoDaddy, ...
* DNS Records: A, AAAA, CNAME, NS
* Zone File: contains DNS records
* Name server: resolves DNS queries (Authoritative or Non-Authoritative)
* root: . (only dot) - root domain
* Top Level Domain (TLD): .com, .by, ...
* Second Level Domain (SLD): amazon.com, google.com, ...
* Sub Domain: www.example.com
* FQDN (Fully Qualified Domain Name): api.www.example.com (all domains without
protocol)

example.com -> Local DNS Server -> Root DNS Server -> TLD DNS Server ->
SLD DNS Server -> answer(1.2.3.4) -> Local DNS Server -> your machine

### Amazon Route 53

* highly available, scalable, fully managed and Authoritative DNS
  * Authoritative - customer can update the DNS records
* Route 53 is also a Domain Registrar
* ability to check the health of the resources
* the only service in AWS which provides 100% availability SLA (service-level
agreement)
* 53 is a traditional DNS port

#### Records

* domain/subdomain
* Record Type
* Value
* Routing Policy - how Route 53 responds to queries
* TTL - amount of time the record cached at DNS Resolvers

Types:

* A - maps a hostname to ipv4
* AAAA - quadruple A - maps a hostname to ipv6
* CNAME - maps a hostname to another hostname
  * the target is a domain name which must have an A or AAAA record
  * can't create a CNAME for the top node of a DNS namespace (Zone Apex)
    * you cannot create CNAME for example.com but you can for [www.example.com](www.example.com)
* NS - Name Servers for the Hosted Zone
  * controls how traffic is routed for a domain
  * is a DNS record that contains the name of the authoritative name server
  within a domain or DNS zone

### Route 53 - Hosted Zones

* A container for records that define how to route traffic to a domain and its
subdomains
* you pay $0.50 per month per hosted zone
* there are
  * Public (how to route traffic on the Internet) and
  * Private (how to route traffic within one or more VPCs) hosted zones

#### Route 53 - Records TTL

* how long the client will cache the record info (result from Amazon Route 53)
* it's mandatory for every record except Alias records
  * alias records set it to 60 secs

#### Route 53 - CNAME vs Alias

CNAME

* points a hostname to any other hostname (app.mydomain.com -> la.anything.com)
* ONLY FOR NON ROOT DOMAIN (aka something.mydomain.com)

Alias:

* it's a Route 53–specific extension to DNS functionality
* points a hostname to an AWS Resource (app.mydomain.com -> la.amazonaws.com)
* works for ROOT DOMAIN and NON ROOT DOMAIN (aka mydomain.com)
  * can be used for zone apex
* free of charge
* native health check
* are always of type A or AAAA
* you cannot change the ttl (the default is 60 secs)
* targets:
  * ELB, CloudFront, API Gateway, Elastic Beanstalk, S3 Website,
  VPC Interface Endpoint, Global Accelerator
* NOT TARGETS:
  * EC2 DNS endpoint
  * RDS DNS endpoint

### Route 53 - Routing Policy

* Define how Route 53 responds to DNS queries
  * DNS only responds to the DNS queries

#### Routing Policy Types

* Simple
  * can specify multiple values in the same record (can return a few records),
  if multiple values are returned the client will pick one randomly
  * for alias returns only one AWS resource
  * cannot be associated with Health Checks
* Weighted
  * controls the % of the requests that go to each specific resource
  * DNS records must have the same name and type
  * can be associated with Health Checks
  * use cases: load balancing between regions, testing new application version
  * if weight is 0 the traffic will be stopped for that resource
  * if all records have weight is 0 then all records will be returned equally
* Failover
  * there should be primary and secondary resources
* Latency based
  * redirects to the resource that has the least latency close to us
  * latency is based on traffic between users and AWS Regions
  * can be associated with Health Checks
* Geolocation
  * the routing is based on user location
  * specify location by continent, count, state
  * there should be a default record in case if no match on location
  * use cases: website localization, restrict content distribution, load
  balancing
  * can be associated with Health Checks
* Multi-value answer
  * can be associated with Health Checks
    * the Simple policy can also return some value, but only Multi-value
    supports the health checks
  * up to 8 healthy records
  * is not a substitute for having an ELB

* IP-based
  * routing is based on IP-addresses
  * you provide a list of CIDRs for your clients
  * use cases: optimize perfomance, reduce network consts
* Geoproximity (using Route 53 Traffic Flow feature)
  * route traffic based on geographic location of users and resources
  * ability to shift more traffic to resources based on the defined bias
  * the values of bias are
    * -1 - -99 less traffic to the resources
    * 1  -  99 more traffic to the resources
  * if resource is not AWS then you need to specify latitude and longitude
  * the Route 53 Traffic flow should be used for that feature

#### Route 53 - Health Checks

* HTTP Health Checks are only for public resources
* health check => automated DNS Failover
  * monitors application/server/otherAWSresource
  * monitors other health checks
    * can monitor up to 256 health Child Health Checks
  * monitors CloudWatch Alarms (helpful for private resources)
    * to monitor private resources you can create a CW Metric and associate
    a CW Alarm on it
* about 15 global health checkers will check the endpoint health (they are
located in different AWS regions)
* supported protocols: HTTP, HTTPS, TCP
* if > 18% of health checkers report the endpoint is healthy the Route 53
considers it Healthy, otherwise it's healthy
* ability to choose the location of health checkers
* can check the text in the first 5120 bytes
* check is successful if 2xx or 3xx
* don't forget to configure router/firewall to allow incoming health checkers
requests

#### Route 53 - Domain Registrar vs DNS Service

* you buy a domain with a Domain Registrar (goDaddy, Amazon Registrar, ...)
* usually Domain Registrar provides a DNS service to manage DNS records
* but you can use another DNS service (for example AWS Route 53) to manage your
records
  * create a public hosted zone
  * update NS records on Domain Registrar to use Route 53 Name Servers
* Domain Registrar != DNS Service

## S3

Simple Storage Solution

<u>Bucket</u> - top level directory.

<u>Bucket objects</u> - files in the buckets.

* it's advertised as "infinitely scaling" storage
* many websites use S3 as a backbone
* many AWS Services use S3 as an integration as well
* Bucket must have a globally unique name (across all regions all accounts)
* Buckets are defined at the region level
* S3 looks like a global service but buckets are created in a region

### Use cases

* backup and storage
* disaster recovery
* archive
* Hybrid Cloud storage
* application hosting
* media hosting
* data lakes & big data analytics
* software delivery
* static websites

### Bucket naming convention

* no uppercase, no underscore
* 3-63 characters long
* not an IP
* must start with lowercase letter or number
* must NOT start with the prefix `xn-`
* must NOT end with the suffix `-s3alias`

### Bucket Objects

Objects have a Key
<u>Key</u> is the full path

* s3://my-bucket/`my_file.txt`
* s3://my-bucket/`my_folder/another_folder/my_file.txt`

The key is composed of prefix + object name.
If key is `my_folder/another_folder/my_file.txt`.
The prefix is `my_folder/another_folder/`.
The object name is `my_file.txt`.

* Max object size is 5TB
* If uploading more than 5GB  must use `multi-part upload`
* Objects have metadata (list of text key/value pairs - system or user metadata)
* Objects may have tags (unicode key/value pair - up to 10)
* Version ID (if versioning is enabled)

S3 pre-signed URL - is a url of an S3 object that has encoded credentials. This
allows to view/download the file without authentication.
