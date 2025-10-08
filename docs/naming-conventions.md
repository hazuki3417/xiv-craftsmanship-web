# 命名規則

このドキュメントでは、プロジェクト全体の命名規則について説明します。

## ディレクトリ命名

### コンポーネントディレクトリ
- 規則: PascalCase
- 例: `Header/`, `ClipBoardCopyButton/`
- 理由: Reactコンポーネントの命名規則との一貫性

### 機能モジュールディレクトリ
- 規則: camelCase
- 例: `hooks/`, `functions/`
- 理由: JavaScript/TypeScriptの一般的な命名規則との整合性

### その他のディレクトリ
- 規則: kebab-case
- 例: `xiv-craftsmanship-web/`
- 理由: 一般的なプロジェクト命名規則との整合性

## ファイル命名

### コンポーネント関連
- メインコンポーネント: PascalCase.tsx
  - 例: `Header.tsx`, `ClipBoardCopyButton.tsx`
- Storybookファイル: PascalCase.stories.ts
  - 例: `Header.stories.ts`
- テストファイル: PascalCase.test.tsx
  - 例: `Header.test.tsx`
- エクスポート定義: index.ts

### フックとユーティリティ
- カスタムフック: use{Name}.ts
  - 例: `useQuantity.ts`, `useMaterialTree.ts`
- ユーティリティ関数: camelCase.ts
  - 例: `material.ts`, `node.ts`
- 型定義ファイル: camelCase.d.ts
  - 例: `env.d.ts`

### GraphQL関連
- クエリ/ミューテーション: camelCase.ts
  - 例: `getItems.ts`, `updateItem.ts`
- スキーマ定義: camelCase.graphql
  - 例: `schema.graphql`

### 設定ファイル
- 規則: kebab-case.{json|js|ts}
- 例: `tsconfig.json`, `next.config.mjs`

## コード命名

### 型定義
#### インターフェース
- コンポーネントProps: `{ComponentName}Props`
  - 例: `interface HeaderProps`
- カスタムフック戻り値: `Use{Name}`
  - 例: `interface UseQuantity`
- その他: PascalCase
  - 例: `interface NodeDataType`

#### 型エイリアス
- 共有型: PascalCase
  - 例: `type Maybe<T>`, `type InputMaybe<T>`
- 状態管理: `{Name}State`
  - 例: `type QuantityState`
- アクション型: `{Name}Action`
  - 例: `type QuantityAction`

#### 列挙型
- 規則: PascalCase
- 例: `enum SortType`

### 変数・関数
- 関数名: camelCase
  - 例: `calculateTotal`, `handleChange`
- 変数名: camelCase
  - 例: `userId`, `itemCount`
- グローバル定数: SCREAMING_SNAKE_CASE
  - 例: `MAX_ITEMS`, `DEFAULT_LIMIT`
- デフォルト値: `default{Name}`
  - 例: `defaultQuantityState`
- 設定オブジェクト: camelCase
  - 例: `themeConfig`

## コンポーネントProps

### イベントハンドラ
- 規則: `on{Event}`
- 例: `onClick`, `onSubmit`, `onValueChange`

### コールバック関数
- 規則: `handle{Action}`
- 例: `handleClick`, `handleSubmit`

### Boolean Props
- 規則: is/has/should で始める
- 例: `isLoading`, `hasError`, `shouldUpdate`