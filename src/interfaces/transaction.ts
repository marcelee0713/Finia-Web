import {
  Months,
  SortOrder,
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

export interface TransactionDataRes {
  data: TransactionRes[];
  length: string;
  filteredLength: string;
}

export interface TransactionData {
  data: Transaction[];
  length: string;
  filteredLength: string;
}

export interface EmptyInfo {
  icon: any;
  title: string;
  info: string;
  subInfo?: string;
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
  type?: TransactionTypes | string;
  category?: string;
  useCase?: TransactionUseCases;
  minAmount?: string;
  maxAmount?: string;
  skip?: string;
  take?: string;
  amountOrder?: SortOrder;
  dateOrder?: SortOrder;
  noteOrder?: SortOrder;
}

export interface csvProps {
  arr: Transaction[];
  onLoading: () => void;
  onError: (res: string) => void;
  onSuccess: (res: string) => void;
}
