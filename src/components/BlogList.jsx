import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState } from "react";
import blogs from "../data/blogs.json";
import { element } from "prop-types";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [pageSize, setPageSize] = useState(
    blogs.posts.length < PAGE_SIZES[0] ? blogs.posts.length : PAGE_SIZES[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0 * currentPage);
  const [end, setEnd] = useState(pageSize);
  const currentPaginationData = blogs.posts.slice(start, end);

  /**
   * This function basically does some sort of transformation using the old currentPage number and new currentPage 
    number so when you change from 100 per page to 15 the currentPage should also change and so does the array.
   * @param value is the number of items required by the user per page. 
   */
  const updateRowsPerPage = (value) => {
    let pageSizeIndex = PAGE_SIZES.findIndex((element) => element == value);

    if (pageSizeIndex > -1) {
      let oldLen = Math.ceil(blogs.posts.length / pageSize);
      let newLen = Math.ceil(blogs.posts.length / PAGE_SIZES[pageSizeIndex]);
      let oldCurrentPage = currentPage;
      let newCurrentPage = Math.ceil(newLen * (oldCurrentPage / oldLen));

      setEnd(newCurrentPage * PAGE_SIZES[pageSizeIndex]);
      setStart((newCurrentPage - 1) * PAGE_SIZES[pageSizeIndex]);
      setCurrentPage(newCurrentPage);
      setPageSize(PAGE_SIZES[pageSizeIndex]);
    } else {
      setPageSize(PAGE_SIZES[0]);
      setCurrentPage(1);
      setStart(0);
      setEnd(PAGE_SIZES[0]);
    }
  };

  const updatePage = (pageNumber) => {
    let len = Math.ceil(blogs.posts.length / pageSize);
    if (!(pageNumber <= 0 || pageNumber > len)) {
      setEnd(pageNumber * pageSize);
      setStart((pageNumber - 1) * pageSize);

      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
