import { useState, useCallback } from 'react';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../../services/apiService';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  initialLoading?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: any;
  fetchData: () => Promise<void>;
  postData: (data: any) => Promise<void>;
  updateData: (data: any) => Promise<void>;
  removeData: () => Promise<void>;
}

export function useApi<T = any>(url: string, options: UseApiOptions = {}): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(options.initialLoading ?? false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRequest(url);
      setData(response);
      options.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const postData = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postRequest(url, data);
      setData(response);
      options.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const updateData = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await putRequest(url, data);
      setData(response);
      options.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const removeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteRequest(url);
      setData(null);
      options.onSuccess?.(response);
    } catch (err) {
      setError(err);
      options.onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    updateData,
    removeData
  };
}

export default useApi;
