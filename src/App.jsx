import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import DetailsPage from "./pages/Details/DetailsPage"
import VideoPopUp from "./components/videoPopUp/VideoPopUp"
import Testing from "./Testing";
import Sidebar from "./components/sidebar/Sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

function App() {
	const [sidebarActive, setSidebarActive] = useState(false);

	const toggleSidebarActive = () => {
		setSidebarActive(true);
	};
	const toggleSidebarNotActive = () => {
		setSidebarActive(false);
	};

	return (
		<>
			<Navbar
				sidebarActive={sidebarActive}
				toggleSidebarActive={toggleSidebarActive}
				toggleSidebarNotActive={toggleSidebarNotActive}
			/>
			<div className="">
				<div className="content">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/movies" element={<h1>Lol</h1>} />
						<Route path="/:mediaType/:id" element={<DetailsPage />} />
					</Routes>
				</div>
			</div>
		</>
	);
}


// iso_639_1
// :
// "en"
// iso_3166_1
// :
// "US"
// name
// :
// "Official Final Trailer"
// key
// :
// "4wxyy8Rcz4k"
// site
// :
// "YouTube"
// size
// :
// 2160
// type
// :
// "Trailer"
// official
// :
// true

// published_at
// :
// "2023-07-11T20:00:01.000Z"
// id
// :
// 
// new entry
// : 

export default App
