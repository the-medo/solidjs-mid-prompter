import { createContext, onMount, ParentComponent, Show, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';


type OptionsStateContextValues = {
  chosenOptions: string[];
};

const initialState = () => ({
  chosenOptions: [],
});


const OptionsStateContext = createContext<OptionsStateContextValues>();

const ContextOptionsProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore(initialState());


  return (
    <OptionsStateContext.Provider value={store}>
      {props.children}
    </OptionsStateContext.Provider>
  );
}

export const useOptionsState = () => useContext(OptionsStateContext)

export default ContextOptionsProvider;