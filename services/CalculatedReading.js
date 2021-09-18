/*  The CalculatedReading class defines a report and includes methods for calculating the
    min/max/avg and getting the last timestamp.
    
    Assumptions:
    Since the sensor is logging samples over time, this assumes the array taken from the csv
    file should already be ordered from oldest to newest. This may not always be the case.
*/

class CalculatedReading {
  constructor(readingGroup) {
    this.timestamp = readingGroup[readingGroup.length - 1].timestamp;
    this.minTemp = this.calculateMin(readingGroup, "temperature");
    this.maxTemp = this.calculateMax(readingGroup, "temperature");
    this.avgTemp = this.calculateAvg(readingGroup, "temperature");
    this.minHumidity = this.calculateMin(readingGroup, "humidity");
    this.maxHumidity = this.calculateMax(readingGroup, "humidity");
    this.avgHumidity = this.calculateAvg(readingGroup, "humidity");
    this.minPressure = this.calculateMin(readingGroup, "pressure");
    this.maxPressure = this.calculateMax(readingGroup, "pressure");
    this.avgPressure = this.calculateAvg(readingGroup, "pressure");
  }

  /*  NOTE 1: should replace hard-coded .toFixed() value in the methods with a variable 
      in case more/fewer decimals are required. 
      
      ADD-ON FEATURE: The option for users to select °C/°F temp, relative/absolute
      humidity, and kPa/PSI/inHg pressure, etc for the output report.
  */

  /*  the '...' below is called the Rest Parameter and can be read as (the rest of [array]), 
      which allows a function to take an unlimited number of arguments - aka a 'variadic function'.
  */

  calculateMax(readingGroup, attr) {
    return Math.max(...readingGroup.map((reading) => parseFloat(reading[attr]))).toFixed(2);
  }

  calculateMin(readingGroup, attr) {
    return Math.min(...readingGroup.map((reading) => parseFloat(reading[attr]))).toFixed(2);
  }

  calculateAvg(readingGroup, attr) {
    return (
      readingGroup.reduce((prev, curr) => {
        return prev + parseFloat(curr[attr]);
      }, 0) / readingGroup.length
    ).toFixed(2);
  }
}

module.exports = CalculatedReading;
