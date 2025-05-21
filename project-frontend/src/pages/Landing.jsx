import React from "react";
import HomeBanner from "../components/Landing/HomeBanner/HomeBanner";
import SmartSolar from "../components/Landing/SmartSolar/SmartSolar";
import ProjectDetails from "../components/Landing/ProjectDetails/ProjectDetails";
import ProductShowcase from "../components/Landing/ProductShowcase/ProductShowcase";
// import Card from "../components/Landing/MiddleCard/Card";

const Landing = () => {
  return (
    <>
      {/* <Card /> */}
      <HomeBanner />
      {/* <SmartSolar /> */}
      <ProductShowcase />
      <ProjectDetails />
    </>
  );
};

export default Landing;
