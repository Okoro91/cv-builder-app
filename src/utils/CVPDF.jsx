import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactItem: {
    fontSize: 10,
    color: "#666",
  },
  summary: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 1.5,
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottom: 1,
    paddingBottom: 5,
  },
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 11,
    color: "#666",
  },
  itemDate: {
    fontSize: 10,
    color: "#666",
  },
  itemDescription: {
    fontSize: 10,
    marginTop: 3,
    lineHeight: 1.4,
  },
  achievement: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: 2,
  },
});

const CVPDF = ({ cvData }) => {
  const { personalInfo, education, experience, customSections } = cvData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.fullName || "Your Full Name"}
          </Text>
          {personalInfo.title && (
            <Text style={styles.title}>{personalInfo.title}</Text>
          )}
          <View style={styles.contactRow}>
            {personalInfo.email && (
              <Text style={styles.contactItem}>✉ {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>📱 {personalInfo.phone}</Text>
            )}
            {personalInfo.address && (
              <Text style={styles.contactItem}>📍 {personalInfo.address}</Text>
            )}
          </View>
          {personalInfo.summary && (
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          )}
        </View>

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ""}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                )}
                {exp.achievements &&
                  exp.achievements.map((ach, i) => (
                    <Text key={i} style={styles.achievement}>
                      • {ach}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ""}
                  </Text>
                </View>
                {edu.gpa && (
                  <Text style={styles.itemDescription}>GPA: {edu.gpa}</Text>
                )}
                {edu.description && (
                  <Text style={styles.itemDescription}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections &&
          customSections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.name}</Text>
              {section.items &&
                section.items.map((item, i) => (
                  <View key={i} style={styles.item}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle && (
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    )}
                    {item.description && (
                      <Text style={styles.itemDescription}>
                        {item.description}
                      </Text>
                    )}
                  </View>
                ))}
            </View>
          ))}
      </Page>
    </Document>
  );
};

export default CVPDF;
