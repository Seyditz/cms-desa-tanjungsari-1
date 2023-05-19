import React from "react";
import { PostForm, UmkmForm } from "../components/Forms";
import { Col, Row } from "@themesberg/react-bootstrap";


export default () => {
  return (
    <>
      <Row className="mt-5">
        <Col xs={12} xl={8}>
          <PostForm isUpdate={false}/>
        </Col>
      </Row>
    </>
  );
};
