import { useAppSelector } from '../../hooks';
import { getFilteredQuests } from '../../store/data-process/data-process.selectors';
import FilterForm from './components/filter-form';
import QuestsCardList from '../../components/quest-card/quest-card-list';

const MainPage = ():JSX.Element => {
  const filteredQuests = useAppSelector(getFilteredQuests);
  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
        </div>
        <div className="page-content__item">
          <FilterForm/>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <QuestsCardList
          quests = {filteredQuests}
        />
      </div>
    </main>
  );
};

export default MainPage;

