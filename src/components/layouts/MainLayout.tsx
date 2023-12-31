import { ParentComponent } from 'solid-js';
import Header from '../sidebars/Header/Header';
import LeftBar from '../sidebars/LeftBar/LeftBar';

const MainLayout: ParentComponent = ({ children }) => {
  return (
    <div class="w-full">
      <Header />
      <div class="w-full flex flex-row gap-4 p-4">
        <LeftBar />
        <div class="flex flex-col w-full text-dark-purple m-4 gap-4">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
