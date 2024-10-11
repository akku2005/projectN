import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterData } from "../router/RouterData";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/auth" || pathname === "/auth/") {
      navigate(RouterData.auth.children.signin);
    }
  }, [navigate, pathname]);

  return (
    <div className="font-primary flex gap-0">
      <div className="w-full lg:w-1/3">
        <Suspense
          fallback={
            <div className="w-full h-dvh grid place-content-center text-mainBlack/70">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <div className="w-2/3 hidden lg:grid  h-dvh   place-content-center sticky top-0 right-0">
        <img
          src="/assets/authBG.jpg"
          alt=""
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="bg-white/5 backdrop-blur-sm border leading-[1.2] border-white/50 rounded-md text-white py-8 relative max-w-[600px] p-4 text-5xl text-center">
          Seamless Connectivity, Unmatched Control
        </div>
      </div>
    </div>
  );
};

export default Auth;
