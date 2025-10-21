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
        backgroundSrc="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Calles europeas al atardecer"
        title={title}
        items={items}
      />
    </section>
  );
};

export default WhatMakesUsUnique;
