export type JSONPrimitive = string | number | boolean | null
export type JSONObject = { [member: string]: JSONValue }
export type JSONArray = JSONValue[]
export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export type Event = {
  data: JSONValue
  eventType: string
  context: JSONValue
}

export type Webhook = {
  id: number
  url: string
  eventTypesWhitelist: JSONValue
  securityMetadata: JSONValue
}

export type Header = {
  id: number
  key: string
  value: string
}
