"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormSchema, TTaskSchema } from "@/validation/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import useAppContext from "@/context/AppProvider/useAppContext";
import { AppActionType } from "@/types/appContext";
import { actionAddTask } from "@/actions/taskAction";

interface TaskModalProps {
  action: string;
  userId: string;
}

function TaskModal({ action, userId }: TaskModalProps) {
  const { dispatch } = useAppContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<TTaskSchema>({
    defaultValues: {
      userId,
      title: "",
      description: "",
      completed: false,
      taskDate: new Date(),
    },
    resolver: zodResolver(TaskFormSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: TTaskSchema) => {
      const res = await actionAddTask(formData);
      if (!("data" in res)) {
        dispatch({
          type: AppActionType.ADD_ALERT,
          payload: {
            message: res.message,
            type: "error",
          },
        });
        return res;
      }
      dispatch({
        type: AppActionType.ADD_ALERT,
        payload: {
          message: res.message,
          type: "success",
        },
      });
      reset();
      handleClose();
      return res;
    },
  });

  const onSubmit = (formData: TTaskSchema) => {
    mutation.mutate(formData);
  };

  return (
    <>
      {action === "Add" && (
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ borderRadius: 5 }}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={() => setOpen(true)}
        >
          Add Task
        </Button>
      )}

      {action === "Edit" && (
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon color="primary" />
        </IconButton>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ "& .MuiPaper-root": { width: 600 } }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="scroll-dialog-title">{action} Task</DialogTitle>
          <DialogContent dividers={true} sx={{ padding: 0 }}>
            <TaskForm control={control} />
          </DialogContent>
          <DialogActions sx={{ m: 0.5 }}>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ borderRadius: 5 }}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default TaskModal;
