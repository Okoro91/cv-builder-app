import Header from "./components/Header";
import Footer from "./components/Footer";
import ControlsPanel from "./components/Editor/ControlsPanel";
import PersonalInfoForm from "./components/Editor/PersonalInfoForm";
import EducationForm from "./components/Editor/EducationForm";
import ExperienceForm from "./components/Editor/ExperienceForm";
import { useCVData } from "./hooks/useCVData";

const App = () => {
  const {
    cvData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    resetForm,
    startEdit,
    resetAll,
  } = useCVData();

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
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="grow container mx-auto px-4 py-6">
        <ControlsPanel onReset={handleReset} />
        <PersonalInfoForm
          onSave={handlePersonalInfoSave}
          onEdit={() => startEdit("personalInfo")}
          onCancel={resetForm}
          data={cvData.personalInfo || {}}
        />
        <EducationForm
          items={cvData.education || []}
          onAdd={handleEducationAdd}
          onUpdate={handleEducationUpdate}
          onRemove={removeEducation}
          onEdit={handleEducationEdit}
          onCancelEdit={resetForm}
        />
        <ExperienceForm
          items={cvData.experience || []}
          onAdd={handleExperienceAdd}
          onUpdate={handleExperienceUpdate}
          onRemove={removeExperience}
          onEdit={handleExperienceEdit}
          onCancelEdit={resetForm}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
