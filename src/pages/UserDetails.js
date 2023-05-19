import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../utils/requestMethods";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import { fetchFailure, fetchStart, fetchSuccess } from "../redux/userListSlice";
import Progress from "../components/Progress";

export default () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [user, setUser] = useState();
  const loading = useSelector((state) => state.userList.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(fetchStart())
        const res = await userRequest.post("/users/get-by-id", { id: userId });
        setUser(res.data);
        dispatch(fetchSuccess())
      } catch (err) {
        console.log(err);
        dispatch(fetchFailure())
      }
    };
    fetchUser();
  }, []);

  return (
    <Container className="px-0">
      <Preloader show={loading} />
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <h1 className="h2" id="overview">
                Detail User
              </h1>
              <p className="fs-5 fw-light">
                Data detail dari user yang dipilih
              </p>
              <table cellPadding={7}>
                <tr>
                  <th>Nama</th>
                  <td>:</td>
                  <td>{user?.username}</td>
                </tr>
                <tr>
                  <th>Tanggal Dibuat</th>
                  <td>:</td>
                  <td>{moment(user?.createdAt).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                  <th>Tanggal Terakhir Diubah</th>
                  <td>:</td>
                  <td>{moment(user?.updatedAt).format("DD-MM-YYYY")}</td>
                </tr>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
