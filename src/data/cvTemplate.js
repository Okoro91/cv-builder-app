export const initialCVData = {
  personalInfo: {
    fullName: "Muhammed Okoro Ibrahim",
    email: "mi.okoro91@gmail.com",
    phone: "+234 812 327 2914",
    address: "gbaga raod, ikorodu",
    summary:
      "Experienced software developer with 5+ years in web application development",
    profileImage: "",
    title: "Software Developer",
  },
  education: [
    {
      id: 1,
      institution: "Okoro University of Technology",
      degree: "Master of Computer Science",
      startDate: "2019",
      endDate: "2021",
      description:
        "Specialized in Artificial Intelligence and Machine Learning",
    },
    {
      id: 2,
      institution: "University of Technology",
      degree: "Bachelor of Computer Science",
      startDate: "2015",
      endDate: "2019",
      description: "Graduated with honors",
    },
  ],
  experience: [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      startDate: "2020",
      endDate: "Present",
      description:
        "builded and maintained multiple web applications using React and Node.js, leading a team of developers to deliver high-quality software solutions",
      achievements: [
        "Led a team of 5 developers to successfully deliver a major project ahead of schedule",
        "Implemented performance optimizations that improved application speed by 30%",
      ],
    },
    {
      id: 2,
      company: "Digital Innovations Ltd.",
      position: "Lead Developer",
      startDate: "2018",
      endDate: "2020",
      description:
        "Led development of multiple web applications using React and Node.js",
      achievements: [
        "Led a team of 4 developers to deliver a key project on time",
        "Implemented new features that increased user engagement by 25%",
      ],
    },
  ],
};

export const layoutOptions = {
  headerPositions: [
    {
      id: "top",
      name: "Top",
      description: "Header at the top",
    },
    {
      id: "left",
      name: "Left",
      description: "Header on the left side",
    },
    {
      id: "right",
      name: "Right",
      description: "Header on the right side",
    },
  ],
  colors: [
    "#2563eb", // blue
    "#059669", // green
    "#7c3aed", // purple
    "#dc2626", // red
    "#ea580c", // orange
    "#0891b2", // cyan
    "#475569", // gray
    "#000000", // black
  ],
};
