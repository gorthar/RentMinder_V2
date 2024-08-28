import { PropTypes } from "prop-types";
import GoogleLoginButton from "../../SharedComponents/GoogleLoginButton";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default function SigUp({ setOpenAuthModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSignUpFormSubmit(data) {
    if (data.password !== data["confirm-password"]) {
      console.log("Passwords do not match");
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center sm:px-4 py-2 mx-auto  lg:py-0">
        <a
          href="/"
          className="flex items-center mb-1 text-2xl font-semibold text-gray-900 dark:text-white"
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
          RentMinder
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-2 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <GoogleLoginButton setOpenAuthModal={setOpenAuthModal} upIn="Up" />
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSignUpFormSubmit)}
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
                    required: true,
                    pattern: /^\S+@\S+$/,
                  })}
                />
                {errors.email && (
                  <span className="text-red-500"> {errors.email.message} </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="Name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  placeholder="John"
                  className={
                    "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.Name
                      ? " border-red-700"
                      : " border-gray-300 dark:border-gray-700")
                  }
                  {...register("Name", {
                    required: true,
                  })}
                />
                {errors.Name && (
                  <span className="text-red-500"> {errors.Name.message} </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="Last Name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="Last Name"
                  id="Last Name"
                  placeholder="Doe"
                  className={
                    "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors["Last Name"]
                      ? " border-red-700"
                      : " border-gray-300 dark:border-gray-700")
                  }
                  {...register("Last Name", {
                    required: true,
                  })}
                />
                {errors["Last Name"] && (
                  <span className="text-red-500">
                    {" "}
                    {errors["Last Name"].message}{" "}
                  </span>
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
                    "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors.password
                      ? " border-red-700"
                      : " border-gray-300 dark:border-gray-700")
                  }
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {" "}
                    {errors.password.message}{" "}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={
                    "bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" +
                    (errors["confirm-password"]
                      ? " border-red-700"
                      : " border-gray-300 dark:border-gray-700")
                  }
                  {...register("confirm-password", {
                    required: true,
                    minLength: 8,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  })}
                />
                {errors["confirm-password"] && (
                  <span className="text-red-500">
                    {" "}
                    {errors["confirm-password"].message}{" "}
                  </span>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    {...register("terms", { required: true })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {errors.terms && (
                <span className="text-red-500"> {errors.terms.message} </span>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

SigUp.propTypes = {
  setOpenAuthModal: PropTypes.func.isRequired,
};