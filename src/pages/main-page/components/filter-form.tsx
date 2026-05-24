import { GENRE, LEVEL } from '../../../const';
import { getCurrentType, getCurrentLevel } from '../../../store/data-process/data-process.selectors';
import { changeType, changeLevel } from '../../../store/data-process/data-process';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type TFilter = {
  title: string;
  description: string;
  icon?: string;
};

// Базовые пропсы для интерактивности
type TBaseFilterProps = {
  title: string;
  description: string;
  activeValue: string;
  onChange: (value: string) => void;
};

type GenreItemProps = TBaseFilterProps & {
  icon?: string;
};

type LevelItemProps = TBaseFilterProps;

// Компонент Жанра (Тематики)
const GenreItem = ({ title, description, icon, activeValue, onChange }: GenreItemProps) => (
  <li className="filter__item">
    <input
      type="radio"
      name="type"
      id={title}
      checked={activeValue === title} // Контролируемое состояние
      onChange={() => onChange(title)} // Отправка экшена при изменении
    />
    <label className="filter__label" htmlFor={title}>
      <svg className="filter__icon" width="26" height="30" aria-hidden="true">
        <use xlinkHref={icon}/>
      </svg>
      <span className="filter__label-text">{description}</span>
    </label>
  </li>
);

// Компонент Сложности
const LevelItem = ({ title, description, activeValue, onChange }: LevelItemProps) => (
  <li className="filter__item">
    <input
      type="radio"
      name="level"
      id={title}
      checked={activeValue === title} // Контролируемое состояние
      onChange={() => onChange(title)} // Отправка экшена при изменении
    />
    <label className="filter__label" htmlFor={title}>
      <span className="filter__label-text">{description}</span>
    </label>
  </li>
);

const FilterForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  // Получаем текущие активные фильтры из Redux
  const currentType = useAppSelector(getCurrentType);
  const currentLevel = useAppSelector(getCurrentLevel);

  // Колбэки для диспетчеризации экшенов
  const handleTypeChange = (type: string) => {
    dispatch(changeType(type));
  };

  const handleLevelChange = (level: string) => {
    dispatch(changeLevel(level));
  };

  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {GENRE.map((item: TFilter) => (
            <GenreItem
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              activeValue={currentType} // Передаем активный тип из Redux
              onChange={handleTypeChange} // Передаем функцию изменения
            />
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {LEVEL.map((item: TFilter) => (
            <LevelItem
              key={item.title}
              title={item.title}
              description={item.description}
              activeValue={currentLevel} // Передаем активную сложность из Redux
              onChange={handleLevelChange} // Передаем функцию изменения
            />
          ))}
        </ul>
      </fieldset>
    </form>
  );
};

export default FilterForm;
