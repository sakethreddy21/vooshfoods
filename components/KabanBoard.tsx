"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTasksByUserID } from "@/hooks/useGetTasks";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { type Task,ColumnID, TaskCard } from "./TaskCard";
import type { Column } from "./BoardColumn";
import { hasDraggableData } from "./utils";
import { coordinateGetter } from "./mutipleConatinersKeyboardPreset";


const defaultCols = [
  {
    id: ColumnID.Todo,
    title: "Todo",
  },
  {
    id: ColumnID.InProgress,
    title: "In progress",
  },
  {
    id: ColumnID.Done,
    title: "Done",
  },
] satisfies { id: ColumnID; title: string }[]; // Ensure ColumnID is used here

export type ColumnId = (typeof defaultCols)[number]["id"];


export function KanbanBoard() {

  


  const { tasks: taksss, isLoading, isError } = useTasksByUserID('66f701c0178d17921b503a27', true) as { tasks: Task[]; isLoading: boolean; isError: boolean };

const [tasks, setTasks] = useState<Task[]>([]); // Initialize as an empty array

useEffect(() => {
  if (taksss) {
    setTasks(taksss);
  }
}, [taksss]);


  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const pickedUpTaskColumn = useRef<ColumnID>(ColumnID.Done); // Default to ColumnID.Done

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);



  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);



  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("Recent");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );
  
function convertToDate(dateString: string): Date | 'Invalid Date' {
  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date.getTime())) {
      return 'Invalid Date';
  }
  
  return date;
}


  const filteredTasks = tasks?.filter(task => 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = useMemo<Task[]>(() => {
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(now.getMonth() - 2);
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

   

    return filteredTasks?.filter((task: Task) => {
        const taskDate = convertToDate(task.createdAt);

        switch (selectedOption) {
            case "Past Month":
                return taskDate >= oneMonthAgo;
            case "Past 2 Months":
                return taskDate >= twoMonthsAgo;
            case "Past 3 Months":
                return taskDate >= threeMonthsAgo;
            default:
                return true; // "Recent"
        }
    });
}, [filteredTasks, selectedOption]);

console.log(sortedTasks)


  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.columnID === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task._id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startColumnIdx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.columnID;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${
          active.data.current.task.description
        } at position: ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnID
        );
        if (over.data.current.task.columnID !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.description
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = ColumnID.Done;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnID
        );
        if (over.data.current.task.columnID !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = ColumnID.Done;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = ColumnID.Done;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

if(isLoading){
  return(
    <>
    loading
    
    </>
  )
}
if (isError){
  return(
    <>
    error</>
  )
}


  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
        <div className="px-20 flex flex-col">
         <button className="bg-blue-600 w-32  flex text-center justify-center px-4 p-2 text-white font-bold rounded-xl">Add Task</button>

         <div className="border-2 border-slate-200 rounded-xl p-4 mt-2 flex flex-row justify-between">
            <div>
            search:
            <input
              className="px-2 ml-2 w-[400px] border-slate-200 border-2"
              style={{ borderRadius: '8px' }}
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearch}
            />
            </div>
           
            <div className="flex justify-end items-center gap-x-2">
            Sort By:
            <select
              id="date-range"
              value={selectedOption}
              onChange={handleSortChange}
              className="border-2 border-slate-200 rounded-xl p-1"
            >
              <option value="Recent">Recent</option>
              <option value="Past Month">Past Month</option>
              <option value="Past 2 Months">Past 2 Months</option>
              <option value="Past 3 Months">Past 3 Months</option>
            </select>
          </div>
         </div>
        </div>

        
        <BoardContainer>
        <SortableContext items={columnsId}>
         
          {tasks && columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={sortedTasks?.filter((task) => task.columnID === col.id) }
            />
          ))}
        </SortableContext>
      </BoardContainer>

      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {activeColumn && tasks && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnID === activeColumn.id
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.columnID !== overTask.columnID
        ) {
          activeTask.columnID = overTask.columnID;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          activeTask.columnID = overId as ColumnId;
          return arrayMove(tasks, activeIndex, activeIndex);
        }
        return tasks;
      });
    }
  }
}