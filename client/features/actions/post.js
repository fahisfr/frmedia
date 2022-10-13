import { actions as exploerPostActions } from "../explore";
import { actions as homePostActions } from "../home";
import { actions as hashTagePostActions } from "../hashTags";
import { actions as profilePostActions } from "../profiles";
const getPostActions = (sliceName) => {
  switch (sliceName) {
    case "home":
      return homePostActions;
    case "explore":
      return exploerPostActions;
    case "hashTage":
      return hashTagePostActions;
    case "profile":
      return profilePostActions;
    default:
      return homePostActions;
  }
};

export default getPostActions;
