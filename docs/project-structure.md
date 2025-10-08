# プロジェクト構造

## 概要

このドキュメントでは、プロジェクトの基本構造と各ディレクトリの役割について説明します。

## ディレクトリ構成

```
.
├── app/                  # Next.jsアプリケーションのメインディレクトリ
│   └── src/
│       ├── app/         # Next.js 13 App Router
│       ├── component/   # 共通コンポーネント
│       ├── functions/   # ユーティリティ関数
│       ├── graphql/     # GraphQL関連
│       ├── hooks/       # カスタムフック
│       ├── lib/         # ライブラリ・ユーティリティ
│       ├── openapi/     # OpenAPI関連
│       ├── reducers/    # Reducers
│       └── types/       # 型定義
├── docker/              # Dockerコンテナ定義
└── docs/               # プロジェクトドキュメント
```

## 主要ディレクトリの説明

### `app/src/app/`
Next.js 13のApp Routerに基づくページコンポーネント
- `_component/`: ページ固有のコンポーネント
- `layout.tsx`: 共通レイアウト
- `page.tsx`: 各ページのメインコンポーネント

### `app/src/component/`
共通で使用するコンポーネントを格納
- 再利用可能なUIコンポーネント
- Presentation/Containerパターンに基づく実装
- Storybookによるコンポーネントカタログ

### `app/src/functions/`
ビジネスロジックやユーティリティ関数
- 純粋関数による実装
- ドメインロジックの集約
- テスト容易性の確保

### `app/src/graphql/`
GraphQL関連の実装
- クライアント設定
- 型定義
- クエリ/ミューテーション

### `app/src/hooks/`
Reactカスタムフック
- 状態管理ロジック
- ビジネスロジックの抽象化
- 再利用可能な機能

### `app/src/lib/`
共通ユーティリティ
- テーマ設定
- ヘルパー関数
- 定数定義

### `app/src/reducers/`
状態管理
- Reducer実装
- アクション定義
- 単体テスト

## 設定ファイル

### ルートディレクトリ
- `devbox.json`: 開発環境設定
- `next.config.mjs`: Next.js設定
- `tsconfig.json`: TypeScript設定
- `vitest.config.ts`: Vitest設定
- `package.json`: プロジェクト依存関係

### アプリケーションディレクトリ
- `codegen.ts`: GraphQL Code Generator設定
- `next-env.d.ts`: Next.js型定義
- `orval.config.js`: OpenAPI設定