import React from "react";
import { Control, Controller, FieldValues, FieldPath } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SxProps } from "@mui/material";
import { addYears, endOfYear } from "date-fns";

interface DateFieldProps<T extends FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  label: React.ReactNode;
  disablePast?: boolean;
  disableFuture?: boolean;
  views?: ("year" | "month" | "day")[];
  fullWidth?: boolean;
  size?: "small" | "medium";
  sx?: SxProps;
  maxYearFromCurrent?: number;
}

export default function DateField<T extends FieldValues>({
  label,
  name,
  control,
  size = "medium",
  sx,
  disablePast = true,
  disableFuture = false,
  views = ["year", "month", "day"],
  fullWidth = true,
  maxYearFromCurrent = 0,
}: DateFieldProps<T>) {
  const maxDate = endOfYear(addYears(new Date(), maxYearFromCurrent));
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            label={label}
            views={views}
            slotProps={{
              textField: {
                error: !!error,
                helperText: error?.message,
                fullWidth,
                size,
                sx,
              },
            }}
            format={"dd-MM-yyyy"}
            disablePast={disablePast}
            disableFuture={disableFuture}
            maxDate={maxDate}
          />
        )}
      />
    </>
  );
}
