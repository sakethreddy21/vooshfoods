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

interface ViewDetailProps {
  task: any;
}

export function ViewDetailModal({ task }: ViewDetailProps) {
  
 

  return (
    <Dialog>
      <DialogTrigger asChild className="hover:bg-blue-600">
        <Button className="bg-blue-600 rounded-xl p-2 px-4">View Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white z-[99999]">
        <DialogHeader>
          <DialogTitle className="text-[30px] font-bold">Edit Task</DialogTitle>
          <DialogDescription>Edit your task</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center space-y-2">
         
            <div className="grid flex-1 gap-2">
              <div>Title</div>
              <input
                className="border-b-[1px] border-0 border-gray-500 p-4"
                type="text"
                value={task.title}
               readOnly
                required
              />
            </div>
            <div className="grid flex-1 gap-2">
              <div>Description</div>
              <textarea
                className="border-b-[1px] border-0 border-gray-500 p-4"
                value={task.description}
               readOnly
                required
              />
            </div>
            <div className="flex w-full mt-4 justify-end space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  close
                </Button>
              </DialogClose>
             
            </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
