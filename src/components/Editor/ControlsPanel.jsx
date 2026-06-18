import {
  Download,
  Printer,
  Copy,
  Eye,
  EyeOff,
  Settings,
  Palette,
  RefreshCw,
} from "lucide-react";

const ControlsPanel = ({
  onExportPDF,
  isDownloading,
  onPrint,
  onCopy,
  onReset,
  onLoadTemplate,
  previewMode,
  togglePreview,
  showSettings,
  toggleSettings,
  showColors,
  toggleColors,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onExportPDF}
            disabled={isDownloading}
            className="btn-primary flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            {isDownloading ? "Generating..." : "Download PDF"}
          </button>

          <button onClick={onPrint} className="btn-secondary flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>

          <button onClick={onCopy} className="btn-secondary flex items-center">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={toggleColors}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              showColors
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Palette className="h-4 w-4 mr-2" />
            Colors
          </button>

          <button
            onClick={toggleSettings}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              showSettings
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Settings className="h-4 w-4 mr-2" />
            Layout
          </button>

          <button
            onClick={togglePreview}
            className="btn-secondary flex items-center"
          >
            {previewMode ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset All
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        <p>Changes are auto-saved. Click on any item in preview to edit it.</p>
      </div>
    </div>
  );
};

export default ControlsPanel;
