import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/index";

function App() {
  return (
    <>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </>
  );
}

export default App;
