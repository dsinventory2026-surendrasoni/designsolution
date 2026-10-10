/**
 * Helper to safely parse response JSON and handle non-JSON (HTML 404/500/redirect) responses
 * without throwing "Unexpected token '<', '<!DOCTYPE '... is not valid JSON" SyntaxError.
 */

export async function parseJsonResponse(res) {
  if (!res) return { success: false, message: "No response received" };

  const contentType = res.headers?.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok || !isJson) {
    let errorText = "";
    try {
      errorText = await res.text();
    } catch {
      // ignore
    }
    return {
      success: false,
      status: res.status,
      message: `Server returned HTTP ${res.status} (${isJson ? "JSON" : "HTML/non-JSON"})`,
      rawText: errorText,
    };
  }

  try {
    const data = await res.json();
    return data;
  } catch (err) {
    return {
      success: false,
      status: res.status,
      message: err.message || "Invalid JSON format",
    };
  }
}

export async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return await parseJsonResponse(res);
  } catch (err) {
    return {
      success: false,
      status: 0,
      message: err.message || "Network request failed",
    };
  }
}
