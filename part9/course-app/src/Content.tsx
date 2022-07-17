import { CoursePart } from "./App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  const { courseParts } = props;

  const parts = courseParts.map((part, i) => {
    return <Part key={i} coursePart={part} />;
  });

  return <div>{parts}</div>;
};

export default Content;
