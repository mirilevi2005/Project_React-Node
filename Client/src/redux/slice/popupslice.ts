import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  wasShown: boolean;
}

const initialState: PopupState = {
  wasShown: false,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    markPopupAsShown: (state) => {
      state.wasShown = true;
    },
  },
});

export const { markPopupAsShown } = popupSlice.actions;
export default popupSlice.reducer;