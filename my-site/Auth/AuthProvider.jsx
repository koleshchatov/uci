import React from "react";
import { AuthProvider } from "./AuthContext";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
