# デプロイメントガイド

このドキュメントでは、プロジェクトのデプロイメント方法について説明します。

## 概要

このプロジェクトは以下の環境へのデプロイを想定しています：

- AWS ECS
- Kubernetes

## ビルド

### プロダクションビルド

```bash
npm run build
```

### Dockerイメージのビルド

```bash
docker build -f docker/develop/xiv-craftsmanship-web/Dockerfile -t xiv-craftsmanship-web .
```

## デプロイメント手順

### AWS ECS

1. ECRにDockerイメージをプッシュ
2. タスク定義の更新
3. サービスの更新

詳細な手順は AWS ECS のドキュメントを参照してください。

### Kubernetes

1. イメージレジストリへのプッシュ
2. マニフェストファイルの適用

```bash
kubectl apply -f k8s/
```

## ローカルでのDocker実行

開発時の動作確認用にDockerコンテナを実行する場合：

```bash
docker run -p 3000:3000 xiv-craftsmanship-web
```

## 環境変数

デプロイ時に必要な環境変数：

- `NODE_ENV`: 実行環境（production/development）
- `API_URL`: バックエンドAPIのURL
- `PORT`: アプリケーションのポート番号（デフォルト: 3000）

## CI/CD

GitHub Actionsを使用した自動デプロイを想定しています。
詳細な設定は `.github/workflows/` ディレクトリ内のワークフローファイルを参照してください。