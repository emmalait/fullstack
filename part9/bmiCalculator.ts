const calculateBmi = (height: number, weight: number): String => {
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

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
