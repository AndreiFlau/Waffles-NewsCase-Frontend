import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import "../styles/index.css";
import NotFound from "./NotFound.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Login from "./Pages/Login.tsx";
import User from "./Pages/User.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { AuthProvider } from "./context/auth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" index element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<User />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
