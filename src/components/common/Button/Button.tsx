import { JSX, mergeProps, ParentComponent } from 'solid-js';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  clr: () => 'red' | 'dark-purple';
  dsb?: () => boolean;
  w: 'full' | 'icon';
}

const Button: ParentComponent<ButtonProps> = ({ children, ...initialProps }) => {
  let props = mergeProps(
    {
      clr: () => 'dark-purple',
      w: 'full',
    },
    initialProps,
  );

  return (
    <button
      class={`flex flex-row items-center justify-center text-white text-right p-2 px-4 rounded-md opacity-100 disabled:opacity-50 disabled:cursor-not-allowed`}
      classList={{
        'bg-red-600': props.clr() === 'red',
        'bg-dark-purple': props.clr() === 'dark-purple',
        'w-full': props.w === 'full',
        'w-12': props.w === 'icon',
      }}
      {...props}
      disabled={props.dsb?.() ?? false}
    >
      {children}
    </button>
  );
};

export default Button;
