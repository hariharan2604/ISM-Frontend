import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import './Login.css';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + 'register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.code == 201) {
                localStorage.setItem('auth', true);
                navigate('/dashboard');
            }
            else {
                setStatus(data.message);
            }
        }
        catch(error){
            console.error('Error:', error);
            setStatus("Error Occured");
        }
};

return (
    <div className="login-container"> 
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
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
            <div className="input-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-group">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Signup</button>
            <p className='error-text'>{status}</p>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </form>
    </div>
);
}

export default SignupPage;
