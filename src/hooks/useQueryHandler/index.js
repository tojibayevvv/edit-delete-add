import { useQuery } from "react-query";
import { useAxios } from "../useAxios";

export const useQueryHandler = ({ pathname, url, params }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: [pathname],
    queryFn: () => axios({ url, params }).then((data) => data.data),
  });
};
