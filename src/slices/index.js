import { combineReducers } from "redux";

import hotReducer from "./hotSlice";
import newReducer from "./newSlice";
import topReducer from "./topSlice";

const rootReducer = combineReducers({
	hot: hotReducer,
	new: newReducer,
	top: topReducer,
});

export default rootReducer;
