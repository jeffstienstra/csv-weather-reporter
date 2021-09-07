#!/usr/bin/env bash

mosquitto_pub --cafile "./certificates/AmazonRootCA1.pem" --cert "./certificates/thing-for-jeffstienstra.crt" --key "./certificates/thing-for-jeffstienstra.key"   -h "a3u38y6be3pa0r-ats.iot.us-east-1.amazonaws.com" -p 8883 -q 1 -i "thing-for-jeffstienstra" -d --tls-version tlsv1.2 -m "readings test" -t "things/thing-for-jeffstienstra/readings"

mosquitto_pub --cafile "./certificates/AmazonRootCA1.pem" --cert "./certificates/thing-for-jeffstienstra.crt" --key "./certificates/thing-for-jeffstienstra.key"   -h "a3u38y6be3pa0r-ats.iot.us-east-1.amazonaws.com" -p 8883 -q 1 -i "thing-for-jeffstienstra" -d --tls-version tlsv1.2 -m "diagnostics test" -t "things/thing-for-jeffstienstra/diagnostics"
