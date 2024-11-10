// LivingInBaliAdvantages.tsx
import * as React from "react";
import BaseContainer from "@/components/BaseContainer";
import AdvantageCard from "@/components/AdvantageCard";

const advantages = [
  {
    title: "🌴 Tropical Paradise and Natural Beauty",
    description:
      "Bali’s stunning beaches, lush jungles, and year-round warm weather create an idyllic setting, making every day feel like a vacation.",
  },
  {
    title: "💸 Affordable Cost of Living",
    description:
      "Compared to many Western countries, the cost of living in Bali is relatively low, allowing for a higher standard of living on a smaller budget.",
  },
  {
    title: "🍽️ Amazing Food and Local Cuisine",
    description:
      "Bali offers a diverse range of food, from fresh seafood to healthy organic options and vibrant local dishes, catering to all tastes and dietary needs.",
  },
];

export default function LivingInBaliAdvantages() {
  return (
    <BaseContainer className="my-10">
      <h2 className="max-w-[13ch]">Advantages of living in Bali</h2>
      {advantages.map((advantage, index) => (
        <AdvantageCard
          key={index}
          title={advantage.title}
          description={advantage.description}
        />
      ))}
    </BaseContainer>
  );
}
