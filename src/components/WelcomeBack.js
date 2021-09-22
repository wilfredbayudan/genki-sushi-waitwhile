import React from "react";

function WelcomeBack({ userData }) {
  const firstName = userData.name.split(" ")[0];
  return (
    <div className="notice bluebg">
      Welcome back, {firstName}!
    </div>
  )
}

export default WelcomeBack;