import { QuestionnaireStepPlaceholder } from './questionnaire-step-placeholder';

type QuestionnaireStepBenefitProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepBenefit = ({ onContinue }: QuestionnaireStepBenefitProps) => {
  return (
    <QuestionnaireStepPlaceholder
      titleKey="questionnaireSteps.benefit"
      descriptionKey="questionnaireSteps.todoBenefit"
      primaryCtaKey="questionnaireSteps.ctaContinue"
      onPrimaryPress={onContinue}
    />
  );
};
