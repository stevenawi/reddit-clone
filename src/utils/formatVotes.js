export const formatVotes = (data) => {
	if (!data) return "Vote";
	return data >= 1000 ? `${(data / 1000).toFixed(1)}k` : data;
};
