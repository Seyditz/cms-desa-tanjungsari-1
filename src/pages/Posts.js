import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
  Card,
} from "@themesberg/react-bootstrap";

import { PostsTable, UsersTable } from "../components/Tables";
import { useEffect } from "react";
import { userRequest } from "../utils/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import UserAlert from "./components/UserAlert";
import { changePage, setPaginationData } from "../redux/paginationSlice";
import {
  fetchFailure,
  fetchPostListSuccess,
  fetchStart,
  fetchSuccess,
  resetPostInputData,
  setLoadingValue,
} from "../redux/postSlice";
import PostAlert from "./components/PostAlert";

export default () => {
  const alert = useSelector((state) => state.post.alert);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchApiKeyword, setSearchApiKeyword] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchApiKeyword(searchKeyword);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  useEffect(() => {
    dispatch(resetPostInputData());
    const fetchPosts = async () => {
      try {
        dispatch(fetchStart());
        dispatch(setLoadingValue(0));
        const res = await userRequest.get(`posts?page=${page}&limit=3`, {
          onDownloadProgress: (progressEvent) => {
            const percent = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            dispatch(setLoadingValue(percent));
          },
        });
        const { docs, ...paginationData } = res.data;
        dispatch(fetchSuccess());
        dispatch(setPaginationData(paginationData));
        dispatch(fetchPostListSuccess(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(fetchFailure());
      }
    };
    const fetchSearchedPosts = async () => {
      try {
        dispatch(fetchStart());
        dispatch(setLoadingValue(0));
        const res = await userRequest.post(
          `posts/search?page=${page}&limit=3`,
          { name: searchApiKeyword },
          {
            onDownloadProgress: (progressEvent) => {
              const percent = Math.floor(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              dispatch(setLoadingValue(percent));
            },
          }
        );
        const { docs, ...paginationData } = res.data;
        dispatch(fetchSuccess());
        dispatch(setPaginationData(paginationData));
        dispatch(fetchPostListSuccess(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(fetchFailure());
      }
    };
    if (searchApiKeyword != "" || searchApiKeyword != undefined) {
      fetchSearchedPosts();
    } else {
      console.log("halo1");
      fetchPosts();
    }
  }, [page, searchApiKeyword]);

  useEffect(() => {
    dispatch(changePage(1));
    dispatch(setPaginationData(0));
  }, [searchApiKeyword]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Post</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Post</h4>
          <p className="mb-0">Daftar post dalam website desa Tanjung Sari</p>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button href="/#/create-post" variant="secondary" disabled={false}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Buat Post
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <PostAlert />
          </Col>
        </Row>
      </div>
      <PostsTable />
    </>
  );
};
