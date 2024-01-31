

export type ID = number;
export type IdMap<T> = {[id: ID]: T}

export type Pal = {
  id: ID,
  name: string,
  image: string,
  aura: {
    name: string,
    description: string,
    tech: string,
  },
}

export type PalJson = {
  id: ID,
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
    tech: string,
  },
  description: string,
  skills: Array<any>, // todo
}