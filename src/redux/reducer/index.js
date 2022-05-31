import handleCart from "./handleCart";
import handleCurrency from "./handleCurrency";
import handleAttributes from "./handleAttributes";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  handleCart,
  handleCurrency,
  handleAttributes,
});

export default rootReducers;
