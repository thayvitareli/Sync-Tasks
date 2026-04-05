import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View, Modal, KeyboardAvoidingView, Platform } from 'react-native'
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
  handleDeleteTask: (id: string) => void
  completedTasksCount: number
  totalTasksCount: number
  completionPercentage: number
  theme: string
  handleToggleTheme: () => void
  isAddingTask: boolean
  setIsAddingTask: (value: boolean) => void
  isDeleteModalVisible: boolean
  setIsDeleteModalVisible: (value: boolean) => void
  taskToDelete: string | null
  setTaskToDelete: (value: string | null) => void
  confirmDeleteTask: () => void
}

interface HomeHeaderProps {
  theme: string
  handleToggleTheme: () => void
  completedTasksCount: number
  totalTasksCount: number
  completionPercentage: number
  isAddingTask: boolean
  setIsAddingTask: (val: boolean) => void
  task: string
  setTask: (val: string) => void
  handleAddTask: () => void
}

const HomeHeader = ({
  theme,
  handleToggleTheme,
  completedTasksCount,
  totalTasksCount,
  completionPercentage,
  isAddingTask,
  setIsAddingTask,
  task,
  setTask,
  handleAddTask
}: HomeHeaderProps) => (
  <View className="w-full">
    {/* Header */}
    <View className="flex-row items-center justify-between mb-8 flex-1">
      <View className="flex-row items-center gap-2">
        <Ionicons name="checkmark-done" size={28} color="#4F46E5" />
        <Text className="text-primary text-xl font-bold">SyncTasks</Text>
      </View>
      <View className="flex-row items-center gap-5">
        <Pressable onPress={handleToggleTheme}>
          <Ionicons name={theme === 'dark' ? "moon" : "sunny"} size={24} color={theme === 'dark' ? "#b2a6d5" : "#7b719d"} />
        </Pressable>
      </View>
    </View>

    {/* Greeting Section */}
    <View className="mb-6">
      <Text className="text-on-surface text-3xl font-bold mb-1">Hello !</Text>
      <Text className="text-neutral text-base">You have some focused tasks waiting for you today.</Text>
    </View>

    {/* Daily Goal Card */}
    <View className="bg-[#241e3a] p-5 rounded-2xl flex-row items-center justify-between mb-6 border border-[#2e264a]">
      <View className="flex-1">
        <Text className="text-[#a59bc8] text-xs font-bold tracking-widest mb-2">DAILY GOAL</Text>
        <Text className="text-[#ebe9f0] text-xl font-bold mb-1">{completedTasksCount} of {totalTasksCount} tasks completed</Text>
        <Text className="text-[#a59bc8] text-sm">Almost there! {completionPercentage}% done.</Text>
      </View>
      <View className={`w-[72px] h-[72px] rounded-full border-[6px] items-center justify-center ml-4 ${completionPercentage === 100 ? 'border-[#8e84f5]' : (completionPercentage > 0 ? 'border-[#3f346b] border-t-[#8e84f5]' : 'border-[#3f346b]')}`}>
        <Text className="text-[#ebe9f0] font-bold text-sm">{completionPercentage}%</Text>
      </View>
    </View>

    {/* Actions */}
    <View className="flex-row gap-4 mb-8">
      <Pressable 
        onPress={() => setIsAddingTask(!isAddingTask)} 
        className="flex-1 bg-[#8e84f5] rounded-2xl py-6 items-center flex-col gap-2 justify-center"
      >
        <Ionicons name="add" size={28} color="#2b2361" />
        <Text className="text-[#2b2361] font-bold text-base">Add Task</Text>
      </Pressable>
    </View>

    {/* Adding task section */}
    {isAddingTask && (
      <View className="flex-row items-center gap-2 mb-6">
        <TextInput
          placeholder='What needs to be done?'
          placeholderTextColor='#7b719d'
          className='bg-surface flex-1 border border-outline-variant rounded-xl px-4 py-3 text-on-surface'
          value={task}
          onChangeText={setTask}
        />
        <Pressable 
          className='bg-primary p-3 rounded-xl' 
          onPress={() => {
            handleAddTask()
            setIsAddingTask(false)
          }} 
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>
    )}

    {/* Tasks */}
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-on-surface text-xl font-bold">Tasks</Text>
    </View>
  </View>
)

const HomeFooter = () => (
  <View className="pb-10" />
)

export default function HomeView({ 
  handleAddTask, tasks, task, setTask, isLoadingTasks, handleToggleTask, handleDeleteTask,
  completedTasksCount, totalTasksCount, completionPercentage, theme, handleToggleTheme, isAddingTask, setIsAddingTask,
  isDeleteModalVisible, setIsDeleteModalVisible, taskToDelete, setTaskToDelete, confirmDeleteTask
}: HomeViewProps) {

  return (
    <SafeAreaView className={`flex-1 bg-background px-4 pt-4 ${theme}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        className="flex-1"
      >

      {isLoadingTasks ? (
        <View className="flex-1 mt-4">
          <HomeHeader 
            theme={theme}
            handleToggleTheme={handleToggleTheme}
            completedTasksCount={completedTasksCount}
            totalTasksCount={totalTasksCount}
            completionPercentage={completionPercentage}
            isAddingTask={isAddingTask}
            setIsAddingTask={setIsAddingTask}
            task={task}
            setTask={setTask}
            handleAddTask={handleAddTask}
          />
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        <FlatList
          data={tasks}
          ListHeaderComponent={
            <HomeHeader 
              theme={theme}
              handleToggleTheme={handleToggleTheme}
              completedTasksCount={completedTasksCount}
              totalTasksCount={totalTasksCount}
              completionPercentage={completionPercentage}
              isAddingTask={isAddingTask}
              setIsAddingTask={setIsAddingTask}
              task={task}
              setTask={setTask}
              handleAddTask={handleAddTask}
            />
          }
          ListFooterComponent={HomeFooter}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow"
          renderItem={({ item }) => (
            <TaskCard task={item} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="items-center justify-center border-dashed border-2 border-outline-variant rounded-xl p-4">
              <Text className="text-on-surface text-xl font-bold">No tasks found</Text>
            </View>
          }
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View className="bg-[#1c1928] border border-[#2e264a] w-full p-6 rounded-3xl">
            <View className="items-center mb-4">
              <View className="bg-red-500/10 p-3 rounded-full mb-3">
                <Ionicons name="trash" size={32} color="#ef4444" />
              </View>
              <Text className="text-[#ebe9f0] text-xl font-bold text-center">Confirm Deletion</Text>
              <Text className="text-[#7b719d] text-base text-center mt-2">Are you sure you want to delete this task? This action cannot be undone.</Text>
            </View>
            
            <View className="flex-row gap-3">
              <Pressable 
                className="flex-1 bg-[#272336] py-4 rounded-xl items-center" 
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text className="text-[#ebe9f0] font-bold text-base">Cancel</Text>
              </Pressable>
              
              <Pressable 
                className="flex-1 bg-red-600 py-4 rounded-xl items-center" 
                onPress={confirmDeleteTask}
              >
                <Text className="text-white font-bold text-base">Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}