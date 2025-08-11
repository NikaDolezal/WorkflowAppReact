import React, { useState } from "react"
import "./DevForm.css"
import Select from "./Select"

function DevForm({ data, onAdd }) {
  const [newDev, setNewDev] = useState({
    id: data.length > 0 ? Math.max(...data.map((dev) => dev.id)) + 1 : 1,
    name: "",
    role: "junior",    
  })
  const [valid, setValid] = useState(false)

  const validateData = (dev) => {
    setValid(true)
    if (dev.name.trim() === "") {
      setValid(false)
    }
  }

  const resetNewDev = () => {
    let temp = {
      id: newDev.id + 1,
      name: "",
      role: "junior",
    }
    setNewDev(temp)
    setValid(false)
  }

  const handleChange = (event) => {       
    let updatedDev
    updatedDev = { ...newDev, name: event.target.value }       
    setNewDev(updatedDev)
    validateData(updatedDev)
  }

  const handleData = (data) => {
    let updatedDev
    updatedDev = { ...newDev, role: data }
    setNewDev(updatedDev)
    validateData(updatedDev)
  }

  return (
    <div className="dev-form">
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        value={newDev.name}
      />
      
      <Select
              id="role"
              label="Position: "
              dataIn={["junior", "senior"]}
              handleData={handleData}
              selectedValue={newDev.role}
            />

      <button
        disabled={!valid}
        onClick={() => {
          onAdd(newDev)
          resetNewDev()
        }}
      >
        Employ
      </button>
    </div>
  )
}

export default DevForm
