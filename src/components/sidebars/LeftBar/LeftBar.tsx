import { ParentComponent } from 'solid-js';
import styles from './LeftBar.module.css';
import Button from '../../common/Button/Button';
import SectionStyles from './Sections/SectionStyles';
import SectionRatios from './Sections/SectionRatios';
import SectionTemplate from './Sections/SectionTemplate';
import SectionPrompt from './Sections/SectionPrompt';

const LeftBar: ParentComponent = ({ children }) => {
  return (
    <div
      class={`${styles['left-bar']} fixed flex flex-col justify-between bottom-0 left-0 w-96 bg-white text-dark-purple m-4 p-4 rounded-md overflow-y-auto`}
    >
      <SectionPrompt />
      <SectionTemplate />
      <SectionStyles />
      <SectionRatios />
      <Button>
        <h2 class="text-3xl">Run</h2>
      </Button>
    </div>
  );
};

export default LeftBar;
