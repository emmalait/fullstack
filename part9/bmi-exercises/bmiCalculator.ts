export const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi: number = weight / (heightInM * heightInM);

  if (bmi <= 18.4) {
    return "Underweight";
  } else if (bmi >= 25.0) {
    return "Overweight";
  } else {
    return "Normal (healthy weight)";
  }
};
