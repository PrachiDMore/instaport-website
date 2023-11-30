import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateOrder from './pages/CreateOrder';
import ComingSoon from './pages/ComingSoon';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { AboutUs } from './pages/AboutUs';
import { CancellationAndRefund } from './pages/CancellationAndRefund';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TopUp from './pages/TopUp';
import Signin from './components/Signin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<ComingSoon />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cancellation-and-refund" element={<CancellationAndRefund />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/topup/:token" element={<TopUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
