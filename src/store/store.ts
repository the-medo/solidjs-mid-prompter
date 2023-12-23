import { createStore } from 'solid-js/store';


export enum BSection {
  TEMPLATE,
  MEDIUM,
  RATIO,
}

export const sectionTitles: Record<BSection, string> = {
  [BSection.TEMPLATE]: "Template",
  [BSection.MEDIUM]: "Medium",
  [BSection.RATIO]: "Ratio",
};

const optionTitles: Record<BSection, string[]> = {
  [BSection.TEMPLATE]: [
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
  [BSection.MEDIUM]: ['digital art', 'concept art', 'watercolor painting'],
  [BSection.RATIO]: ['1:1', '3:2', '2:3', '16:9', '5:1']
}

export type Options = Record<string, boolean | undefined>

const stringsToOptions = (s: string[]): Options => s.reduce((a, b) => {
  a[b] = false;
  return a;
}, {} as Options);


type AppState = {
  prompt: string;
  options: Record<BSection, Options>;
};

const [appState, setAppState] = createStore<AppState>({
  prompt: '',
  options: {
    [BSection.TEMPLATE]: stringsToOptions(optionTitles[BSection.TEMPLATE]),
    [BSection.MEDIUM]: stringsToOptions(optionTitles[BSection.MEDIUM]),
    [BSection.RATIO]: stringsToOptions(optionTitles[BSection.RATIO]),
  },
});

export const useAppState = () => ({ appState, setAppState });
