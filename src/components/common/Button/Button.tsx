import { ParentComponent } from 'solid-js';

const Button: ParentComponent = ({ children }) => {
  return (
    <button class=" bg-dark-purple w-full text-white p-2 rounded-md opacity-100">{children}</button>
  );
};

export default Button;
