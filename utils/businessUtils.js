export const straightLineDistance = (latlng1, latlng2) => {
    lat1 = latlng1.latitude;
    lat2 = latlng2.latitude;
    lon1 = latlng1.longitude;
    lon2 = latlng2.longitude;
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
export const kmToMi = (km) => {
    return km / (1.60934);
}