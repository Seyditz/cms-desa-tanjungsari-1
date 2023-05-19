import React, { useEffect, useState } from "react";
import { Alert, Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faCross, faTrash, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../redux/userListSlice";

const UserAlert = () => {
  const alert = useSelector((state) => state.userList.alert)
  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(showAlert(null))
  };

  const shouldShowAlert = alert ? true : false

  return (
    <React.Fragment>
      <Alert
        variant={alert?.variant}
        show={shouldShowAlert}
        onClose={() => onClose()}
      >
        <div className="d-flex justify-content-between">
          <div>
            <FontAwesomeIcon icon={alert?.icon} className="me-1" />
            User <strong>{alert?.username}</strong> Telah {alert?.action}
          </div>
          <Button
            variant="close"
            size="xs"
            onClick={() => onClose()}
          />
        </div>
      </Alert>
    </React.Fragment>
  );
};

export default UserAlert;
