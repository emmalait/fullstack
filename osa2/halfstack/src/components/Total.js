import React from "react";

const Total = ({ parts }) => {
  const total = parts
    .map(part => part.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue);

  return <p>yhteensä {total} tehtävää</p>;
};

export default Total;
