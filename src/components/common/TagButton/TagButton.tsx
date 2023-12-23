import { Component, JSX, createEffect, createSignal } from 'solid-js';
import {BSection, useAppState} from "../../../store/store";

interface TagButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | JSX.Element[];
  section: BSection;
  option: string;
}

const TagButton: Component<TagButtonProps> = ({ children, ...props }) => {
  const { appState } = useAppState();

  const [isActive, setIsActive] = createSignal(appState.options[props.section][props.option]);

  const activeClasses = 'bg-dark-purple text-white';
  const inactiveClasses = 'bg-white border-1 border-dark-purple text-dark-purple opacity-50';
  const baseClasses = 'text-sm p-1 rounded-md transition-opacity duration-200 hover:opacity-80';

  const [allClasses, setAllClasses ] = createSignal(`${baseClasses} ${isActive() ? activeClasses : inactiveClasses}`);

  createEffect(() => {
    const a = appState.options[props.section][props.option]
    setIsActive(a)
    setAllClasses(`${baseClasses} ${a ? activeClasses : inactiveClasses}`)
  });


  return (
    <button class={`${allClasses()}`} {...props}>
      {children}
    </button>
  );
};

export default TagButton;