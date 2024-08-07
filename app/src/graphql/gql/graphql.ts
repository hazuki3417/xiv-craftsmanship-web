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

export type Item = {
  __typename?: 'Item';
  children?: Maybe<Array<Maybe<Item>>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  unit: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  crafts: Array<Craft>;
  recipe: Array<Item>;
};


export type QueryCraftsArgs = {
  name: Scalars['String']['input'];
};


export type QueryRecipeArgs = {
  id: Scalars['String']['input'];
};

export type GetCraftsQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetCraftsQuery = { __typename?: 'Query', crafts: Array<{ __typename?: 'Craft', id: string, name: string }> };


export const GetCraftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCrafts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crafts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCraftsQuery, GetCraftsQueryVariables>;