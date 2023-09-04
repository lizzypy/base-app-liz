import {useMemo} from "react";
import axios, {AxiosInstance} from "axios";

export const useHttpClient = (): AxiosInstance => {

  return useMemo<AxiosInstance>(() => {

    const instance = axios.create({
      // baseURL: 'http://localhost:3000',
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });

    return instance
  }, [])
}
