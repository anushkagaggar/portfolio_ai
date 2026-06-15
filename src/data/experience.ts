export type Role = {
  title: string;
  org: string;
  period: string;
  location: string;
  points: string[];
};

export const EXPERIENCE: Role[] = [
  {
    title: "Data Engineer Intern",
    org: "Drona Pay",
    period: "Aug 2025 – Jan 2026",
    location: "Remote",
    points: [
      "Built dynamic Airflow DAGs for multi-tenant ETL on Iceberg tables",
      "Optimized Trino queries with partition- and bucket-aware strategies",
      "Automated snapshot and orphan-file cleanup, cutting storage by 50%",
      "Added SQL validations, alerts, and tests for production-ready pipelines",
    ],
  },
  {
    title: "Data Analysis Intern",
    org: "IBM SkillsBuild",
    period: "Jun 2024 – Aug 2024",
    location: "Remote",
    points: [
      "Data cleaning, aggregation, and visualization in Python",
      "Worked with NumPy, pandas, Matplotlib, scikit-learn, yFinance",
    ],
  },
];

export const EDUCATION = {
  degree: "B.Tech, Artificial Intelligence & Machine Learning",
  school: "Government Women Engineering College, Ajmer",
  period: "2021 – 2025",
  grade: "9.3 CGPA",
};
