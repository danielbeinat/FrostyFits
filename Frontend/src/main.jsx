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

// Performance monitoring
if (import.meta.env.PROD) {
  // Report web vitals
  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

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
