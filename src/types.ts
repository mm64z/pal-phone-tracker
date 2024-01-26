export type ID = string;
export type IdMap<T> = {[id: ID]: T}

export type Pal = {
  id: ID,
  name: string,
  numberCaught: number,
}