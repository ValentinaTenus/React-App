import { type AppEnvironment } from '../../enums/enums.js';
import { type ValueOf } from '../../types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    ORIGIN_URL: string;
  };
  DB: {
    CONNECTION_STRING: string;
    DIALECT: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  OPEN_AI: {
    API_KEY: string;
  };
};

export { type EnvironmentSchema };
