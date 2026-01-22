import { GridData } from "@/app/components/GridData";
import { FeatureGridItem } from "@/app/components/GridData/GridData";
import React from "react";

interface WhatMakesUsUniqueProps {
  title: string;
  items: FeatureGridItem[];
}

const WhatMakesUsUnique = ({ title, items }: WhatMakesUsUniqueProps) => {
  return (
    <section>
      <GridData
        backgroundSrc="/images/what-makes-us-unique/image-1.webp"
        backgroundAlt="Calles europeas al atardecer"
        title={title}
        items={items}
      />
    </section>
  );
};

export default WhatMakesUsUnique;
