const CourseList = ({courses, onEdit, onDelete}) => {
  return (
    <ul>
      {courses.map((c) => (
        <li key={c._id} value={c._id}>
          Course Name: {c.title} <br />
          Course Description: {c.description}
          <button onClick={() => onEdit(c)}>Edit</button>
          <button onClick={() => onDelete(c._id)}>Delete</button>
        </li>

      ))}
    </ul>
  )
}

export default CourseList