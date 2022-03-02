import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../App";

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

const Recommended = (props) => {
  const [genre, setGenre] = useState("");

  const filtered = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  const user = useQuery(GET_USER);

  useEffect(() => {
    if (user && !user.loading && user.data.me !== null) {
      setGenre(user.data.me.favoriteGenre);
    }
  }, [user]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre: <b>{genre}</b>
      </p>

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

export default Recommended;
