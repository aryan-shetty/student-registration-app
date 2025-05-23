import { useState, useEffect } from "react";
import StudentForm from '../components/StudentForm'
import StudentList from '../components/StudentList'

const StudentsPage = () => {

  const [students, setStudents] = useState([])
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/students')
      .then(res => res.json())
      .then(setStudents)
  }, [])

  const handleAdd = (newStudent) => {
    setStudents(prev => [...prev, newStudent])
  }

  const handleUpdate = (updated) => {
    setStudents(prev => prev.map(s => s._id === updated._id ? updated : s))
  }
  
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/students/${id}`, {method: 'DELETE'})
    setStudents(prev => prev.filter(s => s._id !== id))
  }

  return (
    <div>
      <h2>Students</h2>

      <StudentForm 
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingStudent={editingStudent}
        clearEdit={() => setEditingStudent(null)}
      />

      <StudentList 
        students={students}
        onEdit={setEditingStudent}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default StudentsPage