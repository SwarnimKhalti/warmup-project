import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/pages/api/myApi";
import {
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

interface Todo {
  id: number;
  task: string;
  date: string;
  time: string;
  category: string;
  done: boolean;
}

const TodoList = () => {
  const queryClient = useQueryClient();

  // Delete Data (Delete)

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => {
      return api.delete(`/todo/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });

  const deleteHandler = (id: number) => {
    deleteTaskMutation.mutate(id);
  };

  // Change Status (Patch)

  const { mutate: statusChangeMutation } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: boolean }) => {
      return api.patch(`/todo/${id}/`, { done: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const statusHandler = (status: boolean, id: number) => {
    const newStatus = Boolean(status ? false : true);
    console.log(id, newStatus);

    statusChangeMutation({ id: id, data: newStatus });
  };

  //Display Tasks (Get)
  const { data } = useQuery({
    queryKey: ["lists"],
    queryFn: () =>
      api.get("/todo").then((response) => {
        return response.data;
      }),
  });

  return (
    <Container mt="1rem" maxW="50rem">
      {data?.map((list: Todo) => {
        const listDate = new Date(list.date);
        const tempDate = String(listDate.getDate());
        const toDoDate = tempDate.padStart(2, "0");
        const toDoMonth = listDate.toLocaleString("en-US", {
          month: "short",
        });
        const toDoYear = listDate.getFullYear();

        return (
          <Card mt="1rem" key={list.id}>
            <CardBody>
              <List>
                <Stack direction="row">
                  <Stack direction="column" w="10rem">
                    <Badge
                      textAlign="center"
                      variant="subtle"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      colorScheme={list.done ? "green" : "yellow"}
                      h="3rem"
                      rounded={10}
                    >
                      <Text fontSize="lg">
                        {" "}
                        {list.done ? "Completed" : "Pending"}
                      </Text>
                    </Badge>

                    <Badge
                      textAlign="center"
                      variant="subtle"
                      colorScheme="red"
                      h="3rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      rounded={10}
                    >
                      <Text fontSize="lg">
                        {toDoDate} {toDoMonth} {toDoYear}
                      </Text>
                    </Badge>
                    <Badge
                      variant="subtle"
                      textAlign="center"
                      colorScheme={list.done ? "green" : "yellow"}
                      h="3rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      rounded={10}
                    >
                      <Text fontSize="lg">{list.time}</Text>
                    </Badge>
                  </Stack>
                  <Stack direction="column" w="85%">
                    <ListItem
                      bg="#2c5282"
                      h="80%"
                      maxW="45rem"
                      p={0.5}
                      textAlign="center"
                      rounded={10}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="2xl">{list.task}</Text>
                    </ListItem>
                    <ListItem
                      bg="#2c5282"
                      maxW="45rem"
                      p={0.5}
                      textAlign="center"
                      rounded={10}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {" "}
                      <Text fontSize="2xl">{list.category}</Text>
                    </ListItem>
                  </Stack>
                  <Stack direction="column">
                    <Button h="3rem">
                      <Text fontSize="3xl">
                        <EditIcon />
                      </Text>
                    </Button>
                    <Button h="3rem" onClick={() => deleteHandler(list.id)}>
                      <Text fontSize="3xl">
                        {" "}
                        <DeleteIcon />{" "}
                      </Text>
                    </Button>
                    <Button
                      h="3rem"
                      onClick={() => statusHandler(list.done, list.id)}
                    >
                      <Text fontSize="3xl">
                        {" "}
                        {!list.done ? <CheckIcon /> : <CloseIcon />}
                      </Text>
                    </Button>
                  </Stack>
                </Stack>
              </List>
            </CardBody>
          </Card>
        );
      })}
    </Container>
  );
};

export default TodoList;
