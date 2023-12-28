import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { ApiKeys, createLocalStore } from '../utils/utils';
import { AI, useAIDispatch } from './ai';
import { createPromptForAI } from '../utils/aiUtils';
import axios from 'axios';
import { ChatCompletionResponse } from '../../mistralai';

type ApiKeysStateContextValues = {
  apiKeys: ApiKeys;
  activeApiKey: string;
  ai: AI;
  generating: boolean;
};

type ApiKeysDispatchContextValues = {
  setApiKey: (ai: AI, s: string) => void;
  setAI: (ai: AI) => void;
  setGenerating: (a: boolean) => void;
  generatePrompts: (userPrompt: string) => void;
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
  generating: false,
});

const ApiKeysProvider: ParentComponent = (props) => {
  const { setResponses } = useAIDispatch();
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

  const setGenerating = (generating: boolean) => {
    setStore('generating', generating);
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
    <ApiKeysStateContext.Provider value={store}>
      <ApiKeysDispatchContext.Provider value={{ setApiKey, setAI, generatePrompts, setGenerating }}>
        {props.children}
      </ApiKeysDispatchContext.Provider>
    </ApiKeysStateContext.Provider>
  );
};

export const useApiKeysState = () => useContext(ApiKeysStateContext)!;
export const useApiKeysDispatch = () => useContext(ApiKeysDispatchContext)!;

export default ApiKeysProvider;
