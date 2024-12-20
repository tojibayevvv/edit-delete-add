import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../useAxios";
import { notification } from "antd";

const useDeleteTodo = (id) => {
    const  queryClient = useQueryClient()
    const axios = useAxios()
    return async (recievedData) => {
        queryClient.setQueryData(["TODO"], (oldData) => {
            return oldData.filter((value) => value.id !== recievedData.id)
        })
        await axios ({url: `info/${recievedData.id}`, method: "DELETE"})
        .then((data) => {
            console.log(data)
            notification.success({message: "DELETE"});
        })
        .catch((error) => {
            notification.error({message: error.message})
        })
    }
}

const useAddTodo = () => {
    const axios = useAxios()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => axios({url: "info", method: "POST", body: data}),
        onSuccess: () => {
            queryClient.invalidateQueries(["TODO"]);
            notification.success({message: "Add todo for me"});
        }
    })
}

const useEditTodo = () => {
    const axios = useAxios()
    const queryClient = useQueryClient()

    return async (newData) => {
        queryClient.setQueriesData(["TODO"], (oldData) => {
            return oldData.map((value) => 
            value.id === newData.id? {...newData} : value
        );
      });
      await axios({
        url: `info/${newData.id}`,
        method: "PUT",
        body: newData
      }).then(()=> {
        notification.success({message: "Edit data from me"})
      })
    }
}

export {useDeleteTodo, useAddTodo, useEditTodo}