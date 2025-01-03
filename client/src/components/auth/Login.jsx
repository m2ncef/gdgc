import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Google from './google.png'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Both email and password are required.');
            return;
        }


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-[400px] bg-white rounded-md shadow-md p-8">
                <div className="text-right text-sm text-gray-500">English(UK)</div>
                <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
                
                <button
                    className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md mb-4"
                    onClick={() => console.log("Login with Google")}
                >
                    <img src={Google} alt="Google logo" className="w-5 h-5 mr-2" />
                    Login with Google
                </button>

                <div className="text-center text-gray-500 mb-4">-OR-</div>

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
                    <div className="space-y-1">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => nav('/forgot-password')}
                                className="text-blue-500 text-sm hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>
                    
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => nav('/register')}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
