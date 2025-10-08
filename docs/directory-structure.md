# ディレクトリ構成

## 概要
このドキュメントでは、プロジェクトのディレクトリ構成とその役割について説明します。

## ルートディレクトリ

```
.
├── app/          # Next.jsアプリケーションのメインディレクトリ
├── docker/       # Docker関連の設定ファイル
└── doc/          # プロジェクトのドキュメント
```

## アプリケーションディレクトリ (`app/`)

### ソースコード (`src/`)

```
src/
├── app/                    # Next.js 13のApp Router関連
├── component/             # 共通コンポーネント
├── functions/            # ユーティリティ関数
├── graphql/              # GraphQL関連
├── hooks/               # カスタムフック
├── lib/                 # ライブラリ・ユーティリティ
├── openapi/            # OpenAPI関連
├── reducers/           # Reducers
└── types/              # 型定義
```

### 主要ディレクトリの説明

#### `src/app/`
- Next.js 13のApp Routerに基づくページコンポーネント
- ルーティング構造を反映したディレクトリ構成
- `_component/`: ページ固有のコンポーネント
- `layout.tsx`: 共通レイアウト
- `page.tsx`: 各ページのメインコンポーネント

#### `src/component/`
共通で使用するコンポーネントを格納
- `ClipBoardCopyButton/`: クリップボードコピー機能
- `Header/`: ヘッダーコンポーネント
- `Providers/`: プロバイダーコンポーネント
- `Table/`: テーブル関連コンポーネント

各コンポーネントディレクトリの構成:
```
ComponentName/
├── index.ts              # エクスポート定義
├── ComponentName.tsx     # メインコンポーネント
└── ComponentName.stories.ts  # Storybookファイル（該当する場合）
```

#### `src/functions/`
ビジネスロジックやユーティリティ関数を格納
- 再利用可能な純粋関数
- データ処理ロジック
- ヘルパー関数

#### `src/graphql/`
GraphQL関連の実装を格納
- `client.ts`: GraphQLクライアント設定
- `gql/`: 生成されたGraphQL型定義
- `operation/`: クエリとミューテーション

#### `src/hooks/`
Reactカスタムフックを格納
- ビジネスロジックの抽象化
- 再利用可能な状態管理ロジック
- コンポーネント間で共有される機能

#### `src/lib/`
ユーティリティ関数とヘルパーを格納
- `theme/`: スタイリングテーマ設定
- その他の汎用的なユーティリティ

#### `src/reducers/`
状態管理のReducerを格納
- アプリケーションの状態更新ロジック
- テスト付きの実装

#### `src/types/`
TypeScript型定義を格納
- グローバルな型定義
- 環境変数の型定義

## Docker関連 (`docker/`)

```
docker/
└── develop/
    └── xiv-craftsmanship-web/
        └── Dockerfile    # 開発環境用Dockerfile
```

## 設定ファイル（ルート）

- `devbox.json`: 開発環境設定
- `next.config.mjs`: Next.js設定
- `tsconfig.json`: TypeScript設定
- `vitest.config.ts`: Vitest設定
- `package.json`: プロジェクト依存関係

## 命名規則

### ディレクトリ
- コンポーネントディレクトリ: PascalCase（例: `Header/`, `ClipBoardCopyButton/`）
- 機能モジュールディレクトリ: camelCase（例: `hooks/`, `functions/`）
- その他のディレクトリ: kebab-case（例: `xiv-craftsmanship-web/`）

### ファイル
#### コンポーネント関連
- Reactコンポーネント: PascalCase.tsx（例: `Header.tsx`, `ClipBoardCopyButton.tsx`）
- Storybookファイル: PascalCase.stories.ts（例: `Header.stories.ts`）
- テストファイル: PascalCase.test.tsx（例: `Header.test.tsx`）
- インデックスファイル: index.ts（エクスポート定義用）

#### フックとユーティリティ
- カスタムフック: use{Name}.ts（例: `useQuantity.ts`, `useMaterialTree.ts`）
- ユーティリティ関数: camelCase.ts（例: `material.ts`, `node.ts`）
- 型定義ファイル: camelCase.d.ts（例: `env.d.ts`）

#### GraphQL関連
- クエリ/ミューテーション: camelCase.ts（例: `getItems.ts`, `updateItem.ts`）
- スキーマ定義: camelCase.graphql（例: `schema.graphql`）

#### 設定ファイル
- 設定ファイル: kebab-case.{json|js|ts}（例: `tsconfig.json`, `next.config.mjs`）

### 型定義

#### インターフェース
- コンポーネントProps: `{ComponentName}Props`（例: `interface HeaderProps`）
- カスタムフック戻り値: `Use{Name}`（例: `interface UseQuantity`）
- その他インターフェース: PascalCase（例: `interface NodeDataType`）

#### 型エイリアス
- 共有型: PascalCase（例: `type Maybe<T>`, `type InputMaybe<T>`）
- 状態管理: `{Name}State`（例: `type QuantityState`）
- アクション型: `{Name}Action`（例: `type QuantityAction`）

#### 列挙型
- 列挙型: PascalCase（例: `enum SortType`）

### 定数
- グローバル定数: SCREAMING_SNAKE_CASE（例: `MAX_ITEMS`, `DEFAULT_LIMIT`）
- デフォルト値: `default{Name}`（例: `defaultQuantityState`）
- 設定オブジェクト: camelCase（例: `themeConfig`）

## 注意事項

1. コンポーネントの配置
   - 共通コンポーネントは `src/component/` に配置
   - ページ固有のコンポーネントは `src/app/_component/` に配置

2. テストファイル
   - テストファイルは実装ファイルと同じディレクトリに配置
   - `.test.ts` または `.test.tsx` の拡張子を使用

3. 型定義
   - コンポーネント固有の型は各コンポーネントファイル内で定義
   - 共通の型は `src/types/` に配置

4. ストーリーファイル
   - Storybookのストーリーは対象コンポーネントと同じディレクトリに配置
   - `.stories.ts` または `.stories.tsx` の拡張子を使用