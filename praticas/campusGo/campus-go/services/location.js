import * as Location from "expo-location";

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    return null;
  }

  const currentPosition = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const [place] = await Location.reverseGeocodeAsync({
    latitude: currentPosition.coords.latitude,
    longitude: currentPosition.coords.longitude,
  });

  const label = [place?.name, place?.street, place?.city, place?.region]
    .filter(Boolean)
    .join(", ");

  return {
    latitude: currentPosition.coords.latitude,
    longitude: currentPosition.coords.longitude,
    label: label || "Localização atual",
  };
}
