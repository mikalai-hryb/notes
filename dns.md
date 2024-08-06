# DNS

<details>
<summary><b>What is a configuration file for DNS queries in Linux?</b></summary>

In Linux, the `/etc/resolv.conf` file is a configuration file for DNS queries.
In Linux, the `resolver` refers to a library that consists of a collection of functions that does domain name translation.
The `/etc/resolv.conf` file is the file that configures the domain name resolver.

The `/etc/resolv.conf` example

```txt
nameserver 127.0.0.53
options edns0 trust-ad
search warszawa.vectranet.pl
```

The `nameserver` directive specifies the IP address of the domain name server that the resolver can query against.

The `resolv.conf` file supports a list of `search domains` in the form of a search directive. When we query a domain name, the resolver will `combine the domain name with the search domain` to form a fully qualified domain name (FQDN) for querying.

The decision of whether the first query as an absolute domain name is performed or not depends entirely on the number of dots present in the domain name. By default, a domain name with at least 1 dot will cause the resolver to query it verbatim without combining it with any search domains. The number of dots for an absolute domain name first query is configurable under the option `ndots` value.
Resolver queries having fewer than `ndots` dots (default is 1) in them will be attempted using each component of the search path in turn until a match is found.
</details>
