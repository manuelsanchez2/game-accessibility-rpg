import React from 'react'

type RangeInputProps = {
  id: string
  label: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  step?: number
}

const RangeInput = ({
  id,
  label,
  value,
  onChange,
  min = 1,
  max = 5,
  step = 1,
}: RangeInputProps) => (
  <div className="flex items-center justify-between bg-gray-100 gap-3 mb-4 border-pixel p-3 hover:bg-gray-200 focus-within:bg-gray-200">
    <label
      htmlFor={id}
      className="block text-xs font-medium text-nowrap font-pressStart2P group-hover:bg"
    >
      {label}
    </label>
    <div className="flex items-center gap-2">
      <span className="font-pressStart2P">{min}</span>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="h-2 bg-gray-200 rounded-lg cursor-pointer appearance-none bg-transparent w-[150px]"
      />
      <span className="font-pressStart2P">{max}</span>
    </div>
  </div>
)

export default RangeInput
