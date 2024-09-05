# Object-Oriented Programming (OOP)

## What are OOP principles?

* Encapsulation

    Encapsulation is the concept of bundling data (attributes) and the methods (functions) that operate on the data into a single unit (a class);

    It helps in hiding the internal details of how an object works, providing a clear interface for interacting with the object for the users of that object.

* Inheritance

    Inheritance allows a new class (subclass or derived class) to inherit the characteristics and behaviors of an existing class (superclass or base class);

    It promotes code reusability and establishes a relationship between classes, making it easier to manage and extend code.

* Polymorphism

    Polymorphism means the ability of a single function or method to work in different ways based on the context or the types of objects it is operating on;

    It enhances flexibility and enables code to be more generic, allowing the same function or method to be used with different types of objects.

* Abstraction

    Abstraction involves simplifying complex systems by modeling classes based on the essential properties and behaviors, while ignoring unnecessary details.

    It helps in managing complexity by focusing on what an object does without needing to understand the internal implementation details. Abstraction allows developers to work at a higher level of abstraction.

These four principles promote the following coding practices:

* Modularity

    Breaking down a program into smaller, self-contained parts, making it easier to understand, develop, and maintain;

* Reusability

    Creating classes and components that can be easily used in different parts of a program or in other programs, reducing the need to rewrite code and promoting efficiency in software development;

* Maintainability

    Designing code in a way that allows for easy updates, bug fixes, and enhancements, ensuring that the software remains manageable and adaptable over time without causing unintended side effects.

## What is DRY?

It stands for "Do not Repeat Yourself".

It's about reducing repetitive patterns and duplicating code and logic in favor of abstractions and avoiding redundancy.

Engineers lower technical debt and improve the maintainability of the code - both of which are important cost factors, especially in the long term.

## What is KISS?

It stands for "Keep It Simple, Stupid", "Keep It Short and Sweet", "Keep it Simple and Straightforward".

* Users don’t want to waste time. They expect a frictionless experience with straightforward, intuitive user flows, jargon-free naming, and quick results.
* A simpler software structure makes testing, including also automated testing, easier and more effective.
* Reduced codebase complexity makes maintenance and onboarding of new team members mid-project easier and faster.

## YAGNI?

It stands for "You Aren't Gonna Need It".

It's about avoiding spending time and money on over engineering things that you think you will need later on.

Extra things will require testing, documentation and maintenance time, time to upgrade.

* Better developer performance: The team focuses on delivering the current requirements effectively. They don’t spend time and effort on guesses.
* More flexible codebase: You don’t have to find ways to use suboptimal solutions that you had already developed before you had the full picture.

## What is SOLID?

[https://www.designgurus.io/answers/detail/solid-design-principles]

* S - Single Responsibility Principle

    A class should have only one reason to change, meaning it should have only one job or responsibility.
    If you have a class called OrderProcessor, it should only process orders, not handle database storage or error logging.

* O - Open/Closed Principle

    Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.
    To follow the Open/Closed Principle, we can use abstract classes and inheritance to add new payment types without changing existing code.

* L - Liskov Substitution Principle

    Objects of a superclass should be replaceable with objects of subclasses without affecting the correctness of the program.
    To follow the Liskov Substitution Principle, we should ensure that subclasses override methods to reflect their behavior correctly:

* I - Interface Segregation Principle

    Clients should not be forced to depend on interfaces they do not use.
    To follow the Interface Segregation Principle, we should create specific interfaces for each type of functionality.

* D - Dependency Inversion Principle

    High-level modules should not depend on low-level modules. Both should depend on abstractions. Also, abstractions should not depend on details; details should depend on abstractions.
