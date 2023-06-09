import React from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  SelectField,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/pages/api/myApi";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const defaultDate = new Date().toLocaleDateString();

  const newPostMutation = useMutation({
    mutationFn: (data) => {
      return api.post("/todo", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lists"]);
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
  const initVal = {
    task: "Task Name ...",
    category: "",
    date: "2023-06-09",
    done: false,
    time: "00:00",
  };
  const formik = useFormik({
    initialValues: initVal,
    onSubmit: (values) => {
      addNewTask(values);
    },
    enableReinitialize: true,
  });

  return (
    <Container mt="1rem" maxW="50rem">
      <Card>
        <CardBody>
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
                  size="md"
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
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </Select>
                <Input
                  placeholder="Select Time"
                  size="md"
                  type="time"
                  w="40%"
                  id="time"
                  onChange={formik.handleChange}
                  defaultValue={formik.values.time}
                  size="lg"
                />
                <Button size="lg" w="20%" type="submit">
                  <AddIcon />
                </Button>
              </Stack>
            </FormControl>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default TodoForm;
