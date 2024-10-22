// /* eslint-disable react/no-unescaped-entities */
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import { Button, Checkbox } from "@material-tailwind/react";
// import { RiArrowLeftLine, RiErrorWarningLine } from "react-icons/ri";

// import { PrimaryBtn } from "../../components/Buttons";
// import { InputField } from "../../components/InputField";
// import { RouterData } from "../../router/RouterData";
// import { Link } from "react-router-dom";

// const Signin = () => {
//   const [data, setData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({ email: "", password: "", apiMsg: "" });
//   const [loading, setLoading] = useState(false);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleChange = (field, value) => {
//     setData((prevData) => ({ ...prevData, [field]: value }));
//     if (field === "email") {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         email: !validateEmail(value),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors((prev) => ({ ...prev, apiMsg: "" }));

//     if (!data.email || !data.password) {
//       setErrors((prev) => ({
//         ...prev,
//         apiMsg: "Please fill in all the fields",
//       }));
//       toast.error("Please fill in all the fields", {
//         className: "font-primary text-sm",
//       });
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("http://13.233.36.198:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: data.email,
//           password: data.password,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("Login successful!", {
//           className: "font-primary text-sm",
//         });
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           apiMsg: result.message || "Login failed. Please try again.",
//         }));
//         toast.error(result.message || "Login failed. Please try again.", {
//           className: "font-primary text-sm",
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       setErrors((prev) => ({
//         ...prev,
//         apiMsg: "An error occurred. Please try again",
//       }));
//       toast.error("An error occurred. Please try again", {
//         className: "font-primary text-sm",
//         position: "top-center",
//       });
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     document.title = "Sign in";
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col relative w-full mx-auto">
//       <header className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-none">
//         <div className="flex items-center space-x-2">
//           <img
//             src="/assets/logo.jpeg"
//             alt=""
//             className="w-full h-full max-w-[100px]"
//           />
//         </div>
//         <Button className="flex flex-row items-center gap-1 bg-background shadow-none text-mainBlack/80 normal-case font-primary font-medium rounded-full border border-border/10 hover:shadow-none hover:opacity-80">
//           <RiArrowLeftLine />
//           <span>Back</span>
//         </Button>
//       </header>

//       <main className="w-full max-w-md lg:max-w-full mx-auto p-8 rounded-lg my-12">
//         <h2 className="text-2xl font-semibold text-mainBlack/80">
//           Sign in to your account
//         </h2>
//         <p className="text-sm text-mainBlack/70 mt-1 font-normal font-primary">
//           Enter your details below to continue
//         </p>

//         <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
//           {errors.apiMsg && (
//             <div
//               className="bg-red-50/50 border border-red-400 text-red-700 px-4 py-2 rounded relative flex flex-row items-center justify-center gap-2"
//               role="alert"
//             >
//               <RiErrorWarningLine />
//               <span className="block sm:inline text-sm ml-1">
//                 {errors.apiMsg}
//               </span>
//             </div>
//           )}

//           <InputField
//             label="Username / Email"
//             type="email"
//             id="email"
//             isRequired={true}
//             containerClassName="w-full"
//             onChange={(e) => handleChange("email", e.target.value)}
//           />

//           <InputField
//             label="Password"
//             type="password"
//             id="password"
//             placeholder="**********"
//             isRequired={true}
//             containerClassName="w-full"
//             onChange={(e) => handleChange("password", e.target.value)}
//             value={data.password}
//           />

//           <div className="flex flex-row items-center gap-4">
//             <Checkbox label={"Rember Me"} color="green" />
//             <Link
//               to={RouterData.auth.children.forgotPassword}
//               className="text-sm font-primary text-primary-500 font-normal underline ml-auto"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <PrimaryBtn type="submit" loading={loading}>
//             {loading ? "Loading..." : "Sign in"}
//           </PrimaryBtn>

//           <div className="relative flex py-2 items-center justify-center text-center">
//             <span className="ml-2 text-base text-mainBlack/70 text-center">
//               Don't have an account?{" "}
//               <Link
//                 to={RouterData.auth.children.signup}
//                 className="text-primary-500 font-primary font-normal underline text-base"
//               >
//                 Sign up
//               </Link>
//             </span>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

// export default Signin;

/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button, Checkbox } from "@material-tailwind/react";
import { RiArrowLeftLine, RiErrorWarningLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { PrimaryBtn } from "../../components/Buttons";
import { InputField } from "../../components/InputField";
import { RouterData } from "../../router/RouterData";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", apiMsg: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
    if (field === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !validateEmail(value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors((prev) => ({ ...prev, apiMsg: "" }));

    if (!data.email || !data.password) {
      setErrors((prev) => ({
        ...prev,
        apiMsg: "Please fill in all the fields",
      }));
      toast.error("Please fill in all the fields", {
        className: "font-primary text-sm",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://13.233.36.198:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token in a cookie (set expiration and path as required)
        Cookies.set("userToken", result.token, { expires: 7, path: "/" }); // Corrected to "userToken"

        toast.success("Login successful!", {
          className: "font-primary text-sm",
        });
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setErrors((prev) => ({
          ...prev,
          apiMsg: result.message || "Login failed. Please try again.",
        }));
        toast.error(result.message || "Login failed. Please try again.", {
          className: "font-primary text-sm",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        apiMsg: "An error occurred. Please try again",
      }));
      toast.error("An error occurred. Please try again", {
        className: "font-primary text-sm",
        position: "top-center",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    document.title = "Sign in";
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative w-full mx-auto">
      <header className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-none">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/logo.jpeg"
            alt="Logo"
            className="w-full h-full max-w-[100px]"
          />
        </div>
        <Button className="flex flex-row items-center gap-1 bg-background shadow-none text-mainBlack/80 normal-case font-primary font-medium rounded-full border border-border/10 hover:shadow-none hover:opacity-80">
          <RiArrowLeftLine />
          <span>Back</span>
        </Button>
      </header>

      <main className="w-full max-w-md lg:max-w-full mx-auto p-8 rounded-lg my-12">
        <h2 className="text-2xl font-semibold text-mainBlack/80">
          Sign in to your account
        </h2>
        <p className="text-sm text-mainBlack/70 mt-1 font-normal font-primary">
          Enter your details below to continue
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {errors.apiMsg && (
            <div
              className="bg-red-50/50 border border-red-400 text-red-700 px-4 py-2 rounded relative flex flex-row items-center justify-center gap-2"
              role="alert"
            >
              <RiErrorWarningLine />
              <span className="block sm:inline text-sm ml-1">
                {errors.apiMsg}
              </span>
            </div>
          )}

          <InputField
            label="Username / Email"
            type="email"
            id="email"
            isRequired={true}
            containerClassName="w-full"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="**********"
            isRequired={true}
            containerClassName="w-full"
            onChange={(e) => handleChange("password", e.target.value)}
            value={data.password}
          />

          <div className="flex flex-row items-center gap-4">
            <Checkbox label={"Remember Me"} color="green" />
            <Link
              to={RouterData.auth.children.forgotPassword}
              className="text-sm font-primary text-primary-500 font-normal underline ml-auto"
            >
              Forgot password?
            </Link>
          </div>

          <PrimaryBtn type="submit" loading={loading}>
            {loading ? "Loading..." : "Sign in"}
          </PrimaryBtn>

          <div className="relative flex py-2 items-center justify-center text-center">
            <span className="ml-2 text-base text-mainBlack/70 text-center">
              Don't have an account?{" "}
              <Link
                to={RouterData.auth.children.signup}
                className="text-primary-500 font-primary font-normal underline text-base"
              >
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Signin;
