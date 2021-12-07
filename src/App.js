import { Header } from './components/Header';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Tasks } from './components/Tasks';
import { AddTask } from './components/AddTask';
import { useState, useEffect } from 'react'
import { Footer } from './components/Footer';
import { About } from './components/About';
import { TaskDetails } from './components/TaskDetails'
import { BtnAdd } from './components/BtnAdd';
import './App.css';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://my-json-server.typicode.com/Aaronnon/react-task-tracker-app/tasks')
    const data = await res.json()
    return data
  }

  // Fetch Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`https://my-json-server.typicode.com/Aaronnon/react-task-tracker-app/tasks${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('https://my-json-server.typicode.com/Aaronnon/react-task-tracker-app/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    }
    )

    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://my-json-server.typicode.com/Aaronnon/react-task-tracker-app/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`https://my-json-server.typicode.com/Aaronnon/react-task-tracker-app/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)))
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        
        <Routes>
          <Route path='/' element={
            <>
            <BtnAdd className="BtnAddContainer" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
            </>
          } />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
          <Route path="*" element={<h1>404 Not Found！</h1>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter >
  );
}

export default App;
