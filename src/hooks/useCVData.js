import { useState, useEffect } from "react";
import { initialCVData } from "../data/cvTemplate";

export const useCVData = () => {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem("cvData");
    return saved ? JSON.parse(saved) : initialCVData;
  });

  const [editingSection, setEditingSection] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonalInfo = (data) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const addEducation = (education) => {
    const newEducation = {
      id: Date.now(),
      ...education,
    };
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id, data) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu,
      ),
    }));
  };

  const removeEducation = (id) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addExperience = (experience) => {
    const newExperience = {
      id: Date.now(),
      ...experience,
    };
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const updateExperience = (id, data) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp,
      ),
    }));
  };

  const removeExperience = (id) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // section code

  const addCustomSection = (section) => {
    const newSection = {
      id: Date.now(),
      name: section.name,
      description: section.description || "",
      items: section.items || [],
    };
    setCvData((prev) => ({
      ...prev,
      customSections: [newSection, ...prev.customSections],
    }));
  };

  const updateCustomSection = (id, data) => {
    setCvData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === id ? { ...section, ...data } : section,
      ),
    }));
  };

  const removeCustomSection = (id) => {
    setCvData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter(
        (section) => section.id !== id,
      ),
    }));
  };

  const addCustomItem = (sectionId, item) => {
    const newItem = {
      id: Date.now(),
      ...item,
    };
    setCvData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section,
      ),
    }));
  };

  const updateCustomItem = (sectionId, itemId, data) => {
    setCvData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, ...data } : item,
              ),
            }
          : section,
      ),
    }));
  };

  const removeCustomItem = (sectionId, itemId) => {
    setCvData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter((item) => item.id !== itemId),
            }
          : section,
      ),
    }));
  };

  const updateLayout = (layout) => {
    setCvData((prev) => ({
      ...prev,
      layout: { ...prev.layout, ...layout },
    }));
  };

  const resetForm = () => {
    setEditingSection(null);
    setEditingItem(null);
  };

  const startEdit = (section, item = null) => {
    setEditingSection(section);
    setEditingItem(item);
  };

  const resetAll = () => {
    setCvData(initialCVData);
    setEditingSection(null);
    setEditingItem(null);
  };

  return {
    cvData,
    setCvData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomItem,
    updateCustomItem,
    removeCustomItem,
    updateLayout,
    editingSection,
    editingItem,
    startEdit,
    resetForm,
    resetAll,
  };
};
