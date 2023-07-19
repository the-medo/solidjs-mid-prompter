import { Component, JSX } from 'solid-js';
import Section from './Section';
import TagButton from '../../../common/TagButton/TagButton';

const tagButtons = ['digital art', 'concept art style', 'watercolor painting'];

const SectionStyles: Component = () => {
  return (
    <Section title={'Styles'}>
      {tagButtons.map((i) => (
        <TagButton isActive={false}>{i}</TagButton>
      ))}
    </Section>
  );
};

export default SectionStyles;
