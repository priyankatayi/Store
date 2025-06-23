import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 mb-14">
      <h1 className="md:text-4xl text-2xl font-semibold">Join Our VIP List!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Be the first to know about new drops, flash sales, and exclusive deals
        delivered to your inbox.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status) setStatus(null);
          }}
          placeholder="Enter your email id"
          required
          className={`h-full w-full px-3 text-gray-700 outline-none border rounded-md rounded-r-none border-r-0
            ${
              status === "error"
                ? "border-red-500 focus:ring-2 focus:ring-red-300"
                : "border-gray-300"
            }
          `}
        />

        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-600 mt-4">Thanks for subscribing!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4">Please enter a valid email address.</p>
      )}
    </div>
  );
};

export default NewsLetter;
