# Computer

## Links

* [https://phoenixnap.com/kb/]

## What is a CPU?

A CPU (Central Processing Unit) is a piece of hardware responsible for executing tasks from other parts of a computer.
Single core CPUs were able to handle only one set of instructions at a time.

## What is a CPU Core?

A Core is a physical part of a CPU. Cores act like processors within a single CPU chip. The more cores a CPU has, the more tasks it can perform simultaneously.

## What are CPU Threads?

Threads are like paths your computer can take to process information.

If a CPU has six cores with two threads per core, that means there are twelve paths for information to be processed.

The main difference between threads and physical cores is that two threads cannot operate in parallel. While two physical cores can simultaneously perform two tasks, one core alternates between the threads. This happens fast so that it appears that true multitasking takes place.

## What are Logical Cores?

Logical cores are the number of Physical cores times the number of threads that can run on each cores.

For example, I have `Intel(R) Core(TM) i7-8565U CPU @ 1.80GHz`, it has 4 physical cores and 2 threads per core, it means in this CPU I have 8 logical cores.
