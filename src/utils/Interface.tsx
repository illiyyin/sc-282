export interface IListCategory{
  id: number
  name:string
}

export interface ISearchInput{
  query: string
  setQuery:(data:string)=>void
  size: number
  setSize:(data:number)=>void
  page: number
  setPage:(data:number)=>void
  setCategory: (data: number) => void
  listCategory:IListCategory[]
}

export interface IDataBooks{
  id:number
  title:string
  cover_url: string
  authors:string[]
}

export interface IDetailBooks {
  data: IDataBooks;
  bookmark: IDataBooks[];
  setBookMark: (value: IDataBooks) => void;
}

export interface IListBook{
  data: IDataBooks[]
  loading:boolean
}
export interface IHeart{
  fill:string
  outline:string
}