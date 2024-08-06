# Networks

## Terms

Packet tracing - the process by which you can verify the path of a packet through the layers to its destination

## Questions

### What is NAT and how does it work?

[https://wiki.merionet.ru/articles/nat-na-palcax-chto-eto]

NAT - Network Address Translation

It was invented to solve the problem of a limited number of IPv4 addresses.
IPv4 supports 2 ^ 32, IPv6 supports 2 ^ 128 addresses
NAT is a method of mapping an IP address space into another by modifying network address information in the IP header of packets.

Most often this technology uses the following address ranges:
10.0.0.0 - 10.255.255.255     - 10.0.0.0/8 (255.0.0.0)
172.16.0.0 - 172.31.255.255   - 172.16.0.0/12 (255.240.0.0)
192.168.0 0 - 192.168.255.255 - 192.168.0.0/16 (255.255.0.0)
100.64.0.0 - 100.127.255.255  - 100.64.0.0/10 (255.192.0.0)

#### There are 3 types of NAT

* Static NAT
one-to-one address mapping between local and global addresses
* Dynamic NAT
many-to-many address mapping between local and global addresses
* PAT (Port Address Translation) or NAT Overload
multicast address mapping between local and global addresses using ports

#### Benefits

* saving IPv4 addresses
* provides security by hiding the internal network structure and private IP addresses from the internet

#### Drawbacks

* impacts the performance (effect real-time protocols such as VoIP)
* increases complexity and cost of network management
* it is more difficult to trace packets

#### Example

We have a client with 192.168.1.5, a router with 104.8.2.4, a requested server with 208.141.17.4

inside local address   - 192.168.1.5  - source IP address in private network
inside global address  - 104.8.2.4    - source IP address in public network
outside global address - 208.141.17.4 - destination IP address in public network
outside local address  - 208.141.17.4 - destination IP address in private network

"Inside" is about your network, something you can control
"Outside" is out of your control
