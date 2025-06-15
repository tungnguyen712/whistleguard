import { Routes, Route } from "react-router-dom"
import LandingPage from './components/Shared/LandingPage';
import SignIn from "./components/Org/Signin";
import SubmissionForm from "./components/User/SubmissionForm";
import Dashboard from "./components/Org/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/org/signin" element={<SignIn />}></Route>
      <Route path="/user/submission-form" element={<SubmissionForm />}></Route>
      <Route path="/org/dashboard" element={<Dashboard />}></Route>
    </Routes>
  )
}

export default App;
