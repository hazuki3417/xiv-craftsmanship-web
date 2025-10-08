# XIV Craftsmanship Web

FF14のクラフター向け支援ツールのWebアプリケーションです。

## 開発環境のセットアップ

### 必要要件

- [Devbox](https://www.jetpack.io/devbox)
  - Node.js v18以上（devbox.jsonで自動的に設定されます）

### セットアップ手順

1. リポジトリのクローン

```bash
git clone git@github.com:hazuki3417/xiv-craftsmanship-web.git
cd xiv-craftsmanship-web
```

2. devbox環境の起動

```bash
devbox shell
```

3. 依存関係のインストール

```bash
npm install
```

4. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは http://localhost:3000 で利用可能です。

### 開発コマンド

全てのコマンドは devbox shell 内で実行してください。

```bash
# 開発サーバーの起動
npm run dev

# テストの実行
npm run test

# Storybookの起動
npm run storybook

# コードの型チェック
npm run typecheck

# リントの実行
npm run lint
```

## ドキュメント

詳細については、以下のドキュメントを参照してください：

- [プロジェクト構成](docs/directory-structure.md)
- [開発ガイドライン](docs/guideline.md)
- [デプロイメントガイド](docs/deployment.md)

FF14のクラフター向けツール。アイテムのクラフトレシピツリーを視覚化し、必要な材料の計算を支援します。

## 機能

- クラフトレシピツリーの可視化
- 必要素材の自動計算
- 材料リストの管理
- 数量調整機能
- クリップボードへのコピー機能

## 必要要件

- Node.js v18以上
- npm または yarn
- Docker（開発環境用）

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/hazuki3417/xiv-craftsmanship-web.git
cd xiv-craftsmanship-web

# 依存パッケージのインストール
npm install
# または
yarn install
```

## 開発環境のセットアップ

```bash
# 開発サーバーの起動
npm run dev
# または
yarn dev

# Docker環境での起動
docker-compose up -d
```

開発サーバーは `http://localhost:3000` で起動します。

## ビルド

```bash
# プロダクションビルド
npm run build
# または
yarn build
```

## テスト

```bash
# ユニットテストの実行
npm test
# または
yarn test

# E2Eテストの実行
npm run test:e2e
# または
yarn test:e2e
```

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型付きJavaScript
- [GraphQL](https://graphql.org/) - APIクエリ言語
- [Vitest](https://vitest.dev/) - テストフレームワーク
- [Docker](https://www.docker.com/) - コンテナ化

## プロジェクト構成

詳細な構成については[ディレクトリ構成](./docs/directory-structure.md)を参照してください。

## コーディングガイドライン

プロジェクトのコーディング規約や方針については[ガイドライン](./docs/guideline.md)を参照してください。

## ライセンス

このプロジェクトはMITライセンスの下で提供されています。

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 作者

[hazuki3417](https://github.com/hazuki3417)