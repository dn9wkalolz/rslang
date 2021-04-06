export const getArrayRandomNumbers = (startLength: number, requiredNumber: number) => {
  let arr = [];

  for (let i = 0; i < startLength; i += 1) {
    arr.push(i);
  }

  arr = arr.filter((i) => i !== requiredNumber);

  const shuffle = (array: Array<number>) => {
    array.sort(() => Math.random() - 0.5);
  };

  shuffle(arr);

  arr = arr.slice(0, 4);

  arr.push(requiredNumber);

  shuffle(arr);

  return arr;
};
