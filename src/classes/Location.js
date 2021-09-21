import LocationKeys from "../data/LocationKeys";

class Location {

  static validate(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null) ? true : false;
  }

  static waitwhileId(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId) && store.waitwhileId !== null);
  }

  static info(storeId) {
    return LocationKeys.find(store => store.id === parseInt(storeId));
  }

  // Need to check if location is open everytime
  static async checkStatus(storeId) {
    if (this.validate(storeId)) {
      const locationInfo = this.info(storeId);
      const url = `https://wait.genkisushihawaii.com/api/location-status.php?wwid=${locationInfo.waitwhileId}`
      return fetch(url)
        .then(res => res.json())
        .then(json => {
          if (json.isWaitlistOpen) {
            return true;
          } else {
            return false;
          }
        })
        .catch(err => false)
    } else {
      return false;
    }
  }

}

export default Location;