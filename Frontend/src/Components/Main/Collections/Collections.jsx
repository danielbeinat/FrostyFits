import { Link } from "react-router-dom";
import { collectionData } from "/src/assets/Collections/Collections.js";

import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ name, image, to }) => (
  <motion.div
    className="relative overflow-hidden rounded-lg cursor-pointer"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <Link to={to} className="block" onClick={() => window.scrollTo(0, 0)}>
      <div className="aspect-[3/4] w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <div className="flex items-center group">
            <span className="text-sm font-medium">Ver más</span>
            <svg
              className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export const Collections = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionData.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              to={category.to}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
