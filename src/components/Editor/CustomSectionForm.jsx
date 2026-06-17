import { Plus, Trash2, Save, Edit, X, List, Type, Hash } from "lucide-react";
import { useState } from "react";

const CustomSectionForm = ({
  sections = [],
  onAdd,
  onUpdate,
  onRemove,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}) => {
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [activeItemSectionId, setActiveItemSectionId] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const [sectionForm, setSectionForm] = useState({ name: "" });
  const [itemForm, setItemForm] = useState({
    title: "",
    subtitle: "",
    date: "",
    description: "",
    details: [],
  });
  const [detailInput, setDetailInput] = useState("");

  const handleSectionChange = (field, value) => {
    setSectionForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (field, value) => {
    setItemForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddDetail = () => {
    if (detailInput.trim()) {
      setItemForm((prev) => ({
        ...prev,
        details: [...prev.details, detailInput.trim()],
      }));
      setDetailInput("");
    }
  };

  const handleRemoveDetail = (index) => {
    setItemForm((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitSection = (e) => {
    e.preventDefault();
    if (editingSectionId) {
      onUpdate(editingSectionId, sectionForm);
    } else {
      onAdd(sectionForm);
      setIsAdd(false);
    }
    resetSectionForm();
  };

  const handleSubmitItem = (e, sectionId) => {
    e.preventDefault();
    if (editingItemId) {
      onUpdateItem(sectionId, editingItemId, itemForm);
    } else {
      onAddItem(sectionId, itemForm);
    }
    resetItemForm();
  };

  const resetSectionForm = () => {
    setSectionForm({ name: "", description: "" });
    setEditingSectionId(null);
  };

  const resetItemForm = () => {
    setItemForm({
      title: "",
      subtitle: "",
      date: "",
      description: "",
      details: [],
    });
    setEditingItemId(null);
    setActiveItemSectionId(null);
    setDetailInput("");
  };

  const handleEditSection = (section) => {
    setEditingSectionId(section.id);
    setSectionForm({
      name: section.name,
      description: section.description || "",
    });
  };

  const handleEditItem = (item, sectionId) => {
    setItemForm({
      title: item.title || "",
      subtitle: item.subtitle || "",
      date: item.date || "",
      description: item.description || "",
      details: item.details || [],
    });
    setEditingItemId(item.id);
    setActiveItemSectionId(sectionId);
  };

  const handleRemoveSection = (section) => {
    if (
      window.confirm(
        `Are you sure you want to remove "${section.name}" section?`,
      )
    ) {
      onRemove(section.id);
      if (editingSectionId === section.id) resetSectionForm();
    }
  };

  const handleCancelEdit = (type) => {
    if (type === "section") {
      resetSectionForm();
    } else {
      resetItemForm();
    }
  };

  const isEditingSection = (sectionId) => editingSectionId === sectionId;
  const isItemFormActive = (sectionId) => activeItemSectionId === sectionId;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <List className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Custom Sections</h2>
          </div>
          <button
            onClick={() => {
              if (editingSectionId) resetSectionForm();
              else setSectionForm({ name: "", description: "" });
              setIsAdd(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New Section
          </button>
        </div>

        {isAdd && (
          <form
            onSubmit={handleSubmitSection}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">Create New Section</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Section Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={sectionForm.name}
                    onChange={(e) =>
                      handleSectionChange("name", e.target.value)
                    }
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Projects, Certifications, Languages, etc."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Section
              </button>
            </div>
          </form>
        )}
      </div>

      {sections.length > 0 ? (
        sections.map((section) => (
          <div
            key={section.id}
            className="border-t pt-6 mt-6 first:border-t-0 first:mt-0 first:pt-0"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-purple-600 mr-2" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.name}
                  </h2>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (
                      activeItemSectionId &&
                      activeItemSectionId !== section.id
                    ) {
                      resetItemForm();
                    }
                    setActiveItemSectionId(section.id);
                    setItemForm({
                      title: "",
                      subtitle: "",
                      date: "",
                      description: "",
                      details: [],
                    });
                    setEditingItemId(null);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add {section.name}
                </button>

                {isEditingSection(section.id) ? (
                  <button
                    onClick={() => handleCancelEdit("section")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditSection(section)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleRemoveSection(section)}
                  className="text-red-500 hover:text-red-700 px-3 py-2 border border-red-200 rounded-md hover:bg-red-50 transition-colors flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                </button>
              </div>
            </div>

            {isEditingSection(section.id) && (
              <form
                onSubmit={handleSubmitSection}
                className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">
                    Edit Section Name
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Section Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={sectionForm.name}
                        onChange={(e) =>
                          handleSectionChange("name", e.target.value)
                        }
                        className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-blue-200">
                  <button
                    type="button"
                    onClick={() => handleCancelEdit("section")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Section
                  </button>
                </div>
              </form>
            )}

            {isItemFormActive(section.id) && (
              <form
                onSubmit={(e) => handleSubmitItem(e, section.id)}
                className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">
                    {editingItemId ? "Edit Item" : "Add New Item"} to{" "}
                    {section.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleCancelEdit("item")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={itemForm.title}
                      onChange={(e) =>
                        handleItemChange("title", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Project Name, Certification, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={itemForm.subtitle}
                      onChange={(e) =>
                        handleItemChange("subtitle", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Organization, Platform, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Date/Year
                    </label>
                    <input
                      type="text"
                      value={itemForm.date}
                      onChange={(e) => handleItemChange("date", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="2023, June 2022, etc."
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={itemForm.description}
                    onChange={(e) =>
                      handleItemChange("description", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-20"
                    placeholder="Describe this item..."
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Details (Optional)
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={detailInput}
                      onChange={(e) => setDetailInput(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a detail"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddDetail())
                      }
                    />
                    <button
                      type="button"
                      onClick={handleAddDetail}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {itemForm.details.map((detail, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                      >
                        <span className="text-sm text-gray-700">
                          • {detail}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDetail(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-blue-200">
                  <button
                    type="button"
                    onClick={() => handleCancelEdit("item")}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingItemId ? "Update Item" : "Save Item"}
                  </button>
                </div>
              </form>
            )}

            {section.items && section.items.length > 0 ? (
              section.items.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition-all mb-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-purple-600 font-medium mt-1">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        {item.date && (
                          <div className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                            {item.date}
                          </div>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-gray-700 mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {item.details && item.details.length > 0 && (
                        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                          <ul className="space-y-1.5">
                            {item.details.map((detail, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-700 flex items-start"
                              >
                                <span className="text-purple-500 mr-2 font-bold">
                                  •
                                </span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditItem(item, section.id)}
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit Item"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(section.id, item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <List className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 mb-2">
                  No items in this section yet
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Add your first item to display content
                </p>
                {!isItemFormActive(section.id) && (
                  <button
                    onClick={() => {
                      if (
                        activeItemSectionId &&
                        activeItemSectionId !== section.id
                      ) {
                        resetItemForm();
                      }
                      setActiveItemSectionId(section.id);
                      setItemForm({
                        title: "",
                        subtitle: "",
                        date: "",
                        description: "",
                        details: [],
                      });
                      setEditingItemId(null);
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors inline-flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Item
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 border-t pt-6 mt-2">
          <Hash className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-lg mb-2">No sections created yet</p>
          <p className="text-sm text-gray-400">
            Create your first section using the form above
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomSectionForm;
