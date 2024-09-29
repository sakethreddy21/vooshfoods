import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { Grip } from "lucide-react";
import { EditTaskModal } from "./EditTask";
import { ViewDetailModal } from "./ViewDetails";

export enum ColumnID {
  Todo = 1,
  InProgress = 2,
  Done = 3,
}




export interface Task {
  columnID: ColumnID; // Ensure it's using the enum
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
  userID: string;
  _id: string;
}

export type AddTask = Omit<Task, 'createdAt' | 'updatedAt' | 'userID' | '_id'>;



interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  deletetask?:any
  edittask?:any
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}


export function TaskCard({ task, isOverlay , deletetask, edittask}: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

const handleDlete=()=>{
  console.log('djjd')
}


  return (
    <Card
    ref={setNodeRef}   
      style={style}
      className={`${variants({ dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined })} bg-blue-100`}
    >

      
      <CardHeader className="px-3 py-3 justify-between space-between flex flex-row relative text-[24px] font-bold">
        {task.title}
        <Grip {...attributes}
      {...listeners}
      />
      </CardHeader>
      <CardContent className="px-3 pb-6 text-left whitespace-pre-wrap">
        {task.description}
        <div className="pt-6">
          Created at: {task.createdAt}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end gap-x-2 text-white">
        <button className="bg-red-500 rounded-xl p-2 px-4 " onClick={()=>deletetask(task._id)}>Delete</button>
        <EditTaskModal task={task} edittask={edittask}/>
        <ViewDetailModal task={task}/>
      </CardFooter>
    </Card>
  );
}
