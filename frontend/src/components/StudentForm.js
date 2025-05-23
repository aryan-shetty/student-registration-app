import { useState, useEffect } from "react";

const StudentForm = ({onAdd, onUpdate, editingStudent, clearEdit}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name)
      setEmail(editingStudent.email)
    }
  }, [editingStudent])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email) return

    const payload = {
      name: name.trim(),
      email: email.trim()
    }

    const url = editingStudent
      ? `http://localhost:4000/api/students/${editingStudent._id}`
      : 'http://localhost:4000/api/students'

    const method = editingStudent ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (editingStudent) {
      onUpdate(data)
      clearEdit()
    } else {
      onAdd(data)
    }

    setName('')
    setEmail('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <button type="submit">{editingStudent ? 'UPDATE' : 'ADD'} Student</button>
      {editingStudent && <button type="button" onClick={clearEdit}>Cancel</button>}
    </form>
  )
}

export default StudentForm