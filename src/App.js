import React , { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/rank';
import particalSettings from './components/particals/particals';





class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particals' 
                params={particalSettings} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceDetection /> */}
      </div>
    );
  }
}

export default App;
