// 📁 pages/ComparePage.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useCompareStore from "../compareStore";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const ComparePage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const language = queryParams.get("lang") || "ar";

  const t = language === "ar" ? ar : en;
  const isArabic = language === "ar";
  const { comparedProducts, removeFromCompare } = useCompareStore();

  return (
    <div
      className={`min-h-screen p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          {language === "ar" ? "مقارنة المنتجات" : "Compare Products"}
        </h1>

        {comparedProducts.length === 0 ? (
          <p className="text-gray-500 text-center">
            {language === "ar" ? "لا توجد منتجات" : "No products to compare."}
          </p>
        ) : (
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
                {comparedProducts.map((product) => (
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
                        onClick={() => removeFromCompare(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        {language === "ar" ? "حذف" : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to={`/?lang=${language}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;