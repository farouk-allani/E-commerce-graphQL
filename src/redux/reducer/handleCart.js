const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      // check if product already exist
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        // Increase the Quantity
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        const product = action.payload;
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }

    case "INCREMENT":
      return state.map((x) =>
        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
      );

    case "DECREMENT":
      const exist1 = state.find((x) => x.id === product.id);
      if (exist1.qty === 1) {
        return state.filter((x) => x.id !== exist1.id);
      } else {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }

    case "RESET_CART":
      return (state = []);
    default:
      return state;
  }
};

export default handleCart;
