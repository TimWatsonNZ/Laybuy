export default function numberToMoneyString(input: number) {
  if (typeof input !== "number") {
    throw `Parameter ${input} must be of type number.`
  }

  if (input < 0 || input > 1000) {
    throw `Number: ${input} out of bounds, must be between 0-1000`;
  }

  const roundedInput = Math.round((input + Number.EPSILON) * 100) / 100;
  const [dollars, cents] = String(roundedInput).split(".");

  const dollarString = mapDollars(dollars);
  const centsString = mapCents(cents);

  if (dollarString && centsString) {
    return `${dollarString} and ${centsString}`;
  }

  if (!dollarString && !centsString) {
    return "zero dollars";
  }
  
  return dollarString || centsString;
}

const numberToWordMap: {[key: string]: string} = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen",
  "20": "twenty",
  "30": "thirty",
  "40": "forty",
  "50": "fifty",
  "60": "sixty",
  "70": "seventy",
  "80": "eighty",
  "90": "ninety",
}

function mapNumberToWord(number: string) {
  const word = numberToWordMap[number];

  return word ? word : "";
}

function mapCents(cents: string) {
  if (!cents || cents === "0" || cents === "00") {
    return "";
  }

  if (cents === "01") {
    return "one cent";
  }

  let [tens, ones] = cents.split("");
  ones = ones || "0";

  return `${mapTensAndOnes(tens, ones)} cents`;
}

function mapDollars(dollars: string) {
  if (dollars === "1000") {
    return "one thousand dollars";
  }

  if (dollars === "0") {
    return "";
  }

  if (dollars === "1") {
    return "one dollar";
  }

  const padding = 3 - dollars.length;
  const paddedDollars = `${[...Array(padding)].map(_ => "0").join("")}${dollars}`;

  let [hundreds, tens, ones] = paddedDollars.split("");

  hundreds = mapNumberToWord(hundreds);
  const tensAndOnes = mapTensAndOnes(tens, ones);

  if (hundreds) {
    hundreds = tensAndOnes ? `${hundreds} hundred and ` : `${hundreds} hundred`;
  }
  
  return `${hundreds}${tensAndOnes} dollars`;
}

function mapTensAndOnes(tens: string, ones: string) {
  if (tens === "1") {
    tens = mapNumberToWord(`${tens}${ones}`); 
    ones = "0";
  } else if (tens !== "0") {
    tens = mapNumberToWord(`${tens}0`);
  } else {
    tens = "";
  }

  if (ones !== "0") {
    ones = tens ? ` ${mapNumberToWord(ones)}` : mapNumberToWord(ones);
  } else {
    ones = "";
  }

  return `${tens}${ones}`;
}