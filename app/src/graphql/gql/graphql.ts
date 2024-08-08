/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Craft = {
  __typename?: 'Craft';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Depth = {
  __typename?: 'Depth';
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type Edge = {
  __typename?: 'Edge';
  source: Scalars['String']['output'];
  target: Scalars['String']['output'];
};

export type Node = {
  __typename?: 'Node';
  depth: Depth;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  node_type: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  unit: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  crafts: Array<Craft>;
  recipe: RecipeTree;
};


export type QueryCraftsArgs = {
  name: Scalars['String']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['String']['input'];
};

export type RecipeTree = {
  __typename?: 'RecipeTree';
  edges: Array<Edge>;
  nodes: Array<Node>;
};

export type GetCraftsQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetCraftsQuery = { __typename?: 'Query', crafts: Array<{ __typename?: 'Craft', id: string, name: string }> };

export type GetRecipeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe: { __typename?: 'RecipeTree', nodes: Array<{ __typename?: 'Node', id: string, name: string, unit: number, total: number, node_type: string, depth: { __typename?: 'Depth', x: number, y: number } }>, edges: Array<{ __typename?: 'Edge', source: string, target: string }> } };


export const GetCraftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCrafts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crafts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCraftsQuery, GetCraftsQueryVariables>;
export const GetRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"depth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}},{"kind":"Field","name":{"kind":"Name","value":"node_type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"target"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeQuery, GetRecipeQueryVariables>;