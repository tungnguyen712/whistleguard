import { Routes, Route } from "react-router-dom"
import LandingPage from './components/Shared/LandingPage';
import SignIn from "./components/Org/Signin";
import SubmissionForm from "./components/User/SubmissionForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/org/signin" element={<SignIn />}></Route>
      <Route path="/user/submission-form" element={<SubmissionForm />}></Route>
    </Routes>
  )
}

export default App;
