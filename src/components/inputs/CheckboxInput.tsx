import React from 'react'

interface CheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const CheckboxInput: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  className,
}) => {
  return (
    <div
      className={`flex items-center justify-between bg-gray-100 gap-3 mb-4 border-pixel p-3 ${className} hover:bg-gray-200 focus-within:bg-gray-200`}
    >
      <label htmlFor={id} className="text-xs font-medium font-pressStart2P">
        {label}
      </label>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 border-pixel cursor-pointer"
      />
    </div>
  )
}

export default CheckboxInput
