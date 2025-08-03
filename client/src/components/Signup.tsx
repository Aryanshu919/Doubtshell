import { motion } from "motion/react";
import Footer from "./Footer";
import { useState, type FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const res = await axios.post(`${SERVER_URL}/api/auth/register`, formData, {withCredentials:true})
    console.log("form data", res);
    toast.success("Registered successfully")

    setFormData({ name:'', email:'', password:''})
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 1020 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="my-35 bg-white max-w-[400px] min-h-[500px] rounded-xl mx-auto shadow-xl/50"
      >
        <div className="py-18">
          <div className="text-center">
            <h1 className="font-primary pt-3 font-semibold text-2xl ">
              Create a new account{" "}
            </h1>
            <p className="font-secondary max-w-[250px] mx-auto mt-2 text-wrap leading-4">
              Hey, Enter your deatils to create a new account{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5 mx-3">
              <input
                onChange={handleChange}
                name="name"
                value={formData.name}
                className="w-full font-secondary bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter your Name"
                required
              />
            </div>

            <div className="mt-5 mx-3">
              <input
                onChange={handleChange}
                name="email"
                value={formData.email}
                className="w-full font-secondary bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Enter your Email..."
                required
              />
            </div>

            <div className="mt-5 mx-3">
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  type="text"
                  name="password"
                  className="font-secondary w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your password"
                  required
                />
                <p className="flex items-start mt-2 text-xs text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-1.5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Use at least 8 characters, one uppercase, one lowercase and
                  one number.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-4 max-w-[380px]">
              <motion.button
                type="submit"
                initial={{
                  y: 0,
                  backgroundColor: "rgb(253, 224, 71)",
                }}
                whileHover={{
                  y: -3,
                  backgroundColor: "white",
                }}
                transition={{
                  y: { duration: 0.3, ease: "easeInOut" },
                  backgroundColor: { duration: 3 },
                }}
                className="md:bg-yellow-300 w-full shadow-[4px_4px_0_#000] rounded-sm  mr-3 border-2 font-primary border-black cursor-pointer"
              >
                Sign up
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Signup;
