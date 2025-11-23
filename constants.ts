import { Question, Dimension, DimensionValue } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "사교 모임에서 당신은 주로...",
    dimension: Dimension.EI,
    options: [
      { text: "모르는 사람을 포함해 많은 사람들과 어울린다", value: DimensionValue.E },
      { text: "이미 알고 있는 소수의 사람들과 어울린다", value: DimensionValue.I }
    ]
  },
  {
    id: 2,
    text: "정보를 받아들일 때 당신이 선호하는 방식은...",
    dimension: Dimension.SN,
    options: [
      { text: "구체적인 사실과 세부 사항", value: DimensionValue.S },
      { text: "전체적인 개념과 이론", value: DimensionValue.N }
    ]
  },
  {
    id: 3,
    text: "결정을 내릴 때 더 큰 영향을 받는 것은...",
    dimension: Dimension.TF,
    options: [
      { text: "논리적인 추론과 일관성", value: DimensionValue.T },
      { text: "개인적인 가치관과 타인의 감정", value: DimensionValue.F }
    ]
  },
  {
    id: 4,
    text: "평소 당신의 생활 방식은...",
    dimension: Dimension.JP,
    options: [
      { text: "계획적이고 체계적이다", value: DimensionValue.J },
      { text: "유연하고 즉흥적이다", value: DimensionValue.P }
    ]
  },
  {
    id: 5,
    text: "긴 한 주를 보낸 후 에너지를 충전하는 방법은...",
    dimension: Dimension.EI,
    options: [
      { text: "친구들과 만나서 신나게 논다", value: DimensionValue.E },
      { text: "혼자만의 시간을 가지며 쉰다", value: DimensionValue.I }
    ]
  },
  {
    id: 6,
    text: "당신의 주된 관심사는...",
    dimension: Dimension.SN,
    options: [
      { text: "현재의 실제적인 상황과 현실", value: DimensionValue.S },
      { text: "미래의 가능성과 아이디어", value: DimensionValue.N }
    ]
  },
  {
    id: 7,
    text: "당신에게 더 기분 좋은 칭찬은?",
    dimension: Dimension.TF,
    options: [
      { text: "\"당신은 정말 논리적이군요\"", value: DimensionValue.T },
      { text: "\"당신은 정말 마음이 따뜻하군요\"", value: DimensionValue.F }
    ]
  },
  {
    id: 8,
    text: "선호하는 업무 스타일은...",
    dimension: Dimension.JP,
    options: [
      { text: "명확한 마감일과 목표가 있는 것", value: DimensionValue.J },
      { text: "상황에 따라 흐름대로 진행하는 것", value: DimensionValue.P }
    ]
  },
  {
    id: 9,
    text: "대화할 때 당신은...",
    dimension: Dimension.EI,
    options: [
      { text: "듣기보다 말하기를 많이 하는 편이다", value: DimensionValue.E },
      { text: "말하기보다 듣기를 많이 하는 편이다", value: DimensionValue.I }
    ]
  },
  {
    id: 10,
    text: "당신이 더 신뢰하는 것은...",
    dimension: Dimension.SN,
    options: [
      { text: "직접 경험한 확실한 것", value: DimensionValue.S },
      { text: "자신의 직감과 예감", value: DimensionValue.N }
    ]
  },
  {
    id: 11,
    text: "다른 사람을 도울 때 당신의 방식은...",
    dimension: Dimension.TF,
    options: [
      { text: "실질적인 해결책 제시", value: DimensionValue.T },
      { text: "정서적인 지지와 공감", value: DimensionValue.F }
    ]
  },
  {
    id: 12,
    text: "일처리 방식에 있어서...",
    dimension: Dimension.JP,
    options: [
      { text: "확실하게 결정된 것을 좋아한다", value: DimensionValue.J },
      { text: "열린 결말이나 선택지를 남겨두는 것을 좋아한다", value: DimensionValue.P }
    ]
  }
];