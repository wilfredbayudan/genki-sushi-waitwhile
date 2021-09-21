import React from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";

import LocationStatus from "./LocationStatus";

function LocationRouter() {
  const match = useRouteMatch();

  return (
    <>
      <Route path={`${match.url}/join`}>
        Join
      </Route>
      <Route path={`${match.url}/checkin`}>
        Checkin
      </Route>
      <Route path={`${match.url}`} exact>
        <LocationStatus storeId={useParams().storeId} joinable />
      </Route>
    </>
  )
}

export default LocationRouter;