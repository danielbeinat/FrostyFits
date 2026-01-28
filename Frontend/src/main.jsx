import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ShoopProvider } from "./Context/ShoopContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary.jsx";
import {
  AccessibilityProvider,
  SkipToMain,
} from "./Components/UI/Accessibility/AccessibilityProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AccessibilityProvider>
    <SkipToMain />
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ShoopProvider>
            <App />
          </ShoopProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </AccessibilityProvider>,
);
