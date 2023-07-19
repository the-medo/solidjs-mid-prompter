import { Component, JSX } from 'solid-js';
import Section from './Section';
import TagButton from '../../../common/TagButton/TagButton';

const tagButtons = [
  "(image we're prompting)",
  '(5 descriptive keywords)',
  '(art medium)',
  '(artistic style)',
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
      {tagButtons.map((i) => (
        <TagButton isActive={false}>{i}</TagButton>
      ))}
    </Section>
  );
};

export default SectionTemplate;
