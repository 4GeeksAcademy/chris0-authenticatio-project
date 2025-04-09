import { Link } from "react-router-dom";

export const Navbar = () => {
	const handlelogout = () => {
	sessionStorage.clear()	
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">signup</button>
					</Link>

					<Link to="/login">
						<button className="btn btn-primary">login</button>
					</Link>

					<Link to="/private"> 
						<button className="btn btn-primary">private</button>
					</Link>
					<button onClick={handlelogout}>logout</button>
				</div>
			</div>
		</nav>
	);
};