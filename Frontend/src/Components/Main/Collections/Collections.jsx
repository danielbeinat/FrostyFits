// import { Link } from "react-router-dom";
// import { collectionData } from "/src/assets/Collections/Collections.js";

// export const Collections = () => {
//   return (
//     <>
//       <section className="grid grid-cols-1 font-parkinsans gap-5 px-5 md:grid-cols-1 lg:grid-cols-3">
//         {collectionData.map((item) => (
//           <Link
//             key={item.id}
//             to={item.to}
//             onClick={() => window.scrollTo(0, 0)}
//           >
//             <article
//               className="relative cursor-pointer brightness-90 hover:brightness-100"
//               key={item.id}
//             >
//               <img
//                 className="lg:h-[550px] lg:w-full lg:object-cover md:h-[400px] md:w-full md:object-cover h-[300px] w-full object-cover

//               rounded"
//                 src={item.image}
//                 alt={item.name}
//               />
//               <div className="absolute bottom-0 mx-auto flex flex-col justify-center right-28 bg- items-center p-5">
//                 <h1 className="text-white text-xl font-bold">{item.name}</h1>
//                 <p className="text-white">{item.description}</p>
//               </div>
//             </article>
//           </Link>
//         ))}
//       </section>
//     </>
//   );
// };

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
