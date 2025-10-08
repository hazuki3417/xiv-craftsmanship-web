# コーディングガイドライン

## プロジェクト構成

### コンポーネント設計
- Atomic Designベースのコンポーネント分割
- Presentation/Container パターンの採用 
- コンポーネントごとにディレクトリを作成
- 関連するファイルは同じディレクトリに配置

理由:
- コンポーネントの責務を明確に分離し、再利用性と保守性を向上させる
- ビジネスロジックとUIを分離することで、テストやメンテナンスが容易になる
- ファイル構成を統一することで、開発者の学習コストを低減

### 状態管理
- React Context APIを使用した状態管理
- グローバル状態とローカル状態を適切に分離
- カスタムフックによる状態ロジックの共通化

理由:
- 小〜中規模アプリケーションに適した軽量な状態管理
- コンポーネント間の結合度を下げ、メンテナンス性を向上
- ロジックの再利用性を高める

## TypeScript規約

### 型定義
- インターフェースは`interface`で定義
- 型エイリアスは`type`で定義 
- Props型は必ずexport
- 厳格な型チェックを有効化

```typescript
export interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
}
```

理由:
- 型安全性を確保し、バグの早期発見を促進
- コードの自己文書化を促進
- IDEの支援機能を最大限活用

### コンポーネント
- 関数コンポーネントを使用
- Props型を明示的に定義
- メモ化を適切に使用

```typescript
export const Component: FC<ComponentProps> = (props) => {
  const { value, onChange } = props;
  return <div>{value}</div>;
};
```

理由:
- モダンなReactの推奨プラクティスに従う
- 型安全性とコードの可読性を向上
- パフォーマンスの最適化

## コーディングスタイル

### 命名規則
- コンポーネント: PascalCase
- 関数・変数: camelCase
- 定数: SNAKE_CASE
- ファイル名はコンポーネント名と一致

理由:
- JavaScriptとReactの一般的な命名規則に準拠
- コードの一貫性と可読性を確保

### ファイル構成
- 1ファイル1コンポーネント
- index.tsによるエクスポート管理
- styled-componentsは別ファイルに分離

理由:
- コードの可読性と保守性を向上
- import/exportの管理を容易に
- 関心の分離を促進

### パフォーマンス最適化
- useMemoとuseCallbackの適切な使用
- 不要なレンダリングの防止
- コンポーネントの適切な分割

理由:
- アプリケーションのパフォーマンスを確保
- メモリ使用量の最適化
- ユーザー体験の向上

## 制限事項

### 技術的制約
- Node.js v18以上
- Next.js 13以上
- TypeScript 5.0以上
- React 18以上

### ビルド・デプロイ
- ESLintとPrettierによる静的解析必須
- TypeScriptの strict mode必須
- ビルドエラーは許容しない

### パフォーマンス
- First Contentful Paint: 2秒以内
- Time to Interactive: 3.5秒以内
- Lighthouse スコア: 90以上

## ベストプラクティス

### エラーハンドリング
- try-catchによる適切なエラー処理
- エラーバウンダリの使用
- ユーザーフレンドリーなエラーメッセージ

### テスト
- ユニットテストの作成必須
- E2Eテストの推奨
- カバレッジ80%以上を目標

### アクセシビリティ
- WAI-ARIAの適切な使用
- キーボード操作の対応
- スクリーンリーダー対応
