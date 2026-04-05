import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {  ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { Task } from '../../model/task/task'
import { SafeAreaView } from 'react-native-safe-area-context'
import TaskCard from '../../components/taskCard'

interface HomeViewProps {
  task: string
  setTask: (value: string) => void
  handleAddTask: () => void
  tasks: Task[]
  isLoadingTasks: boolean
  handleToggleTask: (id: string) => void
}

export default function HomeView({handleAddTask, tasks, task, setTask, isLoadingTasks, handleToggleTask, handleDeleteTask}: HomeViewProps) {

  
  return (
    <SafeAreaView className="flex-1 py-3 px-4 gap-5 bg-background">

      <View className="flex-row  w-full gap-4">
        <Ionicons name="laptop" size={24} color="#4F46E5" />
      <Text className="text-on-surface text-xl font-bold">
        SyncTasks 
      </Text>
      </View>

      {isLoadingTasks ? <ActivityIndicator /> : <FlatList
        data={tasks}
        contentContainerClassName='flex-1 gap-3'
        renderItem={({ item }) => (
          <TaskCard task={item} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />
        )}
       />}

<View className="flex-row items-center gap-2 justify-between">
      <TextInput
        placeholder='Digite sua tarefa'
        placeholderTextColor='#9ca3af'
        className='bg-surface flex-1 border border-outline-variant rounded-md px-4 py-2 text-on-surface w-64'
        value={task}
        onChangeText={setTask}
      />

      <Pressable className='bg-primary rounded-full'   onPress={() => handleAddTask()} >
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
      </View>

    </SafeAreaView>
  )
}