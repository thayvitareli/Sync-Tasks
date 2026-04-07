import { useEffect } from "react"
import "./global.css"
import HomeView from './src/view/home/home.view'
import { initDatabase } from "./src/database/migrations"
import { useHomeViewModel } from "./src/viewmodel/home/home.view-model"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"

export default function App() {

  useEffect(() => {
    initDatabase()
  }, [])

  const {
    tasks, filteredTasks, filterStatus, setFilterStatus, task, setTask, handleAddTask, isLoadingTasks, handleToggleTask, handleDeleteTask,
    completedTasksCount, totalTasksCount, completionPercentage, theme, handleToggleTheme, isAddingTask, setIsAddingTask,
    isDeleteModalVisible, setIsDeleteModalVisible, taskToDelete, setTaskToDelete, confirmDeleteTask
  } = useHomeViewModel()

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      <HomeView 
        tasks={tasks} 
        filteredTasks={filteredTasks}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        task={task} 
        setTask={setTask} 
        handleAddTask={handleAddTask} 
        isLoadingTasks={isLoadingTasks} 
        handleToggleTask={handleToggleTask} 
        handleDeleteTask={handleDeleteTask}
        completedTasksCount={completedTasksCount} 
        totalTasksCount={totalTasksCount} 
        completionPercentage={completionPercentage}
        theme={theme} 
        handleToggleTheme={handleToggleTheme} 
        isAddingTask={isAddingTask} 
        setIsAddingTask={setIsAddingTask}
        isDeleteModalVisible={isDeleteModalVisible} 
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        taskToDelete={taskToDelete} 
        setTaskToDelete={setTaskToDelete} 
        confirmDeleteTask={confirmDeleteTask}
      />
    </SafeAreaProvider>
  )
}