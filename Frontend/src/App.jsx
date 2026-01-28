import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Footer } from "./Components/Footer/Footer";
import { ChatBox } from "./Components/ChatBox/ChatBox";
import { Newsletter } from "./Components/Main/Newsletter/Newsletter";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "./Components/UI/LoadingSpinner/LoadingSpinner";

const Home = lazy(() =>
  import("./Pages/Home").then((m) => ({ default: m.Home })),
);
const Cart = lazy(() =>
  import("./Pages/Cart").then((m) => ({ default: m.Cart })),
);
const Login = lazy(() =>
  import("./Pages/Login").then((m) => ({ default: m.Login })),
);
const Register = lazy(() =>
  import("./Pages/Register").then((m) => ({ default: m.Register })),
);
const Product = lazy(() =>
  import("./Pages/Product").then((m) => ({ default: m.Product })),
);
const Category = lazy(() =>
  import("./Pages/Category").then((m) => ({ default: m.Category })),
);
const SearchPage = lazy(() =>
  import("./Pages/SearchPage").then((m) => ({ default: m.SearchPage })),
);
const Checkout = lazy(() =>
  import("./Components/Checkout/Checkout").then((m) => ({
    default: m.Checkout,
  })),
);
const Shirts = lazy(() =>
  import("./Pages/CollectionClothing/Shirts").then((m) => ({
    default: m.Shirts,
  })),
);
const Jacket = lazy(() =>
  import("./Pages/CollectionClothing/Jacket").then((m) => ({
    default: m.Jacket,
  })),
);
const Pants = lazy(() =>
  import("./Pages/CollectionClothing/Pants").then((m) => ({
    default: m.Pants,
  })),
);
const Favorite = lazy(() =>
  import("./Pages/Favorite").then((m) => ({ default: m.Favorite })),
);

const Contacto = lazy(() =>
  import("./Components/InfoPages/Contacto").then((m) => ({
    default: m.Contacto,
  })),
);
const FormasPago = lazy(() =>
  import("./Components/InfoPages/FormasPago").then((m) => ({
    default: m.FormasPago,
  })),
);
const Envios = lazy(() =>
  import("./Components/InfoPages/Envios").then((m) => ({ default: m.Envios })),
);
const CambiosDevoluciones = lazy(() =>
  import("./Components/InfoPages/CambiosDevoluciones").then((m) => ({
    default: m.CambiosDevoluciones,
  })),
);
const Locales = lazy(() =>
  import("./Components/InfoPages/Locales").then((m) => ({
    default: m.Locales,
  })),
);
const VentaMayorista = lazy(() =>
  import("./Components/InfoPages/VentaMayorista").then((m) => ({
    default: m.VentaMayorista,
  })),
);
const PoliticaPrivacidad = lazy(() =>
  import("./Components/InfoPages/PoliticaPrivacidad").then((m) => ({
    default: m.PoliticaPrivacidad,
  })),
);
const TerminosCondiciones = lazy(() =>
  import("./Components/InfoPages/TerminosCondiciones").then((m) => ({
    default: m.TerminosCondiciones,
  })),
);

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" />
  </div>
);

export const App = () => {
  return (
    <div className="app">
      <ErrorBoundary>
        <Navbar />

        <main
          id="main-content"
          className="main-content"
          tabIndex="-1"
          role="main"
        >
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Product routes with nested structure */}
              <Route path="/product" element={<Product />}>
                <Route path=":productId" element={<Product />} />
              </Route>

              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* User routes */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Category routes */}
              <Route path="/men" element={<Category category="men" />} />
              <Route path="/women" element={<Category category="women" />} />
              <Route path="/kid" element={<Category category="kid" />} />
              <Route path="/shoes" element={<Category category="shoes" />} />

              {/* Collection routes */}
              <Route path="/shirts" element={<Shirts />} />
              <Route path="/jacket" element={<Jacket />} />
              <Route path="/pants" element={<Pants />} />

              {/* Search route */}
              <Route path="/search/:searchQuery" element={<SearchPage />} />

              {/* Info pages routes */}
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/formas-pago" element={<FormasPago />} />
              <Route path="/envios" element={<Envios />} />
              <Route
                path="/cambios-devoluciones"
                element={<CambiosDevoluciones />}
              />
              <Route path="/locales" element={<Locales />} />
              <Route path="/venta-mayorista" element={<VentaMayorista />} />
              <Route
                path="/politica-privacidad"
                element={<PoliticaPrivacidad />}
              />
              <Route
                path="/terminos-condiciones"
                element={<TerminosCondiciones />}
              />

              {/* Catch all route for 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Página no encontrada
                      </h1>
                      <p className="text-gray-600 mb-8">
                        La página que buscas no existe.
                      </p>
                      <a
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        aria-label="Ir a la página de inicio"
                      >
                        Ir al inicio
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </main>

        <ChatBox />
        <Newsletter />
        <Footer />
      </ErrorBoundary>
    </div>
  );
};
