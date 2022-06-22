const metadataHubUrl = "http://d-sp23.devlef.campus.rwth-aachen.de:8080";

export async function receiveMappings(): Promise<string[]> {
  try {
    const response = await fetch(metadataHubUrl + "/api/v1/mapping");
    let data = (await response.json()) as string[];
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
