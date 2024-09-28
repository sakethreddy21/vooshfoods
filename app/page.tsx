"use client"
import { Github } from "lucide-react";
import "./globals.css";
import { KanbanBoard } from "@/components/KabanBoard";
import { Button } from "@/components/ui/button";
import { useState } from "react";



function App() {
  const[userloggedin, setUserlogggedin]=useState(true)

 
  return (
    <>
  
        <div className="min-h-screen flex flex-col">
          <header className="flex justify-between w-full flex-row p-2 bg-blue-400">
            <Button variant="link" asChild className="text-primary h-8 w-8 p-0">
              <a href="">
                <Github className="fill-current h-full w-full" />
              </a>
            </Button>
            <div className="flex flex-row">
              {!userloggedin ? (
                <div className="flex flex-row gap-x-2">
                <Button className="bg-red-500">
              Logout
             </Button>
             <Button className="bg-red-500">
              Logout
             </Button>
                </div>
              ):(
                <Button className="bg-red-500">
            Logout
           </Button>
              )}
              

              
            </div>
            
          
          </header>

          {!userloggedin?(
            <div>djjjj</div>
          ):(
            <main className="w-full h-full flex flex-col gap-6 pt-4">
           
            <KanbanBoard />
            
          </main>
          )}
          
         
        </div>
      
    </>
  );
}

export default App;