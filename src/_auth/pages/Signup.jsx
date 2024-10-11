import { Button, Typography } from "@material-tailwind/react";
import { PrimaryBtn } from "../../components/Buttons";
import { InputField } from "../../components/InputField";
import { API_URL, NAME } from "../../utils/constant";
import { RiArrowLeftLine, RiErrorWarningLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RouterData } from "../../router/RouterData";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const [data, setData] = useState({
    account: "",
    nickname: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    confirmPassword: "",
    apiMsg: "",
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "confirmPassword":
        if (value !== data.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Password does not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors({
      ...errors,
      apiMsg: "",
      error: "",
    });

    try {
      const res = await axios.post(`${API_URL}/v1/users/signUp`, {
        email: data.email,
        password: data.confirmPassword,
        mobile_number: data.phone,
        name: data.name,
        referred_by: data.referralCode,
      });

      console.log(res.data);
      if (res.data.status === "1") {
        toast.success("Sign up successful", {
          duration: 4000,
          position: "top-center",
        });

        navigate(RouterData.auth.children.signupOnboarding, {
          state: {
            email: data.email,
            password: data.password,
            id: res.data.data.user_id,
          },
        });

        setData({
          ...data,
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          referCode: "",
        });
        setLoading(false);

        // navigate(RouterData.auth.SignUpOnBoarding);
      } else {
        setLoading(false);
        toast.error(res.data.message, {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(errors.response?.data.message || "Something went wrong");
      console.log(error.response?.data.message);
      setErrors({
        ...errors,
        apiMsg:
          errors.response?.data.message ||
          "Something went wrong. Please try again",
        error: error.response?.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative  w-full mx-auto pb-8">
      {/* Header fixed at the top */}
      <div className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-none">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/logo.jpeg"
            alt=""
            className="w-full h-full max-w-[100px]"
          />
        </div>
        <Button className="flex flex-row items-center gap-1 bg-background shadow-none text-mainBlack/80 normal-case font-primary font-medium rounded-full border border-border/10 hover:shadow-none hover:opacity-80">
          <RiArrowLeftLine />
          <span>Back</span>
        </Button>
      </div>

      <div className="w-full max-w-md lg:max-w-full  p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-mainBlack/80">
          Create an account
        </h2>
        <p className="text-sm text-mainBlack/70 mt-1 font-normal font-primary">
          Sign up to get started with our services
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label="Account Name"
            type="text"
            id="account"
            name="account"
            isRequired={true}
            containerClassName="w-full"
            value={data.account}
            onChange={handleChange}
            disabled={loading}
          />
          <InputField
            label="Nick Name"
            type="text"
            id="nickname"
            name="nickname"
            isRequired={true}
            containerClassName="w-full"
            value={data.nickname}
            onChange={handleChange}
            disabled={loading}
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            placeholder="Email Address"
            isRequired={true}
            containerClassName="w-full"
            name="email"
            value={data.email}
            onChange={handleChange}
            disabled={loading}
          />
          <div className="flex flex-col gap-2">
            <label
              className="text-text/70 text-sm font-secondary text-mainBlack/70"
              htmlFor="phone"
            >
              Phone Number
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            </label>
            <PhoneInput
              country={"in"}
              value={data.phone}
              onChange={(phone) =>
                handleChange({ target: { name: "phone", value: phone } })
              }
              inputProps={{
                name: "phone",
                required: true,
                className:
                  "w-full h-[50px] p-2 border border-border focus:outline-none rounded-md pl-16 font-secondary font-medium text-base text-text/80",
              }}
              containerClass="h-[50px] gap-4 bg-background font-secondary"
              dropdownClass="font-secondary font-medium text-mainBlack/80"
              buttonClass="px-12 shrink-0"
              disabled={loading}
            />
            {errors.phone && (
              <span
                className="text-red-500  mt-1 text-xs bg-red-500/5 p-2 rounded pl-4 font-secondary flex flex-row items-center gap-2"
                role="alert"
              >
                <RiErrorWarningLine />
                {errors.phone}
              </span>
            )}
          </div>
          <InputField
            label="Password"
            type="password"
            id="password"
            placeholder="**********"
            isRequired={true}
            containerClassName="w-full"
            name="password"
            value={data.password}
            onChange={handleChange}
            disabled={loading}
          />
          <InputField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="**********"
            isRequired={true}
            containerClassName="w-full"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            error={errors.confirmPassword}
          />

          <InputField
            label="Address"
            type="text"
            id="address"
            containerClassName="w-full mb-4"
            name="address"
            value={data.address}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.error && (
            <Typography
              variant="paragraph"
              className="text-red-500 flex flex-row items-center justify-center gap-2 capitalize  font-primary font-normal text-sm text-center mt-4 py-2 border-red-500 bg-red-50/40 border rounded"
            >
              <RiErrorWarningLine />
              {errors.error}
            </Typography>
          )}
          <PrimaryBtn type="submit" loading={loading} disabled={loading}>
            Sign Up
          </PrimaryBtn>
          <div className="relative flex py-2 items-center justify-center text-center">
            <span className="ml-2 text-base text-mainBlack/70 text-center mt-2">
              Already have an account?{" "}
              <Link
                to={RouterData.auth.children.signin}
                className="text-primary-500 font-primary font-normal underline text-base"
              >
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
