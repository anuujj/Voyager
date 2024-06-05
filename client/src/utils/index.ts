import BigNumber from "bignumber.js";
import { CALL_DATA_TYPE } from "../constants/transactions";

export function ellipsis(str: string, maxLength = 13): string {
  if (str.length <= maxLength) {
    return str;
  }

  const ellipsisLength = 3;
  const truncatedLength = maxLength - ellipsisLength;
  const truncatedStr = str.substring(0, truncatedLength);

  return `${truncatedStr}...${str.substring(str.length - ellipsisLength)}`;
}

export function convertUnixTimestampToDateString(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toString();
}
export function convertUnixTimestampToDateTimeString(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleString("en-US", options);
}
export function convertUnixTimestampToTimeAgo(timestamp: number): string {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - timestamp;

  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInMonth = 30 * secondsInDay;
  const secondsInYear = 365 * secondsInDay;

  if (timeDifference < secondsInMinute) {
    return `${timeDifference} seconds ago`;
  } else if (timeDifference < secondsInHour) {
    const minutes = Math.floor(timeDifference / secondsInMinute);
    return `${minutes} minutes ago`;
  } else if (timeDifference < secondsInDay) {
    const hours = Math.floor(timeDifference / secondsInHour);
    return `${hours} hours ago`;
  } else if (timeDifference < secondsInMonth) {
    const days = Math.floor(timeDifference / secondsInDay);
    return `${days} days ago`;
  } else if (timeDifference < secondsInYear) {
    const months = Math.floor(timeDifference / secondsInMonth);
    return `${months} months ago`;
  } else {
    const years = Math.floor(timeDifference / secondsInYear);
    return `${years} years ago`;
  }
}
export function convertHexToDecimal(hex: string): string {
  const decimal = parseInt(hex, 16).toString();
  return decimal;
}
export const hexToString = (hex: string): string => {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const charCode = Number.parseInt(hex.slice(i, i + 2), 16);
    if (charCode) {
      str += String.fromCharCode(charCode);
    }
  }
  return str;
};
export const getCallDataWithType = (callData: string, type: string): string => {
  switch (type) {
    case CALL_DATA_TYPE[0]:
      return callData;
    case CALL_DATA_TYPE[1]:
      return convertHexToDecimal(callData);
    case CALL_DATA_TYPE[2]:
      return hexToString(callData);
    default:
      return callData;
  }
};
export const weiToEth = (wei: string) => {
  const weiInBigInt = BigInt(wei);
  console.log("weiInBigInt", wei, Number(weiInBigInt / BigInt(1e18)));
  return Number(weiInBigInt / BigInt(1e18));
};

// Function to convert hexadecimal wei to decimal ETH
export function hexWeiToEth(hexWei: string) {
  // Convert hexadecimal string to BigNumber
  if (hexWei === undefined) return "0";
  const wei = new BigNumber(hexWei, 16); // '16' specifies that the input is in hexadecimal

  // Convert wei to Ether (1 ETH = 10^18 wei)
  const eth = wei.dividedBy(new BigNumber(10).pow(18));

  // Return the result as a string
  return eth;
}
export function hexWeiToUsd(hexWei: string, ethPriceUsd: number): number {
  const eth = hexWeiToEth(hexWei);
  const usd = eth * ethPriceUsd;
  return usd;
}
export function getGasConsumed(amount: string, l1GasPrice: string) {
  const gasConsumed = new BigNumber(amount, 16).dividedBy(
    new BigNumber(l1GasPrice, 16)
  );
  return gasConsumed;
}
