export function increment(name) {
  return {
    type: 'INCREMENT',
    payload: {
      name,
    }
  };
}
