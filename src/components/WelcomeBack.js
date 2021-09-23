import React from "react";

function WelcomeBack({ userData }) {
  const firstName = userData.name.split(" ")[0];
  return (
    <div className="notice bluebg">
      Nice to see you, <b>{firstName}</b>!
    </div>
  )
}

export default WelcomeBack;