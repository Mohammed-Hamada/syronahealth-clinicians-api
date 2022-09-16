const differenceBetweenTwoArrays = async (arr1: [], arr2: []): Promise<[]> => {
  const difference = arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x))) as [];

  return difference;
};

export default differenceBetweenTwoArrays;
