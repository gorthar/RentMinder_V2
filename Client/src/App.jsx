import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardProvider } from "./Context/DashboardContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <DashboardProvider>
          <Outlet />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </DashboardProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
