export interface ArticleListConfig {
  //默认是public必选字段
  type: string;
  /**
   * 条件都是可选字段
   */
  filters: {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  };
}
