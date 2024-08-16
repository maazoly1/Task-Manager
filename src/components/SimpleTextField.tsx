import React, { ReactNode } from "react";
import { InputProps, TextField } from "@mui/material";
import { Control, Controller, FieldValues, FieldPath } from "react-hook-form";

interface SimpleTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: FieldPath<T>;
  label?: ReactNode;
  type?: "text" | "number" | "email" | "file" | "password";
  sx?: object;
  defaultValue?: string;
  required?: boolean;
  value?: string | number;
  multiline?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  InputPropsComponent?: Partial<InputProps>;
  minRows?: number;
  readOnly?: boolean;
}

function SimpleTextField<T extends FieldValues>({
  label,
  name = "" as FieldPath<T>,
  control,
  type = "text",
  required = false,
  sx,
  multiline = false,
  defaultValue,
  disabled = false,
  InputPropsComponent,
  minRows,
  readOnly = false,
}: SimpleTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          {...field}
          type={type}
          label={label}
          error={!!error}
          minRows={minRows}
          helperText={error?.message}
          sx={sx}
          value={type === "file" ? undefined : field.value}
          required={required}
          multiline={multiline}
          defaultValue={defaultValue}
          InputLabelProps={type === "file" ? { shrink: true } : undefined}
          disabled={disabled}
          InputProps={{
            ...InputPropsComponent,
            readOnly,
          }}
          autoComplete="off"
        />
      )}
    />
  );
}

export default SimpleTextField;
