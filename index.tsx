"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { TemperatureUnit, convertTemperature } from "./helper/temperature";
import { Icons } from "./icons";
import { ToolConfig } from "./config/tool";
import { Button } from "./ui/button";

const AVAILABLE_TEMPERATURE_UNITS = [
  TemperatureUnit.Celsius,
  TemperatureUnit.Kelvin,
  TemperatureUnit.Fahrenheit,
] as const;

function enumFromStringValue<T> (enm: { [s: string]: T}, value: string): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
}

export const TemperatureUnitConvertor = () => {
  const [inputs, setInputs] = useState<Partial<{
    firstTemp: number,
    firstUnit: TemperatureUnit,
    secondTemp: number,
    secondUnit: TemperatureUnit
  }>>({
    firstTemp: 0,
    secondTemp: 0,
  })

  const [error, setError] = useState('');


  function handleSelect (key: string, value: TemperatureUnit) {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }))
  }

  function handleInput (event: ChangeEvent<HTMLInputElement>) {
    setInputs(prev => ({
      ...prev,
      [event.target.name]: Number(event.target.value)
    }))
  }

  function handleConvert() {
    if (!inputs.firstUnit || !inputs.secondUnit) {
      setError('Please select unit types');
      return;
    }

    if (inputs.firstTemp && inputs.secondUnit && inputs.secondUnit) {
      const output = convertTemperature(inputs.firstUnit, inputs.firstTemp, inputs.secondUnit);
      setInputs(prev => ({
        ...prev,
        secondTemp: output
      }))
      setError('');
    }
  }

  return (
    <section className="py-4">
      <div>
        <h1 className="text-3xl">Temperature Unit Convertor</h1>
        <p className="text-sm text-muted-foreground">
          {ToolConfig.description}
        </p>
      </div>

      <div className="flex flex-col flex-nowrap items-center gap-4 my-8">
        <p className="text-red-600">{error}</p>
        <div className="max-w-fit min-h-fit rounded-lg py-4">
          <p className="mt-0 text-sm">Entered Temperature</p>
          <div className="flex flex-row flex-nowrap gap-4">
            <Input
              className="border-0 border-b rounded-none border-solid focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-4xl font-medium"
              value={inputs.firstTemp?.toFixed(2)}
              name="firstTemp"
              type="number"
              onChange={handleInput}
            />
            <Select name="firstUnit" onValueChange={(value) => handleSelect("firstUnit", enumFromStringValue<string>(TemperatureUnit, value.toUpperCase()) as TemperatureUnit)}>
              <SelectTrigger className="w-fit border-0 gap-4 text-xl focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Unit"/>
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TEMPERATURE_UNITS.map((temp, index) => (
                  <SelectItem
                    value={temp.toLowerCase().replace(" ", "-")}
                    key={index}
                  >
                    {temp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Icons.ArrowUpDown width={25} height={25} strokeWidth={"1px"} />

        <div className="max-w-fit min-h-fit rounded-lg py-4">
          <p className="mt-0 text-sm">Converted Temperature</p>
          <div className="flex flex-row flex-nowrap gap-4">
            <Input
              name="secondTemp"
              className="border-0 border-b rounded-none border-solid focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-4xl font-medium"
              value={inputs.secondTemp?.toFixed(2)}
              type="number"
              onChange={handleInput}
              readOnly={true}
            />
            <Select name="secondUnit" onValueChange={(value) => handleSelect("secondUnit", enumFromStringValue<string>(TemperatureUnit, value.toUpperCase()) as TemperatureUnit)}>
              <SelectTrigger className="w-fit border-0 gap-4 text-xl align-top focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_TEMPERATURE_UNITS.map((temp, index) => (
                  <SelectItem
                    value={temp.toLowerCase().replace(" ", "-")}
                    key={index}
                  >
                    {temp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="border border-solid" variant={'outline'} type="button" onClick={handleConvert}>Convert</Button>
      </div>

      {/* User Guides */}
      <ul className="px-0">
          <p className="text-xl">User Guides</p>
          {ToolConfig.userGuides.map((guide, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {guide}
            </li>
          ))}
        </ul>
    </section>
  );
};
