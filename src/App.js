import React , { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/navigation';
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
    }
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
      this.state.input).then(
      function(responce) {
        console.log(responce.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(error) {
        //There was an error.
      }
    )
    }

  render() {
    return (
      <div className="App">
        <Particles className='particals' 
                params={particalSettings} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceDetection imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
