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
