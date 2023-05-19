import React from "react";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";
import moment from "moment-timezone";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../utils/requestMethods";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../components/Preloader";
import { fetchFailure, fetchStart, fetchSuccess } from "../redux/umkmSlice";
import Progress from "../components/Progress";
import NoImage from "../assets/img/no_image.jpg";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default () => {
  const location = useLocation();
  const umkmId = location.pathname.split("/")[2];
  const [umkm, setUmkm] = useState();
  const loading = useSelector((state) => state.umkm.loading);
  const dispatch = useDispatch();

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
  };

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        dispatch(fetchStart());
        const res = await userRequest.post("/umkm/get-by-id", { id: umkmId });
        setUmkm(res.data);
        dispatch(fetchSuccess());
      } catch (err) {
        console.log(err);
        dispatch(fetchFailure());
      }
    };
    fetchUmkm();
  }, []);

  return (
    <Container className="px-0">
      <Preloader show={loading} />
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <h1 className="h2" id="overview">
                Detail UMKM
              </h1>
              <p className="fs-5 fw-light">
                Data detail dari UMKM yang dipilih
              </p>
              <Row className="my-3">
                <Col>
                  <div className="slide-container">
                    <Slide>
                        {
                            umkm?.image?.map(val => console.log(val))
                        }
                      {umkm?.image?.map((slideImage, index) => (
                        <div key={index}>
                          <div
                            style={{
                              ...divStyle,
                            }}
                          >
                            <img src={slideImage || NoImage} style={{objectFit: "cover"}}></img>
                          </div>
                        </div>
                      ))}
                    </Slide>
                  </div>
                </Col>
              </Row>
              <table cellPadding={7}>
                <tr>
                  <th>Nama</th>
                  <td>:</td>
                  <td>{umkm?.name}</td>
                </tr>
                <tr>
                  <th>Kategori</th>
                  <td>:</td>
                  <td>{umkm?.category}</td>
                </tr>
                <tr>
                  <th>Deskripsi</th>
                  <td>:</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{ __html: umkm?.description }}
                    ></div>
                  </td>
                </tr>
                <tr>
                  <th>Tanggal Dibuat</th>
                  <td>:</td>
                  <td>{moment(umkm?.createdAt).format("DD-MM-YYYY")}</td>
                </tr>
                <tr>
                  <th>Tanggal Terakhir Diubah</th>
                  <td>:</td>
                  <td>{moment(umkm?.updatedAt).format("DD-MM-YYYY")}</td>
                </tr>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
