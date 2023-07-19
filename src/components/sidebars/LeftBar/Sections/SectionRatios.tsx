import { Component, JSX } from 'solid-js';
import Section from './Section';
import TagButton from '../../../common/TagButton/TagButton';

const tagButtons = ['1:1', '3:2', '2:3'];

const SectionRatios: Component = () => {
  return (
    <Section title={'Ratios'}>
      {tagButtons.map((i) => (
        <TagButton isActive={false}>{i}</TagButton>
      ))}
    </Section>
  );
};

export default SectionRatios;
