import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import nameReducer from "./nameReducer";
import emailReducer from "./emailReducer";
import tokenReducer from "./tokenReducer";

const rootReducer = combineReducers({
  status: statusReducer,
  name: nameReducer,
  email: emailReducer,
  authToken: tokenReducer,
});

export default rootReducer;
