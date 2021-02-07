import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Icon } from "semantic-ui-react";
import Card from "../components/Card";
import Classic from "../components/Classic";
import Compact from "../components/Compact";
import { viewOptions, viewText } from "../constant/viewSelection";
import { fetchHotData, hotSelector } from "../slices/hotSlice";
import { fetchNewData, newSelector } from "../slices/newSlice";
import { fetchTopData, topSelector } from "../slices/topSlice";
import "../styles/Content.css";

function Content() {
	const [category, setCategory] = useState("hot");
	const [view, setView] = useState("card");

	const dispatch = useDispatch();
	const hotReddit = useSelector(hotSelector);
	const newReddit = useSelector(newSelector);
	const topReddit = useSelector(topSelector);

	const handleScroll = useCallback(() => {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight) {
			if (category === "hot") dispatch(fetchHotData());
			if (category === "new") dispatch(fetchNewData());
			if (category === "top") dispatch(fetchTopData());
		}
	}, [category, dispatch]);

	const displayData = () => {
		let data;
		switch (category) {
			case "hot":
				data = hotReddit.data;
				break;
			case "new":
				data = newReddit.data;
				break;
			case "top":
				data = topReddit.data;
				break;
			default:
		}
		switch (view) {
			case "card":
				return data.map((row, index) => <Card key={index} data={row.data} category={category} />);
			case "classic":
				return data.map((row, index) => <Classic key={index} data={row.data} category={category} />);
			case "compact":
				return data.map((row, index) => <Compact key={index} data={row.data} category={category} />);
			default:
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		if (category === "hot" && hotReddit.data.length === 0) dispatch(fetchHotData());
		if (category === "new" && newReddit.data.length === 0) dispatch(fetchNewData());
		if (category === "top" && topReddit.data.length === 0) dispatch(fetchTopData());
	}, [category, dispatch, hotReddit.data.length, newReddit.data.length, topReddit.data.length]);

	return (
		<div className="container">
			<div className={`content__categories ${view === "card" ? "content__categories-card" : ""}`}>
				<div className="content__categories__left">
					<div
						className={`content__categories__group ${
							category === "hot" ? "content__categories__group-active" : ""
						}`}
						onClick={() => setCategory("hot")}
					>
						<Icon className="content__categories__icon" name="fire" size="large" color="grey" />
						Hot
					</div>
					<div
						className={`content__categories__group ${
							category === "new" ? "content__categories__group-active" : ""
						}`}
						onClick={() => setCategory("new")}
					>
						<Icon className="content__categories__icon" name="star" size="large" color="grey" />
						New
					</div>
					<div
						className={`content__categories__group ${
							category === "top" ? "content__categories__group-active" : ""
						}`}
						onClick={() => setCategory("top")}
					>
						<Icon className="content__categories__icon" name="chart line" size="large" color="grey" />
						Top
					</div>
				</div>
				<Dropdown
					icon={false}
					pointing="top right"
					trigger={
						<>
							<Icon name={viewText[view]} />
							<span style={{ marginLeft: 10 }}>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
						</>
					}
					options={viewOptions}
					value={view}
					onChange={(e, { value }) => setView(value)}
					className="content__dropdown"
				/>
			</div>
			{displayData()}
		</div>
	);
}

export default Content;
