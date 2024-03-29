import React, { useState } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../App";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const filtered = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  console.log("filtered", filtered);

  if (!props.show) {
    return null;
  }

  const books = props.books;
  const allGenres = [];
  books.map((book) => book.genres.map((genre) => allGenres.push(genre)));
  const genres = allGenres.filter((v, i, a) => a.indexOf(v) === i);

  const options = genres.map((genre) => ({
    value: genre,
    label: genre,
  }));

  return (
    <div>
      <h2>books</h2>

      {genres && (
        <>
          <div>genre</div>
          <Select
            options={options}
            onChange={(selectedOption) => setGenre(selectedOption.value)}
          />
        </>
      )}

      {!filtered.loading && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                <b>author</b>
              </th>
              <th>
                <b>published</b>
              </th>
            </tr>
            {filtered.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
