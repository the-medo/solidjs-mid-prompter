import { Component, For } from 'solid-js';
import { useStoreDispatch, useStoreState } from '../../../context/store';
import Response from '../Response/Response';

const Responses: Component = () => {
  const { responses } = useStoreState();
  const { copyResponse } = useStoreDispatch();

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
