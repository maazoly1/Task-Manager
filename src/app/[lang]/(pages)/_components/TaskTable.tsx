import { TableRow, TableCell, IconButton, Chip, Avatar } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import RestoreIcon from "@mui/icons-material/Restore";
import { format } from "date-fns";
import TaskModal from "./TaskModal";
import TaskDelete from "./TaskDelete";

type TTaskTableProps = { data: any };
function TaskTable({ data }: TTaskTableProps) {
  return (
    <TableRow>
      <TableCell>{format(data.taskDate, "dd-MM-yyyy")}</TableCell>
      <TableCell>{data.title || "-"}</TableCell>
      <TableCell>{data.description}</TableCell>
      <TableCell align="center">
        <Chip
          avatar={
            <Avatar
              sx={{
                bgcolor: data.completed ? "success.light" : "warning.light",
              }}
            >
              {data.completed ? (
                <DoneIcon sx={{ color: "common.white" }} />
              ) : (
                <RestoreIcon sx={{ color: "common.white" }} />
              )}
            </Avatar>
          }
          sx={{
            color: "white",
            bgcolor: data.completed ? "success.main" : "warning.main",
          }}
          label={data.completed ? "Completed" : "Uncompleted"}
        />
      </TableCell>
      <TableCell align="center">
        {data.userId && <TaskModal action="Edit" userId={data.userId} />}
        {data.id && <TaskDelete id={data.id} />}
      </TableCell>
    </TableRow>
  );
}

export default TaskTable;
