# Docker

## Questions

<details>
<summary>What is the difference between ENTRYPOINT and CMD?</summary>

ENTRYPOINT is the process that’s executed inside the container.
CMD is the default set of arguments that are supplied to the ENTRYPOINT process.

Default ENTRYPOINT is `/bin/sh -c`
<details>
