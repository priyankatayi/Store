import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductCategory() {
  const { products } = useAppContext();
  const [filteredList, setFilteredList] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    if (category?.length > 0) {
      const list = products.filter(
        (item) => item.category.toLowerCase() === category && item.inStock,
      );
      setFilteredList(list);
    } else setFilteredList(products);
  }, [category, products]);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">
        {category?.toUpperCase()}
      </p>

      {filteredList?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {filteredList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl md:text-3xl font-medium">
            No Products found in this category
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCategory;
