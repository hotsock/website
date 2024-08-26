const publishDotNetCSharp = `
await lambdaClient.Invoke(new InvokeRequest
  {
    FunctionName = "Hotsock-PublishFunction-AAABBBCCCDDD",
    Payload = "{\\"channel\\":\\"my-channel\\",\"event\\":\\"my-event\\",\\"data\\":\\"👋\\"}"
  });
`

const publishGo = `
lambdaClient.Invoke(context.TODO(), &lambda.InvokeInput{
  FunctionName: aws.String("Hotsock-PublishFunction-AAABBBCCCDDD"),
  Payload:      []byte(\`{"channel": "my-channel", "event": "my-event", "data": "👋"}\`),
})
`

const publishJava = `
lambdaClient.invoke(new InvokeRequest()
  .withFunctionName("Hotsock-PublishFunction-AAABBBCCCDDD")
  .withPayload("{\\"channel\\":\\"my-channel\\",\\"event\\":\\"my-event\\",\\"data\\":\\"👋\\"}"));
`

const publishJS = `
lambdaClient.send(new InvokeCommand({
  FunctionName: "Hotsock-PublishFunction-AAABBBCCCDDD",
  Payload: JSON.stringify({
    channel: "my-channel",
    event: "my-event",
    data: "👋"
  })
}))
`

const publishPHP = `
$lambdaClient->invoke([
  'FunctionName' => 'Hotsock-PublishFunction-AAABBBCCCDDD',
  'Payload' => json_encode([
    'channel' => 'my-channel',
    'event' => 'my-event',
    'data' => '👋'
  ]),
]);
`

const publishPython = `
lambda_client.invoke(
  FunctionName='Hotsock-PublishFunction-AAABBBCCCDDD',
  Payload=json.dumps({
    'channel': 'my-channel',
    'event': 'my-event',
    'data': '👋'
  })
)
`

const publishRuby = `
lambda_client.invoke({
  function_name: 'Hotsock-PublishFunction-AAABBBCCCDDD',
  payload: {
    channel: 'my-channel',
    event: 'my-event',
    data: '👋'
  }.to_json
})
`

export default function HomepagePublish() {
  return (
    <>
      <h3>
        Publish messages from your backend in any language with the AWS SDK you
        already use.
      </h3>
      <pre>{publishDotNetCSharp}</pre>
      <pre>{publishJava}</pre>
      <pre>{publishJS}</pre>
      <pre>{publishGo}</pre>
      <pre>{publishPHP}</pre>
      <pre>{publishPython}</pre>
      <pre>{publishRuby}</pre>
    </>
  )
}
