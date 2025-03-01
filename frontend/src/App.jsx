import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './provider/AuthProvider';

const API_BASE_URL = 'https://coding-marathon-2-kqxf.onrender.com';

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        throw new Error(`Failed to add job: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete job: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  };

  // Update Job
  const updateJob = async (job) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        throw new Error(`Failed to update job: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  // Create a custom loader function that uses the absolute URL
  const customJobLoader = async ({ params }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/jobs/${params.id}`);
      if (!res.ok) {
        throw new Error(`Failed to load job: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error('Error loading job:', error);
      throw error;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={customJobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={customJobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;