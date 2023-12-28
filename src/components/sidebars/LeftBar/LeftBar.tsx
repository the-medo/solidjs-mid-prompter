import { createSignal, ParentComponent } from 'solid-js';
import styles from './LeftBar.module.css';
import Button from '../../common/Button/Button';
import ButtonSection from './Sections/ButtonSection';
import { ImKey } from 'solid-icons/im';
import Section from './Sections/Section';
import { Store } from '../../../context/store';
import { useLocalStoreDispatch, useLocalStoreState } from '../../../context/localStore';
import { SectionType } from '../../../utils/sections';

enum LeftBarPage {
  SECTIONS,
  API_KEYS,
}

const LeftBar: ParentComponent = ({ children }) => {
  const store = useLocalStoreState();
  const { setApiKey } = useLocalStoreDispatch();
  const [page, setPage] = createSignal(LeftBarPage.SECTIONS);

  const handleInput = (e: { currentTarget: { value: string } }) => {
    const { value } = e.currentTarget;
    setApiKey(Store.MISTRAL, value);
  };

  const keyIconButtonColor = () => () => !store.activeApiKey ? 'red' : 'dark-purple';

  return (
    <div
      class={`${styles['left-bar']} flex flex-col justify-between w-96 bg-white text-dark-purple m-4 p-4 rounded-md overflow-y-auto`}
    >
      {page() === LeftBarPage.SECTIONS && (
        <>
          <ButtonSection section={SectionType.TEMPLATE} />
          <ButtonSection section={SectionType.MEDIUM} />
          <ButtonSection section={SectionType.RATIO} />
        </>
      )}
      {page() === LeftBarPage.API_KEYS && (
        <>
          <Section title={'Mistral API Key'}>
            <input
              onInput={handleInput}
              value={store.apiKeys[Store.MISTRAL]}
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
