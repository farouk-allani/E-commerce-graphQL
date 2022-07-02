const cart = [];

const handleCart = (state = cart, action) => {
  const product= action.payload;
  // const {product,selectedAttr} = action.payload;
  // product=Object.assign(selectedAttr,product);
  switch (action.type) {
    case "ADDITEM":
      // check if product already exist
      const exist = state.find((x) =>x.selectedAttr !== undefined?   JSON.stringify(x.selectedAttr)  === JSON.stringify(product.selectedAttr):undefined );
      if (exist) {
        // Increase the Quantity
        return state.map((x) =>
        JSON.stringify(x.selectedAttr)  ===JSON.stringify(product.selectedAttr)  ? { ...x, qty: x.qty + 1 } : x
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
      JSON.stringify(x.selectedAttr)  ===JSON.stringify(product.selectedAttr)? { ...x, qty: x.qty + 1 } : x
      );

    case "DECREMENT":
      const exist1 = state.find((x) => JSON.stringify( x.selectedAttr)===JSON.stringify(product.selectedAttr) );
      if (exist1.qty === 1) {
        return state.filter((x) =>JSON.stringify(x.selectedAttr)  !==JSON.stringify( exist1.selectedAttr));
      } else {
        return state.map((x) =>
        JSON.stringify(x.selectedAttr) ===JSON.stringify(product.selectedAttr)  ? { ...x, qty: x.qty - 1 } : x
        );
      }

    case "RESET_CART":
      return (state = []);
    default:
      return state;
  }
};

export default handleCart;
