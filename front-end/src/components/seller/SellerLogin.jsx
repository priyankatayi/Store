import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

function SellerLogin() {
  const { isSeller, navigate, setIsSeller } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsSeller(true);
  };
  return (
    !isSeller && (
      <div className="absolute inset-0 flex justify-center items-center bg-black/30 z-10">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-indigo-500">Seller</span> {"Login"}
          </p>

          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
}

export default SellerLogin;
