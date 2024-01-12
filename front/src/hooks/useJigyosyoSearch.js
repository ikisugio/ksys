import { useState } from "react";
import axiosInstance from "@/services/axios";

function useJigyosyoSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (code) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `http://localhost:8000/api/search/jigyosyo/?q=${code}`
      );
      setSearchResults(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { searchResults, isLoading, error, search };
}

export default useJigyosyoSearch;
