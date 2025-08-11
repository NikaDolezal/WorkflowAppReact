import React from "react"
import "./DevList.css"

function DevList({ data, handleDelete }) {
  return (
    <div className="list">
      {data.map((item) => (
        <div key={item.id} className="item">
          <span>
            {item.name} - {item.role}
          </span>
          <button className="btn-delete" onClick={() => handleDelete(item.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  )
}

export default DevList
