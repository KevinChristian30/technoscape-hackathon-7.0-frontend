import { listQueueGet } from "@/services/queue/listQueue.get";
import { useQuery } from "@tanstack/react-query";

export const useCallQueue = () =>
  useQuery({
    queryKey: ["listQueueGet"],
    queryFn: listQueueGet,
    retry: 1,
  });
