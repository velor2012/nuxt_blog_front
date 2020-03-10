export const state = () => ({
    //是否需要加载数据,滚动加载
    needLoading:false,
    toc:[],
    searchArticleType:'total',
    isMobile:false,
    showFilter:false,
    authorInfo:{
        info:'',
        avatar:''
    }
  })
export const mutations = {
    setToc(state,toc){
        state.toc=toc
    },
    setSearchArticleType(state,type){
        state.searchArticleType=type
    },
    setIsMobile(state,isMobile){
        state.isMobile=isMobile
    },
    setShowFilter(state,showFilter){
        state.showFilter=showFilter
    },
    setAuthorInfo(state,authorInfo){
        state.authorInfo=authorInfo
    }
}
export const getters = {
    getToc(state){
        return state.toc
    },
    getSearchArticleType(state){
        return state.searchArticleType
    },
    getIsMobile(state){
        return state.isMobile
    },
    getShowFilter(state){
        return state.showFilter
    },
    getAuthorInfo(state){
        return state.authorInfo
    }
}