import type { Component } from 'solid-js';

import MainLayout from './components/layouts/MainLayout';
import Responses from './components/common/Responses/Responses';
import PromptArea from './components/common/PromptArea/PromptArea';

const App: Component = () => {
  return (
    <MainLayout>
      <PromptArea />
      <Responses />
    </MainLayout>
  );
};

export default App;
