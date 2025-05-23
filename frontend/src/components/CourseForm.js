import { useState, useEffect } from "react";

const CourseForm = ({onAdd, onUpdate, editingCourse, clearEdit}) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title)
      setDescription(editingCourse.description)
    }
  }, [editingCourse])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description) return

    const payload = {
      title: title.trim(),
      description: description.trim()
    }

    const url = editingCourse
      ? `http://localhost:4000/api/courses/${editingCourse._id}`
      : 'http://localhost:4000/api/courses'

    const method = editingCourse ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (editingCourse) {
      onUpdate(data)
      clearEdit()
    } else {
      onAdd(data)
    }

    setTitle('')
    setDescription('')
  }

   return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <label>Description</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button type="submit">{editingCourse ? 'Update' : 'Add'} Course</button>
      {editingCourse && <button type="button" onClick={clearEdit}>Cancel</button>}
    </form>
   )
}

export default CourseForm