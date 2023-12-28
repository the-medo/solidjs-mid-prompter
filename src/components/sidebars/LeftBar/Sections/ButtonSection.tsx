import { Component, For, JSX } from 'solid-js';
import Section from './Section';
import TagButton from '../../../common/TagButton/TagButton';
import { SectionType, sectionTitles } from '../../../../utils/sections';
import { useStoreDispatch, useStoreState } from '../../../../context/store';

interface ButtonSectionProps {
  section: SectionType;
}

const ButtonSection: Component<ButtonSectionProps> = (props) => {
  const store = useStoreState();
  const dispatch = useStoreDispatch();

  return (
    <Section title={sectionTitles[props.section]}>
      <For each={Object.keys(store.options[props.section])}>
        {(optionTitle) => (
          <TagButton
            onClick={() => dispatch.setOption(props.section, optionTitle)}
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
