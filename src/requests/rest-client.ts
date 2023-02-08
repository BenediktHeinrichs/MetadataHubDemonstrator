import axios from "axios";
import {
  Configuration,
  Content,
  MappingControllerApiFactory,
  Rest4DoipControllerApiFactory,
  Title,
} from "./metadataHub";

const metadataHubUrl = "https://nfdi4ing.datamanager.kit.edu/turntable";

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
      .filter((entry) => entry.includes("_"))
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
  clientId: string,
  id: string,
  token: string,
  elements: Content[] | undefined = undefined,
  etag: string | undefined = undefined
) {
  const response = await rest4doipApi.postDoipOperation(operationId, {
    clientId: clientId,
    datacite: {
      publisher: "NFDI4Ing",
      titles: [
        {
          title: id,
          titleType: "Other",
        },
        // Type Conversion since otherwise the request becomes weird
      ] as unknown as Set<Title>,
      formats:
        elements &&
        elements.some((element) => element.type === "application/json")
          ? (["JSON"] as unknown as Set<string>)
          : undefined,
    },
    elements: elements,
    header: etag ? [{ id: "If-Match", value: etag }] : undefined,
    id: id,
    targetId: id,
    token: token,
  });
  return response.data;
}

export async function createSchema(configuration: {
  clientId: string;
  id: string;
  token: string;
  mimetype: string;
  schema: string;
}) {
  return await wrapRequest(
    "OP_CREATE",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "schema",
        type: configuration.mimetype,
        value: configuration.schema,
      },
    ]
  );
}

export async function createMetadata(configuration: {
  clientId: string;
  id: string;
  token: string;
  mimetype: string;
  metadata: string;
}) {
  return await wrapRequest(
    "OP_CREATE",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "document",
        type: configuration.mimetype,
        value: configuration.metadata,
      },
    ]
  );
}

export async function getSchema(configuration: {
  clientId: string;
  id: string;
  token: string;
}) {
  return await wrapRequest(
    "OP_RETRIEVE",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "schema",
        value: "Any value",
      },
    ]
  );
}

export async function getMetadata(configuration: {
  clientId: string;
  id: string;
  token: string;
}) {
  return await wrapRequest(
    "OP_RETRIEVE",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "document",
        value: "Any value",
      },
      {
        id: "digitalObjectId",
        value: configuration.id,
      },
    ]
  );
}

export async function searchSchema(configuration: {
  clientId: string;
  id: string;
  token: string;
}) {
  return await wrapRequest(
    "OP_SEARCH",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "schema",
        value: "Any value",
      },
    ]
  );
}

export async function searchMetadata(configuration: {
  clientId: string;
  id: string;
  token: string;
}) {
  return await wrapRequest(
    "OP_SEARCH",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "document",
        value: "Any value",
      },
      {
        id: "digitalObjectId",
        value: configuration.id,
      },
    ]
  );
}

export async function updateSchema(configuration: {
  clientId: string;
  id: string;
  token: string;
  mimetype: string;
  schema: string;
  etag: string | undefined;
}) {
  return await wrapRequest(
    "OP_UPDATE",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "schema",
        type: configuration.mimetype,
        value: configuration.schema,
      },
    ],
    configuration.etag
  );
}

export async function updateMetadata(configuration: {
  clientId: string;
  id: string;
  token: string;
  mimetype: string;
  metadata: string;
  etag: string | undefined;
}) {
  return await wrapRequest(
    "OP_UPDATE",
    configuration.clientId,
    configuration.id,
    configuration.token,
    [
      {
        id: "document",
        type: configuration.mimetype,
        value: configuration.metadata,
      },
    ],
    configuration.etag
  );
}
