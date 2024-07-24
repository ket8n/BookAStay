import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./contexts/UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_API;

function App() {
  return (
    <SnackbarProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/account/bookings" element={<BookingsPage />} />
              <Route path="/account/bookings/:id" element={<BookingPage />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  );
}

export default App;
