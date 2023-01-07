import './App.css';
import Body from './components/body';
import Navbar from './components/navbar';
import {BrowserRouter} from 'react-router-dom';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      {/* <Body /> */}
    </BrowserRouter>
    </>
  );
}

export default App;