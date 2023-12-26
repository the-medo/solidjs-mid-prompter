import { createContext, createUniqueId, ParentComponent, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import responses from '../components/common/Responses/Responses';

export type AIResponseMessage = {
  id: string;
  message: string;
  copied: boolean;
};

type AIStateContextValues = {
  responses: AIResponseMessage[];
  prompt: string;
};

type AIDispatchContextValues = {
  setPrompt: (s: string) => void;
  addResponse: (s: Omit<AIResponseMessage, 'id'>) => void;
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

  const addResponse = (response: Omit<AIResponseMessage, 'id'>) => {
    setStore(
      'responses',
      produce((r) => {
        r.push({ ...response, id: createUniqueId() });
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
      <AIDispatchContext.Provider value={{ setPrompt, addResponse, removeResponse, copyResponse }}>
        {props.children}
      </AIDispatchContext.Provider>
    </AIStateContext.Provider>
  );
};

export const useAIState = () => useContext(AIStateContext)!;
export const useAIDispatch = () => useContext(AIDispatchContext)!;

export default AIProvider;
