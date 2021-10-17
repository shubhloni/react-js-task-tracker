import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

function App() {

  // States
  const [showAdd, setShowAdd] = useState(false)
  const [tasks, setTasks] = useState([])

  // On Load of Page
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks From Server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Tasks From Server
  const fetchTaskSingle = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const newTask = await res.json()
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Remainder
  const toggleRemainder = async (id) => {

    const task = await fetchTaskSingle(id)
    const updTask = { ...task, reminder: !task.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }

  return (
    <Router>
      <div className='container'>

        <Header
          onAdd={() => setShowAdd(!showAdd)}
          showAddTask={showAdd}
        />

        <Route path='/' exact render={(props) => (
          <>
            {showAdd && <AddTask onAdd={addTask} />}

            {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleRemainder} />
            ) : (
                'No Tasks')}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
