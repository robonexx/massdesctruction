import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortConst = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abortConst.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error('Error while loading');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            console.log('fetch aborted');
          } else {
            setIsLoading(false);
            setError(err.message);
          }
        });
    }, 500);

    return () => abortConst.abort();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
