import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useState } from "react";
import { Task, TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { GripVertical } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AddTaskModal } from "./AddTask";

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
  userId:any;
  onAddTask: any;
  columnId?:any
  deletetask?:any
  edittask?:any

}

export function BoardColumn({ column, tasks, isOverlay,userId, onAddTask, columnId, deletetask, edittask }: BoardColumnProps) {


  const [taskss, setTasks]= useState(tasks)

  useEffect(()=>{
    setTasks(tasks)
  }, [tasks])

  const tasksIds = useMemo(() => {
    return taskss?.map((task) => task._id);
  }, [tasks]);



  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-[550px] max-h-[550px] w-[450px] max-w-full bg-primary-foreground flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  );



 
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="p-4 font-semibold  text-left flex flex-row space-between items-center">
        <div className="w-full bg-blue-500 p-2 text-white text-[20px] font-bold">{column.title}</div>
      </CardHeader>
      <ScrollArea>
        <CardContent className="flex flex-grow flex-col gap-2 p-2">
          {taskss.length==0? (
            
            <AddTaskModal userId={userId} onAddTask={onAddTask} columnId={columnId.id} />):( <SortableContext items={tasksIds}>
            {taskss?.map((task: Task) => (
              <TaskCard key={task._id} task={task} deletetask={deletetask} edittask={edittask}/>
            ))}
          </SortableContext>)}
         
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4 ", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-center flex-row justify-center">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}