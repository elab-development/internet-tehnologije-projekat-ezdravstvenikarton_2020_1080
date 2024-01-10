import logo from './logo.svg';
import './App.css';
import Home from './komponente/pocetna/Home';
import ImageGallery from './komponente/Galerija/ImageGallery';

function App() {
  return (
    <div className="App">
       <Home></Home>
       <ImageGallery></ImageGallery>
    </div>
  );
}

export default App;
