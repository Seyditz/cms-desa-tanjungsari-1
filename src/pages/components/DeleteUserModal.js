import React, { useState } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
} from "@themesberg/react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFailure,
  fetchStart,
  fetchSuccess,
  setDeletedData,
  showAlert,
  showDeleteModal,
} from "../../redux/userListSlice";
import { userRequest } from "../../utils/requestMethods";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteUserModal = () => {
  const dispatch = useDispatch();
  const showDefault = useSelector((state) => state.userList.showingDeleteModal);
  const {_id, username} = useSelector((state) => state.userList.deletedData) || {_id: "", username: ""};
  const handleClose = () => {
    dispatch(setDeletedData(null));
    dispatch(showDeleteModal(false));
  };

  const handleDelete = () => {
    const deleteUser = async () => {
      try {
        fetchStart();
        const res = await userRequest.post("/users/delete", { id: _id });
        console.log(res.data);
        fetchSuccess();
        handleClose();
        dispatch(
          showAlert({
            username: username,
            variant: "danger",
            action: "Dihapus",
            icon: faTrash,
          })
        );
        window.location.reload();
      } catch (err) {
        fetchFailure();
        console.log(err);
      }
    };
    deleteUser();
  };
  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Hapus User</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p>Apakah anda yakin ingin menghapus user ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
          <Button
            variant="link"
            className="text-gray ms-auto"
            onClick={handleClose}
          >
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteUserModal;
