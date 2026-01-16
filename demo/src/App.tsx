import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CitiesPage from "./pages/CitiesPage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
// import Navigation from "./pages/partials/Navigation";

function App() {
  return (
    <>
      {/* <Navigation /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cities"
          element={
            <ProtectedRoute>
              <CitiesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
