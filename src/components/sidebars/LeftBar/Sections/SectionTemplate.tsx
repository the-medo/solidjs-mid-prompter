import { Component, For, JSX } from 'solid-js';
import Section from './Section';
import TagButton from '../../../common/TagButton/TagButton';
import { useAppState } from '../../../../store/store';

const { appState, setAppState } = useAppState();

const tagButtons = [
  '(art medium)',
  '(artistic style)',
  "(image we're prompting)",
  '(5 descriptive keywords)',
  '(color palette)',
  '(lighting conditions)',
  '(perspective/viewpoint)',
  '(camera type)',
  '(camera lens type)',
  '(time of day)',
  '(style of photograph)',
  '(type of film)',
];

const SectionTemplate: Component = () => {
  return (
    <Section title={'Template'}>
      <For each={appState.templateOptions}>
        {(tplOption) => (
          <TagButton
            onClick={() => {
              console.log('Wanna edit: ', 'template', tplOption, true);
              setAppState('template', tplOption, true);
            }}
            isActive={appState.template[tplOption]}
          >
            ({tplOption})
          </TagButton>
        )}
      </For>
    </Section>
  );
};

export default SectionTemplate;
