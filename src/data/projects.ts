import { siteConfig } from "@/config/site";

export type Project = {
  title: string;
  tagline: string;
  points: string[];
  stack: string[];
  link?: { label: string; href: string };
};

export const FOUNDATION_PROJECTS: Project[] = [
  {
    title: "Facial Emotion Recognition",
    tagline: "Real-time emotion detection from video",
    points: [
      "CNN model classifying emotions from live video frames",
      "Frame-by-frame detection and instant classification with OpenCV",
    ],
    stack: ["OpenCV", "Keras", "CNN"],
    link: { label: "View project", href: siteConfig.links.facialEmotion },
  },
  {
    title: "Stock Market Price Prediction",
    tagline: "Time-series forecasting on market data",
    points: [
      "Predictive modeling on historical market data",
      "EDA and feature engineering with pandas, scikit-learn, yFinance",
    ],
    stack: ["Pandas", "scikit-learn", "yFinance"],
    link: { label: "View notebook", href: siteConfig.links.stockPrediction },
  },
];

export const AGENTS = [
  {
    name: "Plan agent",
    role: "Builds the financial plan",
    detail: "Turns a user's data into a structured, grounded financial plan.",
  },
  {
    name: "Invest agent",
    role: "Recommends investments",
    detail: "Generates investment guidance with deterministic simulations.",
  },
  {
    name: "Goal agent",
    role: "Tracks and optimizes goals",
    detail: "Monitors goals and runs optimization logic over time.",
  },
];

export const VAULTAI_STACK = [
  { layer: "Frontend", value: "Next.js" },
  { layer: "Backend", value: "FastAPI" },
  { layer: "Database", value: "PostgreSQL" },
  { layer: "Vector DB", value: "Qdrant" },
  { layer: "Embeddings", value: "Sentence Transformers" },
  { layer: "LLM", value: "Groq" },
  { layer: "Agents", value: "LangGraph" },
  { layer: "Deploy", value: "Vercel · Hugging Face" },
];
