const subscribeAPI = `
const hotsock = new HotsockClient(
  "wss://996iaxdp6g.execute-api.us-east-1.amazonaws.com/v1",
  {
    connectTokenFn: () =>
      "eyJhbGciOiJFUzI1NiIsIm...",
  }
)


`

export default function HomepageSubscribe() {
  return (
    <>
      <h3>
        Connect and subscribe to messages using the Hotsock JS library or using
        any WebSockets client.
      </h3>
      <pre>{subscribeAPI}</pre>
    </>
  )
}
