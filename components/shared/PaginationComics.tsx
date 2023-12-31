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
  pages_displayed: number; // Số lượng trang hiển thị
  current_page: number;
  onPageChange: (page: number) => void;
}

const PaginationComics: React.FC<PaginationComicsProps> = ({
  total_pages,
  pages_displayed,
  current_page,
  onPageChange,
}) => {
  const half = Math.floor(pages_displayed / 2);
  let start = Math.max(current_page - half, 1);
  let end = Math.min(start + pages_displayed - 1, total_pages);

  if (total_pages - end < half) {
    start = Math.max(total_pages - pages_displayed + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          isActive={current_page !== 1}
          onClick={() => onPageChange(Math.max(current_page - 1, 1))}
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
          onClick={() => onPageChange(Math.min(current_page + 1, total_pages))}
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComics;

