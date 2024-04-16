import { useState } from 'react';
import Navbar from './NavBar';
import './ForecastPage.css'; // Import custom CSS file

function ForecastPage() {
    const [humidity, setHumidity] = useState('');
    const [pressure, setPressure] = useState('');
    const [temperature, setTemperature] = useState(null);
    const [loading, setLoading] = useState(false); // For showing loading indicator

    const handleHumidityChange = (e) => {
        setHumidity(e.target.value);
    };

    const handlePressureChange = (e) => {
        setPressure(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTemperature(null)
        setLoading(true); // Show loading indicator
        try {
            const response = await fetch('http://127.0.0.1:5000/forecast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    humidity: humidity,
                    pressure: pressure
                })
            });
            const data = await response.json();
            if (response.ok) {
                setTimeout(() => {
                    setTemperature(data.temperature);
                    setLoading(false); // Hide loading indicator
                }, 3000);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    return (
        <><Navbar />
        <div className="container"> {/* Apply custom class */}
            

            <h2 className="heading">Forecast</h2> {/* Apply custom class */}
            <form onSubmit={handleSubmit}>
                <label>
                    Humidity (%):
                    <input type="number" value={humidity} onChange={handleHumidityChange} className="input-field" /> {/* Apply custom class */}
                </label>
                <br />
                <label>
                    Pressure (hPa):
                    <input type="number" value={pressure} onChange={handlePressureChange} className="input-field" /> {/* Apply custom class */}
                </label>
                <br />
                <button type="submit" disabled={loading} className="submit-button"> {/* Apply custom class */}
                    {loading ? 'Loading...' : 'Get Temperature'}
                </button>
            </form>
            {temperature !== null && (
                <p className="temperature">Estimated Temperature: {temperature.toFixed(2)}°C</p> 
            )}
            </div>
        </>
    );
}

export default ForecastPage;
