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
      predictionValue: '',
      route: 'SignIn',
      isSignedIn: false
    }
  }


  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const pValue = data.outputs[0].data.regions[0].value || " "
    const name = data.outputs[0].model.name
    const id = data.outputs[0].data.regions[0].id
    const image = document.getElementById('inputimage')
    const height = Number(image.height);
    const width = Number(image.width);
    // console.log(clarifaiFace);
    console.log(pValue);
    console.log(name)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      predictionValue: pValue * 100,
      name,
      id
    }
  }
  
  
  

  displayFaceBox = (box) => {
    this.setState({box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
    // This information came from https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // Face detect Model
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(responce => this.displayFaceBox(this.calculateFaceLocation(responce)))
      .catch(TypeError => alert("Oh no! It looks like we can't find a face in this image...")).catch(err => alert(err));
    
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
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particals' 
                params={particalSettings} />
        <Navigation isSignedIn={isSignedIn} OnRouteChange={this.OnRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit} 
              />
              <FaceDetection box={box} imageURL={imageURL} />
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
