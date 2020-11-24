import {
  Achievement,
  ActualAchievement,
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
 * @returns ActualTask which provides information about a task and its current status
 * in scope of the challenge
 */
export type GetCurrentTask = (challengeId: string) => ActualTask;

/**
 * Returns a list of actual achievements by the
 * challenge id
 * @param challengeId id of challenge with has state In Progress
 * @returns ActualAchievement which provides information about an
 * achievement and its current status in scope of the challenge
 */
export type GetAchievements = (challengeId: string) => ActualAchievement[];

/**
 * Returns all past tasks with their results by the challenge id
 * @param challengeId id of past challenge
 * @returns list of all past tasks
 */
export type GetTaskArchive = (challengeId: string) => ArchiveItem[];

/**
 * Returns a new challenge using the following parameters
 * @param tasks a list of tasks
 * @param achievementsList a list of achievements
 * @param duration challenge duration (default 30 days)
 * @param achievements number of achievements (efault, challenge duration / 6)
 * @returns new Challenge object
 */
export type StartNewChallenge = (
  tasks: Task[],
  achievementsList: Achievement[],
  duration: number,
  achievements: number,
) => Challenge;

/**
 * Returns achievements status for the challenge by its achievements list
 * and tasks status
 * @param achievements achievements list
 * @param tasksStatus map of tasks statuses
 * @returns map of achievements statuses
 */
export type CalculateAchievementsStatus = (
  achievements: Achievement[],
  tasksStatus: Map<string, Status>,
) => Map<string, Status>;
