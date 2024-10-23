import React, { useState } from "react";
import MobileSvg from "../../../../public/assets/MobileImage.svg";
import DesktopSvg from "../../../../public/assets/laptop_realistic.svg"; // You'll need to add this

const AuthConfigPage = () => {
  const [activeTab, setActiveTab] = useState("mobile");
  const [authStep, setAuthStep] = useState("before");
  const [activeAuth, setActiveAuth] = useState("noauth");

  // Components for different auth types
  const NoAuthContent = () => (
    <div className="h-40 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
      <div className="text-4xl mb-2">👋</div>
      <div className="text-gray-600 text-sm">
        Welcome! No authentication needed
      </div>
    </div>
  );

  const SMSContent = () => (
    <div className="h-40 bg-gray-100 rounded-xl p-4">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter Phone Number"
          className="p-2 border rounded"
        />
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <input
              key={num}
              type="text"
              maxLength="1"
              className="w-10 h-10 text-center border rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );

  const MemberContent = () => (
    <div className="h-40 bg-gray-100 rounded-xl p-4">
      <div className="flex flex-col space-y-4">
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

  const MobileView = () => (
    <div
      className="w-[285px] h-[582px] rounded-[45px] p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${MobileSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-16 space-y-4 w-[220px] ml-3 h-[240px]">
        <div className="h-40 bg-gray-100 rounded-xl flex items-center justify-center">
          Add +
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveAuth("noauth")}
            className={`flex-1 px-3 py-2 rounded-md border ${
              activeAuth === "noauth"
                ? "bg-green-400 text-white border-green-500"
                : "border-gray-300 text-gray-600"
            }`}
          >
            No Auth
          </button>
          <button
            onClick={() => setActiveAuth("sms")}
            className={`flex-1 px-3 py-2 rounded-md border ${
              activeAuth === "sms"
                ? "bg-green-400 text-white border-green-500"
                : "border-gray-300 text-gray-600"
            }`}
          >
            SMS
          </button>
          <button
            onClick={() => setActiveAuth("member")}
            className={`flex-1 px-3 py-2 rounded-md border ${
              activeAuth === "member"
                ? "bg-green-400 text-white border-green-500"
                : "border-gray-300 text-gray-600"
            }`}
          >
            Member
          </button>
        </div>

        {renderAuthContent()}

        <button
          className={`w-full bg-green-400 py-2 rounded-md text-white ${
            activeAuth === "noauth" ? "hidden" : ""
          }`}
        >
          {activeAuth === "sms" ? "Send Code" : "Login"}
        </button>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div
      className="w-[280px] h-[620px] rounded-[45px] p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${DesktopSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop content here */}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a2e1a] p-6">
      {/* Top Navigation */}
      <div className="flex gap-8 mb-8 text-gray-200">
        <div className="border border-green-600 px-4 py-2 rounded bg-green-900/30">
          Auth
        </div>
        <div>Strategy</div>
        <div>Auth Methods</div>
        <div>Auth Details</div>
      </div>

      <h2 className="text-xl text-gray-200 mb-6">Auth page set</h2>

      {/* Device Tabs */}
      <div className="mb-8">
        <div className="inline-flex bg-gray-800 rounded-lg p-1 w-[400px]">
          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === "mobile"
                ? "bg-green-500 text-white"
                : "text-gray-300"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setActiveTab("desktop")}
            className={`flex-1 py-2 px-4 rounded-md ${
              activeTab === "desktop"
                ? "bg-green-500 text-white"
                : "text-gray-300"
            }`}
          >
            Desktop
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Phone Preview */}
        {activeTab === "mobile" ? <MobileView /> : <DesktopView />}

        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Auth Steps */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setAuthStep("before")}
              className={`px-3 py-1 rounded-md border ${
                authStep === "before"
                  ? "bg-green-400 text-white border-green-500"
                  : "border-gray-300"
              }`}
            >
              Before Auth
            </button>
            <button
              onClick={() => setAuthStep("process")}
              className={`px-3 py-1 rounded-md border ${
                authStep === "process"
                  ? "bg-green-400 text-white border-green-500"
                  : "border-gray-300"
              }`}
            >
              Process Auth
            </button>
            <button
              onClick={() => setAuthStep("after")}
              className={`px-3 py-1 rounded-md border ${
                authStep === "after"
                  ? "bg-green-400 text-white border-green-500"
                  : "border-gray-300"
              }`}
            >
              After Auth
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-200 mb-2">Title Name</label>
              <input
                type="text"
                defaultValue="sms"
                className="bg-transparent border-green-600 text-gray-200 w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Banner</label>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-900/30 border-green-600 p-4 rounded-md">
                  <div className="flex items-center justify-center h-24 text-gray-400">
                    Add +
                  </div>
                </div>
                <div className="bg-green-900/30 border-green-600 p-4 rounded-md">
                  <div className="flex items-center justify-center h-24 text-gray-400">
                    Add +
                  </div>
                </div>
                <div className="bg-green-900/30 border-green-600 p-4 rounded-md">
                  <div className="flex items-center justify-center h-24 text-gray -400">
                    Add +
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Suggested picture size (1170px*1920px.jpg/png) not greater than
                200K
              </div>
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Guide Address</label>
              <input
                type="text"
                defaultValue="sms"
                className="bg-transparent border-green-600 text-gray-200 w-full p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">Color</label>
              <div className="w-8 h-8 rounded bg-green-400 border border-green-600"></div>
            </div>

            <button className="w-32 bg-green-400 py-2 rounded-md text-white">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthConfigPage;
