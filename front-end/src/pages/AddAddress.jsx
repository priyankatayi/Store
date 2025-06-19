import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ name, type, placeholder, onChange, address }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      address={address}
      name={name}
      value={address[name]}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

function AddAddress() {
  const { navigate, axios, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping
        <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex  flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={onChangeHandler}
                address={address}
              />
              <InputField
                name="lastName"
                placeholder="Last Name"
                type="text"
                onChange={onChangeHandler}
                address={address}
              />
            </div>
            <InputField
              name="email"
              placeholder="Email Address"
              onChange={onChangeHandler}
              address={address}
              type="email"
            />
            <InputField
              name="street"
              type="text"
              placeholder="Street"
              onChange={onChangeHandler}
              address={address}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="city"
                placeholder="City"
                type="text"
                onChange={onChangeHandler}
                address={address}
              />
              <InputField
                name="state"
                placeholder="State"
                type="text"
                onChange={onChangeHandler}
                address={address}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="zipcode"
                placeholder="Zip code"
                type="number"
                onChange={onChangeHandler}
                address={address}
              />
              <InputField
                name="country"
                placeholder="Country"
                type="text"
                onChange={onChangeHandler}
                address={address}
              />
            </div>
            <InputField
              name="phone"
              placeholder="Phone Number"
              type="number"
              onChange={onChangeHandler}
              address={address}
            />
            <button className="w-full mt-6 bg-primary cursor-pointer text-white py-3 hover:bg-primary-dull transition uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_iamge}
          className="md:mr-16 mb-16 md:mt-0"
          alt="add-address"
        />
      </div>
    </div>
  );
}

export default AddAddress;
