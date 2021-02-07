import { createSlice } from "@reduxjs/toolkit";
import store from "./store";
import axios from "axios";

const initialState = {
	isLoading: false,
	data: [],
	hasErrors: false,
};

const hotSlice = createSlice({
	name: "hot",
	initialState,
	reducers: {
		getHotData: (state) => {
			state.isLoading = true;
		},
		getHotDataSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.data = [...state.data, ...payload];
			state.hasErrors = false;
		},
		getHotDataFailure: (state) => {
			state.isLoading = false;
			state.hasErrors = true;
		},
		updateHotVotes: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export const { getHotData, getHotDataSuccess, getHotDataFailure, updateHotVotes } = hotSlice.actions;

export const hotSelector = (state) => state.hot;

export default hotSlice.reducer;

export const fetchHotData = () => async (dispatch) => {
	dispatch(getHotData());
	try {
		const { hot } = store.getState();
		const kind = hot.data.length > 0 && hot.data[hot.data.length - 1].kind;
		const id = hot.data.length > 0 && hot.data[hot.data.length - 1].data.id;
		const lastId = kind && id ? `${kind}_${id}` : "";
		const response = await axios.get(
			`https://www.reddit.com/r/dota2/hot.json?limit=20&t=day&count=${hot.data.length}&after=${lastId}`
		);
		dispatch(getHotDataSuccess(response.data.data.children));
	} catch (e) {
		console.log(e);
		dispatch(getHotDataFailure());
	}
};

export const changeHotVotes = (id, type) => (dispatch) => {
	const { hot } = store.getState();
	const result = [...hot.data].map((item) => {
		if (item.data.id === id) {
			const newUps = type === "increase" ? item.data.ups + 1 : item.data.ups - 1;
			return { ...item, data: { ...item.data, ups: newUps } };
		}
		return item;
	});
	dispatch(updateHotVotes(result));
};
