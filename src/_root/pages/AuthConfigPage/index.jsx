import React, { useState, useRef } from "react";
import MobileSvg from "../../../../public/assets/MobileImage.svg";
import DesktopSvg from "../../../../public/assets/laptop_realistic.svg";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import "../../styles/Dashboard.scss";

// Auth Component
const Auth = ({
  activeTab,
  setActiveTab,
  authStep,
  setAuthStep,
  activeAuth,
  setActiveAuth,
  // ... other props
}) => {
  return (
    <>
      <h2 className="text-xl mb-6 mt-5">Auth page set</h2>
      <div className="grid grid-cols-2 gap-12">
        {activeTab === "mobile" ? <MobileView /> : <DesktopView />}
        {/* Configuration Panel */}
        <ConfigurationPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          authStep={authStep}
          setAuthStep={setAuthStep}
          activeAuth={activeAuth}
          setActiveAuth={setActiveAuth}
        />
      </div>
    </>
  );
};

// Strategy Component
const Strategy = () => {
  return (
    <>
      <h2 className="text-xl mb-6 mt-5">Strategy Configuration</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
        <h3>Strategy Settings</h3>
        {/* Add your strategy configuration content */}
      </div>
    </>
  );
};

// Auth Methods Component
const AuthMethods = () => {
  return (
    <>
      <h2 className="text-xl mb-6 mt-5">Auth Methods Setup</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
        <h3>Available Auth Methods</h3>
        {/* Add your auth methods content */}
      </div>
    </>
  );
};

// Auth Details Component
const AuthDetails = () => {
  return (
    <>
      <h2 className="text-xl mb-6 mt-5">Auth Details Configuration</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
        <h3>Authentication Details</h3>
        {/* Add your auth details content */}
      </div>
    </>
  );
};

const AuthConfigPage = () => {
  const [activeTab, setActiveTab] = useState("mobile");
  const [authStep, setAuthStep] = useState("before");
  const [activeAuth, setActiveAuth] = useState("noauth");
  const [uploadedImages, setUploadedImages] = useState({
    banner1: null,
    banner2: null,
    banner3: null,
  });
  const [formData, setFormData] = useState({
    titleName: "",
    guideAddress: "",
    selectedColor: "#55ee69",
    successTitle: "",
    successMessage: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (event, bannerKey) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (200KB = 200 * 1024 bytes)
      if (file.size > 200 * 1024) {
        alert("File size should not exceed 200KB");
        return;
      }

      // Check file type
      if (!file.type.match("image/(jpg|jpeg|png)")) {
        alert("Only JPG/PNG files are allowed");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages((prev) => ({
          ...prev,
          [bannerKey]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    // Handle form submission
    console.log("Form Data:", formData);
    console.log("Uploaded Images:", uploadedImages);
  };

  // Before Auth Content Component
  const BeforeAuthContent = () => (
    <div className=" space-y-4 w-[220px] h-[240px]">
      <div
        className="h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-800 dark:text-black cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="h-full w-full object-cover rounded-xl"
          />
        ) : (
          "Add +"
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleImageUpload(e, "main")}
        accept="image/jpeg,image/png"
      />

      <div className="flex gap-2">
        <button
          onClick={() => setActiveAuth("noauth")}
          className={`flex-1 px-1 py-2 rounded-md border text-sm ${
            activeAuth === "noauth"
              ? "bg-[#55ee69] border-green-500"
              : "border-[#55ee69] border-[2px]"
          } dark:text-black`}
        >
          No Auth
        </button>
        <button
          onClick={() => setActiveAuth("sms")}
          className={`flex-1 px-1 py-2 rounded-md border text-sm ${
            activeAuth === "sms"
              ? "bg-[#55ee69] border-[#55ee69]"
              : "border-[#55ee69] border-[2px]"
          } dark:text-black`}
        >
          SMS
        </button>
        <button
          onClick={() => setActiveAuth("member")}
          className={`flex-1 px-1 py-2 rounded-md border text-sm ${
            activeAuth === "member"
              ? "bg-[#55ee69] border-green-500"
              : "border-[#55ee69] border-[2px]"
          } dark:text-black`}
        >
          Member
        </button>
      </div>

      {renderAuthContent()}
    </div>
  );

  // Process Auth Components
  const NoAuthContent = () => (
    <div className="h-48 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
      <button className="bg-[#55ee69] p-2 w-[163px] h-[40px] flex justify-center items-center rounded-md">
        <span className="text-center text-black">No Auth</span>
      </button>
    </div>
  );
  const NoAuthContentLop = () => (
    <div className="h-24 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
      <button className="bg-[#55ee69] p-2 w-[163px] h-[40px] flex justify-center items-center rounded-md">
        <span className="text-center text-black">No Auth</span>
      </button>
    </div>
  );

  const SMSContent = () => (
    <div className="h-48 bg-gray-100 rounded-xl p-4 flex flex-col items-center">
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">
            <FaPhoneAlt />
          </span>
          <input
            type="tel"
            placeholder="Enter Indian Phone Number"
            className="p-2 border rounded pl-10 w-full"
            pattern="[6789]\d{9}"
            required
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">
            <FaLock />
          </span>
          <input
            type="password"
            placeholder="Enter Password"
            className="p-2 border rounded pl-10 w-full"
          />
        </div>
      </div>
      <button
        className={`w-full bg-[#55ee69] py-2 rounded-md text-white mt-5 ${
          activeAuth === "noauth" ? "hidden" : ""
        } dark:bg-[#55ee69] dark:text-black`}
      >
        {activeAuth === "sms" ? "Login" : "Login"}
      </button>
    </div>
  );
  const SMSContentLop = () => (
    <div className=" h-[105px] bg-gray-100 rounded-xl p-2 flex flex-col items-center">
      <div className="flex flex-col space-y-2 w-full max-w-[200px] h-auto">
        {/* Phone Input */}
        <div className="relative h-6">
          <span className="absolute left-2 top-1 text-gray-400 text-sm">
            <FaPhoneAlt />
          </span>
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-1 text-sm border rounded pl-8 w-full h-full"
            pattern="[6789]\d{9}"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative h-6">
          <span className="absolute left-2 top-1 text-gray-400 text-sm">
            <FaLock />
          </span>
          <input
            type="password"
            placeholder="Password"
            className="p-1 text-sm border rounded pl-8 w-full h-full"
          />
        </div>
      </div>

      <button
        className={`w-[200px] bg-[#55ee69] py-0 rounded-md text-white mt-2 ${
          activeAuth === "noauth" ? "hidden" : ""
        } dark:bg-[#4dbb5e] dark:text-black`}
      >
        {activeAuth === "sms" ? "Login" : "Login"}
      </button>
    </div>
  );

  const MemberContent = () => (
    <div className="h-48 bg-gray-100 rounded-xl p-4 flex flex-col items-center">
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button
          className={`w-full bg-[#55ee69] py-2 rounded-md text-white ${
            activeAuth === "noauth" ? "hidden" : ""
          }`}
        >
          {activeAuth === "sms" ? "Send Code" : "Login"}
        </button>
      </div>
    </div>
  );
  const MemberContentLop = () => (
    <div className="h-[105px] bg-gray-100 rounded-xl p-3 flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-1 w-full max-w-[180px]">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="p-1 text-sm border rounded h-8"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-1 text-sm border rounded h-8"
        />

        {/* Button */}
        <button
          className={`w-full bg-[#55ee69] py-1 rounded-md text-white text-sm ${
            activeAuth === "noauth" ? "hidden" : ""
          }`}
        >
          {activeAuth === "sms" ? "Send Code" : "Login"}
        </button>
      </div>
    </div>
  );

  const ProcessAuthContent = () => (
    <div>
      <div className="bg-gray-200 w-full h-[430px] flex justify-center items-center text-center text-black">
        Add +
      </div>
    </div>
  );

  const renderAuthContent = () => {
    switch (activeAuth) {
      case "noauth":
        return <NoAuthContent />;
      case "sms":
        return <SMSContent />;
      case "member":
        return <MemberContent />;
      default:
        return <NoAuthContent />;
    }
  };

  const renderAuthContentForLaptopScreen = () => {
    switch (activeAuth) {
      case "noauth":
        return <NoAuthContentLop />;
      case "sms":
        return <SMSContentLop />;
      case "member":
        return <MemberContentLop />;
      default:
        return <NoAuthContent />;
    }
  };

  // After Auth Content
  const AfterAuthContent = () => (
    <div>
      <div className="bg-gray-200 w-full h-[430px] flex justify-center items-center text-center text-black">
        Add +
      </div>
    </div>
  );

  // Configuration Panel Components
  const BeforeAuthConfig = () => (
    <div className=" space-y-6">
      <div className=" flex gap-10">
        <label className="block mb-2">Title Name</label>
        <input
          type="text"
          name="titleName"
          value={formData.titleName}
          onChange={handleInputChange}
          className="bg-white bg-opacity-10 h-10 border-green-600 w-full p-2 rounded-md"
        />
      </div>

      <div>
        <div className="mb-4 flex gap-12">
          <label className="block mb-2">Banner</label>
          <div className="flex justify-between gap-8">
            <div className="w-1/3 flex flex-col items-center text-center">
              <div
                className="upload-button mb-2 w-40 h-32 flex justify-center items-center text-center bg-white bg-opacity-10 backdrop-blur-lg border border-green-500 rounded-md p-2 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImages.banner1 ? (
                  <img
                    src={uploadedImages.banner1}
                    alt="Banner 1"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  "Add +"
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleImageUpload(e, "banner1")}
                accept="image/jpeg,image/png"
              />
              <button className="w-40 py-1 border-2 border-green-500 text-white rounded-md">
                Upload
              </button>
            </div>

            <div className="w-1/3 flex flex-col items-center text-center">
              <div
                className="upload-button mb-2 w-40 h-32 flex justify-center items-center text-center bg-white bg-opacity-10 backdrop-blur-lg border border-green-500 rounded-md p-2 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImages.banner2 ? (
                  <img
                    src={uploadedImages.banner2}
                    alt="Banner 2"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  "Add +"
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleImageUpload(e, "banner2")}
                accept="image/jpeg,image/png"
              />
              <button className="w-40 py-1 border-2 border-green-500 text-white rounded-md">
                Upload
              </button>
            </div>

            <div className="w-1/3 flex flex-col items-center text-center">
              <div
                className="upload-button mb-2 w-40 h-32 flex justify-center items-center text-center bg-white bg-opacity-10 backdrop-blur-lg border border-green-500 rounded-md p-2 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImages.banner3 ? (
                  <img
                    src={uploadedImages.banner3}
                    alt="Banner 3"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  "Add +"
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleImageUpload(e, "banner3")}
                accept="image/jpeg,image/png"
              />
              <button className="w-40 py-1 border-2 border-green-500 text-white rounded-md">
                Upload
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-14 text-md text-gray-400 justify-end text-center">
          Suggested picture size (1170px*1920px.jpg/png) not greater than 200K
        </div>
      </div>

      <div className="flex gap-4">
        <label className="block mb-2">Guide Address</label>
        <input
          type="text"
          name="guideAddress"
          value={formData.guideAddress}
          onChange={handleInputChange}
          className="bg-white bg-opacity-10 h-10 border-green-600 w-full p-2 rounded-md"
        />
      </div>

      <div className="flex gap-20">
        <label className="block mb-2">Color</label>
        <div className="w-8 h-8 rounded bg-green-400 border border-green-600"></div>
      </div>

      <div className="text-center">
        <button
          className="w-32 bg-green-400 py-2 rounded-md"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );

  const ProcessAuthConfig = () => (
    <>
      <div className="mb-4 flex items-start gap-16">
        {/* Label aligned to the top left */}
        <label className=" ">Banner</label>

        {/* Banner Upload Section */}
        <div className="flex justify-between gap-8 ml-10">
          <div className="w-1/3 flex flex-col items-center text-center">
            <div
              className="upload-button mb-2 w-40 h-32 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-lg border border-green-500 rounded-md p-2 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImages.banner1 ? (
                <img
                  src={uploadedImages.banner1}
                  alt="Banner 1"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                "Add +"
              )}
            </div>
            <button className="w-[160px] py-1 border-2 border-green-500 text-white rounded-md">
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="mt-2 ml-14 text-md text-gray-400 justify-end text-center">
        Suggested picture size (1170px*1920px.jpg/png) not greater than 200K
      </div>
      <div className="text-center">
        <button
          className="w-32 bg-green-400 py-2 rounded-md"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </>
  );

  const AfterAuthConfig = () => (
    <>
      <div className="flex items-center gap-10 mb-4">
        {/* Label for Tips */}
        <label className="block text-left w-20">Tips</label>
        <input
          type="text"
          name="titleName"
          value={formData.titleName}
          onChange={handleInputChange}
          className="bg-white bg-opacity-10 h-10   w-full p-2 rounded-md"
        />
      </div>

      <div className="mb-6 flex items-start gap-3">
        {/* Label aligned to the top left */}
        <label className="text-left w-20">Banner</label>

        {/* Banner Upload Section */}
        <div className="flex gap-8 ml-4">
          <div className="w-40 flex flex-col items-center text-center">
            <div
              className="upload-button mb-2 w-40 h-32 flex justify-center items-center bg-white bg-opacity-10 backdrop-blur-lg border border-green-500 rounded-md p-2 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImages.banner1 ? (
                <img
                  src={uploadedImages.banner1}
                  alt="Banner 1"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                "Add +"
              )}
            </div>

            <button className="w-40 py-1 border-2 border-green-500 text-white rounded-md">
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 ml-28 text-sm text-gray-400 text-center">
        Suggested picture size (1170px x 1920px, jpg/png) not greater than 200KB
      </div>

      <div className="mt-4 text-center">
        <button
          className="w-32 bg-green-400 py-2 rounded-md hover:bg-green-500 transition"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </>
  );

  // Mobile View
  const MobileView = () => (
    <div
      className=" w-[285px] h-[582px] rounded-[45px] p-4 relative overflow-hidden ml-24"
      style={{
        backgroundImage: `url(${MobileSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-16 space-y-4 w-[220px] ml-4 object-cover">
        {authStep === "before" && <BeforeAuthContent />}
        {authStep === "process" && <ProcessAuthContent />}
        {authStep === "after" && <AfterAuthContent />}
      </div>
    </div>
  );

  // Desktop View
  const DesktopView = () => (
    <div
      className=" w-[680px] h-[420px] rounded-[20px] p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${DesktopSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-12 flex justify-center">
        <div className="rounded-lg p-6 w-[500px]">
          {authStep === "before" && (
            <div className="space-y-1 w-[380px] ml-8">
              <div className="h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-800 dark:text-black">
                Add +
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveAuth("noauth")}
                  className={`flex-1 px-1 py-2 rounded-md border text-sm ${
                    activeAuth === "noauth"
                      ? "bg-[#55ee69] border-green-500"
                      : "border-[#55ee69] border-[2px]"
                  } dark:text-black`}
                >
                  No Auth
                </button>
                <button
                  onClick={() => setActiveAuth("sms")}
                  className={`flex-1 px-1 py-2 rounded-md border text-sm ${
                    activeAuth === "sms"
                      ? "bg-[#55ee69] border-green-500"
                      : "border-[#55ee69] border-[2px]"
                  } dark:text-black`}
                >
                  SMS
                </button>
                <button
                  onClick={() => setActiveAuth("member")}
                  className={`flex-1 px-1 py-2 rounded-md border text-sm ${
                    activeAuth === "member"
                      ? "bg-[#55ee69] border-green-500"
                      : "border-[#55ee69] border-[2px]"
                  } dark:text-black`}
                >
                  Member
                </button>
              </div>

              {renderAuthContentForLaptopScreen()}
            </div>
          )}

          {authStep === "process" && (
            <div className="ml-8 ">
              <div className="bg-white text-gray-800 font-semibold rounded-md flex items-center justify-center  shadow-md w-[385px] h-[233px]">
                Add +
              </div>
            </div>
          )}

          {authStep === "after" && (
            <div className="ml-8 ">
              <div className="bg-white text-gray-800 font-semibold rounded-md flex items-center justify-center  shadow-md w-[385px] h-[233px]">
                Add +
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className=" min-h-screen p-6">
      {/* Top Navigation */}
      <div className="flex-grow overflow-hidden">
        <div className="ProjectInfo flex bg-white bg-opacity-10 backdrop-blur-lg rounded-lg justify-between">
          {["Auth", "Strategy", "Auth Methods", "Auth Details"].map(
            (text, index) => (
              <button
                key={index}
                className={`flex-1 py-2 rounded-lg transition ${
                  index === 0
                    ? "border-2 border-green-600 bg-green-900/30 hover:bg-green-600"
                    : "hover:bg-gray-200"
                }`}
              >
                {text}
              </button>
            )
          )}
        </div>
      </div>

      <h2 className="text-xl mb-6 mt-5">Auth page set</h2>

      {/* Device Tabs */}

      <div className=" grid grid-cols-2 gap-12">
        {/* Phone Preview */}
        {activeTab === "mobile" ? <MobileView /> : <DesktopView />}

        {/* Configuration Panel */}
        <div className=" space-y-6">
          {/* Auth Steps */}
          <div className="mb-8 flex justify-start w-full">
            <div className="inline-flex w-full bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab("mobile")}
                className={`flex-1 py-2 px-4 transition-all duration-300 ${
                  activeTab === "mobile"
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-transparent text-gray-300"
                } rounded-md`}
              >
                Mobile
              </button>
              <button
                onClick={() => setActiveTab("desktop")}
                className={`flex-1 py-2 px-4 transition-all duration-300 ${
                  activeTab === "desktop"
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-transparent text-gray-300"
                } rounded-md`}
              >
                Desktop
              </button>
            </div>
          </div>

          <div className="mb-8 flex gap-3">
            <p>Auth Procedure</p>
            <div className="flex gap-4 w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-lg h-10">
              <button
                onClick={() => setAuthStep("before")}
                className={`flex-1 py-1 rounded-md transition duration-200 ${
                  authStep === "before" ? "bg-green-500" : ""
                }`}
              >
                Before Auth
              </button>
              <button
                onClick={() => setAuthStep("process")}
                className={`flex-1 py-1 rounded-md transition duration-200 ${
                  authStep === "process" ? "bg-green-500" : ""
                }`}
              >
                Process Auth
              </button>
              <button
                onClick={() => setAuthStep("after")}
                className={`flex-1 py-1 rounded-md transition duration-200 ${
                  authStep === "after" ? "bg-green-500" : ""
                }`}
              >
                After Auth
              </button>
            </div>
          </div>

          {/* Form Fields */}
          {authStep === "before" && <BeforeAuthConfig />}
          {authStep === "process" && <ProcessAuthConfig />}
          {authStep === "after" && <AfterAuthConfig />}
        </div>
      </div>
    </div>
  );
};

export default AuthConfigPage;
