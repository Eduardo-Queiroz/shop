// @flow
import Service from "..";

class StoryTrainService extends Service {
  list = async ({ name = "", page = 1 }) =>
    this.get({ url: "character" }, { name, page });
  listLoadMore = async ({ nextPage }) => this.get({ completeUrl: nextPage });
}
export default new StoryTrainService();
