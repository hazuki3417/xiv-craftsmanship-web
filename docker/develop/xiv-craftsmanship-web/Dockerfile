# ベースイメージとしてNode.jsを使用
FROM node:22-alpine AS builder

COPY app /app

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
RUN npm install

# Next.js アプリケーションをビルド
RUN npm run build

# 実行環境を設定
FROM node:22-alpine AS runner

# 環境変数を設定
ENV NODE_ENV=production

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルだけをコピー
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 依存関係をインストール (productionモード)
RUN npm install --only=production

# アプリケーションを起動
CMD ["npm", "start"]

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --quiet --spider http://localhost:3000 || exit 1
