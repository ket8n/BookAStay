import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./contexts/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import React, { Suspense } from "react";

const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const Login = React.lazy(() => import("./pages/Login"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const PlacesPage = React.lazy(() => import("./pages/PlacesPage"));
const PlacesFormPage = React.lazy(() => import("./pages/PlacesFormPage"));
const PlacePage = React.lazy(() => import("./pages/PlacePage"));
const BookingsPage = React.lazy(() => import("./pages/BookingsPage"));
const BookingPage = React.lazy(() => import("./pages/BookingPage"));

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_API;

function App() {
  return (
    <SnackbarProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <UserContextProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<ProfilePage />} />
                <Route path="/account/places" element={<PlacesPage />} />
                <Route
                  path="/account/places/new"
                  element={<PlacesFormPage />}
                />
                <Route
                  path="/account/places/:id"
                  element={<PlacesFormPage />}
                />
                <Route path="/place/:id" element={<PlacePage />} />
                <Route path="/account/bookings" element={<BookingsPage />} />
                <Route path="/account/bookings/:id" element={<BookingPage />} />
              </Route>
            </Routes>
          </Suspense>
        </UserContextProvider>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  );
}

export default App;
