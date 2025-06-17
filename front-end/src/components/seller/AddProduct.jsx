import React, { useState } from "react";
import { categories, assets } from "../../assets/assets";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    image: [],
    description: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    name="images"
                    onChange={(e) => {
                      const updatedImages = [...product.image];
                      updatedImages[index] = e.target.files[0];
                      setProduct({ ...product, image: updatedImages });
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      product.image[index]
                        ? URL.createObjectURL(product.image[index])
                        : assets.upload_area
                    }
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            value={product.name}
            onChange={onChangeHandler}
            required
            name="name"
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            value={product.description}
            onChange={onChangeHandler}
            name="description"
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={onChangeHandler}
            value={product.category}
            name="category"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} name="category" value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              value={product.price}
              onChange={onChangeHandler}
              name="price"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              value={product.offerPrice}
              onChange={onChangeHandler}
              name="offerPrice"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer px-8 py-2.5 bg-primary text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
