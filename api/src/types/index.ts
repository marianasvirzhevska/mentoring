import {
  Achievement,
  ActualTask,
  ArchiveItem,
  Challenge,
  Status,
  Task,
} from '../interfaces';

/**
 * Returns a current task with its status by the
 * challenge id
 * @param challengeId id of challenge with has state In Progress
 * @returns IActualTask which provides information about a task and its current status
 * in scope of the challenge
 */
export type getCurrentTask = (challengeId: string) => ActualTask;

/**
 * Returns a list of actual achievements by the
 * challenge id
 * @param challengeId id of challenge with has state In Progress
 * @returns IAchievement which provides information about an
 * achievement and its current status in scope of the challenge
 */
export type getAchievements = (challengeId: string) => Achievement[];

/**
 * Returns all past tasks with their results by the challenge id
 * @param challengeId id of past challenge
 * @returns list of all past tasks
 */
export type getTaskArchive = (challengeId: string) => ArchiveItem[];

/**
 * Returns a new challenge using the following parameters
 * @param tasks a list of tasks
 * @param challenges a list of challenges
 * @param duration challenge duration (default 30 days)
 * @param achievements number of achievements (efault, challenge duration / 6)
 * @returns new Challenge object
 */
export type startNewChallenge = (
  tasks: Task[],
  challenges: Challenge[],
  duration: number,
  achievements: number,
) => Challenge;

/**
 * Returns achievements status for the challenge by its achievements list
 * and tasks status
 * @param achievements achievements list
 * @param tasksStatus tasks status
 * @returns achievements status
 */
export type calculateAchievementsStatus = (
  achievements: Achievement[],
  tasksStatus: Status,
) => Status;
