import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { deleteRecipe } from "../redux/actions/recipes";

function DeleteModal(props) {
    const dispatch = useDispatch();
    
    const handleDelete = (id) => {
        dispatch(deleteRecipe(id));
        props.onHide();
    }
    


  return (
    <div>
      <div>
        <ToastContainer />
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Are you sure you want to delete this recipe?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button className="btn btn-danger" onClick={() => handleDelete(props.id)}>
              Yes
            </button>
            <button className="btn btn-dark" onClick={props.onHide}>
              Cancel
            </button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default DeleteModal;
