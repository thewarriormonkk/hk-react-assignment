import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export default function Login({ setUser }) {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            // login url
            const url = "https://reqres.in/api/login"

            // request header
            const headers = {
                'Content-Type': 'application/json',
            };

            // login request body
            const body = JSON.stringify({
                email: event.target[0].value,
                password: event.target[1].value,
            });

            // sending login request
            const response = await fetch(url, {method: 'POST', headers, body});

            // checking response status
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // parsing json data
            const data = await response.json();

            // useEffect in App.jsx triggered to save to localStorage
            setUser(data.token);

            // navigate to home after login
            navigate("/");

        } catch(error) {
            console.log('Error: ', error);
            alert('Login failed. Please check your credentials.');
        }
    }


    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <div className="test-credentials">
                    <p><strong>Test Email:</strong> eve.holt@reqres.in</p>
                    <p><strong>Test Password</strong>: tailwind</p>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label 
                            htmlFor="email" 
                            className='form-label'
                        >Email</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            className='form-input'
                            placeholder='Enter Email' 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label 
                            htmlFor="password" 
                            className='form-label'
                        >Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            className='form-input' 
                            placeholder='Enter Password'
                            required
                        />
                    </div>

                    <button type="submit" className='login-button' >Login</button>
                </form>
            </div>
        </div>
        
    );
}