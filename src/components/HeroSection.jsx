import React from "react";
import Hero from "../images/Hero.png";

const HeroSection = () => {
  return (
    <div className="flex flex-wrap w-full flex-col items-center justify-center p-6">
      <div className="flex flex-col">
        <h1 className="md:text-5xl font-bold text-white p-4">STORIES MATTER</h1>
        <h2 className="text-white md:text-3xl font-normal">
          <span className="hover:underline decoration-orange-400"> Read. </span>{" "}
          <span className="hover:underline decoration-orange-400">Write .</span>{" "}
          <span className="hover:underline decoration-blue-400">Review</span>
        </h2>
      </div>
      <div className="flex items-center justify-center p-6">
        <img src={Hero} alt="" width={"60%"} />
      </div>
    </div>
  );
};

export default HeroSection;
