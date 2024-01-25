import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurants: []
}

const restaurantSlice = createSlice({
    name: "RestaurantSlice",
    initialState,
    reducers: {
        getRestaurant : (state, action) => {
            state.restaurants = action.payload;
        }
    }
});

export const {getRestaurant} = restaurantSlice.actions;
export default restaurantSlice.reducer;