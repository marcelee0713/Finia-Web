import {
  Months,
  TransactionTypes,
  TransactionUseCases,
} from "@/types/transaction";

export interface MonthTransaction {
  month: Months;
  amount: string;
}

export interface TotalAmountInCategory {
  categoryName: string;
  amount: string;
}

export interface TransformedTotalAmountInCategory {
  categoryName: string;
  amount: number;
}

export interface TransactionRes {
  categoryName: string;
  uid: string;
  userId: string;
  categoryId: string;
  amount: string;
  type: TransactionTypes;
  note?: string | undefined;
  createdAt: Date;
}

export interface Transaction {
  categoryName: string;
  uid: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: TransactionTypes;
  note?: string | undefined;
  createdAt: Date;
}

export interface ActivityInfo {
  userId: string;
  useCase: TransactionUseCases;
  info: string;
  subInfo?: string;
  category?: string;
  amount?: string;
  note?: string;
  date?: string;
  month?: string;
  day?: string;
}

export interface CategoryDataStr {
  type: TransactionTypes;
  data: TotalAmountInCategory[];
  useCase: TransactionUseCases;
}

export interface CategoryData {
  type: TransactionTypes;
  data: TransformedTotalAmountInCategory[];
  useCase: TransactionUseCases;
}

export interface MonthlyData {
  type: TransactionTypes;
  monthlyTransactions: MonthTransaction[];
  useCase: TransactionUseCases;
}

export interface GetActivityRequest {
  userId: string;
  type?: TransactionTypes | string;
  category?: string;
  useCase?: TransactionUseCases;
  skip?: string;
  take?: string;
}
