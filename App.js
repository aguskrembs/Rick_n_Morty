import "react-native-gesture-handler";
import React from "react";
import { AppRegistry } from "react-native";

// Redux imports
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./src/slices";
import MainScreen from "./src/MainScreen";

AppRegistry.registerComponent("main", () => App);

const store = configureStore({ reducer: rootReducer });

export default function App() {
    // ---------------------------------- Screen Render ---------------------------------- //
    return (
        <Provider store={store}>
            <MainScreen />
        </Provider>
    );
}
