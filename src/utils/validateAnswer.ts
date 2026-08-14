import type { AnswerValidator } from "@/data/gameScenes";

interface ValidateAnswerParams {
  value: string;
  /** Defaults to "exact". */
  validator?: AnswerValidator;
  correctAnswer?: string;
  /** Used when `validator: "multiple"`. */
  acceptedAnswers?: string[];
}

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

/**
 * Answer-checking for four-digit/number-input scenes, kept out of
 * GameFlow.tsx so the branching logic there stays short.
 *
 * - "exact" (default): trimmed, case-insensitive equality with `correctAnswer`.
 * - "contains": the submitted value contains `correctAnswer` as a substring.
 * - "multiple": the submitted value matches any one of `acceptedAnswers`.
 *
 * If a scene defines neither `correctAnswer` nor `acceptedAnswers`, there's
 * nothing to check against — any submission is treated as correct (this
 * matches every existing four-digit scene's prior behavior).
 */
export function validateAnswer({
  value,
  validator = "exact",
  correctAnswer,
  acceptedAnswers,
}: ValidateAnswerParams): boolean {
  if (!correctAnswer && (!acceptedAnswers || acceptedAnswers.length === 0)) {
    return true;
  }

  const normalizedValue = normalize(value);

  switch (validator) {
    case "contains":
      return !!correctAnswer && normalizedValue.includes(normalize(correctAnswer));
    case "multiple":
      return (acceptedAnswers ?? []).some((answer) => normalize(answer) === normalizedValue);
    case "exact":
    default:
      return !!correctAnswer && normalizedValue === normalize(correctAnswer);
  }
}
