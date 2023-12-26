import { createEffect, createMemo, createSignal, ParentComponent } from 'solid-js';
import styles from './LeftBar.module.css';
import Button from '../../common/Button/Button';
import ButtonSection from './Sections/ButtonSection';
import PromptArea from '../../common/PromptArea/PromptArea';
import { AI, BSection } from '../../../store/store';
import { ImKey } from 'solid-icons/im';
import Section from './Sections/Section';
import { ApiKeys, createLocalStore } from '../../../utils/utils';
import { createStore } from 'solid-js/store';

enum LeftBarPage {
  SECTIONS,
  API_KEYS,
}

const LeftBar: ParentComponent = ({ children }) => {
  const [apiKeys, setApiKeys] = createLocalStore<ApiKeys>('apiKeys', {});
  // const [apiKeys, setApiKeys] = createStore<ApiKeys>({});
  const [page, setPage] = createSignal(LeftBarPage.SECTIONS);

  const hasApiKey = () =>
    (apiKeys[AI.MISTRAL] && apiKeys[AI.MISTRAL] !== '') ||
    (apiKeys[AI.BARD] && apiKeys[AI.BARD] !== '') ||
    (apiKeys[AI.OPEN_AI] && apiKeys[AI.OPEN_AI] !== '');

  const handleInput = (e: { currentTarget: { value: string } }) => {
    const { value } = e.currentTarget;
    setApiKeys(AI.MISTRAL, value);
  };

  const keyIconButtonColor = () => () => !hasApiKey() ? 'red' : 'dark-purple';
  let disabled = () => !hasApiKey();

  return (
    <div
      class={`${styles['left-bar']} flex flex-col justify-between w-96 bg-white text-dark-purple m-4 p-4 rounded-md overflow-y-auto`}
    >
      {page() === LeftBarPage.SECTIONS && (
        <>
          <ButtonSection section={BSection.TEMPLATE} />
          <ButtonSection section={BSection.MEDIUM} />
          <ButtonSection section={BSection.RATIO} />
        </>
      )}
      {page() === LeftBarPage.API_KEYS && (
        <>
          <Section title={'Mistral API Key'}>
            <input
              onInput={handleInput}
              value={apiKeys[AI.MISTRAL]}
              class="w-full rounded-lg opacity-70 p-2"
            />
          </Section>
        </>
      )}

      <div class="flex flex-row gap-2">
        <Button
          onClick={() =>
            setPage((p) => {
              return p === LeftBarPage.SECTIONS ? LeftBarPage.API_KEYS : LeftBarPage.SECTIONS;
            })
          }
          clr={keyIconButtonColor()}
          w="icon"
        >
          <ImKey fill="white" />
        </Button>
        <Button dsb={disabled} clr={() => 'dark-purple'} w="full">
          <h2 class="text-3xl">Run</h2>
        </Button>
      </div>
    </div>
  );
};

export default LeftBar;
