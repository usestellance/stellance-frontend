import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  //   PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useInvoiceFilter } from "../../../store/useInvoiceStore";

const ReceiptPagination = () => {
  const { page, setPage } = useInvoiceFilter();
  return (
    <Pagination className="">
      <PaginationContent className="w-full flex justify-between">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            className={`${
              page > 1 ? "text-primary-500" : "text-neutral-800"
            } bg-neutral-comment`}
          />
        </PaginationItem>
        <PaginationItem>
          <div className="text-xs font-medium md:text-sm">
            Page {page} of 10
          </div>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(page + 1)}
            className="bg-neutral-comment"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ReceiptPagination;
