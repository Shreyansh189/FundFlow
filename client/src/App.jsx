import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StartupDetails from './pages/StartupDetails';
import CreateStartup from './pages/CreateStartup';
import EditStartup from './pages/EditStartup';
import Bookmarks from './pages/Bookmarks';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/startups/:id" element={<StartupDetails />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <Bookmarks />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/startups/create"
                element={
                  <ProtectedRoute requireFounder>
                    <CreateStartup />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/startups/:id/edit"
                element={
                  <ProtectedRoute requireFounder>
                    <EditStartup />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
