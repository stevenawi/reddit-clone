import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import { changeHotVotes } from "../slices/hotSlice";
import { changeNewVotes } from "../slices/newSlice";
import { changeTopVotes } from "../slices/topSlice";
import { convertTime } from "../utils/convertTime";
import { formatVotes } from "../utils/formatVotes";
import "../styles/Card.css";

function Card({ data, category }) {
	const dispatch = useDispatch();

	const handleChangeVote = (type) => {
		if (category === "hot") dispatch(changeHotVotes(data.id, type));
		if (category === "new") dispatch(changeNewVotes(data.id, type));
		if (category === "top") dispatch(changeTopVotes(data.id, type));
	};

	return (
		<div className="card cursor__pointer">
			<div className="card__left">
				<Icon
					name="arrow up"
					color="grey"
					className="margin-0 cursor__pointer"
					onClick={() => handleChangeVote("increase")}
				/>
				<div className="card__votes">{formatVotes(data.ups)}</div>
				<Icon
					name="arrow down"
					color="grey"
					className="margin-0 cursor__pointer"
					onClick={() => handleChangeVote("decrease")}
				/>
			</div>
			<div className="card__right">
				<div className="card__right__container">
					<div className="card__right__data">
						<div className="card__author">{`Posted by u/${data.author} ${convertTime(
							data.created_utc
						)}`}</div>
						<div className="card__title">{data.title}</div>
					</div>
					<div className="cursor__pointer card__right__comment">
						<div>
							<Icon name="comment" />
							<span>{data.num_comments} Comments</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
