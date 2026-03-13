import { forwardRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  User,
} from "lucide-react";

// import profilePlaceholder from "../../assets/profile-placeholder.png";

const CVPreview = forwardRef(({ cvData }, ref) => {
  const safeData = {
    personalInfo: cvData?.personalInfo || {},
    education: cvData?.education || [],
    experience: cvData?.experience || [],
    layout: {
      headerPosition: cvData?.layout?.headerPosition || "top",
      showPhoto: cvData?.layout?.showPhoto ?? true,
      themeColor: cvData?.layout?.themeColor || "#2563eb",
      fontSize: cvData?.layout?.fontSize || "medium",
      spacing: cvData?.layout?.spacing || "normal",
      isPlain: cvData?.layout?.isPlain ?? false,
    },
  };

  const { personalInfo, education, experience, layout } = safeData;

  const getLayoutClasses = () => {
    const baseClasses = "p-8 transition-all duration-300";

    if (layout.isPlain) {
      return `${baseClasses} bg-white text-gray-800`;
    }
  };

  const getHeaderClasses = () => {
    const isPlain = layout.isPlain;
    const position = layout.headerPosition || "top";

    switch (position) {
      case "left":
        return `flex flex-col md:flex-row ${isPlain ? "border-b md:border-b-0 md:border-r border-gray-300" : "md:border-r-4"}`;
      case "right":
        return `flex flex-col md:flex-row-reverse ${isPlain ? "border-b md:border-b-0 md:border-l border-gray-300" : "md:border-l-4"}`;
      default:
        return `flex flex-col ${isPlain ? "border-b border-gray-300" : ""}`;
    }
  };

  const getHeaderStyle = () => {
    if (layout.isPlain) return {};

    let bgColor;
    if (layout.themeColor?.startsWith("oklch")) {
      bgColor = "#eff6ff";
    } else {
      bgColor = `${layout.themeColor}10`;
    }

    return {
      backgroundColor: bgColor,
      borderColor: layout.themeColor?.startsWith("oklch")
        ? "#2563eb"
        : layout.themeColor,
    };
  };

  const getAccentStyle = () => {
    if (layout.isPlain) return {};

    return {
      color: layout.themeColor?.startsWith("oklch")
        ? "#2563eb"
        : layout.themeColor,
      borderColor: layout.themeColor?.startsWith("oklch")
        ? "#2563eb"
        : layout.themeColor,
    };
  };

  // Profile image component with fallback
  const ProfileImage = () => {
    if (!layout.showPhoto) return null;

    if (personalInfo.profileImage) {
      return (
        <div className="shrink-0">
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.fullName || "Profile"}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = `
                <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              `;
            }}
          />
        </div>
      );
    }

    // Placeholder when no image is provided
    return (
      <div className="shrink-0">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 border-4 border-white shadow-md flex items-center justify-center">
          <User className="w-12 h-12 text-blue-500" />
        </div>
      </div>
    );
  };

  const renderHeader = () => (
    <div
      className={`p-6 md:p-8 ${layout.headerPosition === "top" ? "mb-6" : "md:w-1/3"} transition-all duration-300`}
      style={getHeaderStyle()}
    >
      <div
        className={`flex ${layout.headerPosition === "top" ? "flex-col md:flex-row items-start md:items-center" : "flex-col"} gap-6`}
      >
        <ProfileImage />

        <div className="flex-1">
          <h1
            className="text-2xl md:text-3xl font-bold mb-2"
            style={layout.isPlain ? {} : { color: layout.themeColor }}
          >
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          {personalInfo.title && (
            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
              {personalInfo.title}
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {personalInfo.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 shrink-0" />
                <span>{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}
    </div>
  );

  const renderSection = (title, icon, items, renderItem) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div
            className="p-2 rounded-md mr-3"
            style={
              layout.isPlain
                ? { backgroundColor: "#f3f4f6" }
                : { backgroundColor: `${layout.themeColor}20` }
            }
          >
            {icon}
          </div>
          <h2 className="text-xl font-semibold" style={getAccentStyle()}>
            {title}
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={item.id || index} className="relative">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {item.position || item.degree || item.title || "Untitled"}
                  </h3>
                  <div className="flex flex-wrap items-center text-gray-600 mt-1">
                    <span className="font-medium">
                      {item.company || item.institution || item.subtitle || ""}
                    </span>
                    {(item.location || item.field) && (
                      <span className="mx-2">•</span>
                    )}
                    <span>{item.location || item.field || ""}</span>
                  </div>
                </div>
                <div
                  className="text-gray-500 text-sm md:text-right mt-1 md:mt-0 md:ml-4 whitespace-nowrap"
                  style={getAccentStyle()}
                >
                  {item.startDate || ""}{" "}
                  {item.endDate ? `- ${item.endDate}` : ""}
                </div>
              </div>

              {item.gpa && (
                <div className="text-sm text-gray-600 mb-2">
                  GPA: <span className="font-semibold">{item.gpa}</span>
                </div>
              )}

              {item.description && (
                <p className="text-gray-700 mb-2">{item.description}</p>
              )}

              {item.achievements && item.achievements.length > 0 && (
                <ul className="space-y-1 ml-4">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-600 flex">
                      <span className="mr-2" style={getAccentStyle()}>
                        •
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.details && item.details.length > 0 && (
                <ul className="space-y-1 ml-4 mt-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex">
                      <span className="mr-2" style={getAccentStyle()}>
                        •
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="bg-white p-8 rounded-lg shadow-lg">
      <div className={getLayoutClasses()}>
        <div className="max-w-4xl mx-auto">
          <div className={getHeaderClasses()}>
            {renderHeader()}

            <div
              className={`flex-1 p-6 md:p-8 ${layout.headerPosition === "top" ? "" : "md:w-2/3"}`}
            >
              {/* Experience */}
              {experience.length > 0 &&
                renderSection(
                  "Work Experience",
                  <Briefcase className="h-5 w-5" style={getAccentStyle()} />,
                  experience,
                )}

              {/* Education */}
              {education.length > 0 &&
                renderSection(
                  "Education",
                  <GraduationCap
                    className="h-5 w-5"
                    style={getAccentStyle()}
                  />,
                  education,
                )}

              {/* Empty state */}
              {experience.length === 0 && education.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No content yet
                  </h3>
                  <p className="text-gray-500">
                    Add your experience, education, or create custom sections to
                    see them here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`mt-8 pt-6 border-t text-center text-sm ${
              layout.isPlain ? "text-gray-500 border-gray-300" : "text-gray-400"
            }`}
          >
            <p>
              CV generated with CV Builder Pro •{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CVPreview;
