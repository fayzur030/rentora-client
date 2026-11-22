export interface Category {
  _id: string
  name: string
  slug: string
  createdAt: string
}

export interface CreateCategoryInput {
  name: string
  slug: string
}
