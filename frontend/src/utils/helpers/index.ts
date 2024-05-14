export function countAndSort(array: number[], maxIndex: number) {
  let occurrences = {} as any;
  array.forEach(function(index) {
      occurrences[index] = (occurrences[index] || 0) + 1;
  });

  for (let i = 0; i <= maxIndex; i++) {
      if (!(i in occurrences)) {
          occurrences[i] = 0;
      }
  }

  let result = Object.keys(occurrences).sort().map(function(index) {
      return occurrences[index];
  });
  return result as number[];
}

export const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

export const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;