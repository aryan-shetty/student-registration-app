import { useState, useEffect } from "react";
import CourseForm from '../components/CourseForm'
import CourseList from '../components/CourseList'

const CoursesPage = () => {

  const [courses, setCourses] = useState([])
  const [editingCourse, setEditingCourse] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/courses')
      .then(res => res.json())
      .then(setCourses)
  }, [])

  const handleAdd = (newCourse) => {
    setCourses(prev => [...prev, newCourse])
  }

  const handleUpdate = (updated) => {
    setCourses(prev => prev.map(c => c._id === updated._id ? updated : c))
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/courses/${id}`, {method: 'DELETE'})
    setCourses(prev => prev.filter(c => c._id !== id))
  }

  return (
    <div>
      <h2>Courses</h2>

      <CourseForm 
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingCourse={editingCourse}
        clearEdit={() => setEditingCourse(null)}
      />

      <CourseList 
        courses={courses}
        onEdit={setEditingCourse}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default CoursesPage