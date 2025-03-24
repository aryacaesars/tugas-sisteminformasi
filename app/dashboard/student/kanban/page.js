"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, FileText, Users } from "lucide-react"

// Initial data for the Kanban board
const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Research Paper on Climate Change",
      course: "Environmental Science",
      dueDate: "2023-05-15",
      priority: "high",
      type: "assignment",
    },
    "task-2": {
      id: "task-2",
      content: "Read Chapter 5-7",
      course: "World History",
      dueDate: "2023-05-10",
      priority: "medium",
      type: "reading",
    },
    "task-3": {
      id: "task-3",
      content: "Prepare for Midterm Exam",
      course: "Calculus II",
      dueDate: "2023-05-20",
      priority: "high",
      type: "exam",
    },
    "task-4": {
      id: "task-4",
      content: "Group Project Meeting",
      course: "Business Communication",
      dueDate: "2023-05-08",
      priority: "medium",
      type: "meeting",
    },
    "task-5": {
      id: "task-5",
      content: "Lab Report",
      course: "Chemistry",
      dueDate: "2023-05-12",
      priority: "high",
      type: "assignment",
    },
    "task-6": {
      id: "task-6",
      content: "Weekly Quiz",
      course: "Psychology",
      dueDate: "2023-05-09",
      priority: "low",
      type: "quiz",
    },
    "task-7": {
      id: "task-7",
      content: "Essay Draft",
      course: "English Composition",
      dueDate: "2023-05-18",
      priority: "medium",
      type: "assignment",
    },
    "task-8": {
      id: "task-8",
      content: "Study Group Session",
      course: "Physics",
      dueDate: "2023-05-11",
      priority: "low",
      type: "meeting",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-5", "task-6"],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-7", "task-8"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
}

export default function StudentKanban() {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination, do nothing
    if (!destination) return

    // If the destination is the same as the source, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Get the source and destination columns
    const sourceColumn = data.columns[source.droppableId]
    const destinationColumn = data.columns[destination.droppableId]

    // If moving within the same column
    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      }

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      }

      setData(newData)
      return
    }

    // Moving from one column to another
    const sourceTaskIds = Array.from(sourceColumn.taskIds)
    sourceTaskIds.splice(source.index, 1)
    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    }

    const destinationTaskIds = Array.from(destinationColumn.taskIds)
    destinationTaskIds.splice(destination.index, 0, draggableId)
    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    }

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    }

    setData(newData)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  // Get the priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  // Get the task type icon
  const getTaskTypeIcon = (type) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4" />
      case "reading":
        return <BookOpen className="h-4 w-4" />
      case "exam":
        return <FileText className="h-4 w-4" />
      case "meeting":
        return <Users className="h-4 w-4" />
      case "quiz":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Student Kanban Board</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId])

            return (
              <div key={column.id}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{column.title}</CardTitle>
                    <CardDescription>{tasks.length} tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[500px]">
                          {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mb-3 last:mb-0"
                                >
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="space-y-2">
                                        <div className="font-medium">{task.content}</div>
                                        <div className="text-sm text-muted-foreground">{task.course}</div>
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>{task.dueDate}</span>
                                          </div>
                                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                          {getTaskTypeIcon(task.type)}
                                          <span>{task.type.charAt(0).toUpperCase() + task.type.slice(1)}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

