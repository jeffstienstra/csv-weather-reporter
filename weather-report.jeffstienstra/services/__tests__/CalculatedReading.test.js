const CalculatedReading = require('../CalculatedReading')

const readingGroups = [
  {
    timestamp: '1535388063212',
    temperature: '77.23110',
    humidity: '0.769317',
    pressure: '117'
  },
  {
    timestamp: '1535388064212',
    temperature: '79.57110',
    humidity: '0.776598',
    pressure: '103'
  },
  {
    timestamp: '1535388065212',
    temperature: '78.23110',
    humidity: '0.628398',
    pressure: '105'
  }
] 

const calculatedReading = new CalculatedReading(readingGroups)

describe("constructor", () => {

  test('it sets the timestamp', () => {
    expect(calculatedReading.timestamp).toBe('1535388065212');
  });

  //testing temperature values
  test('it defines the minimum temperature', () => {
    expect(calculatedReading.minTemp).toBe('77.23');
  });

  test('it defines the maximum temperature', () => {
    expect(calculatedReading.maxTemp).toBe('79.57');
  });

  test('it defines the average temperature', () => {
    expect(calculatedReading.avgTemp).toBe('78.34');
  });

  //testing humidity values
  test('it defines the minimum humidity', () => {
    expect(calculatedReading.minHumidity).toBe('0.63');
  });

  test('it defines the maximum humidity', () => {
    expect(calculatedReading.maxHumidity).toBe('0.78');
  });

  test('it defines the average humidity', () => {
    expect(calculatedReading.avgHumidity).toBe('0.72');
  });

  //testing pressure values
  test('it defines the minimum pressure', () => {
    expect(calculatedReading.minPressure).toBe('103.00');
  });

  test('it defines the maximum pressure', () => {
    expect(calculatedReading.maxPressure).toBe('117.00');
  });

  test('it defines the average pressure', () => {
    expect(calculatedReading.avgPressure).toBe('108.33');
  });
})

