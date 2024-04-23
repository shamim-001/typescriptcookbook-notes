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
