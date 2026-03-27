const map = new Map();

export const getItem = (key: string) => {
  if (map.has(key)) {
    return map.get(key);
  }
  const value = localStorage.getItem(key);
  if (value) {
    map.set(key, value);
  }
  return value;
};

export const setItem = (key: string, value: string) => {
  map.set(key, value);
  localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  map.delete(key);
  localStorage.removeItem(key);
};
