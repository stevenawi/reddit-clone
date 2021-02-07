import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import { changeHotVotes } from "../slices/hotSlice";
import { changeNewVotes } from "../slices/newSlice";
import { changeTopVotes } from "../slices/topSlice";
import { convertTime } from "../utils/convertTime";
import { formatVotes } from "../utils/formatVotes";
import "../styles/Compact.css";

function Compact({ data, category }) {
	const dispatch = useDispatch();

	const handleChangeVote = (type) => {
		if (category === "hot") dispatch(changeHotVotes(data.id, type));
		if (category === "new") dispatch(changeNewVotes(data.id, type));
		if (category === "top") dispatch(changeTopVotes(data.id, type));
	};

	return (
		<div className="compact cursor__pointer">
			<div className="compact__left">
				<Icon
					name="arrow up"
					color="grey"
					className="cursor__pointer"
					onClick={() => handleChangeVote("increase")}
				/>
				<span className="compact__votes">{formatVotes(data.ups)}</span>
				<Icon
					name="arrow down"
					color="grey"
					className="cursor__pointer"
					onClick={() => handleChangeVote("decrease")}
				/>
			</div>
			<div className="compact__right">
				<div className="compact__right__container">
					<div className="compact__right__data">
						<div className="compact__title">{data.title}</div>
						<div className="compact__author">{`Posted by u/${data.author} ${convertTime(
							data.created_utc
						)}`}</div>
					</div>
					<div className="cursor__pointer compact__right__comment">
						<div>
							<Icon name="comment" />
							<span>{data.num_comments}</span>
						</div>
						<Icon className="cursor__pointer" name="ellipsis horizontal" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Compact;
