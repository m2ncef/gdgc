import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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

        try {
            const response = await axios.post('', { email, password });

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                nav('/dashboard');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        variant="outline"
                        onClick={() => nav("/register")}
                    >
                        Create an account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
