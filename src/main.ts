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
