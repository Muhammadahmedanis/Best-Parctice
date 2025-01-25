import { useState } from 'react';

const useApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (params) => {
    setIsLoading(true);
    try {
      const response = await apiCall(params);
      setData(response.data);
      setError(null); // Reset error in case of success
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, callApi };
};

export default useApi;
