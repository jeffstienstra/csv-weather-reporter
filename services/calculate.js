/* Assumptions on compiling reports:
  1. Each group of samples receives its own report.
  2. The first Sample Group starts at the first value in the csv file.
  3. The user-selected Interval value will force the 2nd group's report to 
     start on the [0 + Interval] index of the readings array.  
  4. A Sample Size greater than the number of available readings will not issue a report.
  5. The Sample Size cannot be negative
  6. The Interval can be greater than the Sample Size but will result in unused readings.
  8. The Interval cannot be negative.
  9. If the user does not enter a Sample Size, one report will be generated using all values.
*/

const CalculatedReading = require("./CalculatedReading");

function calculatedReadings(readings, sampleSize, interval) {
  return readings.reduce((readingsGroups, _reading, index, remaining) => {
    const readingGroup = remaining.slice(index, index + sampleSize);

    if (readingGroup.length >= sampleSize) {
      readingsGroups.push(new CalculatedReading(readingGroup));
    }

    remaining.splice(0, interval - 1);

    return readingsGroups;
  }, []);
}

module.exports = calculatedReadings;

/* Notes about the calculatedReadings function (this is mostly for my own reference):  
  The arguments: (readings, sampleSize, interval)
    'readings' - an array of all the raw weather sample objects from the .csv file
    'sampleSize' - user-selected value defining how many readings to use for each report
    'interval' - user-selected value defines how many readings to skip before compiling a new report

  .reduce arguments: (readingsGroups, _reading, index, remaining) or (acc, val, index, array)
    'readingsGroups' - the accumulator for .reduce, initialized as []
    '_reading' - represents each individual reading
    'index' - stores the current index position
    'remaining' - the original array we passed in, but gets updated with each iteration
    
  
  const 'readingGroup' is used to store one group of samples from the remaining array
    starting from the current index + 'sampleSize' 

  if statement
    if the collected readingGroup is >= 'sampleSize' we can use it to compile a full report 
    by creating an instance of the CalculatedReading class. Else, return. 

  remaining.splice
    destructively removes the first 'interval' of elements from the array.
    
  

*/
