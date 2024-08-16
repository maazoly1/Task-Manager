import { FormControlLabel, Switch } from "@mui/material";
import React, { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface SwitchToggleProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: ReactNode;
}

function SwitchToggle<T extends FieldValues>({
  label,
  name = "" as FieldPath<T>,
  control,
}: SwitchToggleProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControlLabel
          color="primary"
          control={<Switch {...field} />}
          label={label}
        />
      )}
    />
  );
}

export default SwitchToggle;
