import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Overview = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Welcome Card */}
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl">👋🏻</h1>
              <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Find answers for your Questions, and help others.
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              Earn reputation by{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Helping others.
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Course Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Your Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-500">50</span>
                <span className="text-muted-foreground">/100 Lessons</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Popular Tags Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You're not watching Tags yet!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
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
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
