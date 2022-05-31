// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const increment = (product) => {
  return {
    type: "INCREMENT",
    payload: product,
  };
};

export const decrement = (product) => {
  return {
    type: "DECREMENT",
    payload: product,
  };
};

export const changeCurrency = (selectedCurrency) => {
  return {
    type: "CHANGE_CURRENCY",
    payload: selectedCurrency,
  };
};

export const setAttribute = (productName, attrValue, attrName) => {
  return {
    type: "SET_ATTRIBUTE",
    payload: { productName, attrValue, attrName },
  };
};

export const resetCart = () => {
  return {
    type: "RESET_CART",
  };
};
