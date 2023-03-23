import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
    value: number
    onPageChanged: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({onPageChanged, value}) => {
    return (
        <ReactPaginate
            className='pagination'
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onPageChanged(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            forcePage={value - 1}
        />
    );
}
