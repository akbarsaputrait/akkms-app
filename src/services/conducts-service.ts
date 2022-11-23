import useSWR from "swr";

const conductTypePath = "/api/conducts";

export const useConductTypes = () => useSWR<any[]>(conductTypePath);
