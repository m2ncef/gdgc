import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!email) {
            setError('Email is required.');
            return;
        }

        try {
            const response = await axios.post('/api/auth/forgot-password', { email });
            
            if (response.data.success) {
                setSuccess('Password reset instructions have been sent to your email.');
                // Optionally redirect after a delay
                setTimeout(() => nav('/login'), 3000);
            } else {
                setError('Failed to process request. Please try again.');
            }
        } catch (err) {
            console.error('Error during password reset request:', err);
            setError(err.response?.data?.message || 'An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-[400px] bg-white rounded-md shadow-md p-8">
                <div className="text-right text-sm text-gray-500">English(UK)</div>
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
                <p className="text-gray-600 text-center mb-6">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="text-green-500 text-sm text-center">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        Send Reset Instructions
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500 mt-4">
                    Remember your password?{" "}
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => nav('/login')}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
