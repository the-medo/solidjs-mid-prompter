import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { ApiKeys, createLocalStore } from '../utils/utils';
import { AI } from './ai';
import { createStore } from 'solid-js/store';

type ApiKeysStateContextValues = {
  apiKeys: ApiKeys;
  activeApiKey: string;
  ai: AI;
};

type ApiKeysDispatchContextValues = {
  setApiKey: (ai: AI, s: string) => void;
  setAI: (ai: AI) => void;
};

const ApiKeysStateContext = createContext<ApiKeysStateContextValues>();
const ApiKeysDispatchContext = createContext<ApiKeysDispatchContextValues>();

const initialState = (): ApiKeysStateContextValues => ({
  apiKeys: {
    [AI.BARD]: '',
    [AI.MISTRAL]: '',
    [AI.OPEN_AI]: '',
  },
  activeApiKey: '',
  ai: AI.MISTRAL,
});

const ApiKeysProvider: ParentComponent = (props) => {
  const [store, setStore] = createLocalStore<ApiKeysStateContextValues>(
    'apiKeysStore',
    initialState(),
  );

  const setApiKey = (ai: AI, s: string) => {
    setStore('apiKeys', ai, s);
  };

  createEffect(() => {
    setStore('activeApiKey', store.apiKeys[store.ai]);
  });

  const setAI = (ai: AI) => {
    setStore('ai', ai);
  };

  return (
    <ApiKeysStateContext.Provider value={store}>
      <ApiKeysDispatchContext.Provider value={{ setApiKey, setAI }}>
        {props.children}
      </ApiKeysDispatchContext.Provider>
    </ApiKeysStateContext.Provider>
  );
};

export const useApiKeysState = () => useContext(ApiKeysStateContext)!;
export const useApiKeysDispatch = () => useContext(ApiKeysDispatchContext)!;

export default ApiKeysProvider;
