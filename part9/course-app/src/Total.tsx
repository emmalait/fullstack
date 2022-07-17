import { CoursePart } from "./App";

interface TotalProps {
  courseParts: CoursePart[];
}

const Total = (props: TotalProps) => {
  const { courseParts } = props;
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
