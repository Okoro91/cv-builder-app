import { useState, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ControlsPanel from "./components/Editor/ControlsPanel";
import PersonalInfoForm from "./components/Editor/PersonalInfoForm";
import EducationForm from "./components/Editor/EducationForm";
import ExperienceForm from "./components/Editor/ExperienceForm";
import CVPreview from "./components/Preview/CVPreview";
import LayoutSelector from "./components/Layout/LayoutSelector";
import { useCVData } from "./hooks/useCVData";
import ColorPicker from "./components/Layout/ColorPicker";

const App = () => {
  const cvPreviewRef = useRef(null);

  const {
    cvData,
    editingSection,
    editingItem,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    updateLayout,
    resetForm,
    startEdit,
    resetAll,
  } = useCVData();

  const [showPreview, setShowPreview] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const safeLayout = cvData.layout || {
    type: "standard",
    headerPosition: "top",
    showPhoto: true,
    themeColor: "#2563eb",
    fontSize: "medium",
    spacing: "normal",
    isPlain: false,
  };

  const handlePersonalInfoSave = (data) => {
    updatePersonalInfo(data);
    resetForm();
  };

  const handleEducationAdd = (education) => {
    addEducation(education);
  };

  const handleEducationUpdate = (id, data) => {
    updateEducation(id, data);
    resetForm();
  };

  const handleEducationEdit = (id) => {
    startEdit("education", id);
  };

  const handleExperienceAdd = (experience) => {
    addExperience(experience);
  };

  const handleExperienceUpdate = (id, data) => {
    updateExperience(id, data);
    resetForm();
  };

  const handleExperienceEdit = (id) => {
    startEdit("experience", id);
  };

  const handleReset = () => {
    if (
      confirm("Are you sure you want to reset all data? This cannot be undone.")
    ) {
      resetAll();
      setShowSettings(false);
      setShowColors(false);
    }
  };

  const togglePreview = () => setShowPreview(!showPreview);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowColors(false);
  };
  const toggleColors = () => {
    setShowColors(!showColors);
    setShowSettings(false);
  };

  const handleLayoutChange = (layoutUpdate) => {
    updateLayout(layoutUpdate);
  };

  const handleHeaderPositionChange = (position) => {
    updateLayout({ ...safeLayout, headerPosition: position });
  };

  const handleColorChange = (color) => {
    updateLayout({ ...safeLayout, themeColor: color });
  };

  const isEditingPersonalInfo = editingSection === "personalInfo";
  const isEditingEducation = editingSection === "education";
  const isEditingExperience = editingSection === "experience";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow container mx-auto px-4 py-6">
        <ControlsPanel
          onReset={handleReset}
          previewMode={showPreview}
          togglePreview={togglePreview}
          showSettings={showSettings}
          toggleSettings={toggleSettings}
          showColors={showColors}
          toggleColors={toggleColors}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 justify-center">
          {/* Middle Column - Editor */}
          <div
            className={`${showPreview ? "lg:col-span-2" : "lg:col-span-5 lg:px-32"} space-y-6`}
          >
            {showSettings && (
              <LayoutSelector
                currentLayout={safeLayout}
                onLayoutChange={handleLayoutChange}
                onHeaderPositionChange={handleHeaderPositionChange}
              />
            )}

            {showColors && (
              <ColorPicker
                currentColor={safeLayout.themeColor}
                onColorChange={handleColorChange}
              />
            )}

            <PersonalInfoForm
              data={cvData.personalInfo || {}}
              onSave={handlePersonalInfoSave}
              onEdit={() => startEdit("personalInfo")}
              onCancel={resetForm}
              isEditing={isEditingPersonalInfo}
            />
            <EducationForm
              items={cvData.education || []}
              onAdd={handleEducationAdd}
              onUpdate={handleEducationUpdate}
              onRemove={removeEducation}
              onEdit={handleEducationEdit}
              onCancelEdit={resetForm}
              editingId={isEditingEducation ? editingItem : null}
            />
            <ExperienceForm
              items={cvData.experience || []}
              onAdd={handleExperienceAdd}
              onUpdate={handleExperienceUpdate}
              onRemove={removeExperience}
              onEdit={handleExperienceEdit}
              onCancelEdit={resetForm}
              editingId={isEditingExperience ? editingItem : null}
            />
          </div>

          {showPreview && (
            <div className="lg:col-span-3">
              <div className="sticky top-20">
                <div className="bg-gray-800 text-white p-3 rounded-t-lg flex justify-between items-center">
                  <h2 className="font-semibold">Live Preview</h2>
                  <div className="flex space-x-2">
                    <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="block w-2 h-2 bg-red-500 rounded-full"></span>
                    <span className="block w-2 h-2 bg-yellow-500 rounded-full"></span>
                  </div>
                </div>
                <div className="border border-gray-200 border-t-0 rounded-b-lg overflow-hidden">
                  <CVPreview
                    ref={cvPreviewRef}
                    cvData={{
                      ...cvData,
                      layout: safeLayout,
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
