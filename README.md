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
