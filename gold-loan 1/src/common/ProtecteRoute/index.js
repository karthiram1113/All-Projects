import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     fetch("/api/check-auth", { credentials: "include" })
//       .then(res => res.json())
//       .then(data => setAuth(data.authenticated));
//   }, []);

//   if (auth === null) return null; // loading

//   if (!auth) return <Navigate to="/" replace />;

//   return children;


  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/" replace />;
  }

  return children;
}
