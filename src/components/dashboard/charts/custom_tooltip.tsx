import { TransformedTotalAmountInCategory } from "@/interfaces/transaction";
import { formatAmount } from "@/utils/amount_formatter";
import { TooltipProps } from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "tailwindcss/types/config";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex gap-1 items-center bg-primary border border-secondary text-secondary p-5 rounded-lg shadow-lg text-sm">
        <div className="font-light">
          <span className="font-bold">{label ? label : payload[0].name}</span>{" "}
          amount:
        </div>
        <div className="label font-bold text-base">
          {formatAmount(payload[0].value ?? "0", true)}
        </div>
      </div>
    );
  }

  return null;
};

export const renderCustomizedLabel = (
  { cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any,
  data: TransformedTotalAmountInCategory[]
) => {
  const RADIAN = Math.PI / 180;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#001220"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-bold text-xs"
    >
      {data[index].categoryName} {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
