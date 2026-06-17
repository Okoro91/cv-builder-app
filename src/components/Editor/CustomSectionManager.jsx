import { Trash2, Edit } from "lucide-react";
import { useState } from "react";
import CustomSectionForm from "./CustomSectionForm";

const CustomSectionManager = ({
  customSections = [],
  onUpdate,
  onDelete,
  onSelect,
}) => {
  const [editingSectionId, setEditingSectionId] = useState(null);

  const handleAddSection = (sectionData) => {
    const newSection = {
      id: Date.now(),
      name: sectionData.name,
      description: sectionData.description || "",
      items: [],
    };
    const updatedSections = [...customSections, newSection];
    onUpdate(updatedSections);
  };

  const handleUpdateSection = (sectionId, sectionData) => {
    const updatedSections = customSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            name: sectionData.name,
            description: sectionData.description,
          }
        : section,
    );
    onUpdate(updatedSections);
    setEditingSectionId(null);
  };

  const handleRemoveSection = (sectionId) => {
    if (window.confirm(`Are you sure you want to remove this section?`)) {
      const updatedSections = customSections.filter(
        (section) => section.id !== sectionId,
      );
      onUpdate(updatedSections);
      onDelete(sectionId);
    }
  };

  const handleAddItem = (sectionId, itemData) => {
    const newItem = {
      id: Date.now() + Math.random(),
      ...itemData,
      details: itemData.details || [],
    };

    const updatedSections = customSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: [...(section.items || []), newItem],
          }
        : section,
    );
    onUpdate(updatedSections);
  };

  const handleUpdateItem = (sectionId, itemId, itemData) => {
    const updatedSections = customSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: (section.items || []).map((item) =>
              item.id === itemId ? { ...item, ...itemData } : item,
            ),
          }
        : section,
    );
    onUpdate(updatedSections);
  };

  const handleRemoveItem = (sectionId, itemId) => {
    const updatedSections = customSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: (section.items || []).filter((item) => item.id !== itemId),
          }
        : section,
    );
    onUpdate(updatedSections);
  };

  const handleSelectSection = (section) => {
    onSelect(section);
    setEditingSectionId(section.id);
  };

  return (
    <div className="space-y-6">
      {/* Always show the CustomSectionForm with null section to keep the "Add New Section" button visible */}
      <CustomSectionForm
        section={null}
        onAdd={handleAddSection}
        onUpdate={handleUpdateSection}
        onRemove={handleRemoveSection}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onRemoveItem={handleRemoveItem}
        editingId={editingSectionId}
        onCancelEdit={() => setEditingSectionId(null)}
      />

      {/* List of existing sections - with explicit Edit button instead of click-to-edit */}
      {customSections.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Your Custom Sections
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {customSections.map((section) => (
              <div
                key={section.id}
                className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {section.name}
                    </h4>
                    {section.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {section.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {section.items?.length || 0} items
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectSection(section)}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-md transition-colors flex items-center"
                      title="Edit Section"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSection(section.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors flex items-center"
                      title="Remove Section"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSectionManager;
