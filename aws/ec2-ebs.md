# EBS - Elastic Block Storage

EBS - is a network drive you can attach to your instances while they run.

Provides block-level storage that can be attached to EC2 instances.
We can think about them as a "network USB stick".
They can only be mounted to one instance at a time (at the Certified Cloud Practitioner).
EBS is bound to a specific AZ (to move a volume across you first need to snapshot it).
As network is used for communication it means there might be a bit of latency.
It can be detached from one EC2 instance and attached to another one quickly.

It has such an attribute as `Delete on Termination`.
The root EBS volume by default has this feature enabled.
Other EBS volumes has this attribute disabled.

## What is EBS Snapshot?

EBS Snapshot is a backup at any point in time of your EBS Volume.

It's not necessary to detach your EBS Volume before making a snapshot but it's recommended.
You can copy snapshots across AZ or Region.

## What is EBS Snapshot Archive?

You can move a snapshot to an "archive tier" that is 75% cheaper.

Restoring this snapshot takes from 24 to 72 hours.

## What is Recycle Bin for EBS Snapshots?

You can setup rules to retain deleted snapshots so you can recover them after an accidental deletion.

You can specify retention from 1 day to 1 year.

## What is Fast Snapshot Restore (FSR)?

Force full initialization of snapshot to have not latency on the first use ($$$).

## What are EBS Volume Types?

* gp2 / gp3 (SSD): General purpose SSD volume that balances price and performance for a wide variety of workloads
  * cost effective storage, low-latency
  * 1 GiB - 16 TiB
  * gp3
    * baseline of 3000 IOPS and throughput of 125 MiB/s
    * can increase IOPS up to 16000 and throughput up to 1000 MiB/s independently
  * gp2
    * small gp2 volumes can burst IOPS to 3000
    * size and IOPS are linked, max IOPS is 16000
    * 3 IOPS per GiB, means at 5334 GB we are at the max IOPS

* io1 / io2 Block Express(SSD): Highest-performance SSD volume for mission-critical low-latency or high-throughput workloads
  * critical business applications with sustained IOPS performance
  * or applications that need more than 16000 IOPS
  * great for databases workloads (sensitive to storage performance and consistency)
  * supports EBS multi-attach
  * io2
    * 4 GiB - 64 TiB
    * sub-millisecond latency
    * max PIOPS 256000 with an "IOPS:GiB" ratio of "1000:1"
  * io1
    * 4 GiB - 16 TiB
    * max PIOPS (provisioned) 64000 for Nitro EC2 instance & 32000 for other
    * can increase PIOPS independently from storage size

* st1 (HHD): Low cost Throughput-optimized HDD volume designed for frequently accessed, throughput-intensive workloads.
  * cannot be a boot/root volume
  * 125 GiB - 16 TiB
  * Max Throughput 500 MiB/s, max IOPS 500

* sc1 (HDD): Lowest cost Cold HDD volume designed for less frequently accessed workloads.
  * cannot be a boot/root volume
  * 125 GiB - 16 TiB
  * for data that is infrequently accessed
  * scenarios where lowest cost is important
  * max throughput 250 MiB/s, max IOPS 250

## What are characteristics of EBS volumes

* Size
* Throughput
* IOPS (I/O Ops Per Sec)

## What is multi-attach feature?

Only io1 and io2 support EBS multi-attach.

Each instance has full read & write permissions to volume.
The EC2 instances must be in one AZ.
Up to 16 instances at a time.
Must use a file system that's cluster-aware (not XFS, EXT4, etc...)

## How does EBS encryption work?

When you create an encrypted EBS Volume, you get the following

* data at rest is encrypted inside the volume
* all the data in flight moving between the instance and the volume is encrypted
* all snapshots are encrypted
* all volumes created from the snapshot are encrypted
* encryption and decryption is handled transparently
* encryption has a minimal impact on latency
* EBS Encryption leverages keys from KMS (AES-256)

Copying an unencrypted snapshot allows to enable encryption.

## How to encrypt unencrypted EBS Volume?

* create snapshot
* create a copy of snapshot enabling encryption
* create a new EBS Volume from the snapshot
* attach encrypted EBS Volume to the original instance

You can use a shortcut (Create volume from snapshot) and enable encryption on the fly.
You cannot unencrypt encrypted snapshot.
