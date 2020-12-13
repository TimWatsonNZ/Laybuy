import numberToMoneyString from './numberToMoneyString';

const args = process.argv;

if (args.length) {
  const parsedInput = Number(args.slice(2)[0]);
  if (Number.isNaN(parsedInput)) {
    throw "Argument is not a number.";
  }

  console.log(numberToMoneyString(parsedInput));
}