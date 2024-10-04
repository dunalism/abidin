Folder ini untuk file router untuk atur routing dari satu page ke page lain
dokumentasi: https://reactrouter.com/en/main/routers/create-browser-router
contoh untuk isi router.jsx:

import Homepage from "../views/Homepage";
import Register from "../views/Register";
... (tambah sendiri)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // Wrap routes inside Layout
    children: [
      {
        path: "/", 
        element: <Dashboard />
      },
      {
        // Add other routes here if needed ...
      },
    ],
  },
])  