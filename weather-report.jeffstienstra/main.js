/* I would like to move the routing and CSVtoJSON logic from main.js to other files but could
not get it working in time.
*/

const express = require("express");
const CSVtoJSON = require("csvtojson");
const calculatedReadings = require("./services/calculate");
const upload = require("express-fileupload");

const app = express();

app.use(upload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  // res.sendFile("../views/index.html");
});

let params = {};
let readings = [];

// Define a test to determine valid user input: must be numeric, must be positive.
function isNumeric(value) {
  return /^\d+$/.test(value);
}

app.post("/", (req, res) => {
  params = {
    filename: req.body.filename,
    sampleSize: parseInt(req.body.sampleSize),
    interval: parseInt(req.body.interval),
  };

  // Test if user sampleSize and Intercal inputs are valid && > 0
  if (isNumeric(params.sampleSize) && isNumeric(params.interval)) {
    console.log("is sampleSize numeric?", isNumeric(req.body.sampleSize));
    console.log("is interval numeric?", isNumeric(req.body.interval));
    console.log("user input is valid");

    /*  Assumptions in converting csv file to json:
        -does not take into account invalid readings that may not be numeric. 
        -some sensors default to specific numeric values when they fail, some may read NaN
         -Need to take this into account before compiling reports and decide what to do with
          the bad data.
        -need to create error reporting when a file cannot be found (either due to typo or
          the file is not in the correct directory)
    */
    const file = CSVtoJSON()
      /* Could add logic to automatically remove '.csv' from the string if the user included it

      */
      .fromFile(`./csvFiles/${params.filename}.csv`)
      .then((rawReadings) => {
        readings = rawReadings;
        // console.log("readings", readings);

        //
        console.log(
          "calculatedReadings",
          calculatedReadings(readings, params.sampleSize || readings.length, params.interval || readings.length)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.write("<html>");
    res.write("<head> <title>SpinDance CSV Converter</title> </head>");
    res.write(
      " <body> Sample Size and Interval must be whole numbers greater than 0. Please press the 'back' button in your browser. </body>"
    );
    res.write("</html>");
    res.end();
    console.log("Failed truthiness!");
  }
});

port = process.env.PORT;
let router = app.listen(port || 3000, () => {
  if (port) {
    console.log(`Listening on port ${port}`);
  } else {
    console.log("Listening on port 3000...");
  }
});
