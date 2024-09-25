import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";
import { PropTypes } from "prop-types";
import GoogleLoginButton from "../../SharedComponents/GoogleLoginButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login({ setOpenAuthModal, isLandlord }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function onLoginFormSubmit(data) {
    const auth = getAuth();
    try {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const _user = userCredential.user;
          console.log(_user);

          toast.success("Logged in successfully");

          setOpenAuthModal({ open: false, isLogin: true });
          // TODO redirect to tenant or landlord dashboard
          console.log(isLandlord);
          if (isLandlord) {
            // redirect to landlord dashboard
            navigate("/landlord");
          } else {
            // redirect to tenant dashboard
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          console.log(errorCode, errorMessage);
          if (errorCode === "auth/invalid-credential") {
            setError("Email or password is wrong, please try again");
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 modal">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 mr-2 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          RentMinder {isLandlord ? "Landlord" : "Tenant"}
        </a>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onLoginFormSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={
                    "bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.email
                      ? " border-red-700"
                      : " border-gray-300 dark:border-gray-700")
                  }
                  placeholder="name@company.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Email is not valid",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500"> {errors.email.message} </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={
                    "bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.password
                      ? " border-red-700"
                      : " border-gray-300 dark:border-gray-700")
                  }
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message:
                        "Password must contain at least one letter and one number",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {" "}
                    {errors.password.message}{" "}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start "></div>
                <a
                  href="#"
                  className="text-sm font-medium hidden text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <div className="flex items-center">
                <hr className="flex-grow" />
                <span className="mx-5">Or</span>
                <hr className="flex-grow" />
              </div>
              <div className=" sm:px-0 max-w-sm">
                <GoogleLoginButton
                  setOpenAuthModal={setOpenAuthModal}
                  upIn={"in"}
                />
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
            {error && <div className="text-red-500"> {error} </div>}
          </div>
        </div>
      </div>
    </section>
  );
}

Login.propTypes = {
  setOpenAuthModal: PropTypes.func,
  isLandlord: PropTypes.bool,
};
