export enum TemperatureUnit {
  Celsius = "C",
  Fahrenheit = "F",
  Kelvin = "K",
}

export function convertTemperature(
  inputUnit: TemperatureUnit,
  inputValue = 0,
  outputUnit: TemperatureUnit
): number {
  if (inputUnit === outputUnit) {
    return inputValue;
  }

  switch (inputUnit) {
    case TemperatureUnit.Celsius:
      switch (outputUnit) {
        case TemperatureUnit.Fahrenheit:
          return (inputValue * 9) / 5 + 32;
        case TemperatureUnit.Kelvin:
          return inputValue + 273.15;
        default:
          throw new Error(`Unsupported output temperature unit: ${outputUnit}`);
      }

    case TemperatureUnit.Fahrenheit:
      switch (outputUnit) {
        case TemperatureUnit.Celsius:
          return ((inputValue - 32) * 5) / 9;
        case TemperatureUnit.Kelvin:
          return ((inputValue - 32) * 5) / 9 + 273.15;
        default:
          throw new Error(`Unsupported output temperature unit: ${outputUnit}`);
      }

    case TemperatureUnit.Kelvin:
      switch (outputUnit) {
        case TemperatureUnit.Celsius:
          return inputValue - 273.15;
        case TemperatureUnit.Fahrenheit:
          return ((inputValue - 273.15) * 9) / 5 + 32;
        default:
          throw new Error(`Unsupported output temperature unit: ${outputUnit}`);
      }

    default:
      throw new Error(`Unsupported input temperature unit: ${inputUnit}`);
  }
}

// const inputUnit = TemperatureUnit.Celsius;
// const inputValue = 25;
// const outputUnit = TemperatureUnit.Fahrenheit;

// const result = convertTemperature(inputUnit, inputValue, outputUnit);
// console.log(`${inputValue} ${inputUnit} is equal to ${result} ${outputUnit}`);
