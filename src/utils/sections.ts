export enum SectionType {
  TEMPLATE,
  MEDIUM,
  RATIO,
}

export const sectionTitles: Record<SectionType, string> = {
  [SectionType.TEMPLATE]: 'Template',
  [SectionType.MEDIUM]: 'Medium',
  [SectionType.RATIO]: 'Ratio',
};

export const optionTitles: Record<SectionType, string[]> = {
  [SectionType.TEMPLATE]: [
    'medium',
    'style',
    'prompting',
    'descriptive keywords',
    'color palette',
    'lighting conditions',
    'perspective/viewpoint',
    'time of day',
    'ratio',
  ],
  [SectionType.MEDIUM]: ['digital art', 'concept art', 'watercolor painting'],
  [SectionType.RATIO]: ['1:1', '3:2', '2:3', '16:9', '5:1'],
};

export type SectionOptions = Record<string, boolean | undefined>;

export const stringsToOptions = (s: string[]): SectionOptions =>
  s.reduce((a, b) => {
    a[b] = false;
    return a;
  }, {} as SectionOptions);
