# Deployment Plan

作成日: 2026-05-10

## 目的

このリポジトリ `https://github.com/deraryo4559/profile.git` をGitHubへpushし、Cloudflare PagesでWebサイトとして公開する。

## 推奨方針

Cloudflare PagesにGitHubリポジトリを接続し、`main` ブランチへのpushを本番デプロイのトリガーにする。

公式ドキュメントでは、React + Vite のCloudflare Pages設定は以下が標準。

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`

参考:

- Cloudflare Pages React guide: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/
- Cloudflare Pages build configuration: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/configuration/git-integration/
- Cloudflare Pages redirects: https://developers.cloudflare.com/pages/configuration/redirects/

## 現状の注意点

このプロジェクトは現在、GitHub Pagesのサブパス公開を想定している。

```ts
// vite.config.ts
base: '/profile/'
```

Cloudflare Pagesの `*.pages.dev` や独自ドメインのルートで公開する場合、`base: '/profile/'` のままだとビルド後のJS/CSS/assets参照が `/profile/assets/...` になり、ルート公開で壊れる可能性が高い。

Cloudflare Pagesでルート公開するなら、以下のどちらかを選ぶ。

## 方針A: Cloudflareへ完全移行する場合（推奨）

`vite.config.ts` をCloudflare Pages向けにルート基準へ変更する。

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

さらにSPAルーティングのため、`public/_redirects` を追加する。

```text
/* /index.html 200
```

この設定にすると、以下のような直リンクでもCloudflare Pages上でReact Router相当のクライアントルーティングが動く。

- `/profile`
- `/work`
- `/news/ai-business-insights-2026-completed`
- `/contact`

既存の `public/404.html` はGitHub Pages向けのフォールバックなので、Cloudflare Pagesでは `_redirects` を優先する。

## 方針B: GitHub PagesとCloudflare Pagesを併用する場合

環境変数でbase pathを切り替える。

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/profile/',
})
```

Cloudflare Pages側の環境変数に以下を設定する。

```text
VITE_BASE_PATH=/
```

GitHub Pages用にビルドする場合は、環境変数を設定せずに `npm run build` を使う。

ただし、運用をシンプルにするなら方針Aを推奨する。

## Cloudflare Pages設定

Cloudflare Dashboardで以下を設定する。

1. Cloudflare Dashboardにログイン
2. `Workers & Pages` を開く
3. `Create application`
4. `Pages`
5. `Import an existing Git repository`
6. GitHub連携を許可し、`deraryo4559/profile` を選択
7. Build settingsを設定

```text
Project name: profile
Production branch: main
Framework preset: React (Vite) または None
Build command: npm run build
Build output directory: dist
Root directory: 空欄
```

必要に応じて環境変数を設定する。

```text
NODE_VERSION=20
```

方針Bを選ぶ場合のみ、追加で以下を設定する。

```text
VITE_BASE_PATH=/
```

## GitHubへpushする前の確認

```powershell
npm.cmd run lint
npm.cmd run build
git status
git add .
git commit -m "Prepare Cloudflare Pages deployment"
git push origin main
```

このリポジトリは現在 `origin` が以下に向いている。

```text
https://github.com/deraryo4559/profile.git
```

## 公開後の確認項目

Cloudflare Pagesの初回デプロイ後、以下を確認する。

- `/` でトップページが表示される
- `/profile` でプロフィールページが表示される
- `/news` でNEWS一覧が表示される
- `/news/ai-business-insights-2026-completed` などNEWS詳細直リンクが表示される
- `/contact` のフォームUIが表示される
- ロゴ、プロフィール画像、WORK画像、修了証PDFが404にならない
- モバイル表示でヘッダー、プロフィール写真、NEWSタグが崩れない

## Claude Codeに依頼するプロンプト

```text
あなたはこのリポジトリのデプロイ担当です。

対象リポジトリ:
https://github.com/deraryo4559/profile.git

ローカル作業ディレクトリ:
C:\Users\ryoon\workspace\profile

目的:
このVite + React + TypeScriptのプロフィールサイトをGitHubへpushし、Cloudflare Pagesで公開できる状態にしてください。

前提:
- Cloudflare PagesでGitHubリポジトリ連携デプロイを使う。
- 本番ブランチは main。
- Cloudflare Pagesの標準設定は Build command: npm run build、Build output directory: dist。
- Cloudflare PagesではルートURLで公開したい。
- 現在 vite.config.ts は GitHub Pages向けに base: '/profile/' になっている可能性がある。

作業方針:
1. まず現在の差分、ブランチ、remote、package.json、vite.config.ts、public配下を確認してください。
2. Cloudflare Pagesのルート公開に合わせて vite.config.ts の base を '/' に変更してください。
   - GitHub Pagesとの併用を強く維持した方がよいと判断した場合は、VITE_BASE_PATHで切り替える案を提案してから進めてください。
3. SPA直リンク対応のため、public/_redirects を追加してください。
   内容は以下:
   /* /index.html 200
4. 既存の public/404.html はGitHub Pages向けなので、Cloudflare Pagesでは _redirects を優先することを確認してください。削除は不要です。
5. npm.cmd run lint と npm.cmd run build を実行し、通ることを確認してください。
6. 失敗した場合は原因を調査して修正してください。不要なリファクタはしないでください。
7. 問題なければ git status を確認し、変更内容を要約してください。
8. 以下のようなコミットメッセージでコミットしてください。
   Prepare Cloudflare Pages deployment
9. origin が https://github.com/deraryo4559/profile.git であることを確認し、main にpushしてください。
10. Cloudflare Dashboardでの設定手順を最後にユーザーへ案内してください。

Cloudflare Pages設定:
- Project name: profile
- Production branch: main
- Framework preset: React (Vite) または None
- Build command: npm run build
- Build output directory: dist
- Root directory: 空欄
- Environment variable: NODE_VERSION=20

確認してほしいURL:
- /
- /profile
- /work
- /news
- /news/ai-business-insights-2026-completed
- /contact

注意:
- ユーザー未確認の大きなデザイン変更はしないでください。
- 修了証PDF、画像、ContactフォームのGoogleフォーム連携を壊さないでください。
- pushやCloudflare操作で認証が必要な場合は、勝手に回避せずユーザーに確認してください。
- 最終報告では、変更ファイル、実行したコマンド、Cloudflare側でユーザーが行う操作、公開後の確認URLを簡潔にまとめてください。
```
