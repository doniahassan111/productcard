import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaShoppingCart, FaBalanceScale } from "react-icons/fa";
import ProductCard from "./components/ProductCard";
import products from "./data/products.json";
import useCompareStore from "./compareStore";
import useCartStore from "./cartStore";

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "ar");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("dark") === "true");

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    localStorage.setItem("lang", newLang);
    setLanguage(newLang);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    localStorage.setItem("dark", newMode);
    setDarkMode(newMode);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const { comparedProducts, removeFromCompare } = useCompareStore();
  const { cartItems } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-6 transition-all">
      <div className="flex flex-wrap justify-center gap-6 mb-6 items-center">
        {/* Language Toggler */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1">
          <span
            className={`text-sm font-medium rounded-full px-2 ${
              language === "ar" ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-300"
            }`}
          >
            العربية
          </span>
          <button
            onClick={toggleLanguage}
            aria-label="Toggle Language"
            className="relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span
              className={`${
                language === "ar" ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
            <span
              className={`absolute left-1 top-1 text-xs ${
                language === "ar" ? "text-blue-600" : "text-gray-400"
              }`}
            >
              AR
            </span>
            <span
              className={`absolute right-1 top-1 text-xs ${
                language === "ar" ? "text-gray-400" : "text-blue-600"
              }`}
            >
              EN
            </span>
          </button>
          <span
            className={`text-sm font-medium rounded-full px-2 ${
              language === "ar" ? "text-gray-600 dark:text-gray-300" : "bg-blue-600 text-white"
            }`}
          >
            English
          </span>
        </div>

        {/* Dark Mode Toggler */}
        <div className="flex items-center  space-x-3 rtl:space-x-reverse">
          <span className="text-sm font-medium">{darkMode ? "Dark" : "Light"}</span>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ring-yellow-500"
          >
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 bg-yellow-400 rounded-full transition-transform flex items-center justify-center text-yellow-900`}
            >
              {darkMode ? <MdDarkMode size={16} /> : <MdLightMode size={16} />}
            </span>
          </button>
        </div>

        {comparedProducts.length > 0 && (
          <Link
            to={`/compare?lang=${language}`}
            className="bg-green-600 text-white px-5 py-3 rounded-3xl shadow-md flex items-center gap-3 transition-colors duration-300 ease-in-out hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <FaBalanceScale className="inline-block mr-2 text-lg" />
            <span className="font-semibold text-base">
              {language === "ar" ? "عرض المقارنة" : "View Comparison"}
            </span>
          </Link>
        )}

        <Link
          to={`/cart?lang=${language}`}
          className="bg-pink-600 text-white px-5 py-3 rounded-3xl shadow-md flex items-center gap-3 transition-colors duration-300 ease-in-out hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600"
        >
          <FaShoppingCart className="inline-block mr-2 text-lg" />
          <span className="font-semibold text-base">
            {language === "ar" ? "السلة" : "Cart"} ({cartItems.length})
          </span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} language={language} />
        ))}
      </div>

      {comparedProducts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-md p-1 rounded mb-2">
          <h2 className="text-lg font-bold mb-2">
            {language === "ar" ? "منتجات للمقارنة" : "Products to Compare"}
          </h2>
          <div className="flex gap-2 overflow-x-auto">
            {comparedProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[200px] border p-2 rounded bg-gray-50 dark:bg-gray-700 text-center relative"
              >
                <button
                  onClick={() => removeFromCompare(product.id)}
                  aria-label="Remove from compare"
                  className="absolute top-1 right-1 text-red-600 dark:text-gray-300 hover:text-red-900 dark:hover:text-red-400"
                >
                  ✖
                </button>
                <img
                  src={product.image}
                  alt={product.name[language]}
                  className="h-24 w-full object-cover rounded mb-2"
                />
                <p className="font-medium">{product.name[language]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
