import { Layout, ChevronRight, Check } from "lucide-react";
import { layoutOptions } from "../../data/cvTemplate";

const LayoutCard = ({ layout, isSelected, onClick }) => (
  <div
    onClick={() => onClick(layout.id)}
    className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all duration-200 ${
      isSelected
        ? "border-blue-500 bg-blue-50 shadow-sm"
        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    }`}
  >
    {isSelected && (
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
        <Check className="h-3 w-3" />
      </div>
    )}
    <div className="flex items-center space-x-3">
      <div
        className={`p-2 rounded-md ${
          layout.id === "standard"
            ? "bg-blue-100"
            : layout.id === "modern"
              ? "bg-purple-100"
              : layout.id === "minimalist"
                ? "bg-gray-100"
                : "bg-green-100"
        }`}
      >
        <Layout className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{layout.name}</h3>
        <p className="text-sm text-gray-500">{layout.description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  </div>
);

const LayoutSelector = ({
  currentLayout,
  onLayoutChange,
  onHeaderPositionChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex items-center space-x-2">
        <Layout className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">CV Layout</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Layout Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* {layoutOptions.types.map((layout) => (
              <LayoutCard
                key={layout.id}
                layout={layout}
                isSelected={currentLayout.type === layout.id}
                onClick={() => onLayoutChange({ type: layout.id })}
              />
            ))} */}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Header Position
          </label>
          <div className="grid grid-cols-3 gap-2">
            {layoutOptions.headerPositions.map((position) => (
              <button
                key={position.id}
                onClick={() => onHeaderPositionChange(position.id)}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  currentLayout.headerPosition === position.id
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {position.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appearance
          </label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Plain CV (No colors)
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentLayout.isPlain}
                  onChange={(e) =>
                    onLayoutChange({ isPlain: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Show Profile Photo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentLayout.showPhoto}
                  onChange={(e) =>
                    onLayoutChange({ showPhoto: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSelector;
