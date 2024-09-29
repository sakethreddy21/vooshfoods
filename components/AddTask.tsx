
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useCreateTask from "@/hooks/useAddtasks";
import { useState } from "react";


interface AddboxProps {
    userId:string;
    onAddTask:any;
    columnId?:number;
}

export function AddTaskModal({ userId, onAddTask, columnId }: AddboxProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userID, setUserID] = useState(userId);
    const [columnID, setColumnID]= useState(columnId)

 
  
    const { createTask, loading, error, success } = useCreateTask(); // Assuming your hook returns the newly created task
  
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const taskData = { title, description, userID, columnID };

      
        const createdTask = await createTask(taskData); // Wait for the task to be created
      
        if (createdTask) {
          onAddTask(createdTask); // Call the function from the parent to update tasks
        }
      };
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-blue-600 w-32 flex text-center justify-center px-4 p-2 text-white font-bold rounded-xl">
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white z-[99999]">
          <DialogHeader>
            <DialogTitle className="text-[30px] font-bold">Add Task</DialogTitle>
            <DialogDescription>Add your task</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-center space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="grid flex-1 gap-2">
                <div>Tittle</div>
                <input
                  className="border-b-[1px] border-0 border-gray-500 p-4"
                  type="text"
                  
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid flex-1 gap-2">
                <div>Description</div>
                <textarea
                  className="border-b-[1px] border-0 border-gray-500 p-4"
                 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex w-full mt-4">
                <div className="flex w-full justify-between">
                <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
                <button type="submit" disabled={loading} className="flex bg-blue-300 w-[130px] p-2 justify-center items-center rounded-xl">
                  {loading ? 'Creating...' : 'Create Task'}
                </button>
                </div>
              </div>
            </form>
          </div>
          
        </DialogContent>
      </Dialog>
    );
  }
  