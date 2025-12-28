# Python

## Links

[https://www.testgorilla.com/blog/python-automation-interview-questions/]

### What is Python?

Python is a multi-paradigm language and follows an object-oriented paradigm. It enables the creation of objects and their manipulation with specific methods. It supports OOPS's features such as inheritance and polymorphism. You can use its paradigm functions as a first-class object and can also execute the Lambda function in Python.

### Data types

Mutable data types are those that can be modified after their creation.

* text types: str (immutable)
* numeric types: int (immutable), float (immutable)
* sequence types: list (mutable), tuple (immutable), range (immutable)
* mapping type: dict (mutable)
* set types: set (mutable), frozenset (immutable)
* boolean type: bool (immutable)
* none type: NoneType (immutable)
* binary types: bytes, bytearray, memoryview

### How to manage multiple Python versions?

pyenv - tool for managing multiple Python versions.

### How to manage multiple Python virtual environments?

venv

The venv module supports creating lightweight "virtual environments", each with their own independent set of Python packages installed in their `site` directories.

### What package managers do you know?

pip - requirements.txt
pipenv - Pipfile and Pipfile.lock
poentry

### What is script?

Script is a set of instructions that will be interpreted.

### What are magic methods in Python?

The special (magic) methods such as `__init__`, `__add__` etc are given double underscores for two reasons : It signifies that the methods are special in some way, and it should be obvious if code calls them directly. It makes sure that there is no chance of innocent name collisions.

Example:

* `__init__`
* `__new__`
* `__add__`
* `__del__`

### List, Set, Tuple, and Dictionary comprehensions

```python
[i**2 for i in range(10)]  # list
{i**2 for i in range(10)}  # set
(i**2 for i in range(10))  # generator
{i:i**2 for i in range(10)} # dict
```

### What is `with` statement?

The `with` statement clarifies code that previously would use `try...finally` blocks to ensure that clean-up code is executed.

The `with` statement is context manager. Context managers allow you to allocate and release resources precisely when you want to.

### What are decorators?

Decorators in Python are a design pattern that allows you to add new functionality to an existing object without modifying its structure. They are commonly used to extend the behavior of functions or methods.

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# Output:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.
```

### What is PEP8?

Python Enhancement Proposal, also known as PEP, is an official design document that provides information to the Python community or proposes changes to features for Python or its processes.

PEP 8 is especially significant since it documents the style guidelines for Python Code. Contributing to the Python open-source community requires you to follow these rules strictly.
