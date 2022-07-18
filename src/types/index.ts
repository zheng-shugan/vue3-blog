export interface Meta {
  views: number
  likes: number
  comments: number
}

export interface ToUser {
  userId: string
  name: string
  avatar: string
  type: number
}

export interface Params {
  keyword: string
  pageNum: number
  pageSize: number
}

export interface LoginParams {
  email: string
  password: string
}

export interface UserInfo {
  _id: string
  name: string
  avatar: string | any
}

export interface RegAndLogParams {
  email: string
  name: string
  password: string
  phone: string
  desc: string
}

export interface NavListItem {
  index: string
  path: string
  name: string
}

export interface ParamsArchive {
  keyword: string
  hot: string //  是否是热门文章
  state: number // 文章发布状态 => 0: 草稿，1:已发布
  article: number
  tagId: string
  categoryId: string
  pageNum: number
  pageSize: number
}

export interface ArchiveListItem {
  createTime: string
  title: string
  _id: string
}

export interface ArchiveList {
  year: string
  list: ArchiveList | any
}

export interface OtherComments {
  content: string
  createTime: string
  likes: number
  state: number
  toUser: ToUser
  user: ToUser
  _id: string
}

export interface Comments {
  articleId: string
  content: string
  createTime: string
  id: number
  isHandle: number
  isTop: boolean
  likes: number
  otherComments: OtherComments[]
  state: number
  updateTime: string
  user: ToUser
  userId: ToUser
  __v: number
  _id: string
}

export interface ArticleDetailIF {
  toc: string
  _id: string
  author: string
  category: Array<any>
  comments: Array<Comments>
  createTime: string
  desc: string
  content: string
  id: number
  imgUrl: string
  numbers: number
  keyword: Array<string>
  likeUsers: Array<any>
  meta: Meta
  origin: number
  state: number
  tags: Array<any>
  title: string
  updateTime: string
}

export interface ArticleDetailParams {
  id: string | string[]
  type: number
}

export interface LikeParams {
  id: string
  userId: string
}

export interface ArticlesParams {
  keyword: string
  likes: string
  state: number
  tagId: number
  categoryId: string
  pageNum: number
  pageSize: number
}

export interface List {
  category: string[]
  createTime: string
  desc: string
  imgUrl: string
  meta: Meta
  tags: string[]
  title: string
  _id: string
}

export interface ArticlesData {
  count: number
  list: List | any
}

export interface MessageParams {
  email: string
  phone: string
  name: string
  content: string
}

export interface RulesItem {
  validator: Function
  trigger: string
}

export interface Rules {
  email: RulesItem[]
  phone: RulesItem[]
  name: RulesItem[]
  content: RulesItem[]
}

export interface ProjectList {
  content: string
  startTime: string
  endTime: string
  img: string
  title: string
  url: string
  _id: string
}

export interface ProjectsData {
  count: number
  list: ProjectList | any
}

export interface TimelineList {
  content: string
  stateTime: string
  endTime: string
  title: string
  state: number
  _id: string
}

export interface TimelineData {
  count: number
  list: TimelineList | any
}

export interface TagList {
  name: string
  _id: string
}

export interface TagsData {
  count: number
  list: TagList | any
}
