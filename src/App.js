import './App.css';
import React from 'react';
import Navigation  from './components/navigation/navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/imagelinkform/imagelinkform.js';
import Rank from './components/rank/rank.js';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Signin from "./components/Signin/Signin.js"
import Register from "./components/register/register.js"

const particlesInit = async (main) => {
  await loadFull(main);
};

const particlesLoaded = (container) => {
};

const particleOptions = {    
    fpsLimit: 120,
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000,
        },
        value: 60,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
  }

  onRouteChange = (toGo) => {
    if(toGo === 'signout') {
      this.setState({isSignedIn: false})
    } 
    else if (toGo === 'home')  {
      this.setState({isSignedIn: true})
    }
    this.setState({route: toGo});
  }

  render() {  
    return (
      <div className="App">
        <Particles
        className = "particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
      />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn}/>
        { this.state.route === 'home' 
          ?  
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition imageUrl = {this.state.imageUrl}/>
          </div>
          : (
            this.state.route === 'signin' 
            ? <Signin onRouteChange = {this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
         }
      </div>
    );
  }
}

export default App;
