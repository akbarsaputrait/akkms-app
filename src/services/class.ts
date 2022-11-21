import useSWR from "swr";
import { IClass } from "../types";
import { fetcher } from "../utils";

const classPath = "/api/classes";

export const useClasses = () => useSWR<IClass[]>(classPath);