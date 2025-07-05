import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("currentUser"); // المفتاح اللي بتخزن فيه بيانات المستخدم بعد تسجيل الدخول

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
