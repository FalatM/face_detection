import React , { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/navigation';
import SignIn from './components/sign_in/signin';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/faceDetection/faceDetection';
import Rank from './components/rank/rank';
import particalSettings from './components/particals/particals';




const app = new Clarifai.App({
 apiKey: '58c062ea6cfa493b9ee3c07a037ac599'
});



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false
    }
  }


  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const height = Number(image.height);
    const width = Number(image.width);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
    // This information came from https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // Face detect Model
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(responce => this.displayFaceBox(this.calculateFaceLocation(responce)))
      .catch(err => console.log(err));
    
  }

  OnRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className='particals' 
                params={particalSettings} />
        <Navigation isSignedIn={this.state.isSignedIn} OnRouteChange={this.OnRouteChange} />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit} 
              />
              <FaceDetection box={this.state.box} imageURL={this.state.imageURL} />
            </div>
          : (
            this.state.route === 'SignIn'
            ? <SignIn OnRouteChange={this.OnRouteChange}/>
            : <Register OnRouteChange={this.OnRouteChange}/>

          )
        }
      </div>
    );
  }
}

export default App;
