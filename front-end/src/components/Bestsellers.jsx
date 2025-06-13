import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

function Bestsellers() {
  const { products } = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {products?.length ? (
          products
            .filter((product) => product.inStock)
            .splice(0, 5)
            .map((product) => <ProductCard product={product} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Bestsellers;
