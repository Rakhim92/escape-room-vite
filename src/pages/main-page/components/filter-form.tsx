import { GENRE, LEVEL } from '../../../const';

type TFilter = {
  title: string;
  description: string;
  // eslint-disable-next-line react/no-unused-prop-types
  icon?: string;
}

type FilterItemProps = TFilter;

const GenreItem = ({title, description, icon}: FilterItemProps) => (
  <li className="filter__item">
    <input
      type="radio"
      name="type"
      id={title}
      defaultChecked={title === 'all'}
    />
    <label className="filter__label" htmlFor={title}>
      <svg className="filter__icon" width="26" height="30" aria-hidden="true">
        <use xlinkHref={icon}/>
      </svg><span className="filter__label-text">{description}</span>
    </label>
  </li>
);

const LevelItem = ({title, description}: FilterItemProps) => (
  <li className="filter__item">
    <input
      type="radio"
      name="level"
      id={title}
      defaultChecked={title === 'any'}
    />
    <label className="filter__label" htmlFor={title}>
      <span className="filter__label-text">{description}</span>
    </label>
  </li>
);

const FilterForm = ():JSX.Element => (
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
          />
        ))}

      </ul>
    </fieldset>
  </form>
);

export default FilterForm;
