import { type EnvironmentSchema } from '../types/types.js';

interface ILibraryConfig<T> {
  ENV: T;
}

interface IConfig extends ILibraryConfig<EnvironmentSchema> {}

export { type IConfig };
