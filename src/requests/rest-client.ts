import axios from "axios";
import {
  Configuration,
  MappingControllerApiFactory,
  Rest4DoipControllerApiFactory,
} from "./metadataHub";

const metadataHubUrl = "http://d-sp23.devlef.campus.rwth-aachen.de:8080";

const mappingApi = MappingControllerApiFactory(
  new Configuration(),
  metadataHubUrl,
  axios
);
const rest4doipApi = Rest4DoipControllerApiFactory(
  new Configuration(),
  metadataHubUrl,
  axios
);

export async function receiveMappings(): Promise<string[]> {
  try {
    const response = await mappingApi.getMappings();
    let data = response.data;
    data = data
      .map((entry) =>
        entry.includes("_") ? entry.substring(0, entry.indexOf("_")) : entry
      )
      .map((entry) => entry.charAt(0).toUpperCase() + entry.slice(1));
    data = [...new Set(data)];
    return data;
  } catch {
    console.error("Mapping cannot be received");
  }
  return [];
}

async function wrapRequest(
  operationId: Parameters<typeof rest4doipApi.postDoipOperation>[0],
  targetId: string,
  token: string
) {
  const response = await rest4doipApi.postDoipOperation(operationId, {
    targetId: targetId,
    token: token,
  });
  return response.data;
}
