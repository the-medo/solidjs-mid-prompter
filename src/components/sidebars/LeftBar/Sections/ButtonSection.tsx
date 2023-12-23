import { Component, For, JSX } from 'solid-js';
import Section from './Section';
import TagButton from '../../../common/TagButton/TagButton';
import {BSection, sectionTitles, useAppState} from '../../../../store/store';

//
// const tagButtons = [
//   '(art medium)',
//   '(artistic style)',
//   "(image we're prompting)",
//   '(5 descriptive keywords)',
//   '(color palette)',
//   '(lighting conditions)',
//   '(perspective/viewpoint)',
//   '(camera type)',
//   '(camera lens type)',
//   '(time of day)',
//   '(style of photograph)',
//   '(type of film)',
// ];

interface ButtonSectionProps {
  section: BSection;
}

const ButtonSection: Component<ButtonSectionProps> = (props) => {

  const { appState, setAppState } = useAppState();

  return (
    <Section title={sectionTitles[props.section]}>
      <For each={Object.keys(appState.options[props.section])}>
        {(optionTitle) => (
          <TagButton
            onClick={() => {
              setAppState('options', props.section, optionTitle, (prev) => !prev);
            }}
            section={props.section}
            option={optionTitle}
          >
            ({optionTitle})
          </TagButton>
        )}
      </For>
    </Section>
  );
};

export default ButtonSection;
