import { Check } from "lucide-react";

export default function Checkbox({ checked, onChange, className = "", ...props }) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
        {...props}
      />
      {checked && (
        <span className="absolute pointer-events-none">
          <Check className="w-4 h-4 text-blue-600" />
        </span>
      )}
    </label>
  );
} 