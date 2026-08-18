import { footballImage, basketballImage, trainingImage } from "../assets";

const journalData = [
  {
    id: 1,
    category: "Training",
    title: "The 20-minute strength block that changed our off-season",
    description:
      "A minimalist protocol built for durability, not vanity. Bring one kettlebell.",
    image: trainingImage,
    readTime: "6 min read",
    date: "July 18, 2026",
  },

  {
    id: 2,
    category: "Culture",
    title: "Court craft: five players redefining street basketball",
    description:
      "From Manila to Marseille — the courts, crews and creators shaping the game.",
    image: basketballImage,
    readTime: "10 min read",
    date: "July 14, 2026",
  },

  {
    id: 3,
    category: "Football",
    title: "Why elite footballers train without the ball",
    description:
      "Movement, positioning and decision-making drills that build smarter players before kickoff.",
    image: footballImage,
    readTime: "8 min read",
    date: "July 10, 2026",
  },
];

export default journalData;
