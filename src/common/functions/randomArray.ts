export const randomArrayFunc = (arr: any[]) => {
  return arr.sort(() => Math.round(Math.random() * 100) - 50);
};
