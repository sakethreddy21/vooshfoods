import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { Badge } from "./ui/badge";
import { ColumnId } from "./KabanBoard";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  title:string,
  date:string,
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
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

  return (
    <Card
    {...attributes}
          {...listeners}
      ref={setNodeRef}
      style={style}
      className={
        
        
        variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })
      + "bg-blue-100"}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row  relative text-[24px] font-bold" >
        
         {task.title}
        
        
      </CardHeader>
      <CardContent className="px-3  pb-6 text-left whitespace-pre-wrap">
        {task.content}


        <div className="pt-6 ">
          Creadted at : {task.date}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-end gap-x-2 text-white ">
<button className="bg-red-500 rounded-xl p-2 px-4">Delete</button>
<button className="bg-blue-500 rounded-xl p-2">Edit</button>
<button className="bg-blue-700 rounded-xl p-2">View details</button>    
      </CardFooter>
    </Card>
  );
}