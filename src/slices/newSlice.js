import { createSlice } from "@reduxjs/toolkit";
import store from "./store";
import axios from "axios";

const initialState = {
	isLoading: false,
	data: [],
	hasErrors: false,
};

const newSlice = createSlice({
	name: "new",
	initialState,
	reducers: {
		getNewData: (state) => {
			state.isLoading = true;
		},
		getNewDataSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.data = [...state.data, ...payload];
			state.hasErrors = false;
		},
		getNewDataFailure: (state) => {
			state.isLoading = false;
			state.hasErrors = true;
		},
		updateNewVotes: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export const { getNewData, getNewDataSuccess, getNewDataFailure, updateNewVotes } = newSlice.actions;

export const newSelector = (state) => state.new;

export default newSlice.reducer;

export const fetchNewData = () => async (dispatch) => {
	dispatch(getNewData());
	try {
		const { new: newData } = store.getState();
		const kind = newData.data.length > 0 && newData.data[newData.data.length - 1].kind;
		const id = newData.data.length > 0 && newData.data[newData.data.length - 1].data.id;
		const lastId = kind && id ? `${kind}_${id}` : "";
		const response = await axios.get(
			`https://www.reddit.com/r/dota2/new.json?limit=20&t=day&count=${newData.length}&after=${lastId}`
		);
		dispatch(getNewDataSuccess(response.data.data.children));
	} catch (e) {
		console.log(e);
		dispatch(getNewDataFailure());
	}
};

export const changeNewVotes = (id, type) => (dispatch) => {
	const { new: newData } = store.getState();
	const result = [...newData.data].map((item) => {
		if (item.data.id === id) {
			const newUps = type === "increase" ? item.data.ups + 1 : item.data.ups - 1;
			return { ...item, data: { ...item.data, ups: newUps } };
		}
		return item;
	});
	dispatch(updateNewVotes(result));
};
