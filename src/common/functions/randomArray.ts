export const randomArrayFunc = (arr: any[]) => {
  // random array
  return arr.sort(() => Math.round(Math.random() * 100) - 50);
};
