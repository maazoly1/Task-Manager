import PaginationBox from "@/components/PaginationBox";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import React from "react";
import TaskTable from "./TaskTable";
import { actionGetAuthUser } from "@/actions/authAction";
import { actionGetTasks } from "@/actions/taskAction";

async function TaskList() {
  const userData = await actionGetAuthUser();
  if (!!userData && "data" in userData) {
    const userId = userData.data.id;
    const data = await actionGetTasks(userId);
    return (
      <Paper elevation={0} sx={{ width: 1, borderRadius: 0, overflow: "auto" }}>
        {"data" in data &&
        Array.isArray(data.data) &&
        data.data.length !== 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.100" }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((element, key: number) => (
                  <TaskTable key={key} data={element} />
                ))}
              </TableBody>
            </Table>
            <Box sx={{ padding: 2 }}>
              <PaginationBox page={1} totalPages={1} />
            </Box>
          </>
        ) : (
          <Paper variant="outlined">
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                py: 5,
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              Task Not Found
            </Typography>
          </Paper>
        )}
      </Paper>
    );
  }
  return (
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        pb: 5,
        fontWeight: "bold",
        color: "grey.400",
      }}
    >
      Task Not Found
    </Typography>
  );
}

export default TaskList;
