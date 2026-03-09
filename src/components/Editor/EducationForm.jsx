import { Plus, Trash2, GraduationCap, Save, Edit, X } from "lucide-react";
import { useState, useEffect } from "react";

const EducationForm = ({
  items,
  onAdd,
  onUpdate,
  onRemove,
  onEdit,
  editingId,
  onCancelEdit,
}) => {
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
    gpa: "",
    location: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (editingId) {
      const item = items.find((item) => item.id === editingId);
      if (item) {
        setFormData(item);
        setIsAdding(true);
      }
    }
  }, [editingId, items]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdate(editingId, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
      gpa: "",
      location: "",
    });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
      gpa: "",
      location: "",
    });
    setIsAdding(false);
    if (editingId) {
      onCancelEdit();
    }
  };

  const handleEdit = (id) => {
    onEdit(id);
    setIsAdding(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Education</h2>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </button>
        )}
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="border border-gray-200 rounded-lg p-4 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">
              {editingId ? "Edit Education" : "Add New Education"}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Institution *
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
                className="form-input"
                placeholder="University Name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Degree *
              </label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={(e) => handleChange("degree", e.target.value)}
                className="form-input"
                placeholder="Bachelor of Science"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => handleChange("field", e.target.value)}
                className="form-input"
                placeholder="Computer Science"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="form-input"
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Start Date *
              </label>
              <input
                type="text"
                required
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="form-input"
                placeholder="September 2018"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="form-input"
                placeholder="May 2022 or Present"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                GPA
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => handleChange("gpa", e.target.value)}
                className="form-input"
                placeholder="3.8/4.0"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="form-input min-h-25"
              placeholder="Relevant coursework, honors, achievements..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center">
              <Save className="h-4 w-4 mr-2" />
              {editingId ? "Update Education" : "Save Education"}
            </button>
          </div>
        </form>
      )}

      {!isAdding && (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.degree}</h3>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && !isAdding && (
            <div className="text-center py-8 text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>
                No education added yet. Click "Add Education" to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
