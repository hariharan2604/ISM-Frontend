import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import View from '../assets/open-eye.png';
import Hide from '../assets/close-eye.png';
import './Login.css';

const Login = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async(e) => {
        e.preventDefault();       
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.code == 200) {
                localStorage.setItem('auth', true);
                localStorage.setItem('user', formData.username);
                setStatus(data.message);
                navigate('/dashboard');
            }
            else {
                setStatus(data.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            setStatus("Error Occured");
        }
    };

    return (
        <div className="login-container">
            <h1>Weather Monitor</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group password-input">
                    <label>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <img
                        className="view-password"
                        onClick={() => setShowPassword(!showPassword)}
                        src={showPassword ? View : Hide}
                        alt={showPassword ? 'Hide Password' : 'Show Password'}
                        width={25}
                        height={25}
                    />
                </div>
                <button type="submit">Login</button>
                <p className='error-text'>{status}</p>
                <p>
                    Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
