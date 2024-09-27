import { Github } from "lucide-react";
import "./globals.css";
import { KanbanBoard } from "@/components/KabanBoard";
import { Button } from "@/components/ui/button";

const FooterLink = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      variant="link"
      asChild
      className="scroll-m-20 text-xl font-semibold tracking-tight"
    >
      {children}
    </Button>
  );
};

function App() {
  return (
    <>
  
        <div className="min-h-screen flex flex-col">
          <header className="flex justify-between w-full flex-row p-2 bg-blue-400">
            <Button variant="link" asChild className="text-primary h-8 w-8 p-0">
              <a href="">
                <Github className="fill-current h-full w-full" />
              </a>
            </Button>
            <Button variant="link" asChild className="text-primary h-16 w-16">
              
            </Button>
           <Button className="bg-red-500">
            Logout
           </Button>
          </header>

          
          <main className="w-full h-full flex flex-col gap-6 pt-4">
           
            <KanbanBoard />
            
          </main>
         
        </div>
      
    </>
  );
}

export default App;