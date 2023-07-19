import { Component, JSX } from 'solid-js';

interface TagButtonProps {
  isActive?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const TagButton: Component<TagButtonProps> = ({ isActive = false, children }) => {
  const activeClasses = 'bg-dark-purple text-white';
  const inactiveClasses = 'bg-white border-1 border-dark-purple text-dark-purple opacity-50';

  const baseClasses = 'text-sm p-1 rounded-md transition-opacity duration-200 hover:opacity-80';

  const classes = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

  return <button class={classes}>{children}</button>;
  // return <button class={''}>{children}</button>;
};

export default TagButton;
