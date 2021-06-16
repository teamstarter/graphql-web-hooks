import fetch from 'node-fetch'

export async function postRequest({ url, data, headers }) {
  await fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...headers },
  })
}
