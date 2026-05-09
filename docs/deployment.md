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

## Claude Chromeに依頼するプロンプト（ブラウザ操作で初回デプロイ）

Claude Chromeなど、ブラウザ操作ができるAIにCloudflare Pagesの初回デプロイを依頼する場合は、以下のプロンプトを使う。

このプロンプトは「ブラウザ上でCloudflare DashboardとGitHubを操作する」ことを目的にしている。ローカルのターミナル操作はClaude Code向けの作業として分離する。

```text
あなたはブラウザ操作でCloudflare Pagesの初回デプロイを行う担当です。

目的:
GitHubリポジトリ `https://github.com/deraryo4559/profile.git` をCloudflare Pagesに接続し、`main` ブランチから本番サイトとして公開してください。

重要な前提:
- 操作はブラウザ上で行ってください。
- ターミナルやローカルファイル編集は使わないでください。
- Cloudflare / GitHub のログイン、2FA、権限確認が出た場合は、ユーザーに操作を引き継がせてください。パスワードや認証コードを推測・保存・入力しないでください。
- Cloudflare Pagesでは Git integration を使い、GitHubの `main` ブランチへのpushを本番デプロイのトリガーにしてください。
- Cloudflare Pagesは `*.pages.dev` または独自ドメインのルートURLで公開する想定です。

デプロイ前の確認:
1. GitHubで `https://github.com/deraryo4559/profile` を開き、リポジトリが存在することを確認してください。
2. `package.json` を開き、`build` script があることを確認してください。
3. 可能であれば `vite.config.ts` を確認してください。
   - `base: '/'` になっている、または環境変数でCloudflare側だけ `/` にできる状態ならデプロイに進んでください。
   - `base: '/profile/'` の固定値のままなら、Cloudflareのルート公開ではJS/CSS/assetsが壊れる可能性があります。その場合はデプロイを進めず、ユーザーに「先にCloudflare Pages用にvite.config.tsを修正してpushする必要がある」と報告してください。
4. 可能であれば `public/_redirects` があるか確認してください。
   - なくてもCloudflare Pages側でSPAとして動く場合がありますが、直リンク対策として `/* /index.html 200` を置く構成が望ましいです。ない場合は、公開後に `/profile` や `/news/...` の直リンクを必ず確認してください。

Cloudflare Dashboardでの操作:
1. `https://dash.cloudflare.com/` を開いてください。
2. ログインが必要な場合はユーザーに操作してもらってください。
3. 左メニューまたはトップから `Workers & Pages` を開いてください。
4. `Create application` を選択してください。
5. `Pages` を選択してください。
6. `Import an existing Git repository` または `Connect to Git` を選択してください。
7. GitHub連携を求められたら、ユーザーに許可操作をしてもらってください。
   - 可能なら `Only select repositories` を選び、`deraryo4559/profile` のみにアクセスを付与してください。
   - すでにGitHub連携済みなら次へ進んでください。
8. リポジトリ一覧から `deraryo4559/profile` を選択してください。
9. `Begin setup` または同等のボタンでビルド設定へ進んでください。

Cloudflare Pagesの設定値:
- Project name: `profile`
- Production branch: `main`
- Framework preset: `React (Vite)` があれば選択。なければ `None` でもよい。
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: 空欄、または `/`
- Environment variables:
  - `NODE_VERSION` = `20`
  - `VITE_BASE_PATH` = `/`

初回デプロイ:
1. 設定内容を見直し、`Save and Deploy` または同等のボタンを押してください。
2. ビルドログを確認してください。
3. `npm install` / `npm ci`、`npm run build`、assets upload が成功しているか確認してください。
4. 失敗した場合は、エラー文を要約してユーザーに報告してください。Cloudflare上の設定だけで直せるもの以外は、勝手にGitHub上のコード編集をしないでください。
5. 成功したら、Cloudflare Pagesが発行した `https://profile.pages.dev` などの公開URLを控えてください。

公開後の確認:
以下のURLをブラウザで開いて表示確認してください。実際の公開URLを `<PUBLIC_URL>` に置き換えてください。

- `<PUBLIC_URL>/`
- `<PUBLIC_URL>/profile`
- `<PUBLIC_URL>/work`
- `<PUBLIC_URL>/news`
- `<PUBLIC_URL>/news/ai-business-insights-2026-completed`
- `<PUBLIC_URL>/contact`

確認観点:
- トップページのロゴ、ヒーロー、WORK、NEWSが表示される
- `/profile` の人物写真が大きく崩れていない
- NEWS一覧のカテゴリタグが色分けされている
- `/contact` のフォームUIが表示される
- JS/CSS/assetsが404になっていない
- 直リンクで開いてもCloudflareの404にならない
- モバイル幅でもヘッダー、ヒーロー、プロフィール写真、NEWSタグが崩れない

最終報告で含めること:
- Cloudflare Pagesのプロジェクト名
- 公開URL
- デプロイ成功/失敗
- 失敗した場合のエラー概要
- 確認したURLと結果
- ユーザー側で追加対応が必要な項目

注意:
- 認証情報、2FAコード、アクセストークンを記録しないでください。
- GitHub連携の権限は必要最小限にしてください。
- すでに同名のCloudflare Pagesプロジェクトがある場合は、既存プロジェクトを壊さず、ユーザーに確認してから進めてください。
- 独自ドメイン設定は、ユーザーから明示的に依頼されるまでは行わないでください。
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
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH ?? '/profile/',
  }
})
```

Cloudflare Pages側の環境変数に以下を設定する。

```text
VITE_BASE_PATH=/
```

GitHub Pages用にビルドする場合は、環境変数を設定せずに `npm run build` を使う。

現在の実装は、既存のGitHub Pages公開も残せる方針Bを採用している。

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

このリポジトリではGitHub PagesとCloudflare Pagesを併用できるように、追加で以下を設定する。

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
2. Cloudflare Pagesのルート公開に合わせて vite.config.ts が `VITE_BASE_PATH` でbaseを切り替えられる状態か確認してください。
   - 現在の想定は、環境変数未指定時はGitHub Pages向けに `/profile/`、Cloudflare Pages側では `VITE_BASE_PATH=/` を指定して `/` に切り替える構成です。
   - すでにこの構成になっていれば、vite.config.tsを不要に変更しないでください。
3. SPA直リンク対応のため、public/_redirects が存在することを確認してください。
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
- Environment variable: VITE_BASE_PATH=/

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
