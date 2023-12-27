import { Component } from 'solid-js';
import { AI, useAIDispatch, useAIState } from '../../../context/ai';
import Button from '../Button/Button';
import { useApiKeysState } from '../../../context/apiKeys';

const PromptArea: Component = () => {
  const store = useApiKeysState();
  const { prompt } = useAIState();
  const { setPrompt } = useAIDispatch();

  return (
    <div
      class={`flex flex-col bg-opacity-60 justify-between w-full bg-white text-dark-purple p-4 rounded-md gap-4`}
    >
      <h2 class="text-2xl">Prompt</h2>
      <div class="flex flex-row gap-4">
        <textarea
          onInput={(e) => setPrompt(e.target.value)}
          value={prompt}
          class="w-full rounded-lg opacity-60"
        />

        <div class="w-80">
          <Button dsb={() => !store.activeApiKey} clr={() => 'dark-purple'} w="full">
            <h2 class="text-3xl">Run</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptArea;
