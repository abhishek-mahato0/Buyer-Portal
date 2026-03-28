import React from "react";
import BannerImg from "../../../assets/images/property1.png";

const Banner: React.FC = () => {
  return (
    <div className="px-40 h-full min-w-[80vw] flex gap-16 items-center justify-between">
      <div className="flex flex-col gap-8 items-start w-full">
        <h1 className="flex flex-col sm:size-[40px] size-[60px]">
          The Global <span className="text-green">Marketplace</span>
        </h1>
        <p className="sm:size-[16px] size-[24px] flex flex-col">
          <span>
            Discover an elite selection of off-market estates and
            architecturally significant residences
          </span>
          <span>curated for the discerning collector.</span>
        </p>
        <div className="text-green p-4 sm:size[14px] size-[16px]">
          Trusted by leading institutions and investors worldwide.
        </div>
      </div>
      <div className="w-full h-[100%]">
        <img
          src={BannerImg}
          alt="bannerImg"
          className="w-[100%] h-[100%] object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default Banner;
