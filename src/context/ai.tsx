import { createContext, createUniqueId, ParentComponent, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

export type AIResponseMessage = {
  id: string;
  message: string;
  copied: boolean;
};

export enum AI {
  OPEN_AI,
  MISTRAL,
  BARD,
}

type AIStateContextValues = {
  responses: AIResponseMessage[];
  prompt: string;
};

type AIDispatchContextValues = {
  setPrompt: (s: string) => void;
  setResponses: (responses: string[]) => void;
  removeResponse: (id: string) => () => void;
  copyResponse: (id: string) => void;
};

const AIStateContext = createContext<AIStateContextValues>();
const AIDispatchContext = createContext<AIDispatchContextValues>();

const initialState = (): AIStateContextValues => ({
  responses: [
    {
      id: '1',
      message: 'This is the first generated prompt, not used',
      copied: false,
    },
    {
      id: '2',
      message: 'This is the second generated prompt, used!',
      copied: true,
    },
  ],
  prompt: '',
});

const AIProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<AIStateContextValues>(initialState());

  const setPrompt = (s: string) => {
    setStore('prompt', s);
  };

  const setResponses = (responses: string[]) => {
    setStore(
      'responses',
      produce((r) => {
        r.splice(0, r.length);
        responses.forEach((res) =>
          r.push({
            id: createUniqueId(),
            copied: false,
            message: res,
          }),
        );
      }),
    );
  };

  const removeResponse = (id: string) => () => {
    setStore(
      'responses',
      produce((r) => {
        const index = r.findIndex((sb) => sb.id === id);
        if (index > -1) {
          r.splice(index, 1);
        }
      }),
    );
  };

  const copyResponse = (id: string) => {
    const index = store.responses.findIndex((sb) => sb.id === id);
    console.log('Index found: ', index);
    setStore('responses', index, 'copied', true);
  };

  return (
    <AIStateContext.Provider value={store}>
      <AIDispatchContext.Provider value={{ setPrompt, setResponses, removeResponse, copyResponse }}>
        {props.children}
      </AIDispatchContext.Provider>
    </AIStateContext.Provider>
  );
};

export const useAIState = () => useContext(AIStateContext)!;
export const useAIDispatch = () => useContext(AIDispatchContext)!;

export default AIProvider;
