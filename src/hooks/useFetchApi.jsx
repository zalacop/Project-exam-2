import { useEffect, useState } from "react";

function useApi(url) {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(null);
        const response = await fetch(url);
        const json = await response.json();
        setResponseData(json);
      } catch (error) {
        console.log(error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);

  return {
    data: responseData,
    isLoading,
    isError,
  };
}

export default useApi;
