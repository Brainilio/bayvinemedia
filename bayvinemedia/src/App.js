import Navbar from "./components/Navbar/Navbar"
import About from "./sections/About/About"
import React, { useEffect, useState, useRef } from "react"
import Landing from "./sections/Landing/Landing"
import Services from "./sections/Services/Services"
import Reviews from "./sections/Reviews/Reviews"
import ExtraInformation from "./sections/ExtraInformation/ExtraInformation"
import Contact from "./sections/Contact/Contact"
import Menu from "./components/Menu/Menu"
import LoadingScreen from "./sections/LoadingScreen/LoadingScreen"
import gsap from "gsap"
import CustomCursor from "./components/Cursor/CustomCursor"
import {
	useGlobalStateContext,
	useGlobalDispatchContext,
} from "./context/globalContext"

export const reveal = (node) => {
	gsap.from(node, {
		duration: 1,
		opacity: 0,
	})
}
function App() {
	let [menu, setMenu] = React.useState(false)
	let restOfPage = useRef(null)
	const [shouldIntroExist, setShouldIntroExist] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			if (restOfPage) {
				reveal(restOfPage.current)
			}

			setShouldIntroExist(false)
		}, 5000)
	}, [shouldIntroExist])

	function handleMenu() {
		setMenu((prevstate) => !prevstate)
	}

	const { cursorStyles } = useGlobalStateContext()
	const dispatch = useGlobalDispatchContext()

	const onCursor = (cursorType) => {
		cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
		dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
	}

	let application = (
		<div ref={(el) => (restOfPage = el)} className="the-whole-app">
			<Menu show={menu} clicked={handleMenu} />
			<Navbar clicked={handleMenu} onCursor={onCursor} />
			<Landing />
			<About />
			<Services />
			<Reviews />
			<ExtraInformation />
			<Contact />
			<footer>Designed and Developed with ♡ by Bay Vine Media 2021 ©</footer>
		</div>
	)

	return (
		<>
			<CustomCursor />
			{shouldIntroExist ? <LoadingScreen /> : application}
		</>
	)
}

export default App

/* 
		<Button className={"green-gradient"} text={"HIRE ME"} />
			<Button className={"yellow-gradient"} text={"CASES"} />
			<Button className={"pink-gradient"} text={"SERVICES"} />
			<Button className={"purple-gradient"} text={"LET'S CHAT"} />
			<Button className={"blue-gradient"} text={"LET'S CHAT"} />
			<Button className={"pink-gradient"} text={"SEE CASES"} />

*/
