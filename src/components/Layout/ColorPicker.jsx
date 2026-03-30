import { Palette, Check } from "lucide-react";
import { layoutOptions } from "../../data/cvTemplate";

const ColorPicker = ({ currentColor, onColorChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Color Theme</h2>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {layoutOptions.colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className="relative h-10 w-10 rounded-full transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {currentColor === color && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-full h-10 cursor-pointer rounded-md border border-gray-300"
            />
          </div>
          <div className="text-sm text-gray-600">
            <div
              className="h-10 w-20 rounded-md border"
              style={{ backgroundColor: currentColor }}
            />
            <p className="mt-1 text-center">{currentColor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
