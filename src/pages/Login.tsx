import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (userType: "teacher" | "student") => {
    // This is a placeholder login logic - will be replaced with actual authentication
    if (email && password) {
      toast({
        title: "Login Successful",
        description: `Logged in as ${userType}`,
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">School Library Portal</CardTitle>
          <CardDescription>Login to access the library system</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="teacher" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
            
            <TabsContent value="teacher">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin("teacher");
              }} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="School Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Teacher
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="student">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin("student");
              }} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="School Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login as Student
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;