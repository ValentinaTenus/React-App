import { type Activity } from "./activity.type";

type CreateActivityDto = Pick<Activity, 'cardId' | 'changeType' | 'newValue' | 'oldValue' | 'cardName'>;

export { CreateActivityDto };