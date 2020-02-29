import {
  Client,
  ReverseGeocodeRequest,
  ReverseGeocodeResponse
} from "@googlemaps/google-maps-services-js";
import _ from "lodash";

const client = new Client({});

export const reverseGeocode = async (lat: number, lon: number) => {
  const {
    data: { results }
  }: ReverseGeocodeResponse = await client.reverseGeocode({
    params: {
      latlng: [lat, lon],
      key: process.env.GCS_API_KEY!
    }
  });

  const place = _.find(results, function(o) {
    return ["neighborhood", "locality"].includes(o.types[0]);
  });
  if (!place) {
    return null;
  }
  return place.formatted_address;
};
