import { Component, JSX } from 'solid-js';

interface SectionProps {
  title: string;
  children?: JSX.Element;
}

const Section: Component<SectionProps> = ({ title, children }) => {
  return (
    <div class={`flex flex-col`}>
      <h2 class="text-2xl">{title}</h2>
      <div class="flex flex-row flex-wrap gap-1">{children}</div>
    </div>
  );
};

export default Section;
