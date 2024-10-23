import React, { useState } from "react";

// Reusable components
const Button = ({ children, onClick, className = "", variant = "default" }) => {
  const baseStyles = "px-4 py-2 rounded-md transition-colors ";
  const variants = {
    default: "bg-gray-200 hover:bg-gray-300",
    primary: "bg-green-500 hover:bg-green-600 text-white",
    outline: "border-2 border-green-500 hover:bg-green-500/10",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", ...props }) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium">{label}</label>}
    <input
      type={type}
      className="w-full p-2 rounded-md border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
      {...props}
    />
  </div>
);

const Dialog = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ImageUploader = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 200000) {
        alert("Image size should not exceed 200KB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-40 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center">
            <div className="text-3xl mb-2">+</div>
            <div className="text-sm text-gray-500">Upload Image</div>
          </div>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Button
        variant="outline"
        onClick={() => document.getElementById("fileInput").click()}
      >
        Upload
      </Button>
    </div>
  );
};

// Tab Components
const AuthTab = () => {
  const [formData, setFormData] = useState({
    titleName: "",
    guideAddress: "",
    themeColor: "#55ee69",
  });
  const [bannerImages, setBannerImages] = useState([null, null, null]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBannerUpload = (index, image) => {
    const newBanners = [...bannerImages];
    newBanners[index] = image;
    setBannerImages(newBanners);
  };

  return (
    <div className="space-y-6">
      <Input
        label="Title Name"
        name="titleName"
        value={formData.titleName}
        onChange={handleFormChange}
      />

      <div className="space-y-4">
        <label className="block font-medium">Banner Images</label>
        <div className="flex gap-4">
          {[0, 1, 2].map((index) => (
            <ImageUploader
              key={index}
              onImageUpload={(image) => handleBannerUpload(index, image)}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Suggested size: 1170px × 1920px (JPG/PNG), max 200KB
        </p>
      </div>

      <Input
        label="Guide Address"
        name="guideAddress"
        value={formData.guideAddress}
        onChange={handleFormChange}
      />

      <div className="space-y-2">
        <label className="block font-medium">Theme Color</label>
        <input
          type="color"
          value={formData.themeColor}
          onChange={(e) =>
            handleFormChange({
              target: { name: "themeColor", value: e.target.value },
            })
          }
          className="w-12 h-12 rounded cursor-pointer"
        />
      </div>

      <div className="text-center">
        <Button variant="primary">Apply Changes</Button>
      </div>
    </div>
  );
};

const StrategyTab = () => {
  const [strategies, setStrategies] = useState([]);
  const [isAddingStrategy, setIsAddingStrategy] = useState(false);
  const [newStrategy, setNewStrategy] = useState({ name: "", description: "" });

  const handleAddStrategy = () => {
    if (newStrategy.name && newStrategy.description) {
      setStrategies([...strategies, newStrategy]);
      setNewStrategy({ name: "", description: "" });
      setIsAddingStrategy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium">Authentication Strategies</h3>
        <Button variant="primary" onClick={() => setIsAddingStrategy(true)}>
          Add Strategy
        </Button>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-lg">
            <h4 className="font-medium">{strategy.name}</h4>
            <p className="text-gray-600 mt-2">{strategy.description}</p>
          </div>
        ))}
      </div>

      <Dialog
        open={isAddingStrategy}
        onClose={() => setIsAddingStrategy(false)}
        title="Add Authentication Strategy"
      >
        <div className="space-y-4">
          <Input
            label="Strategy Name"
            value={newStrategy.name}
            onChange={(e) =>
              setNewStrategy({ ...newStrategy, name: e.target.value })
            }
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={newStrategy.description}
              onChange={(e) =>
                setNewStrategy({ ...newStrategy, description: e.target.value })
              }
              className="w-full p-2 rounded-md border border-gray-300 min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsAddingStrategy(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddStrategy}>
              Add
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const AuthMethodsTab = () => {
  const [methods, setMethods] = useState([
    { id: "sms", name: "SMS Authentication", enabled: true },
    { id: "email", name: "Email Authentication", enabled: false },
    { id: "oauth", name: "OAuth 2.0", enabled: false },
    { id: "totp", name: "Time-based OTP", enabled: false },
  ]);

  const toggleMethod = (id) => {
    setMethods(
      methods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Authentication Methods</h3>
      <div className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
          >
            <span className="font-medium">{method.name}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={method.enabled}
                onChange={() => toggleMethod(method.id)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthDetailsTab = () => {
  const [details, setDetails] = useState({
    appName: "",
    domain: "",
    timeout: 30,
    maxAttempts: 3,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Authentication Details</h3>
      <div className="space-y-4">
        <Input
          label="Application Name"
          name="appName"
          value={details.appName}
          onChange={handleChange}
        />
        <Input
          label="Authentication Domain"
          name="domain"
          value={details.domain}
          onChange={handleChange}
          placeholder="example.com"
        />
        <Input
          label="Session Timeout (minutes)"
          name="timeout"
          type="number"
          value={details.timeout}
          onChange={handleChange}
        />
        <Input
          label="Maximum Login Attempts"
          name="maxAttempts"
          type="number"
          value={details.maxAttempts}
          onChange={handleChange}
        />
        <div className="text-right">
          <Button variant="primary">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

const AuthConfigPage = () => {
  const [activeTab, setActiveTab] = useState("auth");
  const [deviceView, setDeviceView] = useState("mobile");
  const [authStep, setAuthStep] = useState("before");

  const tabs = [
    { id: "auth", label: "Auth" },
    { id: "strategy", label: "Strategy" },
    { id: "methods", label: "Auth Methods" },
    { id: "details", label: "Auth Details" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "auth":
        return <AuthTab />;
      case "strategy":
        return <StrategyTab />;
      case "methods":
        return <AuthMethodsTab />;
      case "details":
        return <AuthDetailsTab />;
      default:
        return null;
    }
  };

  const PreviewPanel = () => (
    <div className="p-4 bg-gray-100 rounded-lg min-h-[500px] flex items-center justify-center">
      <div className="text-center text-gray-500">
        {deviceView === "mobile" ? (
          <div className="w-[285px] h-[582px] bg-white rounded-[45px] border-4 border-gray-300 p-4">
            <div className="w-20 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <div className="mt-16 space-y-4">
              {/* Mobile preview content */}
              <div className="bg-gray-200 w-full h-40 rounded-xl flex items-center justify-center">
                Preview Content
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[680px] h-[420px] bg-white rounded-lg border-4 border-gray-300 p-4">
            <div className="w-full h-full flex items-center justify-center">
              Preview Content
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Top Navigation */}
      <div className="mb-6">
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Preview Panel */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={deviceView === "mobile" ? "primary" : "default"}
              onClick={() => setDeviceView("mobile")}
            >
              Mobile View
            </Button>
            <Button
              variant={deviceView === "desktop" ? "primary" : "default"}
              onClick={() => setDeviceView("desktop")}
            >
              Desktop View
            </Button>
          </div>
          <PreviewPanel />
        </div>

        {/* Configuration Panel */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AuthConfigPage;
