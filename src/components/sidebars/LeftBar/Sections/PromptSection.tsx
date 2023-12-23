import { Component, JSX } from 'solid-js';
import Section from './Section';

const PromptSection: Component = () => {
  return (
    <Section title={'Prompt'}>
      <textarea class="w-full rounded-lg opacity-70" />
    </Section>
  );
};

export default PromptSection;
