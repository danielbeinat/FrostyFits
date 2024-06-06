import { Link } from "react-router-dom";
import { collectionData } from "/src/assets/Collections/Collections.js";

export const Collections = () => {
  return (
    <>
      <section className="grid grid-cols-1 gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
        {collectionData.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            onClick={() => window.scrollTo(0, 0)}
          >
            <article
              className="relative cursor-pointer brightness-90 hover:brightness-100"
              key={item.id}
            >
              <img
                className="h-[550px] w-full object-cover 

              rounded"
                src={item.image}
                alt={item.name}
              />
              <div className="absolute bottom-0 mx-auto flex flex-col justify-center right-28 bg- items-center p-5">
                <h1 className="text-white text-xl font-bold">{item.name}</h1>
                <p className="text-white">{item.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
};
