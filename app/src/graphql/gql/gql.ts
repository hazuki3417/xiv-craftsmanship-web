/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetCrafts($name: String!) {\n  crafts(name: $name) {\n    id\n    name\n    job\n    pieces\n    level {\n      item\n      craft\n    }\n  }\n}": types.GetCraftsDocument,
    "query GetMaterials($craftId: String!) {\n  materials(craftId: $craftId) {\n    treeId\n    parent {\n      itemId\n      itemName\n      craftJob\n      craftLevel\n    }\n    child {\n      itemId\n      itemName\n      itemType\n      itemUnit\n      itemTotal\n    }\n  }\n}": types.GetMaterialsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCrafts($name: String!) {\n  crafts(name: $name) {\n    id\n    name\n    job\n    pieces\n    level {\n      item\n      craft\n    }\n  }\n}"): (typeof documents)["query GetCrafts($name: String!) {\n  crafts(name: $name) {\n    id\n    name\n    job\n    pieces\n    level {\n      item\n      craft\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMaterials($craftId: String!) {\n  materials(craftId: $craftId) {\n    treeId\n    parent {\n      itemId\n      itemName\n      craftJob\n      craftLevel\n    }\n    child {\n      itemId\n      itemName\n      itemType\n      itemUnit\n      itemTotal\n    }\n  }\n}"): (typeof documents)["query GetMaterials($craftId: String!) {\n  materials(craftId: $craftId) {\n    treeId\n    parent {\n      itemId\n      itemName\n      craftJob\n      craftLevel\n    }\n    child {\n      itemId\n      itemName\n      itemType\n      itemUnit\n      itemTotal\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;