import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { ApiKeys, createLocalStore } from '../utils/utils';
import { Store, useStoreDispatch } from './store';
import { createPromptForAI } from '../utils/aiUtils';
import axios from 'axios';
import { ChatCompletionResponse } from '../../mistralai';

type LocalStoreStateContextValues = {
  apiKeys: ApiKeys;
  activeApiKey: string;
  ai: Store;
};

type LocalStoreDispatchContextValues = {
  setApiKey: (ai: Store, s: string) => void;
  setAI: (ai: Store) => void;
  generatePrompts: (userPrompt: string) => void;
};

const LocalStoreStateContext = createContext<LocalStoreStateContextValues>();
const LocalStoreDispatchContext = createContext<LocalStoreDispatchContextValues>();

const initialState = (): LocalStoreStateContextValues => ({
  apiKeys: {
    [Store.BARD]: '',
    [Store.MISTRAL]: '',
    [Store.OPEN_AI]: '',
  },
  activeApiKey: '',
  ai: Store.MISTRAL,
});

const LocalStoreProvider: ParentComponent = (props) => {
  const { setResponses, setGenerating } = useStoreDispatch();
  const [store, setStore] = createLocalStore<LocalStoreStateContextValues>(
    'apiKeysStore',
    initialState(),
  );

  const setApiKey = (ai: Store, s: string) => {
    setStore('apiKeys', ai, s);
  };

  createEffect(() => {
    setStore('activeApiKey', store.apiKeys[store.ai]);
  });

  const setAI = (ai: Store) => {
    setStore('ai', ai);
  };

  const generatePrompts = async (userPrompt: string) => {
    setGenerating(true);

    const config = {
      method: 'post',
      url: 'https://api.mistral.ai/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${store.activeApiKey}`,
      },
      data: {
        model: 'mistral-medium',
        messages: [
          {
            role: 'user',
            content: createPromptForAI(userPrompt),
          },
        ],
      },
    };

    axios<ChatCompletionResponse>(config)
      .then((chatResponse) => {
        console.log('Full response:', chatResponse.data);
        console.log('Chat:', chatResponse.data.choices[0].message.content);
        console.log('Responses:', chatResponse.data.choices[0].message.content.split('\n'));
        setResponses(chatResponse.data.choices[0].message.content.split('\n'));
        setGenerating(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <LocalStoreStateContext.Provider value={store}>
      <LocalStoreDispatchContext.Provider value={{ setApiKey, setAI, generatePrompts }}>
        {props.children}
      </LocalStoreDispatchContext.Provider>
    </LocalStoreStateContext.Provider>
  );
};

export const useLocalStoreState = () => useContext(LocalStoreStateContext)!;
export const useLocalStoreDispatch = () => useContext(LocalStoreDispatchContext)!;

export default LocalStoreProvider;
