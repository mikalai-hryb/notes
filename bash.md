# Bash

## Questions

### What is Bash?

Bash stands for Bourne-Again SHell, is a unix-based shell program and command language supported by the Free Software Foundation and first developed for the GNU Project by Brian Fox in 1989.

### What is Shell?

Shell is a computer program that exposes an operating system's services to a human user or other programs.

### How to tell a computer what type of an interpreter to use for a script file?

The beginning of a script file should start with `#!/bin/bash` on its own line.

Or with `#!/usr/bin/env bash`.
The `env` will interpret the `$PATH`, and find `bash` in any directory in the `$PATH`. Portability is the only reason using `env` is preferred to hard coded paths.

### What is considered good practice for writing robust and maintained Bash scripts?

* place commonly used scripts in the `~/bin/` directory

### What permissions should a script file have to be run? And how to add them if the script does not have them?

The script file needs to have the "execute" permission to allow it to be run.

```bash
chmod +x script.sh  # add execute permission
```

### What is `~/.bashrc` file?

It's a Bash configuration file. The file itself contains a series of configurations for the terminal session. It's executed when a user logs in to terminal.

Your terminal runs a file every time it is opened to load its configuration.

To reload the `.bashrc` file

```bash
source ~/.bashrc  # or
. ~/.bashrc
```

### How to iterate through a range?

```bash
for i in {1..10}
do
  echo "Printing ${i}"
done
```

### What does a conditional block look like?

```bash
if [ $index -lt 5 ]
then
  echo $index
else
  echo 5
fi
```

### What is `test` command?

It can check file types and compare values.
To imply that you are using the `test` command and not the Bash built-in function you need to use single brackets.

```bash
man test
```

#### What are integer/number comparison operators?

1. `-eq` - equal (`==`)
2. `-ne` - not equal (`!=`)
3. `-le` - less than or equal (`<=`)
4. `-lt` - less than (`<`)
5. `-ge` - greater than or equal (`>=`)
6. `-gt` - greater than (`>`)
7. `-z`  - length of STRING is zero, the syntax is `if [ -z $s ]`
8. `-n`  - length of STRING is nonzero, the syntax is `if [ -n $s ]`

#### What are string comparison operators?

1. `==` - equal
2. `!=` - not equal

#### What are file operators?

1. `-e` - file exists
2. `-f` - file exists and is a regular file
3. `-h` or `-L` - file exists and is a symbolic link
4. `-r` - file exists and read permission is granted
5. `-w` - file exists and write permission is granted
6. `-x` - file exists and execute permission is granted

### How to work with data streams (stdin, stdout, and stderr)?

[What standard data streams do you know?](./linux.md#what-standard-data-streams-do-you-know)

```bash
# https://www.howtogeek.com/435903/what-are-stdin-stdout-and-stderr-on-linux/
script.sh > file.txt  # redirect stdout
script.sh 1> file.txt  # redirect stdout (the same as >)
script.sh 2> file.txt  # redirect stderr
script.sh 1> file.txt 2> file2.txt  # redirect stdout and stderr to files independently
script.sh > file.txt 2>&1 # 2>&1 - redirect stream 2, stderr, to the same destination that stream 1, stdout, is being redirected to
script.sh > /dev/null 2>&1 # thrown away both stdout and stderr silently
```

### How to work with dig?

```bash
dig example.com
```

### How to work with grep?

```bash
man test | grep -i -- -t  # search for pattern that starts with a dash(-)
```

### How to work with ls?

```bash
ls  # list directory contents
ls -lah  # list all directory contents in long listing format with human-readable sizes
ls | cat  # the ls command behaves differently if its output (stdout) is being piped into another command; ls switches to a single column output
```

### How to work with nslookup?

```bash
nslookup example.com
```

### How to work with wc?

```bash
wc -l bash.md  # show the number of lines of a file
```

### How to get information about Linux distribution?

```bash
cat /etc/os-release
```

### How to understand if the last command was successful?

```bash
echo $?  # 0 indicates success, others indicates error
```
