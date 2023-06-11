import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateOrder from './pages/CreateOrder';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-order" element={<CreateOrder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
