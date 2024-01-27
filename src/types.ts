export type ID = string;
export type IdMap<T> = {[id: ID]: T}

export type Pal = {
  id: ID | number,
  name: string,
  numberCaught: number,
}

export type PalJson = {
  id: number,
  key: string,
  image: string,
  name: string,
  wiki: string,
  types: Array<string>,
  imageWiki: string,
  suitability: Array<{type: string, level: number}>,
  drops: Array<string>,
  aura: {
    name: string,
    description: string,
  },
  description: string,
  skills: Array<any>, // todo
}