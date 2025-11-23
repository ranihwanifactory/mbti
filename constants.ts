import { Question, Dimension, DimensionValue } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "At a social gathering, you tend to...",
    dimension: Dimension.EI,
    options: [
      { text: "Interact with many, including strangers", value: DimensionValue.E },
      { text: "Stick to people you already know", value: DimensionValue.I }
    ]
  },
  {
    id: 2,
    text: "When processing information, you prefer...",
    dimension: Dimension.SN,
    options: [
      { text: "Concrete facts and details", value: DimensionValue.S },
      { text: "Concepts and theories", value: DimensionValue.N }
    ]
  },
  {
    id: 3,
    text: "In decision making, you are more influenced by...",
    dimension: Dimension.TF,
    options: [
      { text: "Logical reasoning and consistency", value: DimensionValue.T },
      { text: "Personal values and how others feel", value: DimensionValue.F }
    ]
  },
  {
    id: 4,
    text: "Your lifestyle is usually...",
    dimension: Dimension.JP,
    options: [
      { text: "Structured and scheduled", value: DimensionValue.J },
      { text: "Flexible and spontaneous", value: DimensionValue.P }
    ]
  },
  {
    id: 5,
    text: "After a long week, you feel recharged by...",
    dimension: Dimension.EI,
    options: [
      { text: "Going out with friends", value: DimensionValue.E },
      { text: "Spending time alone", value: DimensionValue.I }
    ]
  },
  {
    id: 6,
    text: "You are more interested in...",
    dimension: Dimension.SN,
    options: [
      { text: "What is actual and present", value: DimensionValue.S },
      { text: "What is possible and future-oriented", value: DimensionValue.N }
    ]
  },
  {
    id: 7,
    text: "Which is a bigger compliment?",
    dimension: Dimension.TF,
    options: [
      { text: "\"You are a very logical person\"", value: DimensionValue.T },
      { text: "\"You are a very compassionate person\"", value: DimensionValue.F }
    ]
  },
  {
    id: 8,
    text: "You prefer to work...",
    dimension: Dimension.JP,
    options: [
      { text: "With clear deadlines and goals", value: DimensionValue.J },
      { text: "With the flow, adapting as you go", value: DimensionValue.P }
    ]
  },
  {
    id: 9,
    text: "In conversations, you are usually...",
    dimension: Dimension.EI,
    options: [
      { text: "Do more talking than listening", value: DimensionValue.E },
      { text: "Do more listening than talking", value: DimensionValue.I }
    ]
  },
  {
    id: 10,
    text: "You tend to trust...",
    dimension: Dimension.SN,
    options: [
      { text: "Your direct experience", value: DimensionValue.S },
      { text: "Your gut instinct", value: DimensionValue.N }
    ]
  },
  {
    id: 11,
    text: "When helping others, you offer...",
    dimension: Dimension.TF,
    options: [
      { text: "Practical solutions", value: DimensionValue.T },
      { text: "Emotional support", value: DimensionValue.F }
    ]
  },
  {
    id: 12,
    text: "You like to have things...",
    dimension: Dimension.JP,
    options: [
      { text: "Settled and decided", value: DimensionValue.J },
      { text: "Open-ended options", value: DimensionValue.P }
    ]
  }
];