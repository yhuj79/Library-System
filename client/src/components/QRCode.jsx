import React from "react";
import QRCode from "qrcode.react";

const QR = ({ url }) => {
  return (
    <div>
      <QRCode value={url} />
    </div>
  );
};

export default QR;
