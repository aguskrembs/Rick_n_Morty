import { combineReducers } from "redux";
import charactersReducer from "./characters";
import historyReducer from "./history";

const rootReducer = combineReducers({
    characters: charactersReducer,
    history: historyReducer,
});

export default rootReducer;
