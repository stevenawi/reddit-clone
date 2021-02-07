import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import logo from "../images/logo.svg";
import "../styles/Header.css";

function Header() {
	return (
		<header className="header">
			<Link to="/">
				<img className="header__logo" src={logo} alt="logo" />
			</Link>
			<div className="header__right">
				<div className="header__right__auth">
					<Link to="/login" className="header__right__login">
						Log In
					</Link>
					<Link to="/signup" className="header__right__signup">
						Sign Up
					</Link>
				</div>
				<div className="header__right__user">
					<Icon name="user" size="large" color="grey" />
				</div>
			</div>
		</header>
	);
}

export default Header;
