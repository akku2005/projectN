import { configureStore } from "@reduxjs/toolkit";
import MainSlices from "./slices/MainSlices";

const store = configureStore({
  reducer: {
    main: MainSlices,
  },
});

export default store;
