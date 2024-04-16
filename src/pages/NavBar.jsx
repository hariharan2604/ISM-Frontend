import { Link } from 'react-router-dom';
import './NavBar.css';
import Logout from './Logout';
function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="app-name">IP Spoofing</h1>
            </div>
            <ul className="navbar-list">
                
                <li className="navbar-item">
                    <Link to="/dashboard" className="navbar-link">View Registered IPs</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/view-blacklisted-ips" className="navbar-link">View Blacklisted IPs</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/forecast-information" className="navbar-link">Forecast Information</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/see-logs" className="navbar-link">See Logs</Link>
                </li>
                <li className="navbar-item">
                    <Logout />
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
