const initialState = {
  selectedCurrency: "$",
};

const handleCurrency = (state = initialState, { type, payload }) => {
  switch (type) {
    case "CHANGE_CURRENCY":
      return { ...state, selectedCurrency: payload };

    default:
      return state;
  }
};

export default handleCurrency;
