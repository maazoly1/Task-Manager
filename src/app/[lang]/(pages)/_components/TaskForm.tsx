import DateField from "@/components/DateField";
import SimpleTextField from "@/components/SimpleTextField";
import SwitchToggle from "@/components/SwitchToggle";
import { FormControlLabel, Grid, Switch } from "@mui/material";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

interface TaskFormProps<T extends FieldValues> {
  control: Control<T>;
}

function TaskForm<T extends FieldValues>({ control }: TaskFormProps<T>) {
  return (
    <Grid container sx={{ p: 4 }} spacing={3}>
      <Grid item xs={12}>
        <DateField
          label="Assign Date"
          name={"taskDate" as Path<T>}
          control={control}
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          control={control}
          label="Title"
          name={"title" as Path<T>}
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
        />
      </Grid>
      <Grid item xs={12}>
        <SimpleTextField
          control={control}
          label="Description"
          name={"description" as Path<T>}
          sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
          minRows={4}
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <SwitchToggle
          label="Complete"
          name={"completed" as Path<T>}
          control={control}
        />
      </Grid>
    </Grid>
  );
}

export default TaskForm;
