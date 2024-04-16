// components/RegisteredIP.js
import { useState, useEffect } from 'react';
import Navbar from './NavBar';
import './RegisteredIP.css';

function RegisteredIP() {
    const [ips, setIPs] = useState([]);
    const [newIP, setNewIP] = useState('');
    const [filter, setFilter] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchRegisteredIPs();
    }, []);

    const fetchRegisteredIPs = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'manage/registeredip');
            const data = await response.json();
            setIPs(data.map(obj => obj.ip));
        } catch (error) {
            console.error('Error fetching registered IPs:', error);
        }
    }
    const isValidIP = (ip) => {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(ip);
    };

    const handleAddIP = async () => {
        try {
            if (newIP !== '') {
                if (isValidIP(newIP)) {
                    const response = await fetch(import.meta.env.VITE_API_URL + 'manage/registerip', {
                        method: 'POST',
                        body: JSON.stringify({ ip: newIP }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    if (data.code === 201) {
                        setIPs([...ips, newIP]);
                        setNewIP('');
                        setStatus('');
                    } else {
                        setStatus(data.message);
                    }
                } else {
                    setStatus('Please enter a valid IP address');
                }
            } else {
                setStatus('Please enter an IP address');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error occurred');
        }
    };

    const filteredIPs = ips.filter(ip => ip.includes(filter));

    return (
        <>
            <Navbar />
            <div className="registered-ip-container">
                <h2>Registered IPs</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter IP Address"
                        value={newIP}
                        onChange={(e) => setNewIP(e.target.value)}
                    />
                    <button onClick={handleAddIP}>Add IP</button>
                </div>
                <p className='status-text'>{status}</p>
                <div className='input-container'><input
                    type="text"
                    placeholder="Filter IP Addresses"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                </div>
                {filteredIPs.length === 0 ? (
                    <p>No data available</p>
                ) : (
                    <table className="ip-table">
                        <thead>
                            <tr>
                                <th>IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIPs.map((registeredIP, index) => (
                                <tr key={index}>
                                    <td>{registeredIP}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default RegisteredIP;
