import Bell from "./bell.svg";
import Phone from "./phone.svg";
import Search from "./search.svg";
import User from "./user.svg";
import Heart from "./heart.svg";
import Cart from "./cart.svg";
import ArrowRight from "./arrowRight.svg";
import ArrowSharpLeft from "./arrowSharpLeft.svg";
import ArrowSharpRight from "./arrowSharpRight.svg";
import Filter from "./filter.svg";
import Bin from "./bin.svg";

export const icons = {
  bell: Bell,
  phone: Phone,
  search: Search,
  user: User,
  heart: Heart,
  cart: Cart,
  arrowRight: ArrowRight,
  arrowSharpLeft: ArrowSharpLeft,
  arrowSharpRight: ArrowSharpRight,
  filter: Filter,
  bin: Bin,
};

export type Icon = keyof typeof icons;
