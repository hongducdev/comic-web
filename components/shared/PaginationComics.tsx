import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComicsProps {
  total_pages: number;
  items_per_page: number;
  current_page: number;
  onPageChange: (page: number) => void;
}

const PaginationComics: React.FC<PaginationComicsProps> = ({
  total_pages,
  items_per_page,
  current_page,
  onPageChange,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(total_pages / items_per_page); i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          isActive={current_page !== 1}
          onClick={() => onPageChange(current_page - 1)}
        >
          Previous
        </PaginationPrevious>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === current_page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext
          isActive={current_page !== total_pages}
          onClick={() => onPageChange(current_page + 1)}
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComics;
