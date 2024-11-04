import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
   *[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
  _id, 
  title,
  slug, 
  category, 
  views, 
  description, 
  author -> {
    _id, name, email, username, image, bio
  },
  image, 
  pitch, 
  _createdAt
}
`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id] [0] {
  _id, 
  title,
  slug, 
  category, 
  views, 
  description, 
  author -> {
    _id, name, email, username, image, bio
  },
  image, 
  pitch, 
  _createdAt
}
  `);

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);
