import { TMyBooking, TQuest } from '../../types';
import QuestCard from './quest-card';

type TQuestsCardList = {
  quests: TQuest[] | TMyBooking[];
}

const QuestsCardList = ({quests}: TQuestsCardList):JSX.Element => (
  <div className="cards-grid">
    {quests.map((quest) => (
      <QuestCard
        key={quest.id}
        quest={quest}
      />
    ))}
  </div>
);

export default QuestsCardList;
