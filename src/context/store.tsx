import { createContext, createUniqueId, ParentComponent, useContext } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { optionTitles, SectionOptions, SectionType, stringsToOptions } from '../utils/sections';

export type AIResponseMessage = {
  id: string;
  message: string;
  copied: boolean;
};

export enum Store {
  OPEN_AI,
  MISTRAL,
  BARD,
}

type StoreStateContextValues = {
  responses: AIResponseMessage[];
  prompt: string;
  generating: boolean;
  options: Record<SectionType, SectionOptions>;
};

type StoreDispatchContextValues = {
  setPrompt: (s: string) => void;
  addResponse: (response: string) => void;
  setResponses: (responses: string[]) => void;
  setGenerating: (a: boolean) => void;
  setOption: (section: SectionType, optionTitle: string) => void;
  removeResponse: (id: string) => () => void;
  copyResponse: (id: string) => void;
};

const StoreStateContext = createContext<StoreStateContextValues>();
const StoreDispatchContext = createContext<StoreDispatchContextValues>();

const initialState = (): StoreStateContextValues => ({
  responses: [],
  prompt: '',
  generating: false,
  options: {
    [SectionType.TEMPLATE]: stringsToOptions(optionTitles[SectionType.TEMPLATE]),
    [SectionType.MEDIUM]: stringsToOptions(optionTitles[SectionType.MEDIUM]),
    [SectionType.RATIO]: stringsToOptions(optionTitles[SectionType.RATIO]),
  },
});

const StoreProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<StoreStateContextValues>(initialState());

  const setPrompt = (s: string) => {
    setStore('prompt', s);
  };

  const addResponse = (response: string) => {
    setStore(
      'responses',
      produce((r) => {
        r.push({
          id: createUniqueId(),
          copied: false,
          message: response,
        });
      }),
    );
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

  const setOption = (section: SectionType, optionTitle: string) => {
    setStore('options', section, optionTitle, (prev) => !prev);
  };

  const setGenerating = (generating: boolean) => {
    setStore('generating', generating);
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
    <StoreStateContext.Provider value={store}>
      <StoreDispatchContext.Provider
        value={{
          setPrompt,
          addResponse,
          setResponses,
          setGenerating,
          setOption,
          removeResponse,
          copyResponse,
        }}
      >
        {props.children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

export const useStoreState = () => useContext(StoreStateContext)!;
export const useStoreDispatch = () => useContext(StoreDispatchContext)!;

export default StoreProvider;
