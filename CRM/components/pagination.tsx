import {
  Pagination,
  PaginationBtn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextBtn,
  PaginationPreviousBtn,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

interface IProps {
  totalPage: number | undefined;
  page: number;
  onPageChange?: (page: number) => void;
  onPageClick?: (page: number) => void;
}

const MAX_PAGE = 5;
export function PaginationComp({
  totalPage = -1,
  page,
  onPageChange,
  onPageClick,
}: IProps) {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    setArray(() => {
      if (totalPage >= MAX_PAGE) return [1, 2, 3, 4, 5];
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    });
    // console.log(totalPage)
  }, [totalPage]);

  const handleNextBtn = () => {
    setArray((prev) => prev.map((item) => item + 1));
  };

  const handlePrevBtn = () => {
    setArray((prev) => prev.map((item) => item - 1));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousBtn
            // disabled={array[0] === 1 && page !== 1}
            disabled={array[0] === 1 || page === 1}
            onClick={handlePrevBtn}
          />
        </PaginationItem>
        {array.slice().map((item) => (
          <PaginationItem key={item}>
            <PaginationBtn
              onClick={() => {
                onPageChange?.(item);
                onPageClick?.(item);
              }}
              isActive={item === page}
            >
              {item}
            </PaginationBtn>
          </PaginationItem>
        ))}

        {array[MAX_PAGE - 1] === undefined ||
        array[MAX_PAGE - 1] >= totalPage ? null : (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNextBtn
            onClick={handleNextBtn}
            disabled={
              array[MAX_PAGE - 1] === undefined ||
              array[MAX_PAGE - 1] >= totalPage
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
