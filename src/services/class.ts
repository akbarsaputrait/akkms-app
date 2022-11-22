import useSWR from "swr";

import { IClass } from "../types";

const classPath = "/api/classes";

export const useClasses = () => useSWR<IClass[]>(classPath);
