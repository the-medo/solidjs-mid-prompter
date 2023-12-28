import { Component, JSX, createEffect, createSignal } from 'solid-js';
import { SectionType } from '../../../utils/sections';
import { useStoreState } from '../../../context/store';

interface TagButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | JSX.Element[];
  section: SectionType;
  option: string;
}

const TagButton: Component<TagButtonProps> = ({ children, ...props }) => {
  const store = useStoreState();

  const [isActive, setIsActive] = createSignal(store.options[props.section][props.option]);

  const activeClasses = 'bg-dark-purple text-white';
  const inactiveClasses = 'bg-white text-dark-purple opacity-50';
  const baseClasses =
    'text-sm p-1 border-1 border-dark-purple rounded-md transition-opacity duration-200 hover:opacity-80';

  const [allClasses, setAllClasses] = createSignal(
    `${baseClasses} ${isActive() ? activeClasses : inactiveClasses}`,
  );

  createEffect(() => {
    const a = store.options[props.section][props.option];
    setIsActive(a);
    setAllClasses(`${baseClasses} ${a ? activeClasses : inactiveClasses}`);
  });

  return (
    <button class={`${allClasses()}`} {...props}>
      {children}
    </button>
  );
};

export default TagButton;
