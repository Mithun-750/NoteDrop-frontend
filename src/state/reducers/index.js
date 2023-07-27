import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import nameReducer from "./nameReducer";
import emailReducer from "./emailReducer";

const rootReducer = combineReducers({
  status: statusReducer,
  name: nameReducer,
  email: emailReducer,
});

export default rootReducer;
