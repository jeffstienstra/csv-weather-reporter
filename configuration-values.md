## AWS IoT SDK parameter values
This file contains parameter values needed to connect the AWS IoT SDK to 'ConnectedSensor'. You will not use this file directly
with the SDK, but you will need the values to establish the connection. Each SDK has similar names for the parameters, but
they may not match exactly.

- Key Path   : `./certificates/$DEVICE.key`,
- Certificate Path  : `./certificates/$DEVICE.crt`,
- CA Path    : `./certificates/AmazonRootCA1.pem`,
- Client Id  : `$DEVICE`,
- Host       : `a2oqv2xg9kt66v-ats.iot.us-east-1.amazonaws.com`,