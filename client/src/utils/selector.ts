export function createIndex<T extends { id: number }>(input: T[]) {
  return input.reduce((hash: { [key: number]: T }, item) => {
    hash[item.id] = item;
    return hash;
  }, {});
}
