## AWS IoT SDK parameter values
This file contains parameter values needed to connect the AWS IoT SDK to 'ConnectedSensor'. Some are file paths
in this repo, so these are correct assuming the top level of the repository. You will not use this file directly
with the SDK, but you will need the values to establish the connection. Each SDK has similar names for the parameters, but
they may not match exactly.

- Key Path   : `./certificates/02d7026805-private.pem.key`,
- Certificate Path  : `./certificates/02d7026805-certificate.pem.crt`,
- CA Path    : `./certificates/VeriSign-Class-3-Public-Primary-Certification-Authority-G5.pem`,
- Client Id  : `ConnectedSensor`,
- Host       : `a2oqv2xg9kt66v.iot.us-east-1.amazonaws.com`,