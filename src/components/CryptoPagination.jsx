import * as React from "react";
import { Pagination } from "flowbite-react";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CryptoPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="m-auto flex justify-center mb-10 mt-5 ">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
              className={`${
                item.page === currentPage
                  ? " text-[#87CEEB] w-[32px] h-[32px]"
                  : " text-[#87CEEB] hover:bg-black hover:text-white"
              }`}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default CryptoPagination;
