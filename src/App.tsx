import type { Component } from 'solid-js';

import MainLayout from "./components/layouts/MainLayout";
import Responses from "./screens/Responses";

const App: Component = () => {

  return (
    <MainLayout>
      <Responses />
    </MainLayout>
  );
};

export default App;
