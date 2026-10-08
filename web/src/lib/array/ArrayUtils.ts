import { getRandomInt } from "../random";

export const ArrayUtils = {
  getRandom<T>(items: T[]): T {
    return items[getRandomInt(0, items.length - 1)] as unknown as T;
  },

  removeItem<T>(arr: T[], item: T): T[] {
    const index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  },
};
