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
- コンポーネントディレクトリ: PascalCase
- その他のディレクトリ: kebab-case

### ファイル
- コンポーネント: PascalCase
- ユーティリティ/フック: camelCase
- 設定ファイル: kebab-case

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