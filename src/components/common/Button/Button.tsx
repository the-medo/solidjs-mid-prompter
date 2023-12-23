import {JSX, ParentComponent} from 'solid-js';


interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>  {
  color: 'red' | 'dark-purple'
  width: 'full' | 'icon'
}

const BUTTON_COLORS: Record<ButtonProps['color'], string> = {
  red: 'bg-red-600',
  ['dark-purple']: 'bg-dark-purple',
};

const BUTTON_WIDTH: Record<ButtonProps['width'], string> = {
  full: 'w-full',
  icon: 'w-12',
};


const Button: ParentComponent<ButtonProps> = ({ children, color = "dark-purple", width="full", ...props }) => {

  const variantClassList = `${BUTTON_COLORS[color]} ${BUTTON_WIDTH[width]} `

  return (
    <button class={`${variantClassList} text-white p-2 px-4 rounded-md opacity-100`} {...props}>{children}</button>
  );
};

export default Button;
