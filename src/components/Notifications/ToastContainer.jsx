import React from "react";
import { ToastContainer } from "react-toastify";

function WalletToastContainer() {
  const closeButton = ({ closeToast }) => (
    <div onClick={closeToast} className="flex items-center">
      X
    </div>
  );

  return (
    <div>
      <ToastContainer
        enableMultiContainer
        containerId={"Wallet"}
        closeOnClick={false}
        newestOnTop={true}
        closeButton={closeButton}
      ></ToastContainer>
    </div>
  );
}

export default WalletToastContainer;
