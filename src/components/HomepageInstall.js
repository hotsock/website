const installerPermissionsCodeBlock = `aws cloudformation create-stack \\
  --stack-name HotsockInstallerPermissions \\
  --template-url https://hotsock-stack-templates-us-west-2.s3.us-west-2.amazonaws.com/installer-permissions.yml \\
  --capabilities CAPABILITY_NAMED_IAM \\
  --tags Key=hotsock:service,Value=Hotsock
`

const mainStackCodeBlock = `aws cloudformation create-stack \\
  --stack-name Hotsock \\
  --template-url https://hotsock-stack-templates-\${AWS_REGION}.s3.\${AWS_REGION}.amazonaws.com/hotsock-v1.x.yml \\
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \\
  --role-arn arn:aws:iam::$(aws sts get-caller-identity --query "Account" --output text):role/hotsock/HotsockInstallerRole \\
  --tags Key=hotsock:service,Value=Hotsock
`

export default function HomepageInstall() {
  return (
    <>
      <h3>Install in just 2 AWS CLI commands.</h3>
      <pre>{installerPermissionsCodeBlock}</pre>
      <pre>{mainStackCodeBlock}</pre>
    </>
  )
}
