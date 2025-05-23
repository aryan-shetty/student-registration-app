const StudentList = ({students, onEdit, onDelete}) => {
  return (
    <ul>
      {students.map((s) => (
        <li key={s._id} value={s._id}>
          Student Name: {s.name} <br />
          Student Email: {s.email}
          <button onClick={() => onEdit(s)}>Edit</button>
          <button onClick={() => onDelete(s._id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default StudentList