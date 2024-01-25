import {configureStore} from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import userAuthSlice from "./userAuthSlice";

const store = configureStore ({
    reducer: {
        data: restaurantSlice,
        auth: userAuthSlice
    }
});

export default store;