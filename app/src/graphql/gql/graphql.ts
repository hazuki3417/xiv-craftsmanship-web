/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type Child = {
	__typename?: "Child";
	itemId: Scalars["String"]["output"];
	itemName: Scalars["String"]["output"];
	itemTotal: Scalars["Int"]["output"];
	itemType: Scalars["String"]["output"];
	itemUnit: Scalars["Int"]["output"];
};

export type Craft = {
	__typename?: "Craft";
	id: Scalars["String"]["output"];
	itemId: Scalars["String"]["output"];
	job: Scalars["String"]["output"];
	level: Level;
	name: Scalars["String"]["output"];
	pieces: Scalars["Int"]["output"];
};

export type Level = {
	__typename?: "Level";
	craft: Scalars["Int"]["output"];
	item?: Maybe<Scalars["Int"]["output"]>;
};

export type Material = {
	__typename?: "Material";
	child: Child;
	parent: Parent;
	treeId: Scalars["String"]["output"];
};

export type Parent = {
	__typename?: "Parent";
	craftJob: Scalars["String"]["output"];
	craftLevel: Scalars["Int"]["output"];
	itemId: Scalars["String"]["output"];
	itemName: Scalars["String"]["output"];
};

export type Query = {
	__typename?: "Query";
	crafts: Array<Craft>;
	materials: Array<Material>;
};

export type QueryCraftsArgs = {
	name: Scalars["String"]["input"];
};

export type QueryMaterialsArgs = {
	craftId: Scalars["String"]["input"];
};

export type GetCraftsQueryVariables = Exact<{
	name: Scalars["String"]["input"];
}>;

export type GetCraftsQuery = {
	__typename?: "Query";
	crafts: Array<{
		__typename?: "Craft";
		id: string;
		itemId: string;
		name: string;
		job: string;
		pieces: number;
		level: { __typename?: "Level"; item?: number | null; craft: number };
	}>;
};

export type GetMaterialsQueryVariables = Exact<{
	craftId: Scalars["String"]["input"];
}>;

export type GetMaterialsQuery = {
	__typename?: "Query";
	materials: Array<{
		__typename?: "Material";
		treeId: string;
		parent: {
			__typename?: "Parent";
			itemId: string;
			itemName: string;
			craftJob: string;
			craftLevel: number;
		};
		child: {
			__typename?: "Child";
			itemId: string;
			itemName: string;
			itemType: string;
			itemUnit: number;
			itemTotal: number;
		};
	}>;
};

export const GetCraftsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "GetCrafts" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "crafts" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "name" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "name" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "id" } },
								{ kind: "Field", name: { kind: "Name", value: "itemId" } },
								{ kind: "Field", name: { kind: "Name", value: "name" } },
								{ kind: "Field", name: { kind: "Name", value: "job" } },
								{ kind: "Field", name: { kind: "Name", value: "pieces" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "level" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "item" } },
											{ kind: "Field", name: { kind: "Name", value: "craft" } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<GetCraftsQuery, GetCraftsQueryVariables>;
export const GetMaterialsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "GetMaterials" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "craftId" },
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "String" },
						},
					},
				},
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "materials" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "craftId" },
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "craftId" },
								},
							},
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "treeId" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "parent" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "itemId" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "itemName" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "craftJob" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "craftLevel" },
											},
										],
									},
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "child" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "itemId" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "itemName" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "itemType" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "itemUnit" },
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "itemTotal" },
											},
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<GetMaterialsQuery, GetMaterialsQueryVariables>;
