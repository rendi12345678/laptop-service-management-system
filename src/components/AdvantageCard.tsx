import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AdvantageCardProps {
  title: string;
  description: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description }) => {
  return (
    <Card className="mt-5">
      <CardHeader className="pb-4">
        <h4>{title}</h4>
      </CardHeader>
      <CardContent>
        <p className="mb-0 pb-0">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AdvantageCard;
