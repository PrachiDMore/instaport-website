import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateOrder from './pages/CreateOrder';
import ComingSoon from './pages/ComingSoon';
import { TermsAndConditions } from './pages/TermsAndConditions';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<ComingSoon />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
