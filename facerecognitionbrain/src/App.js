import React, { Component, Fragment } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Face from "./components/Face/Face";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";
import "./App.css";
import Clarifai from "clarifai";

const app = new Clarifai.App({
	apiKey: "4ea42f77b34d4627a91a1bcbe614da78",
});

const particleOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true,
			},
		},
		size: {
			value: 10,
		},
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imgUrl: "https://samples.clarifai.com/metro-north.jpg",
			faceBox: [],
			route: 'signin',
			isSignedIn: false
		};
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	calculateFaceLocation = (data) => {
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);

		const regions = data.outputs[0].data.regions.map((region) => {
			const clarifaiFace = region.region_info.bounding_box;
			return {
				leftCol: clarifaiFace.left_col * width,
				topRow: clarifaiFace.top_row * height,
				rightCol: width - clarifaiFace.right_col * width,
				bottomRow: height - clarifaiFace.bottom_row * height,
			};
		});
		return regions;
	};

	displayFaceBox = (boxes) => {
		this.setState((state, props) => {
			return { ...state, faceBox: boxes };
		});
	};

	onButtonClick = () => {
		// Predict the contents of an image by passing in a URL.
		this.setState(
			(state) => {
				return { ...state, imgUrl: this.state.input };
			},
			() => {
				app.models
					.predict(Clarifai.FACE_DETECT_MODEL, this.state.imgUrl)
					.then((response) =>
						this.displayFaceBox(
							this.calculateFaceLocation(response)
						)
					)
					.catch((err) => console.log(err));
			}
		);
	};

	onRouteChange = (route) => {
		if(route === 'home'){
			this.setState({isSignedIn: true})
		}
		else{
			this.setState({isSignedIn: false})
		}
		this.setState({route: route})
	}

	render() {
		const st = this.state.route;
		return (
			<div className="App">
				<Particles params={particleOptions} className="particles" />
				
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
								
				{	
					
					(st === 'signin') ?
							<SignIn onRouteChange={this.onRouteChange}/>
					: (st === 'register') ? 
							<Register onRouteChange={this.onRouteChange}/>
						: <Fragment><Logo />
								<Rank />
								<ImageLinkForm
									onInputChange={this.onInputChange}
									onButtonClick={this.onButtonClick}
								/>
								<Face regions={this.state.faceBox} imgUrl={this.state.imgUrl} />
							</Fragment>	
				}
			</div>
		);
	}
}

export default App;
