import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import StudentsPage from './pages/StudentsPage'
import CoursesPage from './pages/CoursesPage'
import RegistrationsPage from './pages/RegistrationsPage'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Courses</Link>
        <Link to='/students'>Students</Link>
        <Link to='/registrations'>Registrations</Link>
      </nav>
      <Routes>
        <Route path='/' element={<CoursesPage />} />
        <Route path='/students' element={<StudentsPage />} />
        <Route path='/registrations' element={<RegistrationsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
