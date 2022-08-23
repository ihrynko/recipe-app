import { createSlice } from "@reduxjs/toolkit";
import { modalOpenToggle, MODAL_NAME} from "../actions/modal";


export type SliceState = {
  open: boolean;
  name: MODAL_NAME | null;
};

const MODAL_SLICE_NAME = "MODAL_SLICE";

const initialState: SliceState = { open: false, name: null };

const modalSlice = createSlice({
  name: MODAL_SLICE_NAME,
  initialState,
  reducers: { modalOpenToggle },
});

export const { modalOpenToggle: modalOpenToggleAction } = modalSlice.actions;

export const modal = modalSlice.reducer;