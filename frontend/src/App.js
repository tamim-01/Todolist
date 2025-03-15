import Addtask from "./pages/Add-TaskPage.jsx";
import TaskManager from "./pages/TaskManager.jsx";
import { SigninPage } from "./pages/signin.jsx";
import { SignupPage } from "./pages/signup.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ProfilePage from "./pages/edit-Profilepage.jsx";
import Edittask from "./pages/Edit-TaskPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UnprotectedRoute from "./components/UnprotectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={
            <UnprotectedRoute>
              <SigninPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <UnprotectedRoute>
              <SignupPage />
            </UnprotectedRoute>
          }
        />
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <TaskManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <Addtask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <Edittask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
