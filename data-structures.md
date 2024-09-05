# Data Structures

## Linear data structures

Linear data structures are data structures in which elements are arranged in a linear or sequential order.

The key characteristic of linear data structures is that each element has a unique predecessor and a unique successor, except for the first and last elements

* Arrays
* Stacks
* Queues
* Linked Lists

Static linear data structures are data structures where the size is fixed at the time of creation, and the memory allocation is static.

Dynamic linear data structures are data structures in which the size can be changed dynamically during runtime.

### Array

Arrays in TypeScript, are ordered lists that can hold elements of any type.

### Tuple

A tuple is a specific type of array where the order of elements has a fixed relationship

### Stack

A stack is a data structure that follows the Last In, First Out (LIFO) principle.

```ts
class Stack<T> {
  items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | any {
    return this.items.pop();
  }
}

// Example:
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3); // returns 3

console.log(stack.pop()); // returns 3
```

### Queues

A queue is a data structure that follows the First In, First Out (FIFO) principle.

In TS it's can be implemented with Array.push() and Array.shift() methods.

### Linked Lists

A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.

Advantages:

* Dynamic Size
    dynamic memory allocation, making it easy to grow or shrink the list as needed

* Efficient Insertion and Deletion
    it involves adjusting pointers, rather than shifting elements

* Constant-Time Insertions/Deletions at the Beginning
    Adding or removing elements at the beginning of a linked list can be done in constant time, unlike arrays where it requires shifting all elements.
    You need to update the HEAD and to change the pointer

* No Pre-allocation of Memory

* Implementation of Other Data Structures (stacks, queues)

## Non-Linear Data Structures

Non-linear data structures are data structures in which elements are not arranged sequentially or linearly.

* Trees
* Graphs
* Hash Tables
* Heaps

### Tree

Trees are hierarchical structures composed of nodes, where each node has a parent-child relationship with other nodes. The topmost node is called the root, and nodes with no children are called leaves.

Example: hierarchical file systems

#### Binary Trees

Each node has at most two children, a left child and a right child.

#### Binary Search Trees

A type of binary tree where the left child of a node contains values smaller than the node, and the right child contains values greater than the node.

### Graphs

A graph is a data structure that consists of a finite set of vertices (or nodes) and a collection of edges connecting these vertices. Graphs are used to model relationships and connections between different entities. The entities are represented by vertices, and the relationships between them are represented by edges.

### Hash Tables

A hash table is a data structure that allows you to store and retrieve values quickly based on a key. It uses a hash function to map keys to indices in an array, where values are stored. This mapping makes it efficient to perform operations like insertion, deletion, and retrieval in constant time on average.

### Heap

A heap is a specialized tree-based data structure that satisfies the heap property. The heap property can be defined differently for two main types of heaps:

#### Min Heap

In a min heap, for every node N, the value of N is less than or equal to the values of its children.
The minimum value is at the root

#### Max Heap

In a max heap, for every node N, the value of N is greater than or equal to the values of its children.
The maximum value is at the root.
