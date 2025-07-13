import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/Shared/LandingPage';
import SignIn from "./components/Org/SignIn";
import SignUp from "./components/Org/SignUp";
import SubmissionForm from "./components/User/SubmissionForm";
import TokenTracker from "./components/User/TokenTracker";
import Dashboard from "./components/Org/Dashboard";
import Sidebar from "./components/User/Sidebar";
import "./App.css";

function App() {
  const ProtectedRoute = ({ children }) => {
    const orgId = localStorage.getItem('orgId');

    if (!orgId) {
      return <Navigate to="/org/signin" replace />;
    }
    return children;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/org/signin" element={<SignIn />}></Route>
      <Route 
        path="/user/submission-form" 
        element={
          <div className="page-with-sidebar">
            <Sidebar />
            <SubmissionForm />
          </div>
        }
      />
      <Route 
        path="/user/report-status"
        element={
          <div className="page-with-sidebar">
            <Sidebar />
            <TokenTracker isShow={true} onClose={() => { window.history.back() }} />
          </div>
        }
      />
      <Route 
        path="/org/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
      </Route>
      <Route path="/org/signup" element={<SignUp />}></Route>
    </Routes>
  )
}

export default App;
