import { assertNever, CoursePart } from "./App";

interface Part {
  coursePart: CoursePart;
}

const Part = (props: Part) => {
  const { coursePart } = props;

  switch (coursePart.type) {
    case "normal":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
        </p>
      );
    case "groupProject":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          Group project exercises: {coursePart.groupProjectCount}
        </p>
      );
    case "submission":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          <a href={coursePart.exerciseSubmissionLink}>Submission link</a>
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          Course requirements:{" "}
          {coursePart.requirements.map((req, i) => [i > 0 && ", ", req])}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
