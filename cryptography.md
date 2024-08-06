# Cryptography

## What is X.509?

X.509 is a standard defining the format of public key certificates.
X.509 certificates are used in many Internet protocols, including TLS/SSL, which is the basis for HTTPS, offline applications, like electronic signatures.

An X.509 certificate binds an identity to a public key using a digital signature.

A certificate contains an identity (a hostname, or an organization, or an individual) and a public key (RSA, DSA, ECDSA, ed25519, etc.), and is either signed by a certificate authority or is self-signed.
