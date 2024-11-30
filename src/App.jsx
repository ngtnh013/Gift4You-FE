import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Sửa đổi ở đây
import HomePage from "./pages/Home";
import ShopPage from "./pages/Shop";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
