import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter.tsx";
import { store } from "./store/store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </StrictMode>
);
