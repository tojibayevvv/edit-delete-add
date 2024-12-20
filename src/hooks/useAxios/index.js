import axios from "axios";

export const useAxios = () => {
    const response = ({url, body, method="GET", headers, params}) => {
        return axios({
            url: `${import.meta.env.VITE_BASE_URL}/${url}`,
            method,
            data: body,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            params: {
                ...params
            }
        })
    }
    return response
}