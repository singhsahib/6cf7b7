export const DOTS = "...";

function usePagination({ currentPage, totalCount, pageSize }) {
  /*
    Rewrite the logic here to map out the pagination to be displayed

    !!!!!! ATTENTION !!!!!!
    Please replace this comment here with a description of this hook.
    
  */

  let len = Math.ceil(totalCount / pageSize);

  if (totalCount <= pageSize) {
    return [1, DOTS];
  } else {
    if (currentPage == 1 || currentPage == 2) {
      return [1, 2, 3, DOTS, len];
    } else if (currentPage == len || currentPage == len - 1) {
      return [1, DOTS, len - 2, len - 1, len];
    } else {
      return [
        1,
        DOTS,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        DOTS,
        len,
      ];
    }
  }
}

export default usePagination;
