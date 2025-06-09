import React from "react";
import { categories } from "../assets/assets";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {categories.map((category) => (
          <Link
            to={`/products/${category.path.toLowerCase()}`}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col  justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-108 transition ma-w-28"
            />
            <h2 className="text-sm font-medium text-center">{category.text}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
