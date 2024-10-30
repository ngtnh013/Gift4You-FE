import React from "react";
import { useForm } from "react-hook-form";
import LoginPageImage from "../../assets/LoginPageImage.png";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Xử lý đăng nhập ở đây (ví dụ: gọi API)
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      <div className="col-span-7 relative">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${LoginPageImage})`,
          }}
        >
          {/* Overlay sáng */}
          <div className="absolute inset-0 bg-white opacity-20"></div>
        </div>
      </div>

      <div
        className="col-span-5 flex items-center justify-center"
        style={{
          backgroundColor: "#FFE1BB",
        }}
      >
        <div className="w-3/4 max-w-md">
          <h2 className="font-bold text-2xl text-left mb-2">
            Log in to Gift4You
          </h2>
          <h3 className="text-gray-600 text-left mb-6">
            Enter your details below
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Email or Phone Number"
                style={{
                  backgroundColor: "#FFE1BB",
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="Password"
                style={{
                  backgroundColor: "#FFE1BB",
                }}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#DB4444" }}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
