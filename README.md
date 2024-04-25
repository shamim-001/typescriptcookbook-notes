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

## 2.6 Defining Function Overloads

- Allows defining a function with multiple signatures that specify different ways to call it with different arguments.
- TypeScript doesn't consider the implementation signature for type checking during function calls. This means the compiler relies solely on the declared signatures before the implementation.
- To improve clarity and ensure consistency between intended usage and actual behavior, consider duplicating the implementation signature as the last declared signature.

```ts
type FormatValueType = {
  (value: string): string; // overload 1
  (value: number): string; // overload 2
};

// Actual Implementation
const formatValue: FormatValueType = (value: string | number) => {
  if (typeof value === "string") {
    return value.toUpperCase(); // Handle string case
  } else {
    return value.toFixed(2); // Handle number case (assuming formatting to two decimals)
  }
};

const formattedString = formatValue("hello"); // Calls overload 1
const formattedNumber = formatValue(3.14159); // Calls overload 2

console.log(typeof formattedNumber);
console.log(typeof formattedString);
```

## 2.7 Defining this Parameter Types

- `this` lives within the scope of a function, and that points to an object or value bound to that function.

```ts
class Safe {
  contents: string;

  constructor(contents: string) {
    this.contents = contents;
  }

  printContents() {
    console.log(this.contents);
  }
}

const safe = new Safe("Crown Jewels");
const safe2 = new Safe("Crown Jewels 2");
safe.printContents();
safe2.printContents();
```

## 2.8 Working with Symbols

- **Uniqueness:** Symbols are guaranteed to be one-of-a-kind, even if you create multiple with the same description. This is ideal for properties that absolutely cannot have duplicates.
- **Non-Iterability:** When you loop through an object's properties (using `for...in` or `Object.keys()`), symbol properties are excluded. This makes them useful for storing private data you don't want to be accidentally exposed.

```ts
const TOKEN = Symbol();
const user = {
  name: "Alice",
  id: 123,
  [TOKEN]: "abc123XYZ",
};

for (const key in user) {
  console.log(key); // name // id
}

const keys = Object.keys(user);
console.log(keys); //["name", "id"]
```

- **Global Symbols:** The `Symbol.for()` function creates symbols that are registered globally. This means different parts of your code can access the same symbol using `Symbol.for('key')`.

```ts
const LOG_LEVEL_DEBUG = Symbol.for("debug");
const debugSymbol = Symbol.for("debug");

if (LOG_LEVEL_DEBUG === debugSymbol) {
  console.log("debug Mode enabled");
}
```
