import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {
  const [word, setWord] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  let { search } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate('/login');
        } else if (response.status === 500) {
          setError(true)
        }
        return response.json();
      })
      .then((data) => {
        setWord(data && data[0] && data[0].meanings);
        setIsLoading(false);
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link
          to="/dictionary"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Search another word
        </Link>
      </>
    );
  }

  return (
    <>
      {word && word ? (
        <>
          <h1 className="text-3xl mb-8">Hello from the Definition</h1>
          {word &&
            word.map((meaning) => {
              return (
                <p key={uuidv4()}>
                  {meaning.partOfSpeech + ": "}
                  {meaning.definitions[0].definition}
                </p>
              );
            })}
            <p className="mb-3 text-2xl mt-10">Search again: </p>
            <DefinitionSearch />
        </>
      ) : null}
    </>
  );
}
