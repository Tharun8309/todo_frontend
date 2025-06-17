import { Routes, Route } from "react-router-dom";
import { TodoItemsProvider } from "./store/TodoItemsContext";
import NavBar from "./components/NavBar";
import Landingpage from "../src/pages/Landingpage"
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import {AuthProvider} from "./context/AuthContext";
import PageNotfound from "./pages/PageNotfound";

function App() {
  return (
    <AuthProvider>
      <TodoItemsProvider>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/todos" element={<Home />} />
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </div>
      </TodoItemsProvider>
    </AuthProvider>
  );
}

export default App;
