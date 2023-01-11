import React, { useEffect, useState } from "react";
type AvarageVoteProps = {
  vote: number;
};
export const AvarageVote: React.FC<AvarageVoteProps> = ({ vote }) => {
  const [offSet, setOffset] = useState(0);
  const [color, setColor] = useState("");
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const persent = vote * 10;
  const setProgress = () => {
    const offset = circumference - (persent / 100) * circumference;
    setOffset(offset);
  };
  useEffect(() => {
    if (persent >= 70 && persent <= 100) {
      setColor("green");
    } else if (persent >= 40 && persent <= 69) {
      setColor("yellow");
    } else if (persent < 40) {
      setColor("red");
    }
    setProgress();
  }, []);

  return (
    <div className="absolute w-[50px] h-[50px] flex justify-center items-center bottom-0">
      <div className="text-white absolute select-none">
        {vote != 0 ? vote : "NR"}
      </div>
      <svg>
        <circle
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offSet,
            transformOrigin: "center",
            rotate: "-90deg",
          }}
          width={20}
          height={20}
          strokeWidth={3}
          cx={25}
          cy={75}
          stroke={color}
          fill="#000"
          r={radius}
        />
      </svg>
    </div>
  );
};
