import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Instructions from './components/Instructions/Instructions';
import Menu from './components/Menu/Menu';
import Play from './components/Play/Play';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}/>
          <Route path="play" element={<Play />}/>
          <Route path="instructions" element={<Instructions />}/>
        </Routes>
      </BrowserRouter>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
