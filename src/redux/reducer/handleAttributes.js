const initialState = {};

const attributes = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ATTRIBUTE":
      const { productName, attrValue, attrName } = action.payload;
      return { ...state, [productName + " " + attrName]: attrValue };

    default:
      return state;
  }
};

export default attributes;
