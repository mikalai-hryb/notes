# Networking Fundamentals

## second section

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
    TCP segment

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

### Switch

A switch is very similar to a hub. Switch is layer 2 device.
This means that a switch can actually inspect the contents of the ethernet protocol data being sent around the network, determine which system the data is intended for and then only send that data to that one system. This reduces or even completely eliminates the size of collision domains on a network.

### Lan

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
0 is not used
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

### NAT

NAT or network address translation
It allows for computers on non-routable address space to communicate with other devices on the Internet.

A mitigation tool that lets organizations use one public IP address and many private IP addresses within the network

### Dynamic IP address

Dynamic IP address: An IP address assigned automatically to a new device through a technology known as Dynamic Host Configuration Protocol

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
3) Network layer (Internet layer)
4) Transport layer
5) Session layer
    Responsible for things like facilitating the communication between actual applications and the transport layer
    Takes the application layer data that's been unencapsulated from all the layers below it and hands it off to the next layer in the OSI model, the presentation layer.
6) Presentation layer
    responsible for making sure that the unencapsulated application layer data is actually able to be understood by the application in question
    This is the part of an operating system that might handle encryption or compression of data
7) (5) Application layer

### networking stack

A networking stack refers to the collection of protocols, software, and hardware that manage and facilitate communication between devices over a network. It is organized into layers, each handling different aspects of the communication process, from physical transmission of data to higher-level application services.
