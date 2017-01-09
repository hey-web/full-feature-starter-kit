import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Help from './pages/Help.jsx'
import Items from './pages/Items.jsx'

const App = () => (
			<Router history={hashHistory}>
				<Route path="/" component={Home}/>
				<Route path="/about" component={About}/>
				<Route path="/help" component={Help}/>
			</Router> 
			)

export default App
