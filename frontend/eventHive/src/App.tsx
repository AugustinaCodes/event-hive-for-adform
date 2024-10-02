import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ListPage from "./pages/ListPage/ListPage";
import EditPage from "./pages/EditPage/EditPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BasketPage from "./pages/BasketPage/BasketPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/listpage" element={<ListPage />} />
        <Route path="/events/edit/:id" element={<EditPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/basket" element={<BasketPage />} />
      </Routes>
    </>
  );
}

export default App;
