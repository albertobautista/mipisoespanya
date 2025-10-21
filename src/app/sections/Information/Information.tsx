import { TextImageScrollTransition } from "@/app/components/TextImageScrollTransition";
import { ShowcaseItem } from "@/app/components/TextImageScrollTransition/TextImageScrollTransition";
import React from "react";

const Information = ({ items }: { items: ShowcaseItem[] }) => {
  return (
    <section id="information" className="bg-light-green">
      <TextImageScrollTransition
        maxContentWidth={1500}
        items={items}
        colors={{ inactive: "#757273", active: "#0a0a0a" }}
      />
    </section>
  );
};

export default Information;
