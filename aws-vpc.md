# AWS Virtual Private Cloud

## Links

* [https://medium.com/@nbkumar2103/-3ccb42bf2e7c]
* [https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/network-to-amazon-vpc-connectivity-options.html]

## Questions

* how to make connection between AWS regions (VPC exists within a single region)?
* what can have IP address in AWS? it seems EC2 instances, NAT gateways, and Network Load Balancers, RDS database

### AWS Region

AWS Regions are separate geographic areas.

AWS Regions consist of multiple, physically separated and isolated Availability Zones that are connected with low latency, high throughput, highly redundant networking.

### AWS Availability Zone

Availability Zones consist of one or more discrete data centers, each with redundant power, networking, and connectivity, and housed in separate facilities.

AZs are physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other.

### AWS VPC

AWS Virtual Private Cloud

A virtual private cloud (VPC) is a virtual network dedicated to your AWS account.

AWS VPC is a logically isolated section of the AWS Cloud where you can launch AWS resources.
You can define your network configuration, including IP address ranges, subnets, and route tables, providing control and security for your cloud resources.

A VPC is a virtual network that closely resembles a traditional network that you'd operate in your own data center. After you create a VPC, you can add subnets.

Each VPC exists within a single region and cannot span multiple regions.

### AWS VPC subnets

A subnet is a range of IP addresses in your VPC. A subnet must reside in a single Availability Zone. After you add subnets, you can deploy AWS resources in your VPC.

Each subnet is associated with a single Availability Zone and cannot span multiple Availability Zones.

### Private subnet vs Public subnet

Public: is associated with a route table that directs traffic to the internet via an Internet Gateway (IGW), making it accessible from the internet

Private: is not associated with an IGW and is intended for resources that should not be directly accessible from the internet.

### Network ACL

A network access control list (ACL) allows or denies specific inbound or outbound traffic at the subnet level. NACL can be associated with multiple subnets.

### NACL vs Security Group

NACL - Network Access Control List: is stateless, operates at 7 layer (OSI), allows or denies traffic at the subnet level based on rules you define

Security Group: is stateful and operates at the instance level, operates at 3 and 4 (OSI) layers, are used for fine-grained control over traffic to and from instances

### What does it mean when you use a security group in the source/destination?

### AWS VPC Peering connection

VPC Peering is a way to connect two VPCs to allow instances in each VPC to communicate with each other.

It's used in scenarios where you need to create a shared network or allow resource sharing between different VPCs

### AWS Transit Gateway

AWS Transit Gateway simplifies network connectivity between VPCs and on-premises networks.

The transit gateway acts as a Regional virtual router for traffic flowing between its attachments, which can include VPCs, VPN connections, AWS Direct Connect gateways, and transit gateway peering connections.

### AWS Site-to-Site VPN

AWS Site-to-Site VPN is a secure connection between an on-premises network and a VPC over the internet.
It uses encrypted tunnels to ensure data confidentiality and integrity, allowing resources in the VPC to securely communicate with on-premises resources.

You can connect a VPC with on-premisses resources over Internet with the help of Site-to-Site VPN (single VPC + Site-to-Site VPN + on-prem over Internet)

You can connect many VPCs with a Target Gateway which connect with on-premisses resources over Internet with the help of Site-to-Site VPN (many VPCs + TGW + Site-to-Site VPN + on-prem over Internet)

### AWS VPC Endpoint

Allow your VPC to connect directly to AWS services like S3 and DynamoDB, without traversing the public internet.

This enhances security by reducing exposure to the internet and improves performance by reducing latency, especially for data-intensive workloads.

### AWS NAT Gateway

Network Address Translation

NAT Gateway allows instances in private subnets to initiate outbound traffic (downloading updates or patches) to the internet, while preventing incoming connections from the internet.

You can use a NAT device to allow resources in private subnets to connect to the internet, other VPCs, or on-premises networks.

The NAT device replaces the source IPv4 address of the instances with the address of the NAT device.

In production, we recommend that you deploy a NAT gateway in each active AZ.

### AWS VPC Flow Log

VPC Flow Logs capture information about the IP traffic going in and out of network interfaces in a VPC.

They can be used for monitoring, troubleshooting, and security analysis by providing insights into the traffic patterns and helping to identify and diagnose network issues.

### Route Tables

Contains a set of rules, called routes, that determine where network traffic from your subnet or gateway is directed.

Route Tables in a VPC determine the path of network traffic by defining routes to different destinations, such as subnets and the internet. Each subnet is associated with a specific route table, allowing you to control how traffic flows within the VPC and to external networks.

A route table contains a set of rules, called routes, that are used to determine where network traffic from your VPC is directed.

Route table is VPC specific.

In general, we direct traffic using the most specific route that matches the traffic. This is known as the longest prefix match.

### VPC CIDR block

It is the IP address range you choose for your VPC.
It determines the address space available for your VPC and its subnets.

CIDR notation represents the IP addresses for your subnets.

The allowed IPv4 CIDR block size for a subnet is between a /28 netmask and /16 netmask.

5 IP addresses in a subnet are reserved.
The first four IP addresses and the last IP address in each subnet CIDR block are not available for your use.

Phrase: If you create a VPC with CIDR block 10.0.0.0/24. One subnet uses CIDR block 10.0.0.0/25 and the other uses CIDR block 10.0.0.128/25

### AWS Direct Connect

AWS Direct Connect makes it easy to establish a dedicated connection from an on-premises network to one or more VPCs.
It bypasses the public internet, offering lower latency and more consistent network performance.
It is typically used for high-throughput and mission-critical workloads that require a direct, private connection to AWS.
It can be used to connect on-premises to multiple VPCs through VGWs + DXGW (direct connect gateway)

### ENI

Elastic Network Interface

ENIs are virtual network interfaces that can be attached to instances in a VPC. They provide additional network capabilities, such as multiple IP addresses, network segmentation, and the ability to attach and detach them from instances.

eth0 - default network interface (eth0) of an instance

### AWS VPN vs AWS Direct Connect vs AWS Transit Gateway

VPNs are suitable for secure, encrypted connections over the public internet.

Direct Connect offers dedicated, private connections.

Transit Gateway simplifies connectivity between multiple VPCs and on-premises networks.

### Internet Gateway

Internet Gateway (IGW) allows instances with public IPs to access the internet.

It enables resources (like EC2 instances) in public subnets to connect to the internet. Similarly, resources on the internet can initiate a connection to resources in your subnet using the public.

You can associate exactly one Internet Gateway with a VPC.

If a server(ec2 instance) doesn't need to be directly reachable from the internet, you should not deploy it into a public subnet.

### What's is IPAM?

Amazon VPC IP Address Manager (IPAM) is a VPC feature that makes it easier for you to plan, track, and monitor IP addresses for your AWS workloads.

you can allocate sequential Elastic IP addresses from an IPAM pool

achieve even greater fault tolerance (how?)

high-bandwidth, high-throughput (why?)

deploy your AWS resources evenly in each active Availability Zone.

### direct access to the internet from your VPC's CIDR block

[https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html]

* internet gateway
* virtual private gateway
* a AWS Site-to-Site VPN connection
* AWS Direct Connect.

### dual-stack

It means something supports both IPv4 and IPv6

Examples

* dual-stack support
* dual-stack subnet
* dual-stack architecture

### prefix lists

A managed prefix list is a set of one or more CIDR blocks.

You can use prefix lists to make it easier to configure and maintain your security groups and route tables.

You can create a prefix list from the IP addresses that you frequently use, and reference them as a set in security group rules and routes instead of referencing them individually.

### DHCP option sets

A DHCP option set is a group of network settings used by resources in your VPC, such as EC2 instances, to communicate over your virtual network.

IP addresses are assigned dynamically by DHCP servers using the Dynamic Host Configuration Protocol (DHCP).

EC2 instances can retrieve

* their IP address lease (at least IPv6, I don't know about IPv4)
* IP address of an Amazon DNS server
* IP address of an NTP (Network Time Protocol) server
* IP address of the router in your VPC
* other network configuration information

### AWS DNS server

The Route 53 Resolver (also called "Amazon DNS server" or "AmazonProvidedDNS")

The Route 53 Resolver is located at 169.254.169.253 (IPv4), fd00:ec2::253 (IPv6)

### AWS DNS hostname

A DNS hostname is a name that uniquely and absolutely names a computer; it's composed of a host name and a domain name. DNS servers resolve DNS hostnames to their corresponding IP addresses.

### Virtual Private Gateway (VGW)

In a nutshell, A Virtual Private Gateway is a way for you to land in your cloud when creating a VPN tunnel.

You can create up to ten VPN tunnels to the exterior.

### Elastic IP addresses

An Elastic IP address is a static, public IPv4 address designed specifically for the dynamic nature of cloud computing.

One of the primary advantages of Elastic IP addresses is their ability to mask the failure of an instance. Should an instance experience an unexpected outage or need to be replaced, you can remap the associated Elastic IP address to another instance within your VPC.

### LB

Elastic Load Balancing automatically distributes your incoming traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones.

A load balancer serves as the single point of contact for clients.

* Application Load Balancers
* Network Load Balancers
* Gateway Load Balancers
* Classic Load Balancers

### LB listener

A listener checks for connection requests from clients, using the protocol and port that you configure.

### LB rules

The rules that you define for a listener determine how the load balancer routes requests to its registered targets.

Each rule consists of a priority, one or more actions, and one or more conditions.
You must define a default rule for each listener.

### LB target group

Each target group routes requests to one or more registered targets, such as EC2 instances, using the protocol and port number that you specify.

You can register a target with multiple target groups.

You can configure health checks on a per target group basis.

### ALB

An Application Load Balancer functions at the application layer, the seventh layer of the Open Systems Interconnection (OSI) model. After the load balancer receives a request, it evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group for the rule action.

### NLB

A Network Load Balancer functions at the fourth layer of the Open Systems Interconnection (OSI) model. It can handle millions of requests per second. After the load balancer receives a connection request, it selects a target from the target group for the default rule. It attempts to open a TCP connection to the selected target on the port specified in the listener configuration.

### internet-facing LB or aws_lb.internal argument

### Route 53

Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service.

Three main functions:

* domain registration
* DNS routing
* health checking

### Route 53 zone

A hosted zone is a container for records, and records contain information about how you want to route traffic for a specific domain, such as example.com, and its subdomains (acme.example.com, zenith.example.com).

A hosted zone and the corresponding domain have the same name.

There are two types of hosted zones:

* Public hosted zones contain records that specify how you want to route traffic on the internet.
* Private hosted zones contain records that specify how you want to route traffic in an Amazon VPC

### Route 53 records

For example, you might create records that cause DNS to do the following:

* Route internet traffic for example.com to the IP address of a host in your data center.
* Route email for that domain (abc@example.com) to a mail server (mail.example.com).
* Route traffic for a subdomain called operations.tokyo.example.com to the IP address of a different host.
