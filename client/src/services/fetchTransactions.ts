import { Transaction } from "../types/transactions";

async function fetchTransactions(
  id: string,
  filter: string,
  size = 20
): Promise<Transaction[]> {
  try {
    const response = await fetch(
      "https://voyager-23vq.onrender.com/api/transactions?id=" +
        id +
        "&size=" +
        size +
        "&filter=" +
        filter
    );
    if (!response.ok) {
      throw new Error("Error fetching transactions");
    }
    const data: Transaction[] = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export default fetchTransactions;
