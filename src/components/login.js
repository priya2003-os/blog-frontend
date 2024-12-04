import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const URL = "http://localhost:3011/users";

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const handleRegister = async (data) => {
    const res = await fetch(`${URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const dataFromBack = await res.json();

    if(dataFromBack.result) {
      reset();
      toast.success("Account successfully created");
    } else {
      toast.error("Username already exists, please use another one", {
        position: "top-right",
      });
    }
  };
    return(
     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">Sign up to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form 
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-6" 
        >
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-white-900">Username</label>
            <div className="mt-2">
              <input 
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must have at least 3 characters",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <div>
               {errors.username && (
                <span>
                  {errors.username.message}
                </span>
              )}

              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white-900">Password</label>
            </div>
            <div className="mt-2">
              <input 
              type="password" 
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character.",
                },
              })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
            <div>
              {errors.password && (
                <span>
                  {errors.password.message}
                </span>
              )}
              </div>

          </div>
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already an account?
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">signup</a>
        </p>
      </div>
</div>
    )
};

export default Login;