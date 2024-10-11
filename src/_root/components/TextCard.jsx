/* eslint-disable react/prop-types */
const TextCard = ({ price = false, name, value, icon }) => {
  return (
    <div className="border border-border/10 p-4 rounded-lg">
      <div className="flex flex-col-reverse  sm:flex-row sm:items-center justify-between gap-4 font-primary">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-normal text-mainBlack/70">{name}</span>
          <h3 className="text-3xl font-semibold text-mainBlack/80">
            {price && `₹`} {value || "00"}
          </h3>
        </div>
        <div className="bg-primary-100 size-[50px] grid place-content-center text-primary-800 text-xl rounded">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default TextCard;
