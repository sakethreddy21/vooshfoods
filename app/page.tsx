"use client";
import { Github } from "lucide-react";
import "./globals.css";
import { KanbanBoard } from "@/components/KabanBoard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Login from "@/components/screens/Login";
import useLogin from "@/hooks/useLogin";
import Register from "@/components/screens/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.token);
  const [isLoginScreen, setIsLoginScreen] = useState(true); // Use a single state to manage login/register screens

  const { logout } = useLogin();

  const toggleScreen = () => {
    setIsLoginScreen(!isLoginScreen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoginScreen(true);
    logout();
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <Button
          className="bg-gray-600 hover:bg-gray-600"
          onClick={handleLogout}
        >
          Logout
        </Button>
      );
    }

    return (
      <>
        <Button
          className={`${!isLoginScreen ? "bg-red-500 hover:bg-red-500" : "bg-gray-600 hover:bg-gray-600"}`}
          onClick={toggleScreen}
        >
           Login
        </Button>
        <Button
          className={`${isLoginScreen ? "bg-red-500 hover:bg-red-500" : "bg-gray-600 hover:bg-gray-600"}`}
          onClick={toggleScreen}
        >
          Register
        </Button>
      </>
    );
  };

  const renderAuthScreens = () => {
    return isLoginScreen ? (
      <Login onLoginClick={toggleScreen} onUserLogin={handleLoginSuccess} />
    ) : (
      <Register onLoginClick={toggleScreen} />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between w-full p-2 bg-blue-400">
        <Button variant="link" asChild className="text-primary h-8 w-8 p-0">
          <a href="">
            <Github className="fill-current h-full w-full" />
          </a>
        </Button>
        <div className="flex flex-row gap-x-2">{renderAuthButtons()}</div>
      </header>

      <main className="w-full h-full flex flex-col gap-6 pt-4">
        {isLoggedIn ? <KanbanBoard /> : renderAuthScreens()}
      </main>
    </div>
  );
}

export default App;
