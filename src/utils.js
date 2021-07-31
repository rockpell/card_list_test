export const getProductData = async () => {
  try {
    const data = await fetch("product_data.json");
    const jsonData = await data.json();
    return jsonData;
  } catch (e) {
    console.log("error: json file load fail");
  }
};
