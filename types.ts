export enum AppState {
  WELCOME,
  QUIZ,
  RESULT
}

export enum Dimension {
  EI = 'EI', // Extraversion vs Introversion
  SN = 'SN', // Sensing vs Intuition
  TF = 'TF', // Thinking vs Feeling
  JP = 'JP'  // Judging vs Perceiving
}

export enum DimensionValue {
  E = 'E',
  I = 'I',
  S = 'S',
  N = 'N',
  T = 'T',
  F = 'F',
  J = 'J',
  P = 'P'
}

export interface Option {
  text: string;
  value: DimensionValue;
}

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  options: [Option, Option]; // Binary choice
}

export interface MBTIResult {
  type: string;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

export interface AIAnalysis {
  title: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  careerPath: string;
  spiritAnimal: string;
}
