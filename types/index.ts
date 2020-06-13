import Article from './Article'
import Note from './Note'
import Category from './Category'

export class MessageData { 
    show: boolean
    color: string
    content: string
}
export class listItem { 
    loading:boolean = true
    total: number = 0
    items:Article[]|Note[] = []
}
export class CategoryGroupItem { 
    _id: Category
    count:number
}