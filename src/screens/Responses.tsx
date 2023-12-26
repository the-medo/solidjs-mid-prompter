import {Component, For} from "solid-js";
import {useAIDispatch, useAIState} from "../context/ai";
import Response from "../components/common/Response/Response";


const Responses: Component = () => {
  const { responses } = useAIState();
  const { copyResponse } = useAIDispatch()

  const onCopy = (id: string) => () => {
    copyResponse(id)
  }

  return (
    <div class="w-full text-dark-purple m-4">
      <ul class="flex flex-col space-y-2 gap-4">
        <For each={responses}>
          {(r) => <Response onCopy={onCopy(r.id)} {...r} />}
        </For>
      </ul>
    </div>
  )
}

export default Responses