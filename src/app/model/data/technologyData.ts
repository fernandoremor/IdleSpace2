import { IJobType } from "./iResearchData";
import { BonusStack } from "../bonus/bonusStack";

export abstract class ITechnologyData implements IJobType {
  id: string;
  name: string;
  icon: string;
  color: string;
  bonus?: BonusStack;
  price: Decimal;
  ratio?: number;
}

export const TECHNOLOGIES: { readonly [index: string]: ITechnologyData } = {
  MilitaryEngineering: {
    id: "e",
    name: "Military Engineering",
    icon: "my:upgrade",
    color: "#D4380D",
    price: new Decimal(1e3)
  },
  CivilEngineering: {
    id: "i",
    name: "Civil Engineering",
    icon: "setting",
    color: "#FA8C16",
    price: new Decimal(1e3)
  },
  Physics: {
    id: "p",
    name: "Physics",
    icon: "my:atom",
    color: "#096DD9",
    price: new Decimal(1e3)
  },
  Computing: {
    id: "c",
    name: "Computing",
    icon: "my:computing",
    color: "#85A5FF",
    price: new Decimal(1e3)
  },
  Naval: {
    id: "n",
    name: "Naval",
    icon: "my:medal",
    color: "red",
    price: new Decimal(1e3)
  },
  SEARCH: {
    id: "r",
    name: "Search",
    icon: "my:radar-sweep",
    color: "#7CB305",
    price: new Decimal(1e3)
  }
};
