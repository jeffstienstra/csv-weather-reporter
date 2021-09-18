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
    /*  Assumptions in converting csv file to json:
        -does not take into account invalid readings that may not be numeric. 
        -some sensors default to specific numeric values when they fail, some may read NaN
         -Need to take this into account before compiling reports and decide what to do with
          the bad data.
        -need to create error reporting when a file cannot be found (either due to typo or
          the file is not in the correct directory)
          Could add logic to automatically remove '.csv' from the string if the user included it
    */
    const file = CSVtoJSON()
      .fromFile(`./csvFiles/${params.filename}.csv`)
      .then((rawReadings) => {
        readings = rawReadings;

        console.log("");
        console.log(`Individual weather samples from '${params.filename}.csv' file`);
        console.log(`Total readings: ${readings.length}`);
        console.log(readings);
        console.log("");
        console.log("Sample Group Diagnostic Reports");
        console.log(`Sample Size: ${params.sampleSize}, Interval: ${params.interval}`);
        console.log(
          calculatedReadings(readings, params.sampleSize || readings.length, params.interval || readings.length)
        );
        console.log("");
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
    console.log("Invalid user input. Must be whole numbers > 0.");
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
