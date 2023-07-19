import { useEffect, useState } from "react";
import "./LoadingEffect.css";

const LoadingEffect = ({ loading }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
    console.log(loading);
  }, [loading]);

  return (
    <div>
      <div className={`overlay ${isLoading ? "show" : ""}`}></div>
      <div className={`spanner ${isLoading ? "show" : ""}`}>
        <div className="loader"></div>
        <p className="text-title">Loading</p>
      </div>
    </div>
  );
};

export default LoadingEffect;
