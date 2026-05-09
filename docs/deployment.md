# Deployment Plan

作成日: 2026-05-10
最終更新: 2026-05-10

## 目的

このリポジトリ `https://github.com/deraryo4559/profile.git` をCloudflare Pagesで公開し、最終的な公開URLを以下に統一する。

```text
https://ryo-onodera.com/profile
```

`https://profile-94u.pages.dev` はCloudflare Pagesの仮URL・確認用URLであり、最終的に案内するURLではない。

## 推奨方針

`ryo-onodera.com` の既存サイトや他パスを壊さないため、このプロフィールサイトは `/profile` 配下だけに載せる。

Cloudflare Pagesのカスタムドメインは基本的にホスト名単位のため、`ryo-onodera.com/profile` のようなパス配下に載せる場合は、CloudflareのOrigin RuleとURL Rewrite Ruleを使う。

構成:

- GitHub repo: `deraryo4559/profile`
- Cloudflare Pages project: `profile`
- Pages production branch: `main`
- Public URL: `https://ryo-onodera.com/profile`
- Pages origin/custom domain: `profile-origin.ryo-onodera.com`
- Public route: `ryo-onodera.com/profile*` -> `profile-origin.ryo-onodera.com`
- URL rewrite: `/profile/...` をPages originへ送る前に `/...` へ変換

参考:

- Cloudflare Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare Rules: Point to Pages with a custom domain: https://developers.cloudflare.com/rules/origin-rules/tutorials/point-to-pages-with-custom-domain/
- Cloudflare Pages build configuration: https://developers.cloudflare.com/pages/configuration/build-configuration/
- Cloudflare Pages redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Redirecting `*.pages.dev` to a custom domain: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

## リポジトリ側の設定

`vite.config.ts` は環境変数 `VITE_BASE_PATH` でbase pathを切り替える。

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

Cloudflare Pagesでは以下の環境変数を設定する。

```text
NODE_VERSION=20
VITE_BASE_PATH=/profile/
```

SPA直リンク対策として `public/_redirects` を置く。

```text
/* /index.html 200
```

`public/404.html` は、`github.io` と `ryo-onodera.com` では `/profile` をbaseとして扱い、`pages.dev` では仮確認用にルート基準で扱う。

## Cloudflare Pages設定

Cloudflare PagesのBuild settings:

```text
Project name: profile
Production branch: main
Framework preset: React (Vite) または None
Build command: npm run build
Build output directory: dist
Root directory: 空欄
Environment variable: NODE_VERSION=20
Environment variable: VITE_BASE_PATH=/profile/
```

## Cloudflareカスタムドメイン設定

Pages project `profile` に、公開用ではなくOrigin Rule用のカスタムドメインを追加する。

```text
profile-origin.ryo-onodera.com
```

Cloudflare Dashboard:

1. `Workers & Pages` を開く
2. `profile` projectを選択
3. `Custom domains`
4. `Set up a domain`
5. `profile-origin.ryo-onodera.com` を入力
6. `Continue` -> `Activate domain`

このドメインはユーザーに案内するURLではない。`ryo-onodera.com/profile` へルーティングするためのPages originとして使う。

## Origin Rule

`ryo-onodera.com` zoneでOrigin Ruleを作成する。

条件:

```text
http.host eq "ryo-onodera.com"
and (
  http.request.uri.path eq "/profile"
  or starts_with(http.request.uri.path, "/profile/")
)
```

設定:

```text
Host header: profile-origin.ryo-onodera.com
DNS record override: profile-origin.ryo-onodera.com
```

目的:

- `https://ryo-onodera.com/profile`
- `https://ryo-onodera.com/profile/work`
- `https://ryo-onodera.com/profile/assets/...`

これらのリクエストだけをPages projectへ送る。

## URL Rewrite Rule

同じ `ryo-onodera.com` zoneでURL Rewrite Ruleを作成し、Pages originへ送る前に `/profile` を取り除く。

条件:

```text
http.host eq "ryo-onodera.com"
and (
  http.request.uri.path eq "/profile"
  or starts_with(http.request.uri.path, "/profile/")
)
```

動的パス書き換え:

```text
regex_replace(http.request.uri.path, "^/profile/?", "/")
```

期待される変換:

```text
/profile        -> /
/profile/       -> /
/profile/work   -> /work
/profile/assets -> /assets
```

Dashboardで `regex_replace` が使いにくい場合は、以下の2つのURL Rewrite Ruleに分ける。

```text
1. https://ryo-onodera.com/profile
   Path rewrite: /

2. https://ryo-onodera.com/profile/*
   Path rewrite: /${1}
```

## pages.devの扱い

`https://profile-94u.pages.dev` は仮URLなので、最終的には案内しない。

必要ならCloudflareのBulk Redirectで以下へ転送する。

```text
Source: https://profile-94u.pages.dev/*
Target: https://ryo-onodera.com/profile/${1}
Status: 301
Preserve query string: on
Subpath matching / Preserve path suffix: on
```

## 公開後の確認URL

以下をブラウザ直リンクで確認する。

```text
https://ryo-onodera.com/profile
https://ryo-onodera.com/profile/about
https://ryo-onodera.com/profile/about/aces-internship
https://ryo-onodera.com/profile/work
https://ryo-onodera.com/profile/news
https://ryo-onodera.com/profile/news/ai-business-insights-2026-completed
https://ryo-onodera.com/profile/contact
```

確認観点:

- `profile-94u.pages.dev` ではなく `ryo-onodera.com/profile` で表示される
- `/profile/work` や `/profile/contact` の直リンクで白画面にならない
- JS/CSS/assetsが `/profile/assets/...` として404にならない
- ナビゲーションのリンクが `/profile/...` 配下になる
- Profile詳細ページは `/profile/about`
- 経歴ハイライト詳細は `/profile/about/...`
- モバイル表示でヘッダー、プロフィール写真、NEWSタグが崩れない

## Claude Chromeに依頼するプロンプト

```text
あなたはブラウザ操作でCloudflare Pagesの公開URLを修正する担当です。

目的:
現在の仮URL `https://profile-94u.pages.dev` ではなく、正式URL `https://ryo-onodera.com/profile` でプロフィールサイトを公開してください。

重要:
- 操作はブラウザ上で行ってください。
- Cloudflare / GitHub のログイン、2FA、権限確認が出た場合はユーザーに操作を引き継いでください。
- パスワード、認証コード、トークンを記録・推測しないでください。
- `ryo-onodera.com` の既存サイトや他のパスを壊さないでください。
- `ryo-onodera.com/profile` 配下だけをこのPages projectに向けてください。

前提:
- GitHub repo: https://github.com/deraryo4559/profile.git
- Cloudflare Pages project: profile
- Production branch: main
- Build command: npm run build
- Build output directory: dist
- 正式URL: https://ryo-onodera.com/profile
- 仮URL: https://profile-94u.pages.dev

1. GitHubとPagesの最新状態確認
- GitHubの main が最新コミットを指していることを確認してください。
- Cloudflare Pages project `profile` の最新デプロイが成功していることを確認してください。
- Build environment variablesを確認し、以下にしてください。
  NODE_VERSION=20
  VITE_BASE_PATH=/profile/
- もし `VITE_BASE_PATH=/` になっていたら `/profile/` に変更し、再デプロイしてください。

2. Pages origin用カスタムドメインの追加
- Cloudflare Dashboardで `Workers & Pages` -> `profile` -> `Custom domains` を開いてください。
- `Set up a domain` から以下を追加してください。
  profile-origin.ryo-onodera.com
- Activate domainまで完了してください。
- この `profile-origin.ryo-onodera.com` はユーザーに案内するURLではなく、Origin Rule用の内部的な宛先として扱ってください。

3. ryo-onodera.com zoneでOrigin Ruleを作成
- `ryo-onodera.com` zoneを開いてください。
- Rules -> Origin Rulesで新規ルールを作成してください。
- 条件は以下にしてください。
  http.host eq "ryo-onodera.com"
  and (
    http.request.uri.path eq "/profile"
    or starts_with(http.request.uri.path, "/profile/")
  )
- Origin settingsは以下にしてください。
  Host header: profile-origin.ryo-onodera.com
  DNS record override: profile-origin.ryo-onodera.com

4. URL Rewrite Ruleを作成
- Rules -> Transform Rules -> URL Rewrite Ruleを作成してください。
- 条件はOrigin Ruleと同じです。
  http.host eq "ryo-onodera.com"
  and (
    http.request.uri.path eq "/profile"
    or starts_with(http.request.uri.path, "/profile/")
  )
- 動的パス書き換えが使える場合、Pathを以下へ書き換えてください。
  regex_replace(http.request.uri.path, "^/profile/?", "/")
- Dashboard上で難しい場合は、2つのルールに分けてください。
  1. https://ryo-onodera.com/profile -> /
  2. https://ryo-onodera.com/profile/* -> /${1}

5. pages.devの扱い
- 可能ならBulk Redirectで `https://profile-94u.pages.dev/*` を `https://ryo-onodera.com/profile/${1}` に301リダイレクトしてください。
- Bulk Redirectの設定が難しければ、最低限ユーザーに「正式URLは `https://ryo-onodera.com/profile`。pages.devは仮URLとして残る」と報告してください。

6. 公開確認
以下を直リンクで開いて確認してください。

- https://ryo-onodera.com/profile
- https://ryo-onodera.com/profile/about
- https://ryo-onodera.com/profile/about/aces-internship
- https://ryo-onodera.com/profile/work
- https://ryo-onodera.com/profile/news
- https://ryo-onodera.com/profile/news/ai-business-insights-2026-completed
- https://ryo-onodera.com/profile/contact

確認観点:
- URLが `profile-94u.pages.dev` ではなく `ryo-onodera.com/profile` 配下になっている
- ナビゲーション後も `/profile/...` 配下に留まる
- JS/CSS/assetsが404にならない
- 直リンクで開いても白画面にならない
- Contactフォーム、NEWS、WORK、プロフィール写真が表示される

最終報告:
- 変更したCloudflare設定
- 最新デプロイの状態
- 正式公開URL
- 確認したURLと結果
- まだ残っている問題
```

## Claude Codeに依頼するプロンプト

```text
あなたはこのリポジトリのデプロイ設定担当です。

目的:
Cloudflare Pagesで `https://ryo-onodera.com/profile` 配下に公開できるよう、リポジトリ側の設定を確認・修正してください。

対象:
https://github.com/deraryo4559/profile.git
C:\Users\ryoon\workspace\profile

作業:
1. vite.config.ts が `VITE_BASE_PATH` を読み、未指定時は `/profile/` になることを確認してください。
2. Cloudflare Pages用の環境変数は `VITE_BASE_PATH=/profile/` を前提にしてください。
3. public/_redirects に `/* /index.html 200` があることを確認してください。
4. public/404.html が `ryo-onodera.com` と `github.io` では `/profile` をbaseとして扱うことを確認してください。
5. アプリ内のProfile詳細ページは `/about` にし、公開時に `https://ryo-onodera.com/profile/about` になるようにしてください。
6. npm.cmd run lint と npm.cmd run build を実行してください。
7. `VITE_BASE_PATH=/profile/` を設定した状態でも npm.cmd run build を実行してください。
8. 問題なければコミットして main にpushしてください。

確認URL:
- https://ryo-onodera.com/profile
- https://ryo-onodera.com/profile/about
- https://ryo-onodera.com/profile/work
- https://ryo-onodera.com/profile/news
- https://ryo-onodera.com/profile/contact
```
