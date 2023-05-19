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
} from "../../redux/umkmSlice";
import { userRequest } from "../../utils/requestMethods";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteImage } from "../../utils/firebaseFunctions";

const DeleteUmkmModal = () => {
  const dispatch = useDispatch();
  const showDefault = useSelector((state) => state.umkm.showingDeleteModal);
  const {_id, name, image} = useSelector((state) => state.umkm.deletedData) || {_id: "", name: "", image: []};
  const handleClose = () => {
    dispatch(setDeletedData(null));
    dispatch(showDeleteModal(false));
  };

  const handleDelete = () => {
    const deleteUmkm = async () => {
      try {
        fetchStart();
        const res = await userRequest.post("/umkm/delete", { id: _id });
        image.map(deleteImage)
        fetchSuccess();
        handleClose();
        dispatch(
          showAlert({
            name: name,
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
    deleteUmkm();
  };
  return (
    <React.Fragment>
      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Hapus UMKM</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <p>Apakah anda yakin ingin menghapus UMKM ini?</p>
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

export default DeleteUmkmModal;
