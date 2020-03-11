export const state = () => ({
    //是否需要加载数据,滚动加载
    needLoading:false,
    toc:[],
    searchArticleType:'total',
    isMobile:false,
    authorInfo:{
        info:'',
        avatar:''
    },
    io:'',
    titles:'',
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
    setAuthorInfo(state,authorInfo){
        state.authorInfo=authorInfo
    },
    setIO(state,io){
        state.IO = io
    },
    setTitles(state,titles){
        state.titles = titles
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
    getAuthorInfo(state){
        return state.authorInfo
    },
    getIO(state){
        return state.IO
    },
    getTitles(state){
        return state.titles
    }
}