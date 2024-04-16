import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import './BlacklistedIP.css'; // Import CSS file for styling

function BlacklistedIP() {
    const [ips, setIPs] = useState([]);
    const [filteredIPs, setFilteredIPs] = useState([]); // State to hold filtered IPs
    const [filter, setFilter] = useState(''); // State to hold the filter value

    useEffect(() => {
        // Fetch the list of blacklisted IPs from the API
        fetchBlacklistedIPs();
    }, []);

    useEffect(() => {
        // Filter the IPs when the filter value changes
        const filtered = ips.filter(ip => ip.includes(filter));
        setFilteredIPs(filtered);
    }, [ips, filter]);

    const fetchBlacklistedIPs = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'manage/blacklistedip');
            const data = await response.json();
            setIPs(data.map(obj => obj.ip));
        } catch (error) {
            console.error('Error fetching registered IPs:', error);
        }
    }
    let navigate = useNavigate();

    const handleRevoke = async (ip) => {
        console.log('Revoking IP:', ip);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'manage/whitelistip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ip: ip,
                    username: localStorage.getItem('user'),
                }),
            });
            const data = await response.json();
            if (data.code === 200) {
                localStorage.setItem('ip', ip);
                navigate('/whitelist');
            }
        } catch (error) {
            console.error('Error removing IP:', error);
        }
    };

    return (
        <><Navbar />
            <div className="blacklisted-ip-container">

                <h2>Blacklisted IPs</h2>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter IPs"
                    className="filter-input"
                />
                {filteredIPs.length === 0 ? (
                    <p>No blacklisted IPs found.</p>
                ) : (
                    <table className="ip-table">
                        <thead>
                            <tr>
                                <th>IP Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIPs.map((ip) => (
                                <tr key={ip}>
                                    <td>{ip}</td>
                                    <td>
                                        <button className='button' onClick={() => handleRevoke(ip)}>Revoke</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default BlacklistedIP;
