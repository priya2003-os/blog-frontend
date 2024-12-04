import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";

const Login = () => {
    const URL = "http://localhost:3011/users";

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        mode: "onBlur",
      });

      const HandleConnect = async (data) => {
        const res = await fetch(`${URL}/signin`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const dataFromBack = await res.json();
        console.log({dataFromBack});
        
        if(dataFromBack.result) {
            // window.location.href = "/";
            dispatch(login(data.username))
        } else {
            toast.error("Wrong username / password", {
                position: "top-right",
              });
        
        }
      }

    return(
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=green&shade=600" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form 
    onSubmit={handleSubmit(HandleConnect)}
    className="space-y-6"
    >
      <div>
        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
        <div className="mt-2">
          <input 
          type="text"
          {...register("username", {
            required: "Username is required",
          })} 
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
          />
        </div>
        <div>
            {errors.username && (
            <span>
                {errors.username.message}
            </span>
        )}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div className="mt-2">
          <input 
          type="password" 
          {...register("password", {
            required: "Password is required",
          })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm/6"
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
        <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      <a href="/signup" className="font-semibold text-green-600 hover:text-green-500">Sign up</a>
    </p>
  </div>
</div>

    )
};

export default Login;