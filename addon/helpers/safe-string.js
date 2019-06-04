import { helper } from "@ember/component/helper";
import { htmlSafe } from "@ember/template";

export function safeString(params /*, hash*/) {
  return htmlSafe(params.join(""));
}

export default helper(safeString);
