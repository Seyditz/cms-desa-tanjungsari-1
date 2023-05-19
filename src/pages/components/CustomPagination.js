import React, { useState } from "react";
import { Col, Card, Pagination } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../redux/paginationSlice";
import "../../../src/scss/styles.css";

const CustomPagination = (props) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const paginationData = useSelector(
    (state) => state.pagination.paginationData
  );
  const {
    loading,
    totalPages = paginationData?.totalPages,
    size = "md",
  } = props;

  const onPrevItem = () => {
    const prevActiveItem = page === 1 ? page : page - 1;
    dispatch(changePage(prevActiveItem));
  };

  const onNextItem = (totalPages) => {
    const nextActiveItem = page === totalPages ? page : page + 1;
    dispatch(changePage(nextActiveItem));
  };

  const items = [];
  let isFirstPageEllpisisPrinted = false;
  for (let number = page - 2; number <= page + 2; number++) {
    if (number > totalPages) {
      break;
    } else if (number <= 0) {
      continue
    }

    const isItemActive = page === number;

    const handlePaginationChange = () => {
      dispatch(changePage(number));
    };

    const navToFirstPage = () => {
      dispatch(changePage(1));
    }

    const navToLastPage = () => {
      dispatch(changePage(totalPages));
    }

    if (number == 1) {
      isFirstPageEllpisisPrinted = false;
    }

    if (number >= 6) {
      if (!isFirstPageEllpisisPrinted) {
        isFirstPageEllpisisPrinted = true;
        items.splice(
          0,
          0,
          <Pagination.Item
            onClick={navToFirstPage}
            disabled={loading && !isItemActive}
          >
            {1}
          </Pagination.Item>
        );
        items.splice(
          1,
          0,
          <Pagination.Ellipsis disabled={loading}>...</Pagination.Ellipsis>
        );
      }
    }

    items.push(
      <Pagination.Item
        active={isItemActive}
        key={number}
        onClick={handlePaginationChange}
        disabled={loading && !isItemActive}
      >
        {number}
      </Pagination.Item>
    );

    if (number == page + 2) {
      if (totalPages - page >= 3) {
        items.push(
          <Pagination.Ellipsis disabled={loading}>...</Pagination.Ellipsis>
        );
        items.push(
          <Pagination.Item
            onClick={navToLastPage}
            disabled={loading && !isItemActive}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }
  }

  return (
    <Pagination size={size} className="mt-3">
      <Pagination.Prev disabled={loading} onClick={onPrevItem}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </Pagination.Prev>
      {items}
      <Pagination.Next
        disabled={loading}
        onClick={() => onNextItem(totalPages)}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </Pagination.Next>
    </Pagination>
  );
};

export default CustomPagination;
