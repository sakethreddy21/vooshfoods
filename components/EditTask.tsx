import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface EditModalProps {
  task: any;
  edittask: (updatedTask: any) => void; // Ensure edittask receives the updated task
}

export function EditTaskModal({ task, edittask }: EditModalProps) {
  const [taskID, setTaskID] = useState(task._id);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [columnID, setColumnID] = useState(task.columnID);

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskID || !title || !description || columnID === null) {
      alert("Please fill all the fields!");
      return;
    }

    // Create an updated task object
    const updatedTask = {
      _id: taskID,
      title,
      description,
      columnID,
    };

    // Call edittask with the updated task
    edittask(updatedTask);
  };

  // Update form values when the task changes
  useEffect(() => {
    setTaskID(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setColumnID(task.columnID);
  }, [task]);

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-blue-600">
        <Button className="bg-blue-600 rounded-xl p-2 px-4">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white z-[99999]">
        <DialogHeader>
          <DialogTitle className="text-[30px] font-bold">Edit Task</DialogTitle>
          <DialogDescription>Edit your task</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center space-y-2">
          <form onSubmit={handleUpdate}>
            <div className="grid flex-1 gap-2">
              <div>Title</div>
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
            <div className="flex w-full mt-4 justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <button
                type="submit"
                className="flex bg-blue-300 w-[130px] p-2 justify-center items-center rounded-xl"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
