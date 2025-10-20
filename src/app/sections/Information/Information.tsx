import { TextImageScrollTransition } from "@/app/components/TextImageScrollTransition";
import { ShowcaseItem } from "@/app/components/TextImageScrollTransition/TextImageScrollTransition";
import React from "react";

const Information = ({ items }: { items: ShowcaseItem[] }) => {
  return (
    <section id="information">
      <TextImageScrollTransition
        items={items}
        colors={{ inactive: "#d1c2c8", active: "#0a0a0a" }}
      />
    </section>
  );
};

export default Information;
