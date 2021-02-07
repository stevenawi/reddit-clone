import moment from "moment";

export const convertTime = (timestamp) => {
	const seconds = 60 * 1000;
	const minute = 60 * seconds;
	const hour = 24 * minute;
	const day = 30 * hour;
	const month = 12 * day;

	const time = moment.utc().valueOf() - timestamp * 1000;

	if (time < seconds) {
		return `A few seconds ago`;
	} else if (time < minute) {
		return `${Math.floor(time / seconds)} minutes ago`;
	} else if (time < hour) {
		return `${Math.floor(time / minute)} hours ago`;
	} else if (time < day) {
		return `${Math.floor(time / hour)} days ago`;
	} else if (time < month) {
		return `${Math.floor(time / day)} months ago`;
	} else {
		return `${Math.floor(time / month)} years ago`;
	}
};
