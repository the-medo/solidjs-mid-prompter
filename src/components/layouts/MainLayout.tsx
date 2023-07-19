import { ParentComponent } from 'solid-js';
import Header from "../sidebars/Header/Header";
import LeftBar from "../sidebars/LeftBar/LeftBar";

const MainLayout: ParentComponent = ({ children }) => {
  return (
    <div class="w-full">
      <LeftBar />
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
