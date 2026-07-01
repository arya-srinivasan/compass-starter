// Add any extra data types you'll need here!
import { Hashtag } from '../../core/store/hashtag/hashtag.model';
import { WeeklyGoal } from '../../core/store/weekly-goal/weekly-goal.model';

export interface WeeklyGoalData extends WeeklyGoal {
  hashtag: Hashtag;
}
