# spindance.code-challenge
### Welcome to the SpinDance Code Challenge!

For this challenge, you will be building a virtual, connected IoT sensor that sends data readings and diagnostic data over a secure connection established with AWS IoT. Use any of the available AWS IoT SDKs for the interface to AWS IoT. (https://docs.aws.amazon.com/iot/latest/developerguide/iot-sdks.html) using any of the supported languages.

## Requirements

1. Create an application that will connect to the AWS IoT Thing in the provided AWS Account using the provided AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
1. The application shall report readings to AWS IoT on the MQTT topic `things/ConnectedSensor/readings`. 
1. Values for readings will be provided as input to your application and will need to support Temperature, Location, Humidity, Pressure, and Accelerometer. Sample values for these inputs are shown below:
    * Temperature (Fahrenheit, double): `19.15`
    * Relative Humidity (Percentage, double): `0.20`
    * Pressure (Atmosphere/atm - double): `37.11`
    * Accelorometer ({x,y,z} - doubles): `{4.0,-4.0,-5.0}` 
    * Timestamp (epoch milliseconds): `1535324228266` 
1. The application shall compute and report diagnostic data on the MQTT topic `things/ConnectedSensor/diagnostics`, including the min, max, and average values for Temperature, Location, Humidity, and Pressure for the last n readings of the application running, where n is configurable by the user.
1. Source code shall be pushed to this repository along with instructions on how to build, test, and run in this README.

## Setup:

### AWS Credentials
1. For this project, just configure the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY to have the provided values. Keep it simple!

### Register a new Thing:
1. The following steps walk through the specific steps needed for this challenge, but feel free to also reference [this article](https://docs.aws.amazon.com/iot/latest/developerguide/register-device.html) for registering a Device in AWS IoT.
1. Login to the AWS console with your provided credentials. You may be prompted to reset your password on login.
1. Under the 'Services' dropdown, navigate to ‘AWS IoT Core'
1. Select ‘Secure’->’Policies' from the left hand navigation menu.
1. Select ‘Create’ and give your policy a name you will recognize
1. Click on ‘Advanced mode’ in the ‘Add statements section, and copy the following policy into the edit view, replacing `ConnectedSensor` with the name of your thing:
    ```json
    {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "iot:Connect"
        ],
        "Resource": [
          "arn:aws:iot:us-east-2:*:client/ConnectedSensor"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "iot:Publish",
          "iot:Receive"
        ],
        "Resource": [
          "arn:aws:iot:us-east-2:*:topic/$aws/things/ConnectedSensor/*",
          "arn:aws:iot:us-east-2:*:topic/things/ConnectedSensor/readings",
          "arn:aws:iot:us-east-2:*:topic/things/ConnectedSensor/diagnostics"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "iot:Subscribe"
        ],
        "Resource": [
          "arn:aws:iot:us-east-2:*:topicfilter/$aws/things/ConnectedSensor/shadow/*",
          "arn:aws:iot:us-east-2:*:topicfilter/things/ConnectedSensor/readings",
          "arn:aws:iot:us-east-2:*:topicfilter/things/ConnectedSensor/diagnostics"
        ]
      }
    ]
    }
    ```
1. Click on ‘Create’ to create the policy
1. Navigate back to 'AWS IoT Core', and select ‘Manage’ on the left hand navigation menu, and ‘Create’ to create a new Thing
1. Create a single ‘Thing’ using a name of your choosing, and create without any need for Groups / Types / Attributes
1. Select ‘Create certificate’ to generate a new certificate for your thing.
1. Once generated, download the four files: the certificate, the public key, the private key, and the CA cert. Put these in a safe place, you will need them to establish the connection using the SDK.
1. Select ‘Activate’ followed by “Attach a Policy"
1. Select the policy created in the previous steps, followed by “Register Thing"
1. That’s it! You know have a registered thing an AWS IoT, as well as the Certificates and Keys needed to make the connection.

### End to End Test using AWS IoT Console
1. In the AWS IoT Core console, select Test in the left navigation list
1. Input the topic to watch 'things/ConnectedSensor/readings’ or 'things/ConnectedSensor/diagnostics’, start your application and if everything is connected, you will see your data
