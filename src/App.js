import React , { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/navigation';
import SignIn from './components/sign_in/signin';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/faceDetection/faceDetection';
import Rank from './components/rank/rank';
import particalSettings from './components/particals/particals';






const initialState = {
  input: '',
      imageURL: '',
      box: {},
      predictionValue: '',
      route: 'SignIn',
      isSignedIn: false,
      user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
    fetch('https://damp-temple-33318.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://damp-temple-33318.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
              
            }).catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(TypeError => alert("Oh no! It looks like we can't find a face in this image...")).catch(err => alert(err));
    
  }

  OnRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
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
              <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit} 
              />
              <FaceDetection box={box} imageURL={imageURL} />
            </div>
          : (
            this.state.route === 'SignIn'
            ? <SignIn loadUser={this.loadUser} OnRouteChange={this.OnRouteChange}/>
            : <Register loadUser={this.loadUser} OnRouteChange={this.OnRouteChange}/>

          )
        }
      </div>
    );
  }
}

export default App;
