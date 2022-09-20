import { actions as exploerPostActions } from "../explore";
import { actions as homePostActions } from "../home";
import { actions as hashTagePostActions } from "../hashTags";
import { actions as profilePostActions } from "../profiles";
const getPostAcitons = (page) => {
  console.log(page)
  switch (page) {
    case "home":
      return homePostActions;
    case "explore":
      return exploerPostActions;
    case "hashTage":
      return hashTagePostActions;
    case "profile":
      return profilePostActions;

    default:
      throw Error("page not found");
  }
};

export default getPostAcitons;
