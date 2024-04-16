import { useState, useEffect } from 'react';
import Navbar from './NavBar';
import './SeeLogs.css'; // Import your CSS file for custom styles

function SeeLogs() {
    const [logs, setLogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);

    useEffect(() => {
        // Fetch logs data from your backend or API
        fetchLogsFromAPI();
    }, []);

    useEffect(() => {
        // Filter logs based on search query
        filterLogs();
    }, [logs, searchQuery]); // Include logs and searchQuery in the dependency array

    const fetchLogsFromAPI = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'logs/getlogs');
            const data = await response.json();
            console.log(data);
            setLogs(data.logs);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const filterLogs = () => {
        const filtered = logs.filter(log =>
            log.message.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // Sort logs by timestamp in descending order
        const sortedLogs = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setFilteredLogs(sortedLogs);
    };

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    // Function to convert timestamp to proper format
    const formatTimestamp = timestamp => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    return (
        <div className="see-logs-container">
            <Navbar />
            <h2 className="logs-heading">Logs</h2>
            <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="table-container">
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map(log => (
                            <tr key={log.id}>
                                <td>{log.message}</td>
                                <td>{formatTimestamp(log.timestamp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SeeLogs;
