# 未決定事項・設計上の確認事項

本書は未確定の論点のみを管理する。決定した内容は [要求](./product-requirements.md) または [数量・集計仕様](./bom-calculation-spec.md) に移し、ここには重複保持しない。

## 要件確認が必要な論点

1. **登録前の選択と登録済み製品の選択の関係**: 検索からプレビューした未登録製品と、登録済み製品の詳細編集をどのUI操作で切り替えるか。入力確定時の即時反映は確定済み。
2. **製作リストの重複追加時の通知**: 無操作で維持することは確定しているが、利用者に既存登録を案内するかは未決定。
3. **数量入力の詳細**: 上限、不正値・空欄の扱い、反映タイミング。
4. **初期レシピが存在しない場合**: 展開を止める条件と表示。中間素材を購入する設定機能を導入する判断とは切り分ける。
5. **ブラウザ内永続ストレージの例外処理**: 保存データの形式変更・不正値・容量制限、API側レシピの変更・削除、一括削除時に検索プレビュー・現在選択中の製品まで消去するか。製作リストの全削除操作と事前確認ダイアログは確定済み。ブラウザ・タブ終了後も保持することは確定済み。
6. **中間素材の計算範囲**: ツリーの出現箇所ごとに製作回数を切り上げる現在の合意を、同一製品内の複数出現にも適用するかを例で確認する。

## 解決済みの設計判断

- 同じ登録製品内の同一中間素材についてはレシピ選択を共有し、登録製品間では独立する。理由は[設計判断](./decisions/intermediate-recipe-selection.md)を参照。数量計算は引き続き経路単位で切り上げる。

- 検索選択でBOM表示、完成品数量Inputで即時再計算、リスト追加を別操作とする。選択/リストはフロントエンドのみで管理し、ブラウザ・タブ終了後も同じブラウザで復元可能にする。バックエンドへ永続化しない。製作リストは確認ダイアログを経て全削除でき、ブラウザ保存分にも反映する。理由は[設計判断](./decisions/frontend-only-craft-state.md)を参照。

## 既存実装との照合が必要な事項

以下は静的なコード調査から得た候補であり、再現試験による確定不具合とは区別する。

- `app/src/app/_component/Recipe/parseRecipeTree.ts`: 初期レシピとして `material.recipes[0]` を利用している。recipeId昇順の保証が必要。
- `app/src/hooks/useMaterialTree.ts`: ノード配列の階層情報とStackで親を追跡し、必要数量を再計算している。深い分岐や数量変更時の正しさをテストする。
- `app/src/app/_component/MaterialManagerProvider/MaterialManagerProvider.tsx`: 登録済みレシピのノード情報を集計入力として保持する。編集後の再計算結果と登録済み状態の同期を確認する。
- `app/src/functions/material.tsx`: 同一itemIdで数量を加算している。計算対象と分類が正しいかテストする。
- `app/src/app/_component/Recipe/RecipeProvider.tsx`: 検索で選択したレシピ・数量・BOMをフロントエンドで保持し、数量変化でBOM再計算する。検索選択と登録済み詳細編集の区別を確認する。
- `app/src/app/_component/Recipe/RecipeSearch.tsx`: 候補の選択で `getRecipe` を呼び、選択レシピ/BOMを更新する。バックエンドへの状態保存は行わない。
- `app/src/app/_component/Recipe/QuanitityChangeInput.tsx`, `app/src/reducers/quantity.ts`: 数量Inputは `onChange` に連動し1〜999に制限している。入力中の空欄などをどう表示・確定するか仕様化が必要。
- `app/src/app/_component/MaterialManagerProvider/MaterialManagerProvider.tsx`: 登録リストはReactの `useState` で管理し、追加・削除・変更をフロントエンドで処理する。コメントに「バックエンドで集約」とあるが実コードではクライアント集計であり、コメント修正候補。
- `app/src/app/_component/Recipe/CraftItemSelect/CraftItemSelect.tsx`: 現状の登録済みレシピ選択が `RecipeProvider` に反映される連携は見当たらないため、詳細編集の期待動作と要照合。
- `app/src/app/page.tsx`: `MaterialManagerProvider` が表示セグメントに依存する箇所にあり、切替時に状態が破棄される可能性がある。保持期間の仕様決定後に確認する。

## 実施順序

先に未決定のユーザー操作・計算ルールを確定する。その後、具体的な入力と期待数量に基づくテストを追加し、実装との差分を修正する。DB/APIの変更は必要性が判明した場合のみ検討する。
