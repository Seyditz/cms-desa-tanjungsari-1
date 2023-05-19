import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../utils/requestMethods";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import { fetchFailure, fetchStart, fetchSuccess } from "../redux/postSlice";
import Progress from "../components/Progress";
import NoImage from "../assets/img/no_image.jpg";


export default () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [post, setPost] = useState();
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        dispatch(fetchStart());
        const res = await userRequest.post("/posts/get-by-id", { id: postId });
        setPost(res.data);
        dispatch(fetchSuccess());
      } catch (err) {
        console.log(err);
        dispatch(fetchFailure());
      }
    };
    fetchPost();
  }, []);

  return (
    <Container className="px-0">
      <Preloader show={loading} />
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <h1 className="h2" id="overview">
                Detail Post
              </h1>
              <p className="fs-5 fw-light">
                Data detail dari post yang dipilih
              </p>
              <Row>
                <Col md={3} className="mb-3">
                  <img
                    src={post?.image || NoImage}
                    className="img-thumbnail"
                  ></img>
                </Col>
              </Row>
              <table cellPadding={7}>
                <tr>
                  <th>Nama</th>
                  <td>:</td>
                  <td>{post?.name}</td>
                </tr>
                <tr>
                  <th>Kategori</th>
                  <td>:</td>
                  <td>{post?.category}</td>
                </tr>
                <tr>
                  <th>Deskripsi</th>
                  <td>:</td>
                  <td><div dangerouslySetInnerHTML={{ __html: post?.description }}></div></td>
                </tr>
                <tr>
                  <th>Tanggal Dibuat</th>
                  <td>:</td>
                  <td>{moment(post?.createdAt).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                  <th>Tanggal Terakhir Diubah</th>
                  <td>:</td>
                  <td>{moment(post?.updatedAt).format("DD-MM-YYYY")}</td>
                </tr>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
