import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignIn from "./Pages/Auth/signin/Signin";
import SignUp from "./Pages/Auth/signup/Signup";
import DashBoard from "./Pages/DashBoard/DashBoard";
import LeadList from "./Pages/Table/LeadList";
import CreateLead from "./Pages/CreateLead/CreateLead";
import AppLayout from "./AppLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import EditLead from "./Pages/EditLead/EditLead";
import ViewPage from "./Pages/ViewPage/ViewPage";
import Notifications from "./Pages/Notifications/Notifications";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/view/:leadId",
          element: (
            <ProtectedRoute>
              <ViewPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/list-view",
          element: (
            <ProtectedRoute>
              <LeadList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/view/:leadId",
          element: (
            <ProtectedRoute>
              <ViewPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit/:leadId",
          element: (
            <ProtectedRoute>
              <EditLead />
            </ProtectedRoute>
          ),
        },
        {
          path: "/notifications",
          element: (
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          ),
        },
        {
          path: "/create-lead",
          element: (
            <ProtectedRoute>
              <CreateLead />
            </ProtectedRoute>
          ),
        },

        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
