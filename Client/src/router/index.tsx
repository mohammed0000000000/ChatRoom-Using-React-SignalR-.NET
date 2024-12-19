// import ProtectedRoute from "@/components/Auth/ProtectRoute";
import ChatPage from "@/pages/Chat";
import JoinPage from "@/pages/Join";
// import cookiesServices from "@/services/cookiesServices";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// const user = cookiesServices.getCookie("user");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<JoinPage />} />
        <Route path="room" element={<ChatPage />} />
      </Route>
    </>
  )
);

export default router;
