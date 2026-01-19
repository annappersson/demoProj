import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CitiesPage from "./pages/CitiesPage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/partials/Navigation";
import MyPage from "./pages/MyPage";
import ContactPage from "./pages/ContactPage";
import "./assets/style/Main.scss";
import Footer from "./pages/partials/Footer";

function App() {
  return (
    <div className="app-layout">
      <Navigation />
      <ToastContainer />
      <main className="main-content">
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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
