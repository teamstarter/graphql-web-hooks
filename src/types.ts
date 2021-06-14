export type JSONPrimitive = string | number | boolean | null
export type JSONObject = { [member: string]: JSONValue }
export type JSONArray = JSONValue[]
export type JSONValue = JSONPrimitive | JSONObject | JSONArray


export type Event = {
  data: JSONValue
  type: string  
  eventSecurityContext: JSONValue
}

export type Webhook = {
  id: number
  url: string
  eventTypesWhitelist: JSONValue
  securityMetadata: JSONValue
}