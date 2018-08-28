# spindance.code-challenge
## Welcome to the SpinDance Code Challenge!

For this challenge, you will be building a virtual, connected IoT sensor that sends data readings and diagnostic data over a secure connection established with AWS IoT. 

## Instructions
1. Perform the setup steps below to configure your AWS credentials and register a thing in AWS IoT
1. Create an application per the requirements specified below using one of the any of the available [AWS IoT SDKs](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sdks.html) for the interface to AWS IoT.
1. Keep in mind we will test your application with various inputs, not just what is provided in this repository
1. Push the source code to this repository along with instructions on how to build, test, and run the application

## Requirements

1. Report readings to AWS IoT on the MQTT topic `things/ConnectedSensor/readings`. 
1. Report the readings as a JSON structure:
    ```json
    {
      "timestamp": 1535324228266,
      "temperature": 19.15,
      "humidity": 0.20,
      "pressure": 37.11,
      "accelorometer": 
      { 
        "x": 4.0, 
        "y": -4.5, 
        "z": 12.3
      }
    }
    ```
1. Accept input readings defined in CSV file similar to the example [data file](data/readings.csv).
1. Provide a user configurable way to set the number of readings included in each diagnostics report (Ex. last 4 readings).
1. Provide a user configurable way to set the diagnostics reporting interval (Ex. every 5 readings)
1. Compute and report diagnostic data on the MQTT topic `things/ConnectedSensor/diagnostics`
1. Diagnostics data shall include the min, max, and average values for a sample
1. Diagnostics data shall include the latest timestamp of the readings used in the report
1. Unit tests must be included in source code

## Setup:

### AWS Credentials
1. For this project, just configure the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables to have values provided by spindance. Keep it simple!

### Register a new Thing:
1. The following steps walk through the specific steps needed for this challenge, but feel free to also reference [this article](https://docs.aws.amazon.com/iot/latest/developerguide/register-device.html) for registering a Device in AWS IoT.
1. Login to the AWS console with your provided credentials. You may be prompted to reset your password on login.
1. Under the 'Services' dropdown, navigate to ‘AWS IoT Core'. You may need to click 'Get Started' if you don't see the left hand navigation menu.
1. Select ‘Secure’->’Policies' from the left hand navigation menu.
1. Select ‘Create’ and give your policy a name you will recognize
1. Click on ‘Advanced mode’ in the ‘Add statements section, and copy the following policy into the edit view.
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
          "arn:aws:iot:*:*:client/ConnectedSensor"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "iot:Publish",
          "iot:Receive"
        ],
        "Resource": [
          "arn:aws:iot:*:*:topic/$aws/things/ConnectedSensor/*",
          "arn:aws:iot:*:*:topic/things/ConnectedSensor/readings",
          "arn:aws:iot:*:*:topic/things/ConnectedSensor/diagnostics"
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "iot:Subscribe"
        ],
        "Resource": [
          "arn:aws:iot:*:*:topicfilter/$aws/things/ConnectedSensor/shadow/*",
          "arn:aws:iot:*:*:topicfilter/things/ConnectedSensor/readings",
          "arn:aws:iot:*:*:topicfilter/things/ConnectedSensor/diagnostics"
        ]
      }
    ]
    }
    ```
1. Click on ‘Create’ to create the policy
1. Navigate back to 'AWS IoT Core', and select ‘Manage’ on the left hand navigation menu, and 'Register a thing' or ‘Create’ to create a new Thing
1. Create a single ‘Thing’ using the name `ConnectedSensor`, and create without any need for Groups / Types / Attributes
1. Select ‘Create certificate’ to generate a new certificate for your thing.
1. Once generated, download the four files: the certificate, the public key, the private key, and the CA cert. Put these in a safe place, you will need them to establish the connection using the SDK.
1. Select ‘Activate’ followed by “Attach a Policy"
1. Select the policy created in the previous steps, followed by “Register Thing"
1. That’s it! You know have a registered thing an AWS IoT, as well as the Certificates and Keys needed to make the connection.

### End to End Test using AWS IoT Console
1. In the AWS IoT Core console, select Test in the left navigation list
1. Input the topic to watch 'things/ConnectedSensor/readings’ or 'things/ConnectedSensor/diagnostics’, start your application and if everything is connected, you will see your data
