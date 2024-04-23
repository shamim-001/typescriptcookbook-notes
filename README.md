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
