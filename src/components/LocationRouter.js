import React from "react";
import { Route, useParams, useRouteMatch } from "react-router-dom";

import LocationStatus from "./LocationStatus";
import Join from "./Join";
import CheckIn from "./CheckIn";

function LocationRouter() {
  const match = useRouteMatch();
  const storeIdParam = useParams().storeId;

  return (
    <>
      <Route path={`${match.url}/join`}>
        <Join storeId={storeIdParam} />
      </Route>
      <Route path={`${match.url}/checkin/:preCheckId`}>
        <CheckIn storeId={storeIdParam} />
      </Route>
      <Route path={`${match.url}`} exact>
        <LocationStatus storeId={storeIdParam} joinable />
      </Route>
    </>
  )
}

export default LocationRouter;