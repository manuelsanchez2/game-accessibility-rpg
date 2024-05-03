import React from 'react'

type ColorInputProps = {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  extraClasses?: string
}

const ColorInput = ({
  id,
  label,
  value,
  onChange,
  extraClasses,
}: ColorInputProps) => (
  <div
    className={`flex items-center justify-between bg-gray-100 gap-3 mb-4 border-pixel p-3 hover:bg-gray-200 focus-within:bg-gray-200" ${extraClasses}`}
  >
    <label
      htmlFor={id}
      className="block text-xs font-medium text-nowrap font-pressStart2P"
    >
      {label}
    </label>
    <input
      type="color"
      id={id}
      value={value}
      onChange={onChange}
      className="w-full h-5 rounded-lg appearance-none cursor-pointer border-pixel max-w-[30px]"
    />
  </div>
)

export default ColorInput
