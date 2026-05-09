# WORK / NEWS 一括作成用入力シート

このMarkdownは、WORK記事・NEWS記事をまとめて作成するための入力用ファイルです。
新しい実績や活動報告を追加したいときは、下のテンプレートに沿って内容を追記してください。

## 使い方

- 1記事につき1ブロックで記入する。
- `slug` はURLになるため、英小文字・数字・ハイフンで一意にする。
- `date` は `YYYY.MM.DD` 形式にする。
- 不明な項目は `未定` と書く。
- 画像やPDFがある場合は、プロジェクト内の相対パスを書く。
- 公開してよい情報だけを書く。守秘情報、個人情報、未公開の案件名は入れない。

## WORK記事テンプレート

```yaml
type: work
slug: example-work-2026
title: 実績タイトル
year: "2026"
category: Photography | AI / Software Development | Research / Technical Support | Web / Profile Site
tone: photo | ai | research
image: src/img/example.png
role: 担当範囲を短く記入
tools: 使用ツールを / 区切りで記入
description: 一覧カードに出す短い説明
overview: 何を制作・支援した実績か
challenge: 何が課題だったか
scope:
  - 担当したこと1
  - 担当したこと2
results:
  - 得られた成果1
  - 得られた成果2
metrics:
  - 期間: 1-3週間
  - 成果物: 写真30枚 / UI実装 / 分析メモ など
links:
  - label: GitHub
    href: https://example.com
```

## NEWS記事テンプレート

```yaml
type: news
slug: example-news-2026
date: "2026.05.09"
category: Website | Engineering | Photography | Research | Learning | Announcement
tone: website | ai | photo | research | learning
title: 記事タイトル
summary: 一覧と記事冒頭に出す短い要約
body:
  - 1段落目。何をしたか、なぜ報告するかを書く。
  - 2段落目。背景や学んだこと、今後への接続を書く。
points:
  - 主な内容1
  - 主な内容2
tags:
  - タグ1
  - タグ2
relatedWork: 関連するWORKのslug。なければ未定
certificate:
  src: docs/img/example/certificate.pdf
  title: 修了証や資料のタイトル
  caption: 掲載時の説明文
sourceLinks:
  - label: 参考ページ名
    href: https://example.com
```

## 入力欄

ここから下に、追加したいWORK・NEWSを貼り付けてください。

### NEWS: 記入例

```yaml
type: news
slug: ai-business-insights-2026-completed
date: "2026.04.10"
category: Learning
tone: learning
title: AI経営寄付講座 AI Business Insights 2026を修了
summary: 東京大学 松尾・岩澤研究室のAI経営寄付講座を受講し、AIを経営・事業実装へ接続する視点を学びました。
body:
  - 東京大学 松尾・岩澤研究室の「AI経営寄付講座 AI Business Insights 2026」を受講し、修了証をいただきました。
  - 講座では生成AIやAIエージェントなどの技術トレンドを踏まえ、AI時代の経営や事業実装について学びました。
points:
  - AI経営寄付講座 AI Business Insights 2026を修了
  - AIの技術トレンドとビジネス実装を横断的に学習
tags:
  - AI経営
  - AI Business Insights 2026
  - 松尾・岩澤研究室
relatedWork: 未定
certificate:
  src: docs/img/matsuolab/Certificate (2).pdf
  title: AI経営寄付講座 AI Business Insights 2026 修了証
  caption: 修了証記載の修了日: 2026年4月10日
sourceLinks:
  - label: 東京大学 松尾・岩澤研究室のお知らせ
    href: https://weblab.t.u-tokyo.ac.jp/news/ai-business-insights-2026/
```

### WORK: 記入欄

```yaml
type: work
slug: 
title: 
year: ""
category: 
tone: 
image: 
role: 
tools: 
description: 
overview: 
challenge: 
scope:
  - 
results:
  - 
metrics:
  - 
links:
  - label: 
    href: 
```

### NEWS: 記入欄

```yaml
type: news
slug: 
date: ""
category: 
tone: 
title: 
summary: 
body:
  - 
points:
  - 
tags:
  - 
relatedWork: 
certificate:
  src: 
  title: 
  caption: 
sourceLinks:
  - label: 
    href: 
```
