export class PagePath { 
    emojiPage = '/emoji'
    notePage="/note/list"
    getArticlePage = (id: string) => `/article/${id}`
    getNotePage = (id:string) => `/note/${id}`
}
const MyPagePath = new PagePath()
export default MyPagePath