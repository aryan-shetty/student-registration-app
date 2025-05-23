
const RegistrationList = ({registrations, onEdit, onDelete}) => {
  return (
    <ul>
      {registrations.map((r) => (
        <li key={r._id} value={r._id}>
          Student Name: {r.student.name} <br />
          Course Description: {r.course.title} <br />
          Registration Date: {r.registered_at}
          <button onClick={() => onEdit(r)}>Edit</button>
          <button onClick={() => onDelete(r._id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default RegistrationList

// TABLE FORMAT BELOW (EDITING DOESNT WORK IN IT)

/*
const RegistrationList = ({registrations, onEdit, onDelete}) => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Student</th>
          <th scope="col">Course</th>
          <th scope="col">Registration Date</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((r) => (
          <tr>
            <th scope="row">{r.student.name}</th>
            <th>{r.course.title}</th>
            <th>{r.registered_at}</th>
            <th><button onClick={() => onEdit(r)}>Edit</button></th>
            <th><button onClick={() => onDelete(r._id)}>Delete</button></th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RegistrationList
*/