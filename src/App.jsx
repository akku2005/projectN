import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="font-primary text-mainBlack">
      <Outlet />
    </div>
  );
};

export default App;
