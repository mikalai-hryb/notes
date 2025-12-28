# Networking Fundamentals

## Video notes

when network does not work the business is stopped
learning the technical piece is easy, more important is how you think and solve the problems, how you decide what's important

### What are layers in 5-layers model?

* Physical layer
    It represents the physical devices that interconnect computers.
    It's all about cabling, connecting, sending signals.
    Network interfaces at the physical layer can convert a stream of bits traveling across a link into meaningful data or vice versa.

* Data Link layer (Network interface, Network access layer)
    the data link layer is responsible for defining a common way of interpreting these signals so network devices can communicate.
    Ethernet standard, Wi-Fi
    Ethernet frame

* Network layer (Internet layer)
    this layer that allows different networks to communicate with each other through devices known as routers.
    the network layer delivers data between two individual nodes
    IP
    IP datagram

* Transport layer
    the transport layer sorts out which client and server programs are supposed to get that data (delivered by network layer)
    TCP/UDP, Ports
    TCP segment, UDP datagram

* Application layer
    HTTP, SMTP, etc

### What is Internetwork?

Inter network - a collection of networks connected together through routers is an inter network, the most famous of these being the internet.

### Cables

Cables connect different devices to each other, allowing data to be transmitted over them.

2 types of cables

* Copper
    The most common forms of copper twisted pair cables used in networking are Cat5, Cat5e and Cat6 cables. Cat stands for category.
* Fiber
    Fiber cables contain individual optical fibers which are tiny tubes made out of glass about the width of a human hair.

The system at the receiving them is able to interpret these voltage changes as binary ones and zeros which can then be translated into different forms of data

Crosstalk is when an electrical pulse on one wire is accidentally detected on another wire, so the receiving end isn't able to understand the data causing a network error

Cables allow you to form point to point networking connections

### Hub

A hub is a physical layer device that allows for connections from many computers at once.
It is a physical layer device that broadcasts data to every computer connected to it

Hub is layer 1 device

### Collision domain

A collision domain is a network segment where only one device can communicate at a time.
This is the primary reason hubs are fairly rare.

Any one network segment where one computer can interrupt another.

Phrase: We need to reduce internal collision domains!

### Switch

A switch is very similar to a hub. Switch is layer 2 device.
This means that a switch can actually inspect the contents of the ethernet protocol data being sent around the network, determine which system the data is intended for and then only send that data to that one system. This reduces or even completely eliminates the size of collision domains on a network.

Switches, remember which computers live on which physical interfaces

### Lan

LAN - Local Area Network

Hubs and switches are the primary devices used to connect computers on a single network, usually referred to as a LAN or a Local Area Network.

### Router

A router, is a device that knows how to forward data between independent networks.
A router is a network device that forwards traffic depending on the destination address of that traffic.
A router is a device that has at least two network interfaces since it has to be connected to two networks to do its job,

Router is layer 3 device.

Just like a switch can inspect Ethernet data to determine where to send things, a router can inspect IP data to determine where to send things.

The most common type of router you'll see is one for a home network or a small office. These devices generally don't have very detailed routing tables. The purpose of these routers is mainly just to take traffic originating from inside the home or office land and to forward it along to the ISP or Internet Service Provider.

Core ISP routers have to deal with much more complexity in making decisions about where to send traffic.

Routers share data with each other via a protocol known as BGP or Border Gateway Protocol.
That lets them learn about the most optimal paths to forward traffic.

The Internet is incredibly large and complicated, and routers are global guides for getting traffic to the right places.

### Basic routing

1) a router receives a packet of data on one of its interfaces.
2) the router examines the destination IP of this packet
3) the router then looks up the destination network of this IP in its routing table
4) the router forwards that out through the interface that's closest to the remote network as determined by additional info within the routing table.

### Node

A device connected to the network

### Server

Server is anything that can provide data to a client.
Something providing data to something requesting the data

### Client

The thing receiving the data is referred to as a client.

### Bit

A bit is the smallest representation of data that a computer can understand. It's a one or a zero.

### Modulation

Modulation is a way of varying the voltage of this charge moving across the cable.

When used for computer networks, this kind of modulation is more specifically known as line coding. It allows devices on either end of a link to understand that an electrical charge in a certain state is a zero and another state is a one.

modern networks are capable of moving 10 billion (10 000 000 000) ones and zeros across a single network cable every second.

### twisted pair

The most common type of cabling used for connecting computing devices.
It features pairs of copper wires that are twisted together.
These pairs act as a single conduit for information and their twisted nature helps protect against electromagnetic interference and cross-talk from neighboring pairs.
These cables allow for duplex communication

### Duplex communication

Duplex communication is the concept that information can flow in both directions across the cable.

### Full-duplex (simultaneous)

Devices can communicate at the same time

### Half-duplex (takes turns)

Half-duplex means that while communication is possible in each direction, only one device can be communicating at a time.
If there's something wrong with the connection, you might see a network link degrade and report itself as operating as half-duplex.

### Simplex communication

Simplex communication is unidirectional.

### Plug

The most common plug is known as an RJ 45 or register Jack 45.

Most network ports have two small L E D s.
One is the link light and the other is the activity light.

### Ethernet

The protocol most widely used to send data across individual links.
Ethernet and the data link layer provide a means for software at higher levels of the stack to send and receive data.

Ethernet as a protocol solve this problem (when one device can speak at a time) by using a technique known as carrier sense multiple access with collision detection (CSMA/CD)

Ethernet itself only reports on data integrity, it doesn't perform data recovery.

### CSMA/CD

It is used to determine when the communications channels are clear and when the device is free to transmit data.

### MAC address

MAC address stands for Media Access Control address.

MAC address is a globally unique identifier attached to an individual network interface.

It's a 48-bit number normally represented by six groupings of two hexadecimal numbers.

Number of MAC addresses is 2 ^^ 48

Example: 00-B0-D0-63-C2-26
00-B0-D0 - organizationally unique identifier or OUI

### Octet

It is any number that can be represented by 8-bits

### Ethernet transmission frames

* Unicast (frame)
    A unicast transmission is always meant for just one receiving address.

    If the least significant bit in the first octet of a destination address is set to zero, it means that ethernet frame is intended for only the destination address.
    This means it would be sent to all devices on the collision domain, but only actually received and processed by the intended destination.

* Multicast (frame)
    If the least significant bit in the first octet of a destination address is set to one, it means you're dealing with a multicast frame.

    A multicast frame is similarly set to all devices on the local network segment. What's different is that it will be accepted or discarded by each device depending on criteria aside from their own hardware MAC address.

* Broadcast (frame)
    In ethernet, broadcast is sent to every single device on a LAN. This is accomplished by using a special destination known as a broadcast address. The ethernet broadcast address is all F's (FF-FF-FF-FF-FF-FF). Ethernet broadcasts are used so that devices can learn more about each other.

### Data-packet

A data packet is an all-encompassing term that represents any single set of binary data being sent across a network link.

At the Ethernet level data packets are known as Ethernet frames.

### Ethernet frame

Preamble is eight bytes or 64 bits long, and can itself be split into two sections.

SFD (start frame delimiter) - last byte in the preamble, signals to a receiving device that the preamble is over and that the actual frame contents will now follow

EtherType field - is 16 bits long and used to describe the protocol of the contents of the frame

FCS - frame check sequence
This is a four-byte or 32-bit number that represents a checksum value for the entire frame.
This checksum value is calculated by performing what's known as a cyclical redundancy check (CRC) against the frame.
A cyclical redundancy check, or CRC, is an important concept for data integrity and is used all over computing, not just network transmissions.

### VLAN

VLAN stands for virtual LAN.
It's a technique that lets you have multiple logical LANs operating on the same physical equipment.

### Payload

A payload in networking terms is the actual data being transported, which is everything that isn't a header.

### Protocol

A defined set of standards that computers must follow in order to communicate properly is called a protocol

### IP

Internet Protocol (IP): The most common protocol used in the network layer

### IP addresses

IP addresses are a 32-bit long numbers made up of four octets and each octet is normally described in decimal numbers.

Example: 12.34.56.78 (dotted decimal notation)
IP addresses belong to the networks, not to the devices attached to those networks

IP addresses can be split into two sections; the network ID and the host ID.
If we have 9.100.100.100
9 - is a network ID
100.100.100 - is a host ID

Good phrase
Its part of network C and has been assigned an IP address of 172.16.100 and has a web server listening on Port 80.

### Address Class System

The address class system is a way of defining how the global IP address space is split up.

* class A (9 and 100.100.100)

    Class A addresses are those where the first octet is used for the network ID and the last three are used for the host ID
* class B (9.100 and 100.100)

    Class B addresses are where the first two octets are used for the network ID and the second two are used for the host ID
* class C (9.100.100 and 100)

    Class C addresses, are those where the first three octets are used for the network ID and only the final octet is used for the host ID

### TCP (Transmission Control Protocol)

Transmission Control Protocol (TCP): The data transfer protocol most commonly used in the fourth layer. This protocol requires an established connection between the client and server

### UDP (User Datagram Protocol)

User Datagram Protocol (UDP): A transfer protocol that does not rely on connections. This protocol does not support the concept of an acknowledgement. With UDP, you just set a destination port and send the data packet.

UDP is connectionless this means there's no set up or tear down of a connection.

### DHCP - Dynamic Host Configuration Protocol

### IP datagram

It is a highly structured series of fields that are strictly defined.
Header and Payload

#### Service Type field

These 8 bits can be used to specify details about quality of service or QoS technologies.
QoS are services that allow routers to make decisions about which IP datagram maybe more important than others.

#### Identification field

It is a 16 bit number that's used to group messages together.
It's used for splitting data to many packages.

#### Flag field

It shows if fragmentation happens

#### Fragmentation

Fragmentation is the process of taking a single IP datagram and splitting it up into several smaller datagrams.

#### TTL field

Time to live.
This field is an 8 bit field that indicates how many router hops a datagram can traverse before it's thrown away.

#### Protocol field

It's TCP or UDP

#### Checksum field

a check some of the contents of the entire IP datagram header.
It changes when TTL is changing

#### Source IP address field

#### Destination IP address field

#### IP options field

This is an optional field and is used to set special characteristics for data grams primarily used for testing purposes

#### Padding field

The padding field is just a series of zeroes used to ensure the header is the correct total size. We need this because the IP options field is both optional and variable in length.

#### Encapsulation

Each payload of a package contains another level's payload

IP datagram is a payload of Ethernet frame.

Ethernet frame encapsulates an IP datagram, an IP datagram encapsulates a TCP segment.

### ARP

Address Resolution Protocol.

ARP is a protocol used to discover the hardware address of a node with a certain IP address.

If there is no information in ARP table of a specific interface then the ARP discovery request is sent to every node on the local network.

### ARP table

An ARP table is just a list of IP addresses and the MAC address is associated with them.
ARP table is presented locally and ARP table entries generally expire after a short amount of time to ensure changes in the network are accounted for.

### Subnetting

Subnetting is the process of taking a large network and splitting it up into many individual smaller subnetworks or subnets.
These individual subnets will all have their own gateway router's serving as the ingress and egress point for each subnet.

### gateway router

A gateway router specifically serves as the entry and exit path to a certain network.

### core Internet routers

core Internet routers, which might only speak to other core routers.
At the Internet level, core routers only care about the network ID and use this to send the datagram along to the appropriate gateway router to that network.

### Subnet ID

In a world with subnetting, some bits that would normally comprise the host ID are actually used for the subnet ID.

for example, we have 9.101.102.103 where 9.101 is network id and 102.103 is host id. The 3-rd octet can be used as a subnet ID

### Subnet mask

Subnet IDs are calculated via what's known as a subnet mask.
Subnet masks are 32-bit numbers that are normally written out as four octets in decimal.

A subnet mask is a binary number that has two sections.
The beginning part, which is the mask itself, is a string of ones.
Ones tells us what we can ignore when computing a host ID.
The part with all the zeros tells us what to keep.

for example we have the following mask 255.255.255.0.
This would translate to 24 ones followed by eight zeros.

The purpose of the mask or the part that's all ones, is to tell a router what part of an IP address is the subnet ID.
0 is always assigned to a network address
255 is reserved as a broadcast address

The size of a subnet is entirely defined by its subnet mask

The entire IP and subnet mask could be written out as 9.100.100.100/27

A subnet mask is a way for a computer to use `and` operators to determine if an IP address exists on the same network.

### Network ID

8  bit for Class A
16 bit for Class B
24 bit for Class C

### demarcation point

to describe where one network or system ends and another one begins.

### CIDR

Classless Inter-Domain Routing

With CIDR, the network ID and subnet ID are combined into one.
CIDR is where we get this shorthand slash notation
This slash notation is also known as CIDR notation.

CIDR allows for networks themselves to be differing sizes.
Before, network sizes were static, think only class A, class B, or class C, and only subnets could be of different sizes.

Just an example of usage
We have network A whose address space is 192.168.1.0/24

#### Routing Table

a data table stored in a router that lists the routes to particular network destinations

A routing table will generally have a catch-all entry that matches any IP address that it doesn't have an explicit network listing for

#### Destination network column

This column would contain a row for each network that the router knows about. This is just the definition of the remote network, a network ID and the net mask.

#### Next hop column

This is the IP address of the next router that should receive data intended for the destination networking question

#### Total hops column

how far away that destination currently is.

#### Interface

It's the interface of this router.

Interface it should forward traffic, matching the destination network out of.

For a router, the port where a router connects to a network. A router gives and receives data through its interfaces. These are also used as part of the routing table

### Routing protocols

These are special protocols, the routers use to speak to each other in order to share what information they might have.

* distance vector protocols (outdated)
* link state protocols

#### interior gateway protocols

Interior gateway protocols are used by routers to share information within a single autonomous system.

##### autonomous system

an autonomous system is a collection of networks that all fall under the control of a single network operator.

#### exterior gateway protocols

are used for the exchange of information between independent autonomous systems.

BGP - Border Gateway Protocol (only this is used)

### IANA

Internet Assigned Numbers Authority is a nonprofit organization that helps manage things like IP address allocation.

IANA is also responsible for ASN or Autonomous System Number allocation.

### Non-routable address

Non-routable address space is basically exactly what it sounds like.
They are ranges of IPs set aside for use by anyone that cannot be routed to.

Non-routable address space allows for nodes on such a network to communicate with each other, but no gateway router will attempt to forward traffic to this type of network.

RFC (request for comment) 1918 defined three ranges of IP addresses that will never be routed anywhere by core routers.

These ranges are free for anyone to use for their internal networks.

* 10.0.0.0/8
* 172.16.0.0/12
* 192.168.0.0/16

### Transport layer

Allows traffic to be directed to specific network application
These include multiplexing and demultiplexing traffic.

### Multiplexing

Multiplexing in the transport layer means that nodes on a network have the ability to direct traffic toward many different receiving services.

### Demultiplexing

Demultiplexing is the same concept just at the receiving end, it's taking traffic that's all aimed at the same node and delivering it to the proper receiving service.

### Port

Port is a 16-bit number that's used to direct traffic to specific services running on a networked computer.
Ports are normally denoted with a colon after the IP address.

So the full IP and ports in this scenario could be described as 10.1.1.100:80. When written this way, it's known as a socket address or socket number.

80 http
21 ftp

* System Ports
    identified as ports 1 through 1023. System ports are reserved for common applications like FTP (port 21), SSH(port 22), Telnet over TLS/SSL (port 992)
* User Ports
    identified as ports 1024 through 49151. Vendors register user ports for their specific server application
* Ephemeral Ports (Dynamic or Private Ports)
    identified as ports 49152 through 65535. Ephemeral ports are used as temporary ports for private transfers. Only clients use ephemeral ports

To protect your network, you should use a firewall to secure your ports and only open sockets as needed.

### Service

A server or service is a program running on a computer waiting to be asked for data.

### UDP Protocol

User Datagram Protocol (UDP) is a communications protocol for time-sensitive applications like gaming, playing videos, or Domain Name System (DNS) lookups

UDP is connectionless protocols.

UDP doesn't rely on connections and it doesn't even support the concept of an acknowledgement. With UDP, you just set a destination port and send the packet.

You might actually be able to send higher quality video with UDP. That's because you'll be saving more of the available bandwidth for actual data transfer instead of the overhead of establishing connections and acknowledging delivered data segments.

### TCP Protocol

Transmission Control Protocol

TCP is a protocol that's super reliant on acknowledgments.

As a protocol TCP establishes connections used to send long chains of segments of data.

TCP is a connection-oriented protocol (it is one that establishes a connection, and uses this to ensure that all data has been properly transmitted. )

At the IP or Ethernet level, if a checksum doesn't compute all of that data is just discarded, it's up to TCP to determine when to resend this data.

### TCP segment

TCP segment is made up of a TCP header and a data section.

#### Source port field

It is a high numbered port chosen from a special section of ports known as ephemeral ports.

#### Destination port field

The destination port is the port of the service the traffic is intended for

#### sequence number

his is a 32-bit number that's used to keep track of where in a sequence of TCP segments this one is expected to be.

#### acknowledgment number

It is the number of the next expected segment. In very simple language, a sequence number of one and an acknowledgment number of two could be read as this is segment 1, expect segment 2 next.

#### TCP control flags

* URG (urgent)
    A value of one here indicates that the segment is considered urgent and that the urgent pointer field has more data about this.
    This feature of TCP has never really had widespread adoption and isn't normally seen.
* ACK (acknowledged)
    A value of one in this field means that the acknowledgement number field should be examined.
* PSH (push)
    the transmitting device wants the receiving device to push currently-buffered data to the application on the receiving end as soon as possible.
* RST (reset)
    This means that one of the sides in a TCP connection hasn't been able to properly recover from a series of missing or malformed segments
* SYN (synchronize)
    It's used when first establishing a TCP connection and make sure the receiving end knows to examine the sequence number field.
* FIN (finish)
    When this flag is sent to one, it means the transmitting computer doesn't have any more data to send and the connection can be closed.

#### Data offset field

This field is a four-bit number that communicates how long the TCP header for this segment is.

#### TCP Window

Window size the most important part in the TCP header. This fields is used by the receiver to indicate to the sender, the amount of data that it can accept. So, this field is very important for efficient data transfer and flow control.

#### TCP Checksum field

It specifies the range of sequence numbers that might be sent before an acknowledgment is required.

#### Urgent pointer field

It is used in conjunction with one of the TCP control flags to point out particular segments that might be more important than others.

This field hasn't really ever seen adoption

#### Options field

Rarely used
it's sometimes used for more complicated flow control protocols.

### Buffer

A buffer is a computing technique where a certain amount of data is held somewhere before being sent somewhere else.

### three-way handshake

A handshake is a way for two devices to ensure that they're speaking the same protocol and will be able to understand each other.

This exchange involving segments that have SYN, SYN/ACK and ACK sent happens every single time a TCP connection is established anywhere

1) computer A sends a TCP segment to Computer B, with a `SYN` flag (let's establish a connection and look at my sequence number field so we know where this conversation starts)
2) Computer B then responds with a TCP segment where both the SYN and ACK flags are sent (sure, let's establish a connection and I acknowledge your sequence number.)
3) Then Computer A responds again with just the ACK flag sent (I acknowledge your acknowledgement, let's start sending data.)

Now, Computer A is free to send whatever data it wants to Computer B `and vice versa`.

### four-way handshake happens

1) The computer ready to close the connection sends a FIN flag
2) the other computer acknowledges with an ACK flag
3) Then if this computer is also ready to close the connection, it will send a FIN flag
4) This is again responded to by an ACK flag.

Hypothetically, a TCP connection can stay open in simplex mode with only one side closing the connection, but this isn't something you'll run into very often.

### Socket

A socket is the instantiation of an endpoint in a potential TCP connection.
TCP sockets require actual programs to instantiate them.

The structure and properties of a socket are defined by an application programming interface (API) for the networking architecture. Sockets are created only during the lifetime of a process of an application running in the node.

A socket is one endpoint of a two-way communication link between two programs running on the network. A socket is bound to a port number so that the TCP layer can identify the application that data is destined to be sent to.

A socket is a pipe - a memory buffer on the filesystem through which one process can write data to another - except that rather than connecting two processes on your computer, the socket connects a process on your computer to a process on someone else's computer, over a network.

A socket is a port that a TCP segment has activated to listen for data requests.

### instantiation

An instantiation is the actual implementation of something defined elsewhere.

### Socket states

* LISTEN (on the server side only)
    TCP socket is ready and listening for incoming connections
* SYN_SENT (on the client side only)
    a synchronization request has been sent, but the connection hasn't been established yet
* SYN_RECEIVED (on the server side only)
    a socket previously in a LISTEN state has received a synchronization request and sent a SYN/ACK back, but it hasn't received the final ACK from the client yet
* ESTABLISHED ( on both the client and server side )
    the TCP connection is in working order and both sides are free to send each other data.

Closing

* FIN_WAIT
     a FIN has been sent but the corresponding ACK from the other end hasn't been received yet.
* CLOSE_WAIT
    the connection has been closed at the TCP layer, but that the application that opened the socket hasn't released its hold on the socket yet.
* CLOSED
     the connection has been fully terminated and that no further communication is possible.

### Data integrity

Specifically, the TCP protocol sends acknowledgments between the service and client to show that sent data was received.

### Firewalls

A firewall is just a device that blocks traffic that meets certain criteria

Firewalls can actually operate at lots of different layers of the network

### Application layer

Allows specific network applications to communicate in a way they understand

HTTP, SMTP, etc

### OSI

Open Systems Interconnection model

1) Physical layer
2) Data Link layer (Network interface, Network access layer)
3) Network layer (Internet layer) (IP, ARP)
4) Transport layer (TCP, UDP)
5) Session layer
    Responsible for things like facilitating the communication between actual applications and the transport layer
    Takes the application layer data that's been unencapsulated from all the layers below it and hands it off to the next layer in the OSI model, the presentation layer.
6) Presentation layer
    responsible for making sure that the unencapsulated application layer data is actually able to be understood by the application in question
    This is the part of an operating system that might handle encryption or compression of data
7) (5) Application layer (SMTP, FTP, HTTP, DNS)

### networking stack

A networking stack refers to the collection of protocols, software, and hardware that manage and facilitate communication between devices over a network. It is organized into layers, each handling different aspects of the communication process, from physical transmission of data to higher-level application services.

### DNS

Domain Name System

DNS is a global and highly distributed network service that resolves strings of letters into IP addresses for you.

DNS is a system that converts domain names into IP addresses.

DNS servers are one of the things that need to be specifically configured at a node on a network.

All domain names in the global DNS system have a TTL or time to live.

Local computer from your phone to a desktop will generally have its own temporary DNS cache as well.

DNS is a great example of an application layer service that uses UDP for the transport layer instead of TCP.

A single DNS request and its response can usually fit inside of a single UDP datagram

DNS listens on port 53.

DNS over TCP does in fact exists. When DNS lookup response does not fit in a single UDP datagram then DNS name server would respond with a packet explaining that the response is too large. The DNS client would then establish a TCP connection in order to perform the lookup

### Domain name

A domain name is just the term we use for something that can be resolved by DNS.

A domain is the name commonly used to refer to the second part of a domain name, which would be `example` in our [www.example.com]

Phrase: Let's say we're in charge of a domain name [www.example.com]

Domains are registered with registrars. A registrar is just a company that has an agreement with ICANN to sell unregistered domain names.

DNS can technically support up to 127 levels of domain in total, for a single fully qualified domain name.
Each individual section can only be 63 characters long, and a complete FQDN is limited to a total of 255 characters.

### Name resolution

Process of using DNS to turn a domain name into an IP address

Phrase: To perform a fully qualified resolution of a domain name.
Phrase: To perform a full recursive resolution.

The full resolution requires a lot of traffic.

Full name resolution request is performed by recursive name server.

FQDN - Fully Qualified Domain Name.

### Types of DNS Servers

1) Caching name servers
2) Recursive name servers
    Caching and recursive name servers are generally provided by an ISP or your local network.
    Their purpose is to store domain name lookups for a certain amount of time.
    Recursive name servers perform full DNS resolution requests
3) Root name servers
    It's better to think of them as 13 authorities that provide root name lookups as a service.
4) TLD name servers
    TLD stands for top-level domain.
    Represents the top of the hierarchical DNS name resolution system.
    `.com` is TLD
    It's most likely a global distribution of Anycast accessible servers responsible for each TLD.
5) Authoritative name servers
    Authoritative name servers are responsible for the last two parts of any domain name, which is the resolution at which a single organization may be responsible for DNS lookups.
    Authoritative name servers are responsible for responding to name resolution requests for a specific domains.

given DNS server can fulfill many of these roles at once.

### Anycast

Anycast is a technique that's used to route traffic to different destinations depending on factors like location, congestion or link health.

### DNS A record

An A record is used to point a certain domain name at a certain IPv4 IP address.

A single domain name can have multiple A records too (this allows for a technique known as DNS round robin to be used to balance traffic across multiple IPs)

For example, we have 4 DNS A records: 10.1.1.1, 10.1.1.2, 10.1.1.3, 10.1.1.4 for example.com
When a DNS resolver performs a look up of example.com all 4 IPs would be returned in the order 10.1.1.1, 10.1.1.2, 10.1.1.3, 10.1.1.4, the second lookup would return  10.1.1.2, 10.1.1.3, 10.1.1.4, 10.1.1.1 and so on.

### Round robin

Round robin is a concept that involves iterating over a list of items one by one in an orderly fashion.

It tries to ensures a fairly equal balance of each entry on the list that's selected.

### Quad A record or AAAA record

A quad A record is very similar to an A record, except that it returns an IPv6 address instead of an IPv4 address.

### CNAME

CNAME - canonical name record
A CNAME record is used to redirect traffic from one domain to another.

Phrase: By configuring a CNAME record for [example.com] that resolves to [www.example.com], the resolving client would then know to perform another resolution attempt, this time, for [www.example.com], and then use the IP returned by that second attempt.

We could have 2 A records for [example.com] and [www.example.com]. But if/when IP addresses are changed we will need to update them in 2 places. With CNAME you will need to update only one place

### MX record

MX - main exchange record
This resource record is used in order to deliver email to the correct server.

### SRV record

SRV - service record
Used to define the location of various specific services.

SRV is similar to MX. While MX is only for mail services, an SRV record can be defined to return the specifics of many different service types.
For example, SRV records are often used to return the records of services like Cal Dave, which is a calendar and scheduling service.

### TXT record

TXT - text record
Originally intended to be used only for associating some descriptive text with a domain name for human consumption.

Today, two of the most important uses for DNS TXT records are email spam prevention and domain ownership verification, although TXT records were not designed for these uses originally.

### NS record

NS record indicate other name servers that might also be responsible for this zone.

### SOA record

SOA - start of authority record
SOA record declares the zone and the name of the name server that is authoritative for it.
Stores important information about a domain or zone such as the email address of the administrator, when the domain was last updated, and how long the server should wait between refreshes.

### Anatomy of a Domain Name

We have [www.example.com]

* .com is TLD
* example is domain
    Domains are used to demarcate where control moves from a TLD name server, to an authoritative name server
* www - subdomain
    Sometimes referred to as a host name if it's been assigned to only one host.
    Sub domains, can be freely chosen and assigned by anyone who controls such a registered domain

All the parts together form [www.example.com] -  fully qualified domain name or FQDN

#### TLD

TLD - top level domain

### ICANN

Internet Corporation for Assigned Names and Numbers.
ICANN a non profit organization that handles administration and definition of TLDs.

ICANN is a sister organization to the IANA, and together they helped define and control both the global IP spaces along with the global DNS system.

### DNS Zones

DNS Zones allow for easier control over multiple levels of a domain.

DNS zones are a hierarchical concept.
Zones don't overlap.

### DNS Zone files

Simple configuration files that declare all resource records for a particular zone.
SOA NS, A are part of Zone files.

### Reverse lookup zone files

These let DNS resolvers ask for an IP and get the FQDN associated with it returned.
These files are the same as zone files, except instead of A and Quad A records which resolve names to IPs, you'll find mostly pointer resource record declarations.

### PTR

PTR - pointer record
PTR record resolves an IP to a name

### TCP/IP based network

TCP/IP-based network needs to have at least four things specifically configured

* IP address
* subnet mask for the local network
* primary gateway
* name server

### DHCP

DHCP - Dynamic Host Configuration Protocol
An application layer protocol that automates the configuration process of hosts on a network.

You can also use DHCP to assign things like NTP (Network Time Protocol) servers and other.

DHCP listens on the UDP port 67
DHCP discovery messages are always sent from UDP port 68

DHCP is a server/service

### DHCP dynamic allocation

A range of IP addresses is set aside for client devices and one of these IPs is issued to these devices when they request one.

### DHCP Automatic allocation

A range of IP addresses is set aside for assignment purposes

The main difference here is that the DHCP server is asked to keep track of which IPs it's assigned to certain devices in the past. Using this information, the DHCP server will assign the same IP to the same machine each time if possible.

### DHCP Fixed allocation

Fixed allocation requires a manually specified list of MAC address and their corresponding IPs.

### Dynamic IP address

Dynamic IP address: An IP address assigned automatically to a new device through a technology known as Dynamic Host Configuration Protocol

### DHCP discovery

The process by which a client configured to use DHCP attempts to get network configuration information is known as DHCP discovery.

DHCP listens on the UDP port 67
DHCP discovery messages are always sent from UDP port 68

1) The DHCP client sends what's known as a DHCP discover message out onto the network. It's a broadcast message because it does not know the IP of DHCP server. MAC address is included in discovery message. Source 0.0.0.0:68, Destination: 255.255.255.255:67
2) The DHCP server sends an offer message. It's a broadcast message with MAC address included. Source 255.255.255.255:67, Destination: 0.0.0.0:68
3) DHCP client would respond to the DHCP offer message with a DHCP request message. This message essentially says, yes, I would like to have an IP that you offered to me.
Source 0.0.0.0:68, Destination: 255.255.255.255:67
4) DHCP server responds with a DHCPACK or DHCP Acknowledgement message.
Source 255.255.255.255:67, Destination: 0.0.0.0:68

A DHCP lease is a temporary assignment of an IP address to a device on the network.

### NAT

NAT - Network Address Translation

NAT is a technique instead of a defined standard.

NAT is a technology that allows a gateway, usually a router or a firewall to rewrite the source IP of an outgoing IP datagram while retaining the original IP in order to rewrite it into the response.

It allows for computers on non-routable address space to communicate with other devices on the Internet.

A mitigation tool that lets organizations use one public IP address and many private IP addresses within the network.

It takes one IP address and translates it into another. They range from security safeguards to preserving the limited amount of available IPV4 space.

Lots of LANs today use one-to-many NAT to accomplish that.

Usually a router rewrites TTL and recalculate the checksum of a package but with the NAT it also replaces the source IP with its IP (usually a router)

Phrase: the router is configured to perform NAT for any outbound packets
Phrase: it performs network address translation

### IP masquerading

This is when NATis hiding the IP of Computer 1 from Computer 2.

### Port preservation

A technique where the source port chosen by a client is the same port used by the router.

### Port forwarding

A technique where specific destination ports can be configured to always be delivered to specific nodes.

### VPN

VPN - Virtual private networks

A technology that allows for the extension of a private or local network to a host that might not work on that same local network.

VPNs are a tunneling protocol, which means they provision access to something not locally available.

VPNs are a technology they use encrypted tunnels to allow for a remote computer or network to act as if it's connected to a network that it's not actually physically connected to.

How-it-works: VPN client provisions a virtual interface with an IP that matches the address space of the network they've established a VPN connection to. And then establishes a VPN tunnel. Most VPNs work by using the payload section of the transport layer to carry an encrypted payload that actually contains an entire second set of packets, the network, the transport, and the application layers of a packet intended to traverse the remote network. Basically, this payload is carried to the VPN's endpoint where all the other layers are stripped away and discarded.

Phrase: establishing a VPN connection, is the same as VPN tunnel has been established.

### Two-factor authentication

Two-factor authentication is a technique where more than just a username and password are required to authenticate. Usually, a short-lived numerical token is generated by the user through a specialized piece of hardware or software.

VPNs can also be used to establish site-to-site connectivity. Conceptually, there isn't much difference between how this works compared to a remote employees situation. It's just that the router, or sometimes a specialized VPN device on one network, establishes the VPN tunnel to the router or VPN device on another network.

### Proxy service

A proxy service is a server that acts on behalf of a client in order to access another service.

The concept of a proxy is just that, a concept or an abstraction.

Proxies sit between clients and other servers, providing some additional benefit.

* anonymity
* security
* content filtering
* increased performance
* a couple of other things.

### Reverse proxy

A reverse proxy is a service that might appear to be a single server to external clients, but actually represents many servers living behind it.

A reverse proxy in this situation (a website has many web servers) could act as a single front end for many web servers living behind it.

Reverse proxies are now implemented in order to use hardware built specifically for cryptography to perform the encryption and decryption work so that the web servers are free to just serve content.

### PSTN or POTS

PSTN - Public Switched Telephone Network is also sometimes referred to as the Plain Old Telephone Service or POTS

### Dial-up connection

A dial-up connection uses POTS for data transfer and gets its name because the connection is established by actually dialing a phone number.

### Modem

Modem stands for modulator demodulator and they take data that computers can understand and turn them into audible wavelengths that can be transmitted over POTS.

### Baud rate

A baud rate is a measurement of how many bits could be passed across a phone line in a second.

### Broadband

Any connectivity technology that isn't dial-up internet.

Broadband internet is almost always much faster than even the fastest dial-up connections, and refers to connections that are always on.

Phrase: broadband Internet connection technologies

### T-carrier technologies

Originally invented by AT&T in order to transmit multiple phone calls over a single link.

With the T1 (Transmission System 1) specification, AT&T invented a way to carry up to 24 simultaneous phone calls across a single piece of twisted pair copper. A single T1 line capable of transmitting data at 1.544 megabits per second (24 * 64 kilobits).

### DSL

DSL - digital subscriber line  technology

This allowed for normal voice phone calls and data transfer to occur at the same time on the same line.

ADSL - Asymmetric Digital Subscriber Line (generally faster download speeds and slower upload speeds)
SDSL -  Symmetric Digital Subscriber Line (upload and download speeds are the same)
HDSL  - High bit-rate Digital Subscriber Lines (speeds above 1.544 megabits per second)

### Cable modem

Device that sits at the edge of a consumer's network and connects it to the cable modem termination system or CMTS.

### FTTX

FTTX stands for fiber to the x, where the x can be one of many things.

* FTTN - fiber to the neighborhood
* FTTB - fiber to the business/basement
* FTTH - fiber the the home
* FTTP (FTTB and FTTH) - fiber to the premises

### ONT

ONT - Optical network terminal

ONT - the demarcation point for fiber technologies instead of a modem.

### PPP

PPP - Point to Point Protocol

PPP for broadband communications is a set of instructions used to transmit data between two directly connected devices.

### PPPoE

PPPoE - Point to Point Protocol over Ethernet

PPPoEis a way of encapsulating PPP frames inside an ethernet frame.

A common use case is PPPoE using DSL services where a PPPoE modem-router connects to the DSL service or when a PPPoE DSL modem is connected to a PPPoE-only router using an Ethernet cable.

### Broadband internet

Broadband internet requires several protocols to make sure different connected devices can communicate with each other.

* Point to Point Protocol (PPP) encapsulates data, so any PPP configured devices can communicate without issue.
* Point to Point over Ethernet (PPPoE) is an extra layer of encapsulation for standard PPP frames, to enable data to be sent over ethernet connections.

### WAN

WAN - Wide Area Networks (WAN)

Acts like a single network, but spans across multiple physical locations

WAN technologies usually require that you contract a link across the Internet with your ISP.

The area between each demarcation point and the ISP's actual core network is called a local loop. This local loop would be something like a T carrier line or a high speed optical connection to the provider's local regional office.

WAN is used in geographically dispersed networks of large organizations.

WAN routers may also be called border routers or edge routers.

### SD-WAN

Software-Defined WAN - Software developed to address the unique needs of cloud-based WAN environments. One of the ways that SD-WANs help reduce operational costs is by replacing the need for expensive lines leased from an ISP by linking regional LANs together to build a WAN.

### point to point VPN (site to site VPN)

### Wireless networking

Wireless networking is exactly what it sounds like a way to network without wires.

The most common specifications for how wireless networking devices should communicate are defined by the IEEE 802.11 standards. This set of specifications, also called the 802.11 family make-up the set of technologies we call Wi-Fi

Wireless networking devices communicate with each other through radio waves.

You should think of 802.11 protocols as defining how we operate at both the physical and the data link layers.

Keep in mind that wireless networking works by sending a radio signal between two antennas.

* ad-hoc networks
    nodes all speak directly to each other
* WLAN (wireless LAN)
    A wireless LAN consists of one or more access points which act as bridges between the wireless and wired networks
* mesh networks
    are like ad-hoc networks, since lots of the devices communicate with each other wirelessly, forming a mesh. Most mesh networks you'll run into are made up of only wireless access points

### Frequency Band

A frequency band is a certain section of the radio spectrum that's been agreed upon to be used for certain communications.

In North America, FM radio transmissions operate between 88 and 108 megahertz. This specific frequency band is called the FM broadcast band.

Wi-Fi networks operate on a few different frequency bands, most commonly the 2.4 gigahertz and 5 gigahertz bands. that's really just shorthand for where these frequency bands actually begin for wireless networks that operate on the 2.4 and 5 gigahertz band.

### Wireless access point

A wireless access point is a device that bridges the wireless and wired portions of a network.

### Receiver address

the MAC address of the access point that should receive the frame.

### Transmitter address

the MAC address of whatever has just transmitted the frame.

### Wireless Channels

Channels are individual, smaller sections of the overall frequency band used by a wireless network.

### WEP

WEP - Wired Equivalent Privacy
An encryption technology that provides a very low level of privacy
WEP uses a 40-bit key

WEP was quickly replaced in most places with WPA

### WPA

Wifi Protected Access
WPA by default uses a 128-bit key

### WPA2

WPA2 is  most commonly used encryption algorithm for wireless networks today.
WPA2 is an update to the original WPA.
WPA2 uses a 256 bit key.

### WPA3

WPA3 is built upon the WPA2 protocol and is intended to replace WPA2.
WPA3 offers two versions, a personal and an enterprise version.

### MAC filtering

You configure your access points to only allow for connections from a specific set of MAC addresses belonging to devices you trust.

### Cellular networking

Also called mobile networking.

### Bluetooth

The most common short range wireless network is called Bluetooth.

When you connect a wireless peripheral to a mobile device, we call that pairing the devices.

One of the biggest differences is that these frequencies can travel over longer distances more easily, usually over many kilometers or miles.

### Error-detection

the ability for a protocol or program to determine that something went wrong.

* router doesn't know how to route to a destination
* certain port isn't reachable
* TTL of an IP datagram expired and no further router hops will be attempted

### Error-recovery

the ability for a protocol or program to attempt to fix it.

### ICMP

ICMP -  Internet Control Message Protocol

ICMP is mainly used by a router or remote host to communicate why transmission has failed back to the origin of the transmission.

#### Type field

What type of message is being delivered
Some examples are destination unreachable or time exceeded.

#### Code field

#### Checksum

#### Rest of header field

#### Data section field

The payload for an ICMP packet exists entirely so that the recipient of the message knows which of their transmissions caused the error being reported.

It contains the entire IP header and the first eight bytes of the data payload section of the offending packet.

### ping

Ping lets you send a special type of ICMP message called an echo request.

If the destination is up and running and able to communicate on the network, it'll send back an ICMP echo reply message type.

ping accepts as an argument a destination IP, or a fully qualified domain name.

Utilities

* ping example.com

### Traceroute

An utility that lets you discover the paths between two nodes, and gives you information about each hop along the way.

Routers can respond with *** because of security setting or overload (try to repeat the process later)

On Linux and macOS, traceroute sends UDP packets to very high port numbers.

Utilities

* traceroute example.com
* mtr -4 example.com

### Port connectivity

Utilities

* nc -z -v example.com 443
* netcat -z -v example.com 443

### DNS connectivity

Utilities

* nslookup example.com

### Public DNS servers

name servers specifically set up so that anyone can use them for free.

Using these public DNS servers is a handy technique for troubleshooting any name resolution problems you might be experiencing.

Most public DNS servers are available globally through anycast.

* 4.2.2.1
* 4.2.2.2
* 4.2.2.3
* 4.2.2.4
* 4.2.2.5
* 4.2.2.6
* 8.8.8.8 (Google's Public DNS)
* 8.8.4.4 (Google's Public DNS)

### Host files

A flat file that contains on each line a network address followed by the host name it can be referred to as.

Hosts files are evaluated by the networking stack of the operating system itself. That means the presence of an entry there would translate to anywhere you might refer to a networking address.

In Linux you can find them at /etc/hosts

Host files are examined before a DNS resolution attempt occurs on just about every major operating system.

The host files are a popular way for computer viruses to disrupt and redirect users' traffic.

### Loopback address

A loopback address is a way of sending network traffic to yourself. Traffic never leaves the node.

A Loopback Address, also known as localhost, refers to an internal address that directs back to the local system. In IPv4, the loopback address is 127.0. 0.1, while in IPv6, it is 0:0:0:0:0:0:0:1 or ::1.

### Cloud computing

A technological approach where computing resources are provisioned in a sharable way so that lots of users get what they need when they need it.

Hardware virtualization is a core concept of how Cloud computing technologies work.

### Virtualization

a single physical machine called a host could run many individual virtual instances called guests.

### Hypervisor

A piece of software that runs and manages virtual machines while also offering these guests a virtual operating platform that's indistinguishable from actual hardware.

### Public Cloud

A large cluster of machines run by another company.

### Private Cloud

used by a single large corporation and generally physically hosted on its own premises.

### Hybrid Cloud

a term used to describe situations where companies might run things like their most sensitive proprietary technologies on a private Cloud while entrusting their less sensitive servers to a public Cloud.

### Network redundancy

Network redundancy is the process of providing multiple paths for traffic so that data can keep flowing even in the event of a failure.

Put simply: more redundancy equals more reliability.

The idea is that if one device fails, another can automatically take over.
