import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Overview = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Welcome back, {user.name || 'User'}!</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Total Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Active Tasks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">
                            Completed Tasks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Add your recent activity items here */}
                        <p className="text-muted-foreground">No recent activity</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Overview; 