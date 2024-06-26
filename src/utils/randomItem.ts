export const generateRandomNumber = (() => {
  let seed = Date.now();

  return () => {
    const a = 1664525; // Multiplier
    const c = 1013904223; // Increment
    const m = 4294967296; // Modulus (2^32)

    seed = (a * seed + c) % m;
    return seed / m;
  };
})();

export default (array: any, indexes: number[]) => {
  const filteredArray = array.filter((a) => !indexes.includes(a.name));

  const sortedArray = filteredArray.sort(function () {
    return 0.5 - generateRandomNumber();
  });

  return sortedArray[0];
};
