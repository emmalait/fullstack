interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: String;
  target: number;
  average: number;
}

type Rating = 1 | 2 | 3;

const getRating = (average: number, target: number): Rating => {
  const value: number = average / target;
  if (value < 0.3) {
    return 1;
  } else if (value > 0.7) {
    return 3;
  } else {
    return 2;
  }
};

const getRatingDesc = (rating: Rating): String => {
  switch (rating) {
    case 1:
      return "aw, you can do better next week!";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "wow, great job! :)";
  }
};

const calculateExercises = (dailyValues: number[], target: number): Result => {
  const periodLength: number = dailyValues.length;
  const trainingDays: number = dailyValues.filter((e) => e != 0).length;
  const sum: number = dailyValues.reduce((sum, v) => sum + v, 0);
  const average: number = sum / periodLength;
  const rating: Rating = getRating(average, target);

  const result: Result = {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: getRatingDesc(rating),
    target,
    average,
  };

  return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
