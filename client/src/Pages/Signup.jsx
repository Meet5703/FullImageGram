import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Import Font Awesome icons
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Import user icon for signup button
import useAuth from "../Contexts/AuthStates";
import { useState } from "react";
import { useGoogleLogin } from "../utils/googleHook";
// import { BASE_URL } from "../Contexts/axiosInstence";

const Signup = () => {
  const { signUp } = useAuth();
  const { handleGoogleSignin } = useGoogleLogin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleGoogleSignUp = async () => {
    try {
      const response = await handleGoogleSignin();
      console.log("Google authentication successful:", response);
    } catch (error) {
      console.log("Google authentication failed:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-fit m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="mx-12 my-8">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-purple-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  onClick={handleGoogleSignUp}
                >
                  <div className="bg-white p-2 rounded-full">
                    <FontAwesomeIcon
                      color="#B65FFE"
                      size="2x" // Adjust size as needed
                      icon={faGoogle}
                    />
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>

              <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  className="w-full px-8 mb-5 py-4 rounded-lg font-medium bg-gray-100 border border-purple-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-purple-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-purple-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-purple-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <FontAwesomeIcon className="w-6 h-6 -ml-2" icon={faUser} />
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana&#39;s
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    {" "}
                    Terms of Service{" "}
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
