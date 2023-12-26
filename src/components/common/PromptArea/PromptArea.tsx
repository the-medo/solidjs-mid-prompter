import { Component } from 'solid-js';
import { useAIDispatch, useAIState } from '../../../context/ai';

const PromptArea: Component = () => {
  const { prompt } = useAIState();
  const { setPrompt } = useAIDispatch();

  return (
    <div
      class={`flex flex-col bg-opacity-60 justify-between w-full bg-white text-dark-purple p-4 rounded-md`}
    >
      <h2 class="text-2xl">Prompt</h2>
      <textarea
        onInput={(e) => setPrompt(e.target.value)}
        value={prompt}
        class="w-full rounded-lg opacity-60"
      />
    </div>
  );
};

export default PromptArea;
