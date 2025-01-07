interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
            currentPage === index + 1
              ? "bg-red-600 text-white"
              : "bg-white text-red-600 hover:bg-yellow-100"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
