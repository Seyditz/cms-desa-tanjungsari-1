import React from "react";
import { UmkmForm } from "../components/Forms";
import { Col, Row } from "@themesberg/react-bootstrap";


export default () => {
  return (
    <>
      <Row className="mt-5">
        <Col xs={12} xl={8}>
          <UmkmForm isUpdate={false}/>
        </Col>
      </Row>
    </>
  );
};
