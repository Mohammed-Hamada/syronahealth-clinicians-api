const differenceBetweenTwoArrays = async <T>(
  arr1: Array<T>,
  arr2: Array<T>,
): Promise<T[]> => {
  const difference: T[] = arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x)));

  return difference;
};

export default differenceBetweenTwoArrays;
