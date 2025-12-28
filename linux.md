# Linux

## Short overview

In 1969 the UNIX (UNiplexed Information Computing System) OC was developed.
It was a proprietary software.

In 1983 the GNU (GNU is Not Unix) project was started.
GNU is an operating system that is free software.

In 1991 Linus Torvalds created the Linux OC which was based on Minix (Unix-compatible operating system for personal computers).
The Linux uses GNU General Public License (GPL).

Linux today is a family of Unix-like operating systems based on the Linux kernel, including one or another set of utilities and programs of the GNU project.

### What is the Linux distribution?

It's an OC based on Linux kernel which includes a collection of libraries and packages developed within the GNU project, as well as a package management system (package manager).

### What is the library in Linux?

A library in Linux is a collection of precompiled code that provides specific functionality to applications.
Libraries can be packaged as part of larger software packages.

### What is the package in Linux

While a package is a collection of files and metadata used for distributing and managing software on Linux systems.
Packages can also contain executables, configuration files, and other resources beyond just libraries.

### What package type distributions do you know?

* DEB-based (use .deb format of packages)
Debian, Ubuntu, Astra Linux

* RPM-based (use .rpm format of packages)
RedHat Enterprise Linux, CentOS, Fedora

### What package managers do you know?

Debian-based
apt, DPKG (it's a backend of apt, it's working with local packages only)

RPM-based
yum, RPM (it's a backend of yum, it's working with local packages only)

### What is the difference between the CLI, Shell and Terminal in Linux?

The CLI is a method of interacting with a computer's operating system or software using text commands entered through a command line interface.

The shell is the program responsible for interpreting text commands and passing them to OC.

The Terminal in Linux refers specifically to a software application that provides a graphical interface for accessing the CLI.

### What is SSH?

SSH - Secure SHell, it is a network protocol that gives users a secure way to access a computer over an unsecured network. It uses server-client architecture.

### What SSH agents you know?

PuTTY for Windows
command ssh for Linux and MacOS

### What file types do you know? `ls -l`

byte (B)
1 kilobyte (KB) = 1000 B    = 10^3  B
1 megabyte (MB) = 1000 KB   = 10^6  B
1 gigabyte (GB) = 1000 MB   = 10^9  B
1 terabyte (TB) = 1000 GB   = 10^12 B
1 petabyte (PB) = 1000 TB   = 10^15 B

1 kibibyte (KiB) = 1024 B   = 2^10  B
1 mebibyte (MiB) = 1024 KiB = 2^20  B
1 gibibyte (GiB) = 1024 MiB = 2^30  B
1 tebibyte (TiB) = 1024 GiB = 2^40  B
1 pebibyte (PiB) = 1024 TiB = 2^50  B

## Describe file types in Linux (ls -lah)

* `-` - Regular file
* `b` - Block special file
* `c` - Character special file
* `d` - Directory
* `l` - Symbolic link
* `n` - Network file
* `p` - FIFO
* `s` - Socket

### What is File Descriptor?

It is a process-unique identifier (handle) for a file or other input/output resource, such as a pipe or network socket.

In Linux, a file descriptor is an integer that identifies an open file in a process. In summary, it's a form of identification that Linux uses internally to manage open files per process.

```bash
ls -l /proc/$$/fd  # list all open file descriptors
ls -l /proc/<PID>/fd  # list open file descriptors for a process ID
lsof -p <PID>  # provide more info than ls
cat /proc/<PID>/limits  # show process limits
```

* maximum number of open descriptors a process can have - often 1024 or 65535
* unreleased descriptors can leak resources over time
* descriptors often reveal what files/resources were open during a crash or error, they provide insight into what happened behind the scenes

### What standard data streams do you know?

* `stdin`  - standard input stream, associated identifier is `0`
* `stdout` - standard out stream, associated identifier is `1`
* `stderr` - standard error stream, associated identifier is `2`

A stream is something that can transfer data. In terms of Linux data is text.
Streams have a source and an outflow.

Streams in Linux, like almost everything else, are treated as though they were files. You can read text from a file, and you can write text into a file.

[How to work with data streams (stdin, stdout, and stderr)?](./bash.md#how-to-work-with-data-streams-stdin-stdout-and-stderr)

### What is systemd?

[Please read this](./systemd.md)

### What is inode?

The inode (index node) is a data structure in a Unix-style file system that describes a file-system object such as a file or a directory.

Each inode stores the attributes and disk block locations of the object's data.

A file in the file system is basically a link to an inode.
When you delete a file, it removes one link to the underlying inode.

### What is the difference between a symbolic link and a hard link?

A hard link just creates another file with a link to the same underlying inode.
Updating hard-link file affects original file.
Deleting, renaming, or moving hard-link file does not affect the original file.

A symbolic link is a link to another name in the file system.

When original file is deleted the hard-link file will be present but soft-link file will disappear because it points to nothing.

### What is System Image?

In computing, a system image is a serialized copy of the entire state of a computer system stored in some non-volatile form (does not requires power to maintain the stored information), such as a binary executable file.

Hibernation is an example that uses an image of the entire machine's RAM (memory).

### What is Process Image?

A process image is a copy of a given process's state at a given point in time.

## What are Linux namespaces?

Namespaces are a feature of the Linux kernel that partitions kernel resources in a way that one set of processes sees one set of resources, while another set of processes sees a different set of resources.

They ensure that processes running in one namespace cannot see or interfere with processes or resources in another.

## What are Linux cgroups?

cgroups (abbreviated from control groups) is a Linux kernel feature that limits, accounts for, and isolates the resource usage (system resources - CPU, memory, disk I/O, etc.) of a collection of processes.

## What is Hypervisor?

A hypervisor is a virtualization software that helps in running multiple operating systems (Guest OS) on a single physical host system by providing an isolation between the virtual machines (VMs) and manages their resources.

## What is the difference between Containers vs. Virtual machines?

Containers and virtual machines are very similar resource virtualization technologies.

The key differentiator between containers and virtual machines is that virtual machines virtualize an entire machine down to the hardware layers and containers only virtualize software layers above the operating system level.

Containers are lightweight software packages that contain all the dependencies required to execute the contained software application. These dependencies include things like system libraries, external third-party code packages, and other operating system level applications. The dependencies included in a container exist in stack levels that are higher than the operating system.

Virtual machines are heavy software packages that provide complete emulation of low level hardware devices like CPU, Disk and Networking devices. Virtual machines may also include a complementary software stack to run on the emulated hardware. These hardware and software packages combined produce a fully functional snapshot of a computational system.

## What is /proc/uptime file?

So, the `/proc/uptime` file is actually the most accurate source of information for every command (uptime, w, top) that deals with uptime and idle time.

```bash
cat /proc/uptime

# 39488.90 276787.12
# The system uptime in seconds
# The system idle time in seconds

```

## What is uptime command?

```bash
uptime

# 22:14:33 up 10:39,  1 user,  load average: 2,04, 0,90, 1,31
# The current time of the computer in the format of hh:mm:ss
# The total time that the system has been up, displayed in days, hours, and/or minutes as appropriate
# The number of users who are active, and who are logged into the system
# The average system load during the last one(1), five(5), and fifteen(15)-minute durations
```

## What is Load Average?

The metric is expressed as the average number of processes in a runnable state over the last 1, 5, or 15 minutes.

Linux load average is a metric that shows the number of tasks currently executed by the CPU and tasks waiting in the queue.

Generally, a load average of less than the number of CPU cores is normal, as it means there are enough resources for all processes to run smoothly.

Example
1,97, 1,83, 1,63

## How to get the number of CPU Cores?

```bash
lscpu | grep "Core(s) per"
```

## What are process states?

* Runnable (R): A process in this state is either executing on the CPU, or it is present on the run queue, ready to be executed.
* Interruptible sleep (S): Processes in this state are waiting for an event to complete.
* Uninterruptible sleep (D): In this case, a process is waiting for an I/O operation to complete.
* Stopped (T): These processes have been stopped by a job control signal (such as by pressing Ctrl+Z) or because they are being traced.
* Zombie (Z): The kernel maintains various data structures in memory to keep track of processes. A process may create a number of child processes, and they may exit while the parent is still around. However, these data structures must be kept around until the parent obtains the status of the child processes. Such terminated processes whose data structures are still around are called zombies.

## What is zombie process?

Processes that have finished execution but remain in the process table.

## What is awk command?

AWK is a domain-specific language designed for text processing and typically used as a data extraction and reporting tool.

Its name comes from the initials of its designers: Aho, Weinberger, and Kernighan.

[how-to](https://www.cyberciti.biz/faq/bash-scripting-using-awk/)

## What is sed command?

sed ("stream editor") is a Unix utility that parses and transforms text, using a simple, compact programming language

[how-to](https://www.geeksforgeeks.org/sed-command-in-linux-unix-with-examples/)

## What are Linux permissions?

* r (read) - 4
* w (write) - 2
* x (execute) -1

* Owner
* Group
* Others

## What is POSIX

POSIX stands for Portable Operating System Interface, a set of standards specified by the IEEE (Institute of Electrical and Electronics Engineers).

It defines APIs, utilities, and system interfaces to maintain compatibility between operating systems, especially Unix-like systems.
The goal is to ensure application portability, meaning programs written for one POSIX-compliant system can be easily compiled and run on another.
