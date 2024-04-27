import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { SearchProvider } from "./context/search.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import { DarkModeProvider } from "./providers/DarkModeContext .jsx";
import router from "./routes/Routes.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <DarkModeProvider>  
      <AuthProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </AuthProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
