import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account/:subpage?" element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
