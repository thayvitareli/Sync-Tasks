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
    <View className="flex-row bg-[#151221] border border-[#2e264a] w-full p-4 rounded-xl items-center justify-between mb-3">
      <View className="flex-row items-center flex-1 pr-4">
        <Pressable
          onPress={() => handleToggleTask(task.id)}
          className={`w-6 h-6 flex items-center justify-center rounded-md mr-3 border ${task.completed ? "bg-[#8e84f5] border-[#8e84f5]" : "border-[#7b719d] bg-transparent"}`}
        >
          {task.completed && <Ionicons name="checkmark" size={16} color="white" />}
        </Pressable>
        <Text className={`text-base font-semibold flex-1 ${task.completed ? "text-[#7b719d] line-through" : "text-[#ebe9f0]"}`}>
          {task.title}
        </Text>
      </View>

      <Pressable onPress={() => {handleDeleteTask(task.id)}} className="p-2">
        <Ionicons name="trash-outline" size={20} color="#7b719d" />
      </Pressable>
    </View>
  )
}