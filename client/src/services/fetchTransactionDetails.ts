async function fetchTransactionsDetails(
  hash: string
): Promise<any> {
  try {
    const response = await fetch(
      "https://voyager-be.vercel.app/api/transactionDetails?hash=" + hash
    );
    if (!response.ok) {
      throw new Error("Error fetching transactions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle error
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export default fetchTransactionsDetails;
