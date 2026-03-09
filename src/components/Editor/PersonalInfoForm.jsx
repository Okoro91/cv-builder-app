import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Save,
  Edit,
  X,
} from "lucide-react";
import ImageUploader from "../UI/ImageUploader";
import { useState, useEffect } from "react";

const PersonalInfoForm = ({
  data = {},
  onSave,
  onEdit,
  isEditing,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    profileImage: "",
    title: "",
    ...data,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageChange = (image) => {
    setFormData((prev) => ({ ...prev, profileImage: image }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleCancel = () => {
    setFormData(data);
    onCancel();
  };

  const hasData =
    data.fullName || data.email || data.phone || data.address || data.summary;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-md mr-3">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h2>
          </div>
        </div>
        {!isEditing && hasData && (
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUploader
            image={formData.profileImage}
            onImageChange={handleImageChange}
            onRemove={handleRemoveImage}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="form-input pl-10"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="form-input"
                placeholder="Software Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="form-input pl-10"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="form-input pl-10"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="form-input pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className=" text-sm font-medium text-gray-700 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-blue-600" />
              Professional Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              className="form-input min-h-30"
              placeholder="Brief summary of your professional background, skills, and achievements..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save Information
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {hasData ? (
            <>
              <div className="flex items-start space-x-4">
                {formData.profileImage && (
                  <img
                    src={formData.profileImage}
                    alt={formData.fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {formData.fullName || "Your Name"}
                  </h3>
                  {formData.title && (
                    <p className="text-blue-600 font-medium">
                      {formData.title}
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <p className="font-medium">No personal information added yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Click the Edit button to get started
              </p>
              <button onClick={onEdit} className="mt-4 btn-primary">
                Add Your Information
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;
