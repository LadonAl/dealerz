import { QueryClient } from "react-query";

export const createQueryClient: () => QueryClient = function setupReactQueryClient() {
  return new QueryClient();
};
