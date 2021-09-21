import React from "react";
import Card from "./Card";

function ErrorModal({ errors }) {

  return (
    <Card title="Oops!">
      Something went wrong:<br />
      {errors}
    </Card>
  )
}

export default ErrorModal;