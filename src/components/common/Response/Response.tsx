import { Component } from 'solid-js';
import { AIResponseMessage, useAIDispatch } from '../../../context/ai';
import { BiRegularCopy } from 'solid-icons/bi';

interface Props extends AIResponseMessage {
  onCopy: () => void;
}

const Response: Component<Props> = (props) => {
  const onCopy = () => {
    props.onCopy();
    navigator.clipboard.writeText(props.message);
  };

  return (
    <div
      class="bg-white p-4 rounded-md flex flex-row items-center"
      classList={{
        'bg-opacity-30': props.copied,
        'bg-opacity-60': !props.copied,
      }}
    >
      <button
        onClick={onCopy}
        class="p-2 bg-dark-purple fill-white rounded-full hover:bg-opacity-80 mr-4"
      >
        <BiRegularCopy />
      </button>
      {props.message}
    </div>
  );
};

export default Response;
