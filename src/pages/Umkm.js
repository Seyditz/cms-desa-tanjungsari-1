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

import { UmkmTable } from "../components/Tables";
import { useEffect } from "react";
import { publicRequest, userRequest } from "../utils/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import UserAlert from "./components/UserAlert";
import { changePage, setPaginationData } from "../redux/paginationSlice";
import {
  fetchFailure,
  fetchUmkmListSuccess,
  fetchStart,
  fetchSuccess,
  resetUmkmInputData,
  setLoadingValue,
} from "../redux/umkmSlice";
import UmkmAlert from "./components/UmkmAlert";

export default () => {
  const alert = useSelector((state) => state.umkm.alert);
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
    dispatch(resetUmkmInputData());
    const fetchUmkms = async () => {
      try {
        dispatch(fetchStart());
        dispatch(setLoadingValue(0));
        const res = await userRequest.get(`umkm?page=${page}&limit=3`, {
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
        dispatch(fetchUmkmListSuccess(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(fetchFailure());
      }
    };
    const fetchSearchedUmkms = async () => {
      try {
        dispatch(fetchStart());
        dispatch(setLoadingValue(0));
        const res = await userRequest.post(
          `umkm/search?page=${page}&limit=3`,
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
        dispatch(fetchUmkmListSuccess(res.data));
      } catch (error) {
        console.log(error.message);
        dispatch(fetchFailure());
      }
    };
    if (searchApiKeyword != "" || searchApiKeyword != undefined) {
      fetchSearchedUmkms();
    } else {
      fetchUmkms();
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
            <Breadcrumb.Item active>UMKM</Breadcrumb.Item>
          </Breadcrumb>
          <h4>UMKM</h4>
          <p className="mb-0">Daftar UMKM dalam website desa Tanjung Sari</p>
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
            <Button href="/#/create-umkm" variant="secondary" disabled={false}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Buat UMKM
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <UmkmAlert />
          </Col>
        </Row>
      </div>
      <UmkmTable />
    </>
  );
};
