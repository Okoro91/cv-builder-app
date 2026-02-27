import { Upload, X, User } from "lucide-react";
import { useState, useRef } from "react";

const ImageUploader = ({ image, onImageChange, onRemove }) => {
  const [preview, setPreview] = useState(image || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreview(base64String);
      onImageChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview("");
    setError("");
    onRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Profile Photo
      </label>
      <div className="flex items-center space-x-6">
        <div className="relative group">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                onError={() => {
                  setPreview("");
                  setError("Failed to load image");
                }}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                title="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div
              onClick={handleClick}
              className="w-24 h-24 rounded-full bg-linear-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <User className="h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <input
            type="file"
            ref={fileInputRef}
            id="profile-image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {!preview && (
            <button
              type="button"
              onClick={handleClick}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-500 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </button>
          )}

          {preview && (
            <button
              type="button"
              onClick={handleClick}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Change Photo
            </button>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Recommended: Square photo, JPG or PNG, max 5MB
          </p>

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
