import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Greeting from "./dashboard-component/user-management/Greeting";
import CardProfile from "./dashboard-component/user-management/CardProfile";
import BillHistory from "./dashboard-component/user-management/BillHistory";
import AdminTableUser from "./dashboard-component/admin-management/AdminTableUser";
import { useEffect, useState } from "react";
import ErrorPage from "./dashboard-component/ErrorPage";

// Test dashboard (please delete)
function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const loggedUser = localStorage.getItem("logged");
        if (loggedUser === "admin@mail.com") {
          setIsAdmin(true);
        }

        if (loggedUser) {
          setLogin(true);
        }
      } catch (error) {
        console.log("Error checking admin role: ", error);
      }
    };

    checkAdminRole();
  }, []);

  return (
    <>
      {isLogin ? (
        isAdmin ? (
          <div className="max-h-screen mt-8 flex justify-center">
            <AdminTableUser />
          </div>
        ) : (
          <div className="max-h-screen mt-8">
            <div className="flex gap-4 justify-center mb-4">
              <div className="flex flex-col space-y-4 justify-center ">
                <Greeting userData={userData} />
                <div className="flex gap-5">
                  <BillHistory />
                </div>
              </div>
              <div>
                <CardProfile setUserData={setUserData} />
              </div>
            </div>
          </div>
        )
      ) : (
        <ErrorPage />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Dashboard;
