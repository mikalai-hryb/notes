# WAN

In this reading, you will continue learning about the various components of Wide Area Networks (WANs). WAN configurations are important for IT Support professionals to understand when working with the geographically dispersed networks of large organizations. WANs can be connected through the Internet with connections provided by Internet Service Providers (ISPs) in each locale. Regional WANs can also be formed by connecting multiple Local Area Network (LAN) sites using equipment and cables leased from a regional ISP. Security for WANs across the public Internet can be configured through Virtual Private Networks (VPNs).

## Physical versus software-based WANs

* `WAN router`: Hardware devices that act as intermediate systems to route data amongst the LAN member groups of a WAN (also called WAN endpoints) using a private connection. WAN routers may also be called border routers or edge routers. These routers facilitate an organization’s access to a carrier network. WAN routers have a digital modem interface for the WAN, which works at the OSI link layer, and an Ethernet interface for the LAN.

* `Software-Defined WAN (SD-WAN)`: Software developed to address the unique needs of cloud-based WAN environments. SD-WANs can be used alone or in conjunction with a traditional WAN. SD-WANs simplify how WANs are implemented, managed, and maintained. An organization’s overall cost to operate a cloud-based SD-WAN is significantly less than the overall cost of equipping and maintaining a traditional WAN. One of the ways that SD-WANs help reduce operational costs is by replacing the need for expensive lines leased from an ISP by linking regional LANs together to build a WAN.

## WAN optimization

There are multiple techniques available to optimize network traffic and data storage on a WAN:

* `Compression`: Reducing file sizes to improve network traffic efficiency. There are many compression algorithms available for text, image, video, etc. The sender and the receiver will need apps that offer the same compression/decompression algorithm to encode and decode the compressed files.

* `Deduplication`: Prevents files from being stored multiple times within a network to avoid wasting expensive hard drive space. One copy of the file is kept in a central location. All other “copies” are actually file pointers to the single copy of the file. This saves valuable hard drive space, makes performing data backups more efficient, and reduces the amount of time needed to recover from data loss disasters.

* `Protocol Optimization`: Improves the efficiency of networking protocols for applications that need higher bandwidth and low latency.

* `Local Caching`: Storing local copies of network and internet files on a user’s computer to reduce the need to resend the same information across the network every time the file is accessed. Some WAN optimization products can cache shared files at one physical LAN location when groups of employees at the location tend to request the same set of files frequently.

* `Traffic Shaping`: Optimizing network performance by controlling the flow of network traffic. Three techniques are commonly used in traffic shaping:

  * bandwidth throttling - controlling network traffic volume during peak use times

  * rate limiting - capping maximum data rates/speeds

  * use of complex algorithms - classifying and prioritizing data to give preference to more important traffic (e.g., an organization might want to prioritize private LAN-to-LAN traffic within the organization’s WAN and give a lower priority to employees accessing the public Internet).

## WAN Protocols

WAN Internet Protocols are used in conjunction with WAN routers to perform the task of  distinguishing between a private LAN and the related public WAN. Several WAN protocols have been developed over the decades for this task, as well as other purposes, including:

* Packet switching: A method of data transmission. In packet switching, messages are broken into multiple packets. Each packet contains a header that includes information on how to reassemble the packets, as well as the intended destination of the packets. As a measure to prevent data corruption, the packets are triplicated. The triplicated packets are sent separately over optimal routes through the internet. Then, once the packets reach their destination, they are reassembled. The triplicate copies are compared with one another to detect and correct any data corruption that occurred during transmission (at least two of the three copies should match). If the data cannot be reassembled and/or data corruption is evident in all three copies, the destination will make a request to the origin to resend the packet.

* Frame relay: Also a method of data transmission. Frame relay is an older technology originally designed for use on Integrated Services Digital Network (ISDN) lines. However, the technology is now used in other network interfaces. Frame relays are used to transmit data between endpoints of a WAN through a packet switching method that works at the OSI data link and physical layers. A fast data communications network, called a Frame Relay Network, is used to transport data packets in frames. The reliability of Frame Relay Networks minimizes the need for error checking. The frames include routing address information for the destination.

  * Permanent Virtual Circuits (PVCs) - Used for long-term data connections. Stays open even when data is not being transmitted.

  * Switched Virtual Circuits (SVCs) - Used in temporary session connections for sporadic communications.

* Asynchronous Transfer Mode (ATM): ATM is an older technology that encodes data using asynchronous time-division multiplexing. The encoded data is packaged into small, fixed-sized cells. ATM can send the cells over a long distance, which makes it useful for WAN communications. ATMs uses routers as end-points between ATM networks and other networks. ATM technology has been replaced for the most part by Internet Protocol (IP) technologies.

* High Level Data Control (HLDC): An encapsulation or data link protocol that delivers data frames through a network. The frames include multiple fields that can hold information about start and end flags, controls, Frame Check Sequence (FCS), and protocol used. HLDC was developed to use multiple protocols to replace Synchronous Data Link Control (SLDC), which used only one protocol. HLDC includes error correction, flow control, and data transmission through polling. HLDC has three modes to define the relationship between two devices, or nodes, during communications:

  * Normal Response Mode (NRM) - Primary node must give permission to the secondary node to transmit.

  * Asynchronous Response Mode (ARM) - Primary node allows the secondary node to initiate communication.

  * Asynchronous Balanced Mode (ABM) - Both nodes can act as either the primary or secondary nodes. They can each initiate communications without permission.

* Packet over Synchronous Optical Network (SONET) or Synchronous Digital Hierarchy (SDH): A communication protocol used for WAN transport. The SONET or SDH communication protocols define how point-to-point links communicate over fiber optics cables.

* Multiprotocol Label Switching (MPLS): A technique for optimizing network routing. MPLS replaces inefficient table lookups for long network addresses with short path labels. These labels direct data from node to node.
