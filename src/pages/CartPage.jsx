// 📁 pages/CartPage.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useCartStore from "../cartStore";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const CartPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const language = queryParams.get("lang") || "ar";

  const t = language === "ar" ? ar : en;
  const isArabic = language === "ar";

  const { cartItems, removeFromCart } = useCartStore();

  const getTotalPrice = () =>
    cartItems.reduce((total, product) => {
      if (product.type === "simple") return total + product.price;
      if (product.type === "variable") {
        const min = Math.min(...product.variations.map((v) => v.price));
        return total + min;
      }
      return total;
    }, 0);

  return (
    <div
      className={`min-h-screen p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          {isArabic ? "سلة التسوق" : "Shopping Cart"}
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">
            {isArabic ? "السلة فارغة" : "Your cart is empty."}
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200 text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-2">{t.image || "Image"}</th>
                    <th className="p-2">{t.name || "Name"}</th>
                    <th className="p-2">{t.price || "Price"}</th>
                    <th className="p-2">{t.type || "Type"}</th>
                    <th className="p-2">{t.remove || "Remove"}</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product) => (
                    <tr key={product.id} className="text-center border-t">
                      <td className="p-2">
                        <img
                          src={product.image}
                          alt={product.name[language]}
                          className="h-16 mx-auto"
                        />
                      </td>
                      <td className="p-2">{product.name[language]}</td>
                      <td className="p-2">
                        {product.type === "simple"
                          ? `${product.price} BHD`
                          : `${Math.min(...product.variations.map((v) => v.price))} - ${Math.max(
                              ...product.variations.map((v) => v.price)
                            )} BHD`}
                      </td>
                      <td className="p-2">
                        {product.type === "simple" ? t.simple : t.variable}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          {isArabic ? "حذف" : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-xl font-semibold text-green-700 text-center">
              {isArabic
                ? `الإجمالي: ${getTotalPrice()} دينار بحريني`
                : `Total: ${getTotalPrice()} BHD`}
            </div>
          </>
        )}

        <div className="mt-6 text-center">
          <Link
            to={`/?lang=${language}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;