export type SkillGroup = {
  title: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "SQL", "TypeScript", "Next.js", "Linux"],
  },
  {
    title: "ML & statistics",
    items: [
      "EDA",
      "Feature engineering",
      "Regression",
      "Classification",
      "Clustering",
      "Model evaluation",
      "Model deployment",
    ],
  },
  {
    title: "ML / GenAI systems",
    items: [
      "ML",
      "DL",
      "CV",
      "NLP",
      "Generative AI",
      "Agentic AI",
      "RAG",
      "LLM integration",
      "Prompt engineering",
      "Vector search",
      "Confidence scoring",
      "Guardrails",
    ],
  },
  {
    title: "Backend & APIs",
    items: ["FastAPI", "Pydantic", "JWT auth", "Async programming"],
  },
  {
    title: "Infra & MLOps",
    items: [
      "Docker",
      "Alembic",
      "Git",
      "CI/CD",
      "Vercel",
      "Hugging Face",
      "MLflow",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    title: "Data engineering",
    items: ["Apache Airflow", "ETL pipelines", "Iceberg tables", "Trino"],
  },
  {
    title: "Frameworks & libraries",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "LangChain",
      "LangGraph",
      "Ollama",
    ],
  },
  {
    title: "Cloud",
    items: ["AWS (EC2, S3)", "GCP", "Azure"],
  },
];
