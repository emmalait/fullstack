import { CoursePart } from "./App";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
