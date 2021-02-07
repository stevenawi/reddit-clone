import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import { changeHotVotes } from "../slices/hotSlice";
import { changeNewVotes } from "../slices/newSlice";
import { changeTopVotes } from "../slices/topSlice";
import { convertTime } from "../utils/convertTime";
import { formatVotes } from "../utils/formatVotes";
import "../styles/Classic.css";

function Classic({ data, category }) {
	const dispatch = useDispatch();

	const handleChangeVote = (type) => {
		if (category === "hot") dispatch(changeHotVotes(data.id, type));
		if (category === "new") dispatch(changeNewVotes(data.id, type));
		if (category === "top") dispatch(changeTopVotes(data.id, type));
	};

	return (
		<div className="classic cursor__pointer">
			<div className="classic__left">
				<Icon
					name="arrow up"
					color="grey"
					className="margin-0 cursor__pointer"
					onClick={() => handleChangeVote("increase")}
				/>
				<div className="classic__votes">{formatVotes(data.ups)}</div>
				<Icon
					name="arrow down"
					color="grey"
					className="margin-0 cursor__pointer"
					onClick={() => handleChangeVote("decrease")}
				/>
			</div>
			<div className="classic__right">
				<div className="classic__right__container">
					<div className="classic__right__data">
						<div className="classic__title">{data.title}</div>
						<div className="classic__author">{`Posted by u/${data.author} ${convertTime(
							data.created_utc
						)}`}</div>
					</div>
					<div className="cursor__pointer classic__right__comment">
						<div>
							<Icon name="comment" />
							<span>{data.num_comments}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Classic;
