import React, { useState } from "react";
import Select from "react-select";
import { gql, useMutation } from "@apollo/client";
import { ALL_AUTHORS } from "../App";

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("update author");
    editAuthor({
      variables: { name: author, setBornTo: parseInt(year) },
    });

    setAuthor("");
    setYear("");
  };

  const authors = props.authors;

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors &&
            authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          author
          <Select
            options={options}
            onChange={(selectedOption) => setAuthor(selectedOption.value)}
          />
        </div>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
