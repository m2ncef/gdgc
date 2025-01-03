import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Profile Settings</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile; 