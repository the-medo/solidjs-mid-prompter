import {createSignal, ParentComponent} from 'solid-js';
import styles from './LeftBar.module.css';
import Button from '../../common/Button/Button';
import ButtonSection from './Sections/ButtonSection';
import PromptSection from './Sections/PromptSection';
import {AI, BSection} from "../../../store/store";
import {ImKey} from "solid-icons/im";
import Section from "./Sections/Section";
import {ApiKeys, createLocalStore} from "../../../utils/utils";

enum LeftBarPage {
  SECTIONS,
  API_KEYS,
}

const LeftBar: ParentComponent = ({ children }) => {
  const [apiKeys, setApiKeys] = createLocalStore<ApiKeys>("apiKeys", {});
  const [page, setPage] = createSignal(LeftBarPage.SECTIONS);

  const handleInput = (e: { currentTarget: { value: string; }; }) => {
    const { value } = e.currentTarget;
    setApiKeys((p) => ({...p, [AI.MISTRAL]: value}));
  };


  return (
    <div
      class={`${styles['left-bar']} fixed flex flex-col justify-between bottom-0 left-0 w-96 bg-white text-dark-purple m-4 p-4 rounded-md overflow-y-auto`}
    >
      {page() === LeftBarPage.SECTIONS && (
        <>
          <PromptSection />
          <ButtonSection section={BSection.TEMPLATE} />
          <ButtonSection section={BSection.MEDIUM} />
          <ButtonSection section={BSection.RATIO} />
        </>
      )}
      {page() === LeftBarPage.API_KEYS && (
        <>
          <Section title={'Mistral API Key'}>
            <input onInput={handleInput} value={apiKeys[AI.MISTRAL]} class="w-full rounded-lg opacity-70 p-2" />
          </Section>
        </>
      )}

      <div class="flex flex-row gap-2">
        <Button onClick={() => setPage(p => {
          const value = p === LeftBarPage.SECTIONS ? LeftBarPage.API_KEYS : LeftBarPage.SECTIONS;
          return value;
        })} color="red" width="icon">
          <ImKey fill="white" />
        </Button>
        <Button color="dark-purple" width="full">
          <h2 class="text-3xl">Run</h2>
        </Button>
      </div>
    </div>
  );
};

export default LeftBar;
