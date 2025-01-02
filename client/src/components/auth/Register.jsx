import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !name) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await axios.post("your-api-endpoint/register", { name, email, password });

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                nav("/login");
            } else {
                setError(response.data.message || 'Registration failed!');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
            <button type="submit" onClick={() => nav("/login")}>Login</button>

        </div>
    );
};

export default Register;
