import gql from "graphql-tag";

export const AllPostsQuery = gql`
  query AllPosts {
    allPosts {
      id
      title
      docCount
      published
      userId
      projectId
      createdAt
      updatedAt
    }
  }
`;

export const PostQuery = gql`
  query post($where: PostWhereUniqueInput!) {
    post(where: $where) {
      id
      slug
      title
      editordoc
      docCount
      tags
      excerpt
      authors
      published
      createdAt
      updatedAt
    }
  }
`;
