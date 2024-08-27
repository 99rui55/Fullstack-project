import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animations/confirm.json";

interface confirmAnimationProps {
  endAnimationHandler: () => void;
}

const ConfirmAnimationComponent = ({
  endAnimationHandler,
}: confirmAnimationProps) => {
  const lottieRef = useRef();

  const handleComplete = () => {
    endAnimationHandler();
  };
  return (
    <Lottie
      animationData={animationData}
      lottieRef={lottieRef}
      loop={false}
      onComplete={handleComplete}
      style={{
        width: 300,
        height: 300,
        overflow: "hidden",
        margin: "0",
        padding: "0",
      }}
    />
  );
};

export default ConfirmAnimationComponent;
