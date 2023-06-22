import React from "react";
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
// Users
const AddEmployee = React.lazy(() =>
  import("./views/employee/addEmployee/AddEmployee")
);
const UpdateEmployee = React.lazy(() =>
  import("./views/employee/updateEmployee/UpdateEmployee")
);
const ViewEmployee = React.lazy(() =>
  import("./views/employee/viewEmployee/ViewEmployee")
);
const UpdateField = React.lazy(() =>
  import("./views/employee/updateFields/UpdateFields")
);
const AppRegister = React.lazy(() => import("./components/AppRegister")
);
const AppLogin = React.lazy(() => import("./components/AppLogin")
);

const user = JSON.parse(localStorage.getItem("user"));
const isAdmin = user && user.role === "admin";

const adminRoutes = [
  { path: "admin/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/users", name: " Manage Users", element: ViewEmployee, exact: true },
  { path: "/users/add", name: "Add Users", element: AddEmployee },
  { path: "/users/update", name: "Update Users", element: UpdateEmployee },
  { path: "/users/view", name: "View Users", element: ViewEmployee },
  { path: "/users/register", name: "Register Users", element: AppRegister },
  { path: "/login", name: "Login Users", element: AppLogin },
  { path: "/users/updateData/UpdateField/:id", name: "Edit User", element: UpdateField,},
];

const userRoutes = [
  { path: "/users", name: " Manage Users", element: ViewEmployee, exact: true },
  { path: "/login", name: "Login Users", element: AppLogin },
];

const routes = isAdmin ? adminRoutes : userRoutes;

export default routes;
