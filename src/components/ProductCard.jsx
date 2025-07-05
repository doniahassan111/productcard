import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaSyncAlt, FaCheck, FaShoppingCart, FaShoppingBag, FaShareAlt } from "react-icons/fa";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";
import useCompareStore from "../compareStore";
import useCartStore from "../cartStore";

const ProductCard = ({ product, language }) => {
  const t = language === "ar" ? ar : en;
  const isArabic = language === "ar";
  const name = product.name[language];

  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem(`like-${product.id}`);
    return saved === "true";
  });

  const toggleLike = () => {
    const newValue = !liked;
    setLiked(newValue);
    localStorage.setItem(`like-${product.id}`, newValue);
  };

  const { comparedProducts, addToCompare, removeFromCompare } = useCompareStore();
  const isCompared = comparedProducts.find((p) => p.id === product.id);

  const toggleCompare = () => {
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const isInCart = cartItems.find((item) => item.id === product.id);

  const toggleCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const discountPercent = product.discount
    ? Math.round((product.discount / product.original_price) * 100)
    : null;

  const getPriceDisplay = () => {
    if (product.type === "simple") {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{product.price} BHD</span>
          {product.discount && (
            <span className="line-through text-gray-400">{product.original_price} BHD</span>
          )}
        </div>
      );
    } else if (product.type === "variable") {
      const prices = product.variations.map((v) => v.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return (
        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
          {`${t.from} ${min} ${t.to} ${max} BHD`}
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className={`w-80 border rounded-2xl p-4 shadow-lg relative bg-white dark:bg-gray-800 dark:text-white transition-all duration-300 ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ✅ Badges */}
      <div className="absolute top-2 left-2 flex gap-2">
        {product.is_featured && (
          <span className="bg-yellow-400 text-white px-2 py-1 text-xs rounded">
            {t.featured}
          </span>
        )}
        {product.ai_suggested && (
          <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">
            {t.ai_suggested}
          </span>
        )}
      </div>

      {/* ✅ Image */}
      <img
        src={product.image}
        alt={name}
        className="w-full h-56 object-cover rounded-xl mb-4"
      />

      {/* ✅ Name */}
      <h3
        className={`text-2xl font-semibold mb-2 ${
          language === "ar" ? "text-yellow-600" : "text-yellow-600"
        }`}
      >
        {name}
      </h3>

      {/* ✅ Price */}
      {getPriceDisplay()}

      {/* ✅ Discount */}
      {discountPercent && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {discountPercent}% {t.off}
        </div>
      )}

      {/* ✅ Type */}
      <div className="mt-2 text-gray-500 text-sm dark:text-gray-300">
        {product.type === "simple" ? t.simple : t.variable}
      </div>

      {/* ✅ Icons */}
      <div className="flex justify-between items-center mt-4 text-2xl">
        <button
          onClick={toggleLike}
          title={t.like}
          className="transition-transform hover:scale-125 active:scale-95"
        >
          {liked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </button>

        <button
          onClick={toggleCompare}
          title={t.compare}
          className="transition-transform hover:scale-125 active:scale-95"
        >
          {isCompared ? <FaCheck className="text-green-600" /> : <FaSyncAlt />}
        </button>

        <button
          onClick={toggleCart}
          title="Add to Cart"
          className="transition-transform hover:scale-125 active:scale-95"
        >
          {isInCart ? <FaShoppingBag className="text-blue-600" /> : <FaShoppingCart />}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            product.name[language] + " - " + product.image
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share"
          className="transition-transform hover:scale-125 active:scale-95"
        >
          <FaShareAlt />
        </a>
      </div>
    </motion.div>
  );
};

export default ProductCard;
