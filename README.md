# spindance.code-challenge
## Welcome to the SpinDance Code Challenge!

For this challenge, you will be building a virtual, connected IoT sensor that sends data readings and diagnostic data
 over a secure connection established with AWS IoT. This is your private repo. This is where you will commit and push
 your source code, unit tests, and instructions for how to build, test, and run your solution to this challenge. Keep
 in mind we will test your application with various inputs, not just what is provided in this repository. 

You will receive AWS login credentials for an AWS account that contains resources you will need to complete this task. 
The account contains a pre-registered AWS IoT Thing called 'ConnectedSensor' that has been setup for you. This repository
contains the keys, certificates, and configuration values needed to connect to the 'ConnectedSensor', described in more 
detail in the following sections. 
  

## Instructions
1. Create an application per the requirements specified below using one of the any of the available [AWS IoT SDKs](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sdks.html) for the interface to AWS IoT.
1. You should not need to configure anything further in AWS, those steps are done for you.
1. Commit and push to this repository your source code, unit tests, and instructions for how to build, test, and run your application.

## Connecting to the AWS IoT Thing:
1. Login to the AWS console with your provided credentials. You may be prompted to reset your password on login.
1. Be sure you select 'US East (N. Virginia)' for the region in the upper right corner of the console
1. Under the 'Services' dropdown, navigate to ‘AWS IoT Core'. You may need to click 'Get Started' if you don't see the left hand navigation menu.
1. Select ‘Manage' from the left hand navigation menu, and you should see a Thing called 'ConnectedSensor'
1. Select 'ConnectedSensor', and you will see the details of the Thing. To save time, we've included a [configuration values file](configuration-values.md)
that contains all of the values you will need to connect to this thing using the AWS IoT SDK. The SDK documentation will describe how to establish the connection programmatically using these values.
1. The requirements specify two MQTT topics. Note that you do not need to do anything to create the topics in AWS IoT, topics are created dynamically by AWS when a client sends data to a new topic.
 

## Requirements

1. Report readings to AWS IoT using the MQTT topic `things/ConnectedSensor/readings`. 
1. Report each reading as a JSON structure:
    ```json
    {
      "timestamp": 1535324228266,
      "temperature": 19.15,
      "humidity": 0.20,
      "pressure": 37.11
    }
    ```
1. Accept input readings defined in CSV file similar to the example [data file](data/readings.csv).
1. Provide a user configurable way to set the sample size window, which specifies the number of readings included in each diagnostics report. (Ex. last 4 readings).
1. Provide a user configurable way to set the report interval, which specifies how often the report should be generated (Ex. every 2 readings)

    ![example](sliding-window-example.png)

    *The above example shows a few successive diagnostics reports D0-D3 generated over successive readings R0-R9*  

1. Only generate diagnostics reports once enough readings have been accumulated to fill a sample size window.
1. Compute and report diagnostic data using the MQTT topic `things/ConnectedSensor/diagnostics`
1. Diagnostics data shall include the min, max, and average values for a sample
1. Diagnostics data shall include the latest timestamp of the readings used in the report and also be reported in a JSON structure:
   ```json
   {
      "timestamp": 1535324228266,
      "avg-temperature": 19.15,
      "avg-humidity": 0.20,
      "avg-pressure": 37.11
   }
   ```

## End to End Test using AWS IoT Console
1. In the AWS IoT Core console, select 'Test' in the left navigation list
1. Input the topic to watch 'things/ConnectedSensor/readings’ or 'things/ConnectedSensor/diagnostics’, start your application and if everything is connected, you will see your data
