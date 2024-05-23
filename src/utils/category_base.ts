import { EXPENSES_CATEGORIES, REVENUE_CATEGORIES } from "@/constants";
import fallback from "../../public/icons/base/fallback-icon.svg";

export const CategoryBasedOnIcon = (category: string): any => {
  let icon: any = fallback;

  EXPENSES_CATEGORIES.forEach((val) => {
    if (val.name === category) {
      icon = val.icon;
    }
  });

  REVENUE_CATEGORIES.forEach((val) => {
    if (val.name === category) {
      icon = val.icon;
    }
  });

  return icon;
};
