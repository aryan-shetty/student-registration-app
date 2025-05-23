import { useState, useEffect } from "react";

const StudentForm = ({onAdd, onUpdate, students, courses, editingRegistration, clearEdit}) => {

  const [student, setStudent] = useState('')
  const [course, setCourse] = useState('')

  useEffect(() => {
    if (editingRegistration) {
      setStudent(editingRegistration.student._id)
      setCourse(editingRegistration.course._id)
    }
  }, [editingRegistration])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!student || !course) return

    const payload = {
      student,
      course
    }

    const url = editingRegistration
      ? `http://localhost:4000/api/registrations/${editingRegistration._id}`
      : 'http://localhost:4000/api/registrations'

    const method = editingRegistration ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (editingRegistration) {
      onUpdate(data)
      clearEdit()
    } else {
      onAdd(data)
    }

    setStudent('')
    setCourse('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <select value={student.name} onChange={(e) => setStudent(e.target.value)}>
        <option value={''}>Select student</option>
        {students.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <select value={course.title} onChange={(e) => setCourse(e.target.value)}>
        <option value={''}>Select course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>{c.title}</option>
        ))}
      </select>
      <button type="submit">{editingRegistration ? 'UPDATE' : 'ADD'} Registration</button>
      {editingRegistration && <button type="button" onClick={clearEdit}>Cancel</button>}
    </form>
  )
}

export default StudentForm