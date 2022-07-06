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
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3001/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify ({
        id: this.state.user.id
      })
    }).then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
    })
  }

  onRouteChange = (toGo) => {
    if(toGo === 'signin') {
      this.setState({isSignedIn: false})
    } 
    else if (toGo === 'home')  {
      this.setState({isSignedIn: true})
    }
    this.setState({route: toGo});
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        password: data.password,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
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
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition imageUrl = {this.state.imageUrl}/>
          </div>
          : (
            this.state.route === 'signin' 
            ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
         }
      </div>
    );
  }
}

export default App;
