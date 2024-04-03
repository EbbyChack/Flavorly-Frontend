import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/actions/user";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function ChangePassword(props) {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newpassword !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordObj = {
      oldpassword: oldpassword,
      newpassword: newpassword,
    };
    dispatch(changePassword(passwordObj));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    props.onHide();
  };

  return (
    <div>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="oldpassword">Old password</label>
              <input
                type="password"
                className="form-control"
                id="oldpassword"
                placeholder="Enter old password"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newpassword">New password</label>
              <input
                type="password"
                className="form-control"
                id="newpassword"
                placeholder="Enter new password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmpassword">Confirm new password</label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                placeholder="Confirm new password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-dark mt-3 ">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChangePassword;
