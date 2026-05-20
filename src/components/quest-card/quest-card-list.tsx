import { quests } from '../../mocks/quests';
import QuestCard from './quest-card';

const QuestsCardList = ():JSX.Element => (
  <div className="cards-grid">
    {quests.map((quest) => (
      <QuestCard key={quest.id} quest={quest}/>
    ))}
  </div>
);

export default QuestsCardList;
