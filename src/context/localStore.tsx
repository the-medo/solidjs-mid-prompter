import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { ApiKeys, createLocalStore } from '../utils/utils';
import { Store, useStoreDispatch } from './store';
import { createPromptForAI } from '../utils/aiUtils';
import { MistralClient } from '@external/mistralai';

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
  const { addResponse, setGenerating } = useStoreDispatch();
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

    const client = new MistralClient(store.activeApiKey);

    try {
      const chatStreamResponse = await client.chatStream({
        model: 'mistral-tiny',
        messages: [{ role: 'user', content: createPromptForAI(userPrompt) }],
      });
      let textToProcess = '';

      for await (const chunk of chatStreamResponse) {
        console.log('CHUNK: ', chunk);
        if (chunk.choices[0].delta.content !== undefined) {
          let streamText = chunk.choices[0].delta.content;
          console.log('STREAM TEXT: ', streamText);

          textToProcess += streamText;
          const split = textToProcess.split('\n');
          if (split.length > 1) {
            split.forEach((r, i) => {
              if (i < split.length - 1) {
                if (r !== '') {
                  console.log('NEW RESPONSE: ', r);
                  addResponse(r);
                }
              } else {
                textToProcess = r;
              }
            });
          }
        }
      }

      if (textToProcess.length > 0) {
        addResponse(textToProcess);
      }
    } catch (e) {
      console.error(e);
    }
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
