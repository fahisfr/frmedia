import { actions as exploerPostActions } from "../explore";
import { actions as homePostActions } from "../posts";
import { actions as hashTagePostActions } from "../hashTags";

const getPostAcitons = (page) => {
  switch (page) {
    case "home":
      return homePostActions;
    case "explore":
      return exploerPostActions;
    case "hashTage":
      return hashTagePostActions;
  
  }
};

export default getPostAcitons;
