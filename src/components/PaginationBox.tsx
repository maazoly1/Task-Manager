"use client";

import { Pagination, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type TPaginationProps = {
  totalPages?: number;
  page?: number;
};

function PaginationBox({ page, totalPages = 1 }: TPaginationProps) {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
  };
  return (
    <Stack direction="row" justifyContent="center">
      <Pagination
        sx={{
          "& .MuiButtonBase-root": {
            bgcolor: "transparent",
            color: "grey.400",
            fontWeight: "400",
          },
          ".Mui-selected": {
            color: "secondary.main",
            fontWeight: 700,
          },
        }}
        count={totalPages}
        onChange={handleChange}
        page={page}
      />
    </Stack>
  );
}

export default PaginationBox;
