import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/pages/api/myApi";
import { useSelector } from "react-redux";

interface taskType {
  id: number;
  task: string;
  time: string;
  date: string;
  category: string;
  done: boolean;
}

const TodoForm = () => {
  const [editTaskId, setEditTaskId] = useState(0);
  const queryClient = useQueryClient();
  const defaultDate = new Date().toLocaleDateString();
  const defaultData = useSelector((state) => state.lists.data);

  const newPostMutation = useMutation({
    mutationFn: (data) => {
      return api.post("/todo", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
  });

  const { mutate: editTaskMutation } = useMutation({
    mutationFn: (data: any) => {
      return api.patch(`/todo/${data.id}`, { ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addNewTask = (data: any) => {
    const tempData = JSON.stringify(data, null, 2);
    const newData = JSON.parse(tempData);

    const newStatus = newData.done === "false" ? Boolean(false) : Boolean(true);

    const newObj = {
      ...newData,
      done: newStatus,
    };

    newPostMutation.mutate(newObj);
  };

  const updateTask = (data: any) => {
    const upStatus = data.done === "false" ? Boolean(false) : Boolean(true);

    const tempTask = data.task;
    const tempDone = upStatus;
    const tempTime = data.time;
    const tempCat = data.category;
    const tempDate = data.date;
    const tempId = data.id;

    // const updateObj = {
    //   id: tempId,
    //   task: tempTask,
    //   done: tempDone,
    //   time: tempTime,
    //   category: tempCat,
    //   date: tempDate,
    // };
    // console.log("data", updateObj);

    editTaskMutation({
      id: tempId,
      task: tempTask,
      time: tempTime,
      done: tempDone,
      date: tempDate,
      category: tempCat,
    });
  };

  const formik = useFormik({
    initialValues: defaultData,
    onSubmit: (values) => {
      addNewTask(values);
    },
    enableReinitialize: true,
  });

  return (
    <Container mt="1rem" maxW="50rem">
      <Card>
        <CardBody rounded={10}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <Input
                variant="outline"
                type="text"
                placeholder="Task Name"
                id="task"
                onChange={formik.handleChange}
                defaultValue={formik.values.task}
                size="lg"
              />
              <Stack direction="row" mt="1rem">
                <Select
                  variant="outline"
                  placeholder="Select Category"
                  w="50%"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.category}
                  id="category"
                  size="lg"
                >
                  <option value="Office">Office</option>
                  <option value="Learn">Learn</option>
                </Select>
                <Input
                  placeholder="Select Date"
                  type="date"
                  w="50%"
                  id="date"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.date}
                  size="lg"
                />
              </Stack>
              <Stack direction="row" mt="1rem">
                <Select
                  variant="outline"
                  placeholder="Status"
                  w="40%"
                  onChange={formik.handleChange}
                  id="done"
                  defaultValue={formik.values.done}
                  size="lg"
                >
                  {" "}
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </Select>
                <Input
                  placeholder="Select Time"
                  type="time"
                  w="40%"
                  id="time"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.time}
                  size="lg"
                />
                {formik.values.id ? (
                  <Button
                    size="lg"
                    w="20%"
                    type="button"
                    colorScheme="
                  yellow"
                    onClick={() => updateTask(formik.values)}
                  >
                    <EditIcon />
                  </Button>
                ) : (
                  <Button size="lg" w="20%" type="submit" colorScheme="teal">
                    <AddIcon />
                  </Button>
                )}
              </Stack>
            </FormControl>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default TodoForm;
