import { useNavigate } from 'react-router-dom';
import './Logout.css'
const Logout = () => {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('auth', 'false'); // Set as string
        localStorage.removeItem('ip'); // Remove instead of setting to null
        localStorage.removeItem('auth'); // Remove instead of setting to null
        localStorage.removeItem('user'); // Remove instead of setting to null
        navigate('/'); // Redirect to the homepage or wherever you want
    }

    return (
        <button className='button-logout' onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
