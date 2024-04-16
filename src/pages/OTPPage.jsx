// components/OTPPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTPPage.css'; // Import CSS file for styling

function OTPPage() {
    const [otp, setOTP] = useState('');
    const navigate = useNavigate(); // Define navigate outside of the component body

    const handleChange = (e) => {
        setOTP(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log(otp);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'manage/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ip: localStorage.getItem('ip'),
                    otp: otp // Include OTP in the request body
                }),
            });
            const data = await response.json();
            console.log('data:', data);
            if (data.code === 200) {
                console.log(data);
                // Navigate to another page after successful OTP verification
                navigate('/view-blacklisted-ips');
            } else {
                console.error('Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    // Retrieve IP address from localStorage
    const userIP = localStorage.getItem('ip');

    return (
        <div className="otp-container">
            <h2 className="otp-heading">Enter OTP</h2>
            <p className="otp-ip">IP Address to be Whitelisted: {userIP}</p> {/* Display user's IP address */}
            <form onSubmit={handleSubmit}>
                <label className="otp-label">
                    <p>Enter the OTP:</p>
                    <input type="text" value={otp} onChange={handleChange} className="otp-input" />
                </label>
                <button type="submit" className="otp-submit-button">Submit</button>
            </form>
        </div>
    );
}

export default OTPPage;
