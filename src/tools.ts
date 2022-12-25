import fetch from 'node-fetch'

export async function postRequest({
  url,
  data,
  headers,
}: {
  url: string
  data: any
  headers: any
}) {
  await fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}
