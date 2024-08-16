"use client";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { actionDeleteTask } from "@/actions/taskAction";
import useAppContext from "@/context/AppProvider/useAppContext";
import { AppActionType } from "@/types/appContext";
import { useMutation } from "@tanstack/react-query";

function TaskDelete({ id }: { id: string }) {
  const { dispatch } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await actionDeleteTask(id);
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
      handleClose();
      return res;
    },
  });

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <DeleteForeverIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        sx={{ "& .MuiPaper-root": { width: 600 } }}
      >
        <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you Sure you want to delete this Task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={() => mutation.mutate()} autoFocus>
            confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskDelete;
