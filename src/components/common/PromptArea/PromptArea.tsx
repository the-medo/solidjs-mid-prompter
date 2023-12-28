import { Component, Show } from 'solid-js';
import { AI, useAIDispatch, useAIState } from '../../../context/ai';
import Button from '../Button/Button';
import { useApiKeysDispatch, useApiKeysState } from '../../../context/apiKeys';
import { AiOutlineLoading } from 'solid-icons/ai';

const PromptArea: Component = () => {
  const store = useApiKeysState();
  const { prompt } = useAIState();
  const { generatePrompts, setGenerating } = useApiKeysDispatch();
  const { setPrompt } = useAIDispatch();

  const generate = () => {
    console.log('Generating... ', prompt);
    generatePrompts(prompt);
  };

  return (
    <>
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
            <Button
              onClick={generate}
              dsb={() => !store.activeApiKey || store.generating}
              clr={() => 'dark-purple'}
              w="full"
            >
              <Show when={store.generating} fallback={null}>
                <div class="rotating">
                  <AiOutlineLoading fill="white" />
                </div>
              </Show>
              <h2 class="text-3xl">Run</h2>
            </Button>
          </div>
        </div>
      </div>

      <Show when={store.generating} fallback={null}>
        <div class="flex flex-row gap-4 opacity-70 justify-center items-center">
          <AiOutlineLoading class="rotating" fill="white" />
          <h2 class="text-white">Generating...</h2>
        </div>
      </Show>
    </>
  );
};

export default PromptArea;
