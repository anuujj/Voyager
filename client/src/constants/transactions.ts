export const TRANSACTION_HEADING = "Transactions";
export const TRANSACTION_SUBHEADING = "A list of transactions on Starknet";
export const REVERTED = "reverted";
export const TRANSACTION_HEADERS = ["Status", "Hash", "Type", "Block", "Age"];
export const TRANSACTION_TYPES = [
  {
    label: "All",
    key: "",
    style: {
      color: "black",
      backgroundColor: "white",
      borderColor: "black",
    },
  },
  {
    label: "declare",
    key: "DECLARE",
    style: {
      color: "#feffb5",
      backgroundColor: "#202e26",
      borderColor: "#6b7d07",
    },
  },
  {
    label: "deploy",
    key: "DEPLOY",
    style: {
      color: "#d2e5ff",
      backgroundColor: "#223655",
      borderColor: "#3c506e",
    },
  },
  {
    label: "deploy_account",
    key: "DEPLOY_ACCOUNT",
    style: {
      color: "#d2e5ff",
      backgroundColor: "#223655",
      borderColor: "#3c506e",
    },
  },
  {
    label: "invoke",
    key: "INVOKE",
    style: {
      color: "#82f4bb",
      backgroundColor: "#202e26",
      borderColor: "#2e4c3c",
    },
  },
  {
    label: "l1_handler",
    key: "L1_HANDLER",
    style: {
      color: "white",
      backgroundColor: "#383838",
      borderColor: "#5e5e5e",
    },
  },
];
