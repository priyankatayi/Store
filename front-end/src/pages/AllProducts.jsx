import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

function AllProducts() {
  const { products, searchQuery } = useAppContext();
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const list = products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery),
      );
      setFilteredList(list);
    } else setFilteredList(products);
  }, [searchQuery, products]);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">All Products</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filteredList?.length ? (
          filteredList
            .filter((item) => item.inStock)
            .map((product, index) => (
              <ProductCard key={product._id} product={product} />
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
