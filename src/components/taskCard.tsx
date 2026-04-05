import { Pressable, Text, View } from "react-native"
import { Task } from "../model/task/task"
import React from "react"
import { Ionicons } from "@expo/vector-icons"

interface TaskCardProps {
  task: Task,
  handleToggleTask: (id: string) => void,
  handleDeleteTask: (id: string) => void
}

export default function TaskCard({task, handleToggleTask, handleDeleteTask}: TaskCardProps) {
  return (
    <View className="flex-row bg-white w-full p-5 rounded-md justify-between">
      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={() => handleToggleTask(task.id)}
          className={`w-6 h-6 flex items-center justify-center border border-primary rounded-sm ${task.completed ? "bg-primary" : ""}`}
        >
          {task.completed ? <Ionicons name="checkmark" size={15} color="white" /> : null}
        </Pressable>
        <Text className={`text-on-surface text-xl font-bold ${task.completed ? "line-through" : ""}`}>{task.title}</Text>
      </View>

      <Pressable onPress={() => {handleDeleteTask(task.id)}}>
        <Ionicons name="trash" size={24} color="#4F46E5" />
      </Pressable>
    </View>
  )
}