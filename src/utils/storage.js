export const setItemToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log('Error saving data to local storage', err);
  }
};

export const getItemFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);

    return data && JSON.parse(data);
  } catch (err) {
    console.log('Error getting item from local storage', err);

    return null;
  }
};

export const removeItemFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log('Error removing data to local storage', err);
  }
};
