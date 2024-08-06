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

## What are Linux namespaces?

Namespaces are a feature of the Linux kernel that partitions kernel resources in a way that one set of processes sees one set of resources, while another set of processes sees a different set of resources.

## What are Linux cgroups?

cgroups (abbreviated from control groups) is a Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, etc.) of a collection of processes.

## Describe file types in Linux (ls -lah)

* `-` - Regular file
* `b` - Block special file
* `c` - Character special file
* `d` - Directory
* `l` - Symbolic link
* `n` - Network file
* `p` - FIFO
* `s` - Socket

### What is a Container?

A container image is a ready-to-run software package containing everything needed to run an application.
Containers are intended to be stateless and immutable.

### What is a Container Image?

A container image represents binary data that encapsulates an application and all its software dependencies.
Container images are executable software bundles that can run standalone and that make very well defined assumptions about their runtime environment.

Images can also include a registry hostname (defaults to Docker Hub) and optionally a tag (defaults to `latest`), for example
`fictional.registry.example:10443/image-name:1.32.0`

Image name with custom registry and digest
`registry.k8s.io/pause@sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07`

### What is Image Digest?

Image digests are a unique identifier for a specific version of an image.
Image digests consists of a hash algorithm and a hash value, for example
`sha256:1ff6c18fbef2045af6b9c16bf034cc421a29027b800e4f9b68ae9b1cb3e9ae07`

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
