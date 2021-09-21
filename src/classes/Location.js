import LocationKeys from "../data/LocationKeys";

class Location {

  static validate(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null) ? true : false;
  }

  static waitwhileId(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null);
  }

}

export default Location;