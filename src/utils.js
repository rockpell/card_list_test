export const getProductData = async () => {
  try {
    const data = await fetch("product_data.json");
    const jsonData = await data.json();
    return jsonData.filter((_, index) => index < 10);
  } catch (e) {
    console.log("error: json file load fail");
  }
};

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);

  return JSON.parse(data);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
