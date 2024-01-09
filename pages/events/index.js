import Events from "@/components/Events";
import Layout from "@/components/layout/Layout";
import React from "react";

const index = () => {
  return (
    <Layout>
      <div className="w-3/5 mx-auto">
        <Events />
      </div>
    </Layout>
  );
};

export default index;
