export const state = () => ({
  //是否需要加载数据,滚动加载
  needLoading: false,
  toc: [],
  searchArticleType: "total",
  isMobile: false,
  height:0,
  authorInfo: {
    info: "",
    avatar: ""
  }
});
export const mutations = {
  setToc(state, toc) {
    state.toc = toc;
  },
  setSearchArticleType(state, type) {
    state.searchArticleType = type;
  },
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
  setAuthorInfo(state, authorInfo) {
    state.authorInfo = authorInfo;
  },
  setHeight(state, height) {
    state.height = height;
  }
};
export const getters = {
  getToc(state) {
    return state.toc;
  },
  getSearchArticleType(state) {
    return state.searchArticleType;
  },
  getIsMobile(state) {
    return state.isMobile;
  },
  getAuthorInfo(state) {
    return state.authorInfo;
  },
  getHeight(state){
    return state.height
  }
};
