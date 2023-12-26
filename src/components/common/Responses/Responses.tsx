import { Component, For } from 'solid-js';
import { useAIDispatch, useAIState } from '../../../context/ai';
import Response from '../Response/Response';

const Responses: Component = () => {
  const { responses } = useAIState();
  const { copyResponse } = useAIDispatch();

  const onCopy = (id: string) => () => {
    copyResponse(id);
  };

  return (
    <ul class="flex flex-col gap-4">
      <For each={responses}>{(r) => <Response onCopy={onCopy(r.id)} {...r} />}</For>
    </ul>
  );
};

export default Responses;
