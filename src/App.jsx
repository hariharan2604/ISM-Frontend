import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';
import RegisteredIP from './pages/RegisteredIP'
import BlacklistedIP from './pages/BlacklistedIP';
import ForecastPage from './pages/ForecastPage';
import OTPPage from './pages/OTPPage';
import SeeLogs from './pages/SeeLogs';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<RegisteredIP />} path="/dashboard" exact />
            <Route element={<BlacklistedIP />} path="/view-blacklisted-ips" exact />
            <Route element={<ForecastPage />} path="/forecast-information" exact />
            <Route element={<SeeLogs />} path="/see-logs" exact />
            <Route element={<OTPPage />} path="/whitelist" exact />
          </Route>
          <Route element={<Login />} path="/" />
          <Route element={<SignupPage />} path="/signup" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;