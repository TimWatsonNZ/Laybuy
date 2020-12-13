import numberToMoneyString from './numberToMoneyString';

describe("Money money testing", () => {
  describe("Should accept input between 0-1000 to 2 decimal places", () => {
    //  I discovered that 1000 + Number.EPSILON === 1000 which is a bit annoying.
    it("Should accept nothing over 1000", () => {
      const inputTest = () => numberToMoneyString(1000.01);

      expect(inputTest).toThrow();
    });

    it("Should accept nothing under 0", () => {
      const inputTest = () => numberToMoneyString(0 - Number.EPSILON);

      expect(inputTest).toThrow();
    });

    it("Should round input after 2 decimal places", () => {
      expect(numberToMoneyString(0.01)).toEqual(numberToMoneyString(0.011));
      expect(numberToMoneyString(0.02)).toEqual(numberToMoneyString(0.015));
    });
  });

  it("Should return 0 dollars if input is 0", () => {
    expect(numberToMoneyString(0)).toEqual("zero dollars");
  })
  
  describe("Pluralization", () => {
    it("Should not pluralize 1 dollar and 1 cent", () => {
      expect(numberToMoneyString(1.01)).toEqual("one dollar and one cent");
    });
  });
  
  describe("Correctly parses 10-19 range", () => {
    it("Should parse dollars correctly in this range", () => {
      expect(numberToMoneyString(10)).toEqual("ten dollars");
      expect(numberToMoneyString(15)).toEqual("fifteen dollars");
      expect(numberToMoneyString(19)).toEqual("nineteen dollars");
    });
    it("Should parse cents correctly in this range", () => {
      expect(numberToMoneyString(0.10)).toEqual("ten cents");
      expect(numberToMoneyString(0.15)).toEqual("fifteen cents");
      expect(numberToMoneyString(0.19)).toEqual("nineteen cents");
    });
  });
})