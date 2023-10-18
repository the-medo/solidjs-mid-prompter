import { createStore } from 'solid-js/store';

type AppState = {
  prompt: string;
  templateOptions: string[];
  template: Record<string, boolean | undefined>;
  options: Record<string, string[] | undefined>;
};

const [appState, setAppState] = createStore<AppState>({
  prompt: '',
  templateOptions: [
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
  template: {},
  options: {
    medium: ['digital art', 'concept art', 'watercolor painting'],
    ratio: ['1:1', '3:2', '2:3', '16:9', '5:1'],
  },
});

function setTemplateOption(option: string, value: boolean) {
  setAppState('template', option, value);
}

setAppState('template', 'medium', true);

export const useAppState = () => ({ appState, setAppState });
