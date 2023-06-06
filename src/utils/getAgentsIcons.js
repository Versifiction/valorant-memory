import axios from "axios";

export default function getAgentsIcons() {
  return axios.get("https://valorant-api.com/v1/agents");
}
