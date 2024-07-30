import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import UsersPage from "./pages/UsersPage";
import PropertiesPage from "./pages/PropertiesPage";
import BookingsPage from "./pages/BookingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
