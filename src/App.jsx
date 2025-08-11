import { useState } from "react"
import "./App.css"
import rawData from "./devsData.json"
import DevList from "./components/DevList"
import DevForm from "./components/DevForm"

function App() {
  const [listOfDevs, setlistOfDevs] = useState(rawData.devs)
  const [activeTab, setActiveTab] = useState(1)
  const [isValid, setIsValid] = useState(false)

  const [newTask, setNewTask] = useState({
    lines: "",
    days: ""
  })
  
  const handleDelete = (idToDel) => {
    const temp = listOfDevs.filter((dev) => dev.id !== idToDel)
    setlistOfDevs(temp)
  }

  const handleAdd = (devToAdd) => {
    
      setlistOfDevs([...listOfDevs, devToAdd])
    
  }

  const checkCapacity = (tempTask) => {

    setIsValid(false)

    let juniors = listOfDevs.filter((dev) => dev.role === 'junior')
    let seniors = listOfDevs.filter((dev) => dev.role === 'senior')
    let lines = tempTask.lines === "" ? 0 : parseInt(tempTask.lines)
    let days = tempTask.days === "" ? 0 : parseInt(tempTask.days)
    
    let capacity = (juniors.length * 100)+(seniors.length * 200)
    
    let task = lines / days
    
    if( capacity >= task ){
      setIsValid(true)
    }
    
  }

  const handleChange = (event) => {
    const source = event.target.name
    let tempTask
    switch (source) {
      case "lines": {
        tempTask = ({ ...newTask, lines: event.target.value })
        break
      }
      case "days": {
        tempTask = ({ ...newTask, days: event.target.value })        
        break
      }      
      default:
        break
    }    
    
    checkCapacity(tempTask)
    setNewTask(tempTask)
  }

  const handleDoIt = () => {
    alert('Let\'s go!')
    let temp = {
      lines: "",
      days: ""
    }
    setNewTask(temp)
    setIsValid(false)
  }

  return (
    <div className="page-container">
      <h1>Your app for handling projects</h1>
      <h3>Toggle view</h3>
      <div className="page-toggler">
        <button
          className={`toggler-btn ${activeTab === 1 ? "active" : ""}`}
          name="list-of-devs"
          onClick={() => {
            setActiveTab(1)
          }}
        >
          List of Developers
        </button>
        <button
          className={`toggler-btn ${activeTab === 2 ? "active" : ""}`}
          name="task-planning"
          onClick={() => {
            setActiveTab(2)
          }}
        >
          Task planning
        </button>
      </div>
      {activeTab === 1 && (
        <>
        <h3>Your team</h3>
          <DevList data={listOfDevs} handleDelete={handleDelete} />
          <DevForm data={listOfDevs} onAdd={handleAdd} />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h3>Your task</h3>
          
          <div className="tasks-form">
            <label htmlFor="lines">lines of code</label>
            <input
              type="number"
              name="lines"
              id="lines"
              value={newTask.lines}
              onChange={handleChange}
            />
            <label htmlFor="lines">time limit [days]</label>
            <input
              type="number"
              name="days"
              id="days"
              value={newTask.days}
              onChange={handleChange}
            />
            
        
            <button 
            disabled={!isValid}
            className={isValid ? "success-btn" : "fail-btn"}
            onClick={handleDoIt}>Do it</button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
