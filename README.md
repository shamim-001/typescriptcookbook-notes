# Typescript Cookbook Notes

# Chapter 3. The Type System

## 3.1 Modeling Data with Union and Intersection Types

**Union Types (`|`):**

- Represent a value that can be one of several types.
- Useful for defining properties that can hold different kinds of data.

**Example:**

```typescript
type Product = {
  name: string;
  price: number;
};

type User = {
  username: string;
  email: string;
};

type Notification = Product | User; // A notification can be about a product or a user

function showNotification(notification: Notification) {
  if ("name" in notification) {
    // Check if it's a Product
    console.log(`New product available: ${notification.name}`);
  } else {
    // Otherwise, it must be a User
    console.log(`New user: ${notification.username}`);
  }
}
```

**Intersection Types (`&`):**

- Combine multiple types into a single type that has all the properties of each.
- Useful for defining objects that must adhere to specific characteristics.

**Example:**

```typescript
type HasName = {
  name: string;
};

type HasLocation = {
  city: string;
  country: string;
};

type Customer = HasName &
  HasLocation & {
    email: string;
  };

const customer1: Customer = {
  name: "John Doe",
  city: "New York",
  country: "USA",
  email: "john.doe@example.com",
};
```

**Literal Types (`'value'`):**

- Represent specific string or numeric values.
- Useful for defining constrained options for properties or function arguments.

**Example:**

```typescript
type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

function setSchedule(day: Weekday, time: string) {
  console.log(`Schedule set for ${day} at ${time}`);
}

setSchedule("Wednesday", "10:00 AM"); // Valid
// setSchedule('Saturday', '12:00 PM'); // Error: 'Saturday' not a valid Weekday
```

**Combining Types:**

- You can combine these types to create even more complex data models.

**Example:**

```typescript
type Status = "Active" | "Pending" | "Inactive";

type Task = {
  id: number;
  title: string;
  description: string;
  status: Status; // Status is now a literal type
  assignedTo?: User; // Optional User property
};
```

## 3.2 Explicitly Defining Models with Discriminated Union Types

```ts
type Circle = {
  radius: number;
  kind: "circle";
};
type Square = {
  x: number;
  kind: "square";
};
type Triangle = {
  x: number;
  y: number;
  kind: "triangle";
};
type Shape = Circle | Triangle | Square;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "triangle":
      return (shape.x * shape.y) / 2;
    case "square":
      return shape.x * shape.x;
    default:
      throw Error("not possible");
  }
}
```

## 3.3 Exhaustiveness Checking with the Assert never Technique

```ts
type Circle = {
  radius: number;
  kind: "circle";
};
type Square = {
  x: number;
  kind: "square";
};
type Triangle = {
  x: number;
  y: number;
  kind: "triangle";
};
type Rectangle = {
  x: number;
  y: number;
  kind: "rectangle";
};
type Shape = Circle | Triangle | Rectangle | Square;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "triangle":
      return (shape.x * shape.y) / 2;
    case "square":
      return shape.x * shape.x;
    case "rectangle":
      return shape.x * shape.x;
    default:
      assertNever(shape);
  }
}

function assertNever(value: never): never {
  console.error("Unknown value", value);
  throw Error("Not possible");
}
```

## 3.4 Pinning Types with Const Context

```ts
const circle = { radius: 2, kind: "circle" };
area(circle);
```

- _Argument of type '{ radius: number; kind: string; }' is not assignable to parameter of type 'Shape'. Type '{ radius: number; kind: string; }' is not assignable to type 'Circle'. Types of property 'kind' are incompatible. Type 'string' is not assignable to type '"circle"'.ts(2345)_

* _Solutions_

```ts
const circle = { radius: 2, kind: "circle" as const };
area(circle);
```
