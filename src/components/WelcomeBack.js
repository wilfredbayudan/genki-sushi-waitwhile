import React from "react";
import { useHistory } from "react-router-dom";

function WelcomeBack({ userData }) {
  const history = useHistory();
  const firstName = userData.name.split(" ")[0];
  return (
    <div className="notice bluebg">
      Nice to see you, <b>{firstName}</b>! <button className="link" onClick={() => history.push('../join')}>Not you?</button>
    </div>
  )
}

export default WelcomeBack;