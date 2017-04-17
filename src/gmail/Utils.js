/**
 * Created by samk on 17/04/2017.
 */
export default {
  getHeaderFromMetadataResponse(headerName, metadataResponse) {
    // why do I always do things in the wierdest possible way??
    return metadataResponse.payload.headers.reduce(function (value, header) {
      if (header.name.toLowerCase() === headerName.toLowerCase()) {
        return header.value;
      } else {
        return value;
      }
    }, null);
  }
}