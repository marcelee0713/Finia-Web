export type TransactionTypes = "EXPENSES" | "REVENUE";

export type Months =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export type TransactionUseCases =
  | "DEFAULT"
  | "TOTAL_EXPENSES_INFO"
  | "TOTAL_REVENUES_INFO"
  | "CURRENT_MONTH_EXPENSES_INFO"
  | "CURRENT_MONTH_REVENUE_INFO"
  | "NET_INCOME_INFO"
  | "MOST_SPENT_CATEGORY_INFO"
  | "MOST_EARNED_INFO"
  | "MONTHLY_EXPENSES_GRAPH"
  | "MONTHLY_REVENUE_GRAPH"
  | "EXPENSES_BY_CATEGORY_GRAPH"
  | "REVENUE_BY_CATEGORY_GRAPH"
  | "LARGEST_EXPENSE_INFO"
  | "LARGEST_REVENUE_INFO"
  | "TOTAL_TRANSACTION_THIS_DAY_INFO"
  | "TOTAL_TRANSACTION_THIS_MONTH_INFO"
  | "HIGHEST_TRANSACTION_IN_A_DAY_INFO"
  | "TOTAL_TRANSACTIONS_INFO";

export type SortOrder = "asc" | "desc" | undefined;
