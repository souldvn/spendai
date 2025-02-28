import React from "react";
import { PieChart, Pie, Cell } from "recharts";

type ExpenseData = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  data: ExpenseData[];
};

const Piejs: React.FC<Props> = ({ data }) => {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data.length > 0 ? data : [{ name: "Empty", value: 1, color: "#D3D3D3" }]}
        cx="50%"
        cy="50%"
        innerRadius={80}
        outerRadius={100}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default Piejs;
