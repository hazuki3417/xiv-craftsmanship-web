################################################################################
# build stage
################################################################################
FROM node:22-alpine AS builder

# NOTE: ビルド時に外部から値を変更できるように指定
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_HOST_URL

# NOTE: process.envで読み取るために環境変数へ橋渡し
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_HOST_URL=${NEXT_PUBLIC_HOST_URL}

COPY app /app

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
RUN npm install

# Next.js アプリケーションをビルド
RUN npm run build

################################################################################
# final stage
################################################################################
FROM node:22-alpine AS runner

# NOTE: NODE_ENVは常にproductionに設定する
ENV NODE_ENV=production
# 環境変数を設定
ENV API_URL=
ENV HOST_URL=
ENV CORS_ALLOW_HEADERS=
ENV CORS_ALLOW_METHODS=
ENV CORS_ALLOW_ORIGIN=

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
