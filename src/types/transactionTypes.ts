export interface ITransaction {
  id: number;
  type: "sent" | "received";
  amount: number;
  currency: "USDC" | "XLM";
  date: string;
  status: "completed" | "pending" | "failed";
}