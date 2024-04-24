# TypeScript Cookbook

# 2 Basic Types

## 2.1 Annotating Effectively

```ts
type Person = {
  name: string;
  age: number;
};

type PersonWithProfession = {
  profession: string;
} & Person;

const createPerson = (person: Person): PersonWithProfession => {
  return { profession: "Web dev", ...person };
};

const result = createPerson({ name: "Shamim", age: 28 });
console.log(result);
```

- Annotate wherever you want to have your types checked, at least for function arguments.

## 2.2 Working with any and unknown

```ts
type Person = {
  name: string;
  age: number;
};

const printPerson = (person: Person) => {
  for (let key in person) {
    console.log(`${key}: ${person[key as keyof Person]}`);
  }
};

printPerson({ name: "Shamim", age: 28 });

function doSomething(value: unknown) {
  if (typeof value === "string") {
    console.log("It's a string", value.toUpperCase());
  } else if (typeof value === "number") {
    console.log("it's a number", value * 2);
  }
}

doSomething(true);
```

- If your apps work with a lot of different types, unknown is great for making sure that you can carry values throughout your code but don’t run into any safety problems because of any’s permissiveness.

## 2.4 Working with Tuple Types

- While arrays can be potentially endless in size and each element is of the same type (no matter how broad), tuple types have a fixed size, and each element has a distinct type.

```ts
const person: [string, number] = ["Shamim", 28];
const [myName, age] = person;
```

## 2.5 Understanding Interfaces Versus Type Aliases

_Use interfaces:_

- When defining contracts that multiple parts of your codebase or external libraries will interact with.
- When you want to leverage declaration merging to create complex object types from multiple interface declarations.
- When you need to enforce specific object structures (e.g., with optional or readonly properties).

_Use type aliases:_

- When defining internal types that are specific to your project's domain.
- When simplifying the representation of complex built-in or custom types for better readability.
- Use type aliases when you don’t expect others to consume them.

```ts
// Interface for a basic User contract (shared across the codebase)
interface User {
  id: string;
  name: string;
  email: string;
}

// Type alias for a more specific type used internally
type UserDetails = User & {
  age?: number; // Optional property
  isActive: boolean;
};

function getUserDetails(userId: string): UserDetails {
  // Logic to fetch user details
  // ...
  const user: UserDetails = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    isActive: true,
  };
  return user;
}

function displayUserDetails(user: UserDetails) {
  console.log(`Name: ${user.name} (ID: ${user.id})`);
  if (user.age !== undefined) {
    console.log(`Age: ${user.age}`);
  }
  console.log(`Email: ${user.email}`);
  console.log(`Active: ${user.isActive}`);
}

const userDetails = getUserDetails("123");
displayUserDetails(userDetails);
```
