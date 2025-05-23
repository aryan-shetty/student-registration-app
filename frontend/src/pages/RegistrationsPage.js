import { useState, useEffect } from "react";
import RegistrationForm from '../components/RegistrationForm'
import RegistrationList from '../components/RegistrationList'

const RegistrationsPage = () => {

  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [editingRegistration, setEditingRegistration] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/courses')
      .then(res => res.json())
      .then(setCourses)

    fetch('http://localhost:4000/api/students')
      .then(res => res.json())
      .then(setStudents)

    fetch('http://localhost:4000/api/registrations')
      .then(res => res.json())
      .then(setRegistrations)
  }, [])

  const handleAdd = (newRegistration) => {
    setRegistrations(prev => [...prev, newRegistration])
  }

  const handleUpdate = (updated) => {
    setRegistrations(prev => prev.map(s => s._id === updated._id ? updated : s))
  }
  
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/registrations/${id}`, {method: 'DELETE'})
    if (window.confirm("Do you want to delete?")) {
      setRegistrations(prev => prev.filter(s => s._id !== id))
    }
  }

  return (
    <div>
      <h2>Registration Form</h2>

      <RegistrationForm 
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        students={students}
        courses={courses}
        editingRegistration={editingRegistration}
        clearEdit={() => setEditingRegistration(null)}
      />

      <RegistrationList 
        registrations={registrations}
        onEdit={setEditingRegistration}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default RegistrationsPage