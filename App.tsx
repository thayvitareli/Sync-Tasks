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

  const {tasks, task, setTask, handleAddTask, isLoadingTasks, handleToggleTask, handleDeleteTask} = useHomeViewModel()

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      <HomeView tasks={tasks} task={task} setTask={setTask} handleAddTask={handleAddTask} isLoadingTasks={isLoadingTasks} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />
    </SafeAreaProvider>
  )
}