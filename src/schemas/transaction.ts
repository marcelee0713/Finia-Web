import { TransactionFormData } from "@/interfaces/form";
import { ZodType, z } from "zod";

export const TransactionFormSchema: ZodType<TransactionFormData> = z.object({
  type: z.enum(["EXPENSES", "REVENUE"], {
    required_error: "Type is required",
    invalid_type_error: 'Type must be either "EXPENSES" or "REVENUE"',
  }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a valid number with up to two decimal places",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_date" ? "Date is required!" : defaultError,
    }),
  }),
  note: z
    .string()
    .max(50, {
      message: "Note cannot exceed 50 characters",
    })
    .optional(),
});
