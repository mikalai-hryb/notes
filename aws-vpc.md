# AWS Virtual Private Cloud

## Terms

[https://medium.com/@nbkumar2103/-3ccb42bf2e7c]

### AWS VPC

AWS Virtual Private Cloud

AWS VPC is a logically isolated section of the AWS Cloud where you can launch AWS resources.
You can define your network configuration, including IP address ranges, subnets, and route tables, providing control and security for your cloud resources.

### Private subnet vs Public subnet

Public: is associated with a route table that directs traffic to the internet via an Internet Gateway (IGW), making it accessible from the internet

Private: is not associated with an IGW and is intended for resources that should not be directly accessible from the internet.

### NACL vs Security Group

NACL - Network Access Control List: is stateless, allows or denies traffic at the subnet level based on rules you define

Security Group: is stateful and operates at the instance level, are used for fine-grained control over traffic to and from instances

### AWS VPC Peering connection

VPC Peering is a way to connect two VPCs to allow instances in each VPC to communicate with each other.

It's used in scenarios where you need to create a shared network or allow resource sharing between different VPCs

### AWS Transit Gateway

AWS Transit Gateway simplifies network connectivity between VPCs and on-premises networks.

### AWS Site-to-Site VPN

AWS Site-to-Site VPN is a secure connection between an on-premises network and a VPC.
It uses encrypted tunnels to ensure data confidentiality and integrity, allowing resources in the VPC to securely communicate with on-premises resources.

### AWS VPC Endpoint

Allow your VPC to connect directly to AWS services like S3 and DynamoDB, without traversing the public internet.

This enhances security by reducing exposure to the internet and improves performance by reducing latency, especially for data-intensive workloads.

### AWS NAT Gateway

Network Address Translation

NAT Gateway allows instances in private subnets to initiate outbound traffic (downloading updates or patches) to the internet, while preventing incoming connections from the internet.

### AWS VPC Flow Log

VPC Flow Logs capture information about the IP traffic going in and out of network interfaces in a VPC.

They can be used for monitoring, troubleshooting, and security analysis by providing insights into the traffic patterns and helping to identify and diagnose network issues.

### Route Tables

Route Tables in a VPC determine the path of network traffic by defining routes to different destinations, such as subnets and the internet. Each subnet is associated with a specific route table, allowing you to control how traffic flows within the VPC and to external networks.

### VPC CIDR block

It is the IP address range you choose for your VPC.
It determines the address space available for your VPC and its subnets.

### AWS Direct Connect

AWS Direct Connect is a dedicated network connection that provides private and secure access to AWS services.
It bypasses the public internet, offering lower latency and more consistent network performance.
It is typically used for high-throughput and mission-critical workloads that require a direct, private connection to AWS.
It can be used to connect on-premises to multiple VPC (Transit Gateway only allows connection to 1 VPC)

### ENI

Elastic Network Interface

ENIs are virtual network interfaces that can be attached to instances in a VPC. They provide additional network capabilities, such as multiple IP addresses, network segmentation, and the ability to attach and detach them from instances.

### AWS VPN vs AWS Direct Connect vs AWS Transit Gateway

VPNs are suitable for secure, encrypted connections over the public internet.

Direct Connect offers dedicated, private connections.

Transit Gateway simplifies connectivity between multiple VPCs and on-premises networks.

### Internet Gateway

Internet Gateway (IGW) allows instances with public IPs to access the internet.

It enables resources (like EC2 instances) in public subnets to connect to the internet. Similarly, resources on the internet can initiate a connection to resources in your subnet using the public.

You can associate exactly one Internet Gateway with a VPC.
