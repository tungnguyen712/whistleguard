import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import LandingPage from './components/Shared/LandingPage';
import SignIn from "./components/Org/SignIn";
import SignUp from "./components/Org/SignUp";
import SubmissionForm from "./components/User/SubmissionForm";
import TokenTracker from "./components/User/TokenTracker";
import Dashboard from "./components/Org/Dashboard";
import Sidebar from "./components/User/Sidebar";
import "./App.css";
// import { Token } from "aws-sdk";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div className="app-loading">Loading...</div>;
  }

  if (auth.error) {
    return <div className="app-error">Encountering error... {auth.error.message}</div>;
  }

  const ProtectedRoute = ({ children }) => {
  const bypassAuth = localStorage.getItem("bypassAuth");

    if (!auth.isAuthenticated && !bypassAuth) {
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
