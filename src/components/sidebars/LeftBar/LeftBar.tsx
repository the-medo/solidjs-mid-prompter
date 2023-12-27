import { createSignal, ParentComponent } from 'solid-js';
import styles from './LeftBar.module.css';
import Button from '../../common/Button/Button';
import ButtonSection from './Sections/ButtonSection';
import { BSection } from '../../../store/store';
import { ImKey } from 'solid-icons/im';
import Section from './Sections/Section';
import { AI } from '../../../context/ai';
import { useApiKeysDispatch, useApiKeysState } from '../../../context/apiKeys';

enum LeftBarPage {
  SECTIONS,
  API_KEYS,
}

const LeftBar: ParentComponent = ({ children }) => {
  const store = useApiKeysState();
  const { setApiKey } = useApiKeysDispatch();
  const [page, setPage] = createSignal(LeftBarPage.SECTIONS);

  const handleInput = (e: { currentTarget: { value: string } }) => {
    const { value } = e.currentTarget;
    setApiKey(AI.MISTRAL, value);
  };

  const keyIconButtonColor = () => () => !store.activeApiKey ? 'red' : 'dark-purple';

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
              value={store.apiKeys[AI.MISTRAL]}
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
          w="full"
        >
          <span>
            <ImKey fill="white" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default LeftBar;
