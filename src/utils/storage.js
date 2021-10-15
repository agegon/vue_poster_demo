export const getItemFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);

    return data && JSON.parse(data);
  } catch (err) {
    console.log('Error getting item from local storage', err);

    return null;
  }
};

export const setItemToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log('Error saving data to local storage', err);
  }
};
