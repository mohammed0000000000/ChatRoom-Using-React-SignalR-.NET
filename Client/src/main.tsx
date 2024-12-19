import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </StrictMode>
  </ReduxProvider>
);
