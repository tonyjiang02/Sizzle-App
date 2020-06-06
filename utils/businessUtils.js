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

export const getCoords = async (name) => {
    try {
        let url = `https://nominatim.openstreetmap.org/search?q=${name}+USA&format=geojson`;
        console.log(url);
        const res = await fetch(url);
        const json = await res.json();
        const location = {longitude: json.features[0].geometry.coordinates[0], latitude: json.features[0].geometry.coordinates[1]}
        return location;
    } catch (err) {
        console.log(err);
    }
}

export const reverseCoords = async (lat, lon) => {
    try {
        let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
        console.log(url);
        const res = await fetch(url);
        const json = await res.json();
        return json;
    }
    catch (err) {
        console.log(err);
    }
}