import { useEffect } from "react";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SingIn.jsx";
import Todo from "./Pages/Todo.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./Pages/ProfilePage.jsx";
import TodoHistoryPage from "./Pages/TodoHistoryPage.jsx";
import Features from "./Pages/Features.jsx"
import PublicRoute from "./components/PublicRoute";


function App() {


  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes >
          <Route path="/" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/featuers" element={<Features />} />
          <Route path="/todo" element={
            <ProtectedRoute>
              <Todo />

            </ProtectedRoute>

          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />

            </ProtectedRoute>



          } />


          <Route
            path="/history/:date"
            element={<TodoHistoryPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
