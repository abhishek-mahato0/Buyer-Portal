import React from "react";

const Banner: React.FC = () => {
  return (
    <div className="hidden md:flex relative overflow-hidden h-[100vh] bg-black">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMF-j6iea_-bmxqE4C7BrPHPYdKtTUncdBrsVieTaAhOlCrai37cyyFf5WryCQZOjZKxMHPJr8tff9Yv4Aeoya16tvlNMUDX9UmVx9E947drTJ7CJBwXp1WMYSc2CFFou2lJLAGnybCkDxmQxlALahXddAzkzKz0YRjWAcUDy-HA1a_YHyKLiJBOIJ0VsnEC2hdrnok7VVNTJTL5dZ--kXattsSdo_B6E3U8gT6h2iQ-FWkgfd0bof7RDuOD92qEJABCNwYvRPWkpS"
        alt="Modern Architecture"
        className="w-[100%] h-[100%] object-cover z-1 absolute top-0 bottom-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-[50%] z-2">
        <div>
          <p>FEATURED ESTATE</p>
        </div>
        <h1>The Glass Pavilion.</h1>
        <p>
          Experience the pinnacle of modernist living. Our curated portal
          connects visionary buyers with global architectural landmarks.
        </p>
      </div>
    </div>
  );
};

export default Banner;
