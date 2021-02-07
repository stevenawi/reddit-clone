import { createSlice } from "@reduxjs/toolkit";
import store from "./store";
import axios from "axios";

const initialState = {
	isLoading: false,
	data: [],
	hasErrors: false,
};

const topSlice = createSlice({
	name: "top",
	initialState,
	reducers: {
		getTopData: (state) => {
			state.isLoading = true;
		},
		getTopDataSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.data = [...state.data, ...payload];
			state.hasErrors = false;
		},
		getTopDataFailure: (state) => {
			state.isLoading = false;
			state.hasErrors = true;
		},
		updateTopVotes: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export const { getTopData, getTopDataSuccess, getTopDataFailure, updateTopVotes } = topSlice.actions;

export const topSelector = (state) => state.top;

export default topSlice.reducer;

export const fetchTopData = () => async (dispatch) => {
	dispatch(getTopData());
	try {
		const { top } = store.getState();
		const kind = top.data.length > 0 && top.data[top.data.length - 1].kind;
		const id = top.data.length > 0 && top.data[top.data.length - 1].data.id;
		const lastId = kind && id ? `${kind}_${id}` : "";
		const response = await axios.get(
			`https://www.reddit.com/r/dota2/top.json?limit=20&t=day&count=${top.data.length}&after=${lastId}`
		);
		dispatch(getTopDataSuccess(response.data.data.children));
	} catch (e) {
		console.log(e);
		dispatch(getTopDataFailure());
	}
};

export const changeTopVotes = (id, type) => (dispatch) => {
	const { top } = store.getState();
	const result = [...top.data].map((item) => {
		if (item.data.id === id) {
			const newUps = type === "increase" ? item.data.ups + 1 : item.data.ups - 1;
			return { ...item, data: { ...item.data, ups: newUps } };
		}
		return item;
	});
	dispatch(updateTopVotes(result));
};
