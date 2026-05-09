import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Camera,
  CalendarDays,
  Check,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  FlaskConical,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Share2,
  Tags,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type MouseEvent, type ReactNode } from 'react'

import logoImage from '../docs/img/logo.png'
import matsuoAiBusinessCertificate from '../docs/img/matsuolab/Certificate (2).pdf?url'
import profileImage from './img/profile.png'
import workAiWorkflow from './img/work-ai-workflow.png'
import workEvent from './img/work-event.png'
import workLabTool from './img/work-lab-tool.png'
import workPortrait from './img/work-portrait.png'
import workProfileSite from './img/work-profile-site.png'
import workResearchData from './img/work-research-data.png'

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf2Tpe4ddexptPTEWkDBbElj3E6RlxbjtO51UD2hRA9QBtL5Q/viewform'
const formResponseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf2Tpe4ddexptPTEWkDBbElj3E6RlxbjtO51UD2hRA9QBtL5Q/formResponse'
const linkedInUrl =
  'https://www.linkedin.com/search/results/people/?keywords=Ryo%20Onodera%20%E5%B0%8F%E9%87%8E%E5%AF%BA%20%E8%AB%92'
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

const formEntries = {
  name: 'entry.703351664',
  email: 'entry.241287894',
  topic: 'entry.598556066',
  timeline: 'entry.498430248',
  budget: 'entry.803759608',
  reference: 'entry.660258185',
  message: 'entry.1010917838',
} as const

type WorkTone = 'photo' | 'ai' | 'research'
type NewsTone = WorkTone | 'website' | 'learning'
type HighlightTone = 'green' | 'blue' | 'yellow' | 'pink'
type WorkFilter = WorkTone | 'all'
type NewsFilter = string | 'all'

type WorkItem = {
  slug: string
  title: string
  description: string
  year: string
  image: string
  tone: WorkTone
  category: string
  role: string
  tools: string
  overview: string
  challenge: string
  scope: string[]
  results: string[]
  metrics: string[]
}

type WorkColumn = {
  id: WorkTone
  title: string
  icon: LucideIcon
  items: WorkItem[]
}

type NewsItem = {
  slug: string
  date: string
  category: string
  tone: NewsTone
  title: string
  summary: string
  body: string[]
  points: string[]
  tags?: string[]
  relatedWork?: string
  certificate?: {
    src: string
    title: string
    caption: string
  }
  sourceLinks?: Array<{
    label: string
    href: string
  }>
}

type LinkItem = {
  title: string
  description: string
  href?: string
  path?: string
  icon: LucideIcon
}

type HighlightSection = {
  title: string
  body: string
}

type HighlightItem = {
  slug: string
  label: string
  caption: string
  pageTitle: string
  summary: string
  lead: string
  icon: LucideIcon
  tone: HighlightTone
  requirements: string[]
  sections: HighlightSection[]
  relatedWorkSlugs?: string[]
  links?: Array<{
    label: string
    path?: string
    href?: string
  }>
}

const navItems: Array<{ label: string; path: string; hash?: string }> = [
  { label: 'PROFILE', path: '/about' },
  { label: 'WORK', path: '/work' },
  { label: 'NEWS', path: '/news' },
  { label: 'LINK', path: '/link' },
]

const highlights: HighlightItem[] = [
  {
    slug: 'aces-internship',
    label: 'ACES Internship',
    caption: 'インターン参加',
    pageTitle: 'ACES Internship',
    summary: 'AIスタートアップで実務開発に参加し、研究とプロダクトをつなぐ視点を磨いた経験。',
    lead:
      'ACES株式会社での長期インターンでは、公開できる範囲でAI・アルゴリズム領域に近い実務開発に参加しました。技術を試すだけでなく、事業課題に合わせて仮説を立て、検証し、チームで改善していく進め方を学んでいます。',
    icon: BriefcaseBusiness,
    tone: 'green',
    requirements: [
      'AI・アルゴリズム領域の実務開発に触れ、実装と検証の進め方を学んだ',
      '守秘情報に配慮しながら、公開可能な範囲で担当領域と学びを説明',
      '研究での論理的な整理力を、プロダクト開発の小さな検証に接続',
      'AIワークフローやデータ整理の相談に活かせる視点を獲得',
    ],
    sections: [
      {
        title: '担当したこと（公開可能範囲）',
        body:
          'AIを用いた課題解決に近い環境で、実装・検証・改善のサイクルに参加しました。未公開の案件名や社内情報は伏せつつ、実務で求められる精度、再現性、チーム内での伝え方を意識して取り組みました。',
      },
      {
        title: '身についた視点',
        body:
          'AIの出力や実装結果をそのまま信じるのではなく、目的に対して何を測り、どの粒度で改善すべきかを考える姿勢が身につきました。研究で培った整理力を、実際のプロダクト開発へ落とし込む経験になっています。',
      },
      {
        title: '現在の制作との接続',
        body:
          '現在はAIワークフロー、データ整理、業務効率化、プロトタイプ開発などの相談に、この経験を活かしています。小さく試し、必要な部分から形にする進め方を大切にしています。',
      },
    ],
    relatedWorkSlugs: ['ai-workflow-tool-2026', 'profile-website-design-2025'],
  },
  {
    slug: 'matsuo-lecture',
    label: '松尾研寄附講座 修了',
    caption: '修了証取得',
    pageTitle: '松尾研寄附講座 修了',
    summary: '松尾・岩澤研究室関連のAI講座で、深層学習とAI経営・社会実装の両面を学んだ記録。',
    lead:
      '松尾・岩澤研究室関連の講座では、深層学習の実装寄りの学習に加えて、AIを経営・事業・組織へどう接続するかを学びました。修了実績そのものよりも、AIを「技術として作る」視点と「現場で使われる形にする」視点の両方を得たことを重視しています。',
    icon: BookOpen,
    tone: 'blue',
    requirements: [
      'Deep Learning 応用講座 2025 Springを修了',
      'AI経営寄付講座 AI Business Insights 2026を修了',
      '深層学習の技術理解と、AIの事業実装・組織活用の視点を学習',
      '個人開発、研究支援、AI導入前の課題整理に活かせる知識として整理',
    ],
    sections: [
      {
        title: '受講した講座',
        body:
          '修了証として確認できる講座は、Deep Learning 応用講座 2025 Springと、東京大学AI経営寄付講座 AI Business Insights 2026です。前者では深層学習の実装・応用寄りの理解を、後者では生成AIやAIエージェントを含むAI活用を、経営・事業・組織の観点から捉える視点を学びました。',
      },
      {
        title: 'AI Business Insights 2026で学んだこと',
        body:
          'AI Business Insights 2026は、ビジネスとテクノロジーの両面からAIを理解し、AIの社会実装を担う人材育成を目的とした全10回の講座です。全体戦略、事業機能、バックオフィスの3つの観点から、技術戦略、プロダクト開発、マーケティング・営業、人材育成・組織運営などを横断的に扱っていました。',
      },
      {
        title: '現在の開発・研究支援との接続',
        body:
          'AI導入の前段階では、モデルやツールの選定だけでなく、目的、業務フロー、運用体制、リスクを整理する必要があります。この学習経験を、AIワークフロー開発、研究データ整理、プロトタイプ検証などの相談に接続しています。',
      },
    ],
    relatedWorkSlugs: ['ai-workflow-tool-2026', 'research-data-support-2025'],
    links: [{ label: '修了証NEWSを見る', path: '/news/ai-business-insights-2026-completed' }],
  },
  {
    slug: 'github-repositories',
    label: 'GitHub公開リポジトリ',
    caption: 'プロジェクト公開中',
    pageTitle: 'GitHub公開リポジトリ',
    summary: 'AI、Web、データ整理などの公開コードを通じて、実装力と制作姿勢を確認できる入口。',
    lead:
      'GitHubでは、AIワークフロー、Web制作、データ処理、研究支援に関わるコードを公開しています。完成物だけでなく、README、構成、再現性、改善の履歴から制作スタイルを見てもらえるように整えています。',
    icon: Github,
    tone: 'yellow',
    requirements: [
      'AI、Web、データ整理などの公開リポジトリを継続的に整備',
      'README、再現手順、UI実装など、初見でも追いやすい情報を意識',
      'このプロフィールサイト自体も制作実績として公開・改善',
      '相談前に技術スタックや実装の雰囲気を確認できる導線を用意',
    ],
    sections: [
      {
        title: '公開しているもの',
        body:
          'AIワークフロー、Web制作、データ処理、研究支援に関わるリポジトリを公開しています。用途別に整理し、初見の人がどこから見ればよいか分かる状態を目指しています。',
      },
      {
        title: '見てほしいポイント',
        body:
          '単に動くものを置くだけでなく、読みやすさ、再利用しやすさ、実際の運用を意識してコードを整える姿勢を大切にしています。READMEや画面の構造から、制作の考え方も伝わるようにしています。',
      },
      {
        title: '今後増やしたい領域',
        body:
          'Web実装、業務ツール、AI連携、データ整形などの公開事例を増やしていく予定です。相談前に技術的な雰囲気を確認できる入口として育てています。',
      },
    ],
    relatedWorkSlugs: ['profile-website-design-2025', 'ai-workflow-tool-2026', 'lab-tool-development-2024'],
    links: [{ label: 'GitHubを開く', href: 'https://github.com/deraryo4559' }],
  },
  {
    slug: 'photography-activity',
    label: '撮影活動',
    caption: 'ポートレート・イベント撮影',
    pageTitle: '撮影活動',
    summary: 'ポートレート、イベント、広報素材など、目的に合わせて使いやすい写真を制作する活動。',
    lead:
      '人物や団体の活動が自然に伝わる写真を撮影しています。プロフィール写真、SNS用ポートレート、学生団体・イベントの記録など、使う媒体や目的に合わせて撮影内容を整理します。',
    icon: Camera,
    tone: 'pink',
    requirements: [
      'プロフィール、ポートレート、イベント、SNS・広報素材の撮影に対応',
      '相談から撮影、セレクト、レタッチ、納品まで一貫して整理',
      '自然光、清潔感、WebやSNSで使いやすい余白を意識',
      'InstagramとWORKのPhotography実績から作例を確認可能',
    ],
    sections: [
      {
        title: '対応できる撮影',
        body:
          'プロフィール写真、SNS用ポートレート、学生団体・サークル・イベントの記録撮影などに対応しています。個人の印象づくりから団体の活動記録まで、目的に合わせて撮影します。',
      },
      {
        title: '制作フロー',
        body:
          '相談時に使用媒体、必要カット数、希望納期を確認し、撮影後は用途に合わせてセレクトとレタッチを行います。必要に応じてWebやSNSで使いやすい比率も意識して納品します。',
      },
      {
        title: '納品で意識していること',
        body:
          '写真単体の見栄えだけでなく、プロフィール、告知、活動報告などで実際に使いやすいことを重視しています。自然な表情、余白、色調の統一感を大切にしています。',
      },
    ],
    relatedWorkSlugs: ['portrait-photography-2026', 'student-event-photo-2026'],
    links: [
      {
        label: 'Instagramを開く',
        href: 'https://www.instagram.com/d_ryo_photo?igsh=eGltZTJxZzIxNG9r&utm_source=qr',
      },
    ],
  },
]

const workColumns: WorkColumn[] = [
  {
    id: 'photo',
    title: 'PHOTOGRAPHY',
    icon: Camera,
    items: [
      {
        slug: 'portrait-photography-2026',
        title: 'Portrait Photography 2026',
        description: 'ポートレート撮影・自然光ブランディング',
        year: '2026',
        image: workPortrait,
        tone: 'photo',
        category: 'Photography',
        role: '撮影 / レタッチ / 納品',
        tools: 'Mirrorless Camera / Lightroom / Photoshop',
        overview:
          'SNS、プロフィール、活動紹介などに使いやすい自然光ポートレートを撮影。用途に合わせて表情、背景、余白を整理しました。',
        challenge: '本人らしさと仕事で使える信頼感を両立し、各SNSの比率でも使いやすい写真にすること。',
        scope: ['撮影企画', 'ロケーション選定', '自然光ポートレート撮影', 'レタッチ', 'Web/SNS向け書き出し'],
        results: ['プロフィールやSNSで使いやすい自然な写真を制作', '複数比率で展開できる余白を確保', '短時間撮影でも安定した納品フローを整理'],
        metrics: ['納品目安: 30-50枚', '撮影: 1日', 'レタッチ: 3日目安'],
      },
      {
        slug: 'student-event-photo-2026',
        title: 'Student Event Photo 2026',
        description: '学生団体イベント撮影・記録写真',
        year: '2026',
        image: workEvent,
        tone: 'photo',
        category: 'Photography',
        role: 'イベント撮影 / 記録 / セレクト',
        tools: 'Mirrorless Camera / Lightroom',
        overview:
          '学生団体やサークルイベントの様子を、広報や活動記録に使える形で撮影。集合写真と自然なスナップを組み合わせました。',
        challenge: '人数が多い場でもイベントの熱量と参加者の雰囲気が伝わる写真を残すこと。',
        scope: ['イベント記録撮影', '集合写真', '広報向けセレクト', '色調整', '納品データ整理'],
        results: ['活動報告に使いやすい写真を制作', '参加者の雰囲気が伝わるカットを確保', '広報素材として再利用しやすい構成に整理'],
        metrics: ['納品目安: 80-150枚', '撮影: 半日-1日', '用途: 広報・記録'],
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI / SOFTWARE',
    icon: Code2,
    items: [
      {
        slug: 'ai-workflow-tool-2026',
        title: 'AI Workflow Tool 2026',
        description: '業務効率化のためのAIワークフローツール開発',
        year: '2026',
        image: workAiWorkflow,
        tone: 'ai',
        category: 'AI / Software Development',
        role: '企画 / 設計 / 開発 / テスト',
        tools: 'Python / FastAPI / LangChain / OpenAI API / React / PostgreSQL',
        overview:
          '日々の書類整理や問い合わせ対応に使うAIワークフローを設計し、入力から出力までの処理を小さなツールとしてまとめました。',
        challenge: '属人的な確認作業を減らし、手作業で繰り返していた処理を安全に半自動化すること。',
        scope: ['要件整理', 'バックエンド開発', 'フロントエンド開発', 'AI連携', 'テスト', 'デプロイ'],
        results: ['作業時間を約60%削減する想定フローを作成', 'レポート作成前の情報整理を自動化', '学習コストを抑えたシンプルなUIで管理'],
        metrics: ['期間: 2-4週間想定', '範囲: 設計-実装', '用途: 業務効率化'],
      },
      {
        slug: 'profile-website-design-2025',
        title: 'Profile Website Design 2025',
        description: '個人・研究者向けプロフィールサイト制作',
        year: '2025',
        image: workProfileSite,
        tone: 'ai',
        category: 'Web / Profile Site',
        role: '情報設計 / UI実装 / レスポンシブ対応',
        tools: 'React / TypeScript / Vite / Tailwind CSS',
        overview:
          'プロフィール、実績、リンク、問い合わせ導線を整理し、名刺代わりに使える個人サイトとして設計・実装しました。',
        challenge: '作品集とプロフィールサイトの役割を分け、初見でも人物像と相談できる内容が伝わる構成にすること。',
        scope: ['要件整理', '情報設計', 'React実装', 'レスポンシブ対応', 'OGP/SEO調整'],
        results: ['Profile / WORK / NEWS / LINK の構成を整理', 'スマホでも迷わないナビゲーションを実装', '外部リンクと問い合わせ導線を一元化'],
        metrics: ['期間: 1-3週間', '範囲: 情報設計-実装', '対応: レスポンシブ'],
      },
    ],
  },
  {
    id: 'research',
    title: 'RESEARCH / TECHNICAL SUPPORT',
    icon: FlaskConical,
    items: [
      {
        slug: 'research-data-support-2025',
        title: 'Research Data Support 2025',
        description: '研究データの解析・可視化・技術支援',
        year: '2025',
        image: workResearchData,
        tone: 'research',
        category: 'Research / Technical Support',
        role: '分析補助 / 可視化 / 資料整理',
        tools: 'Python / pandas / matplotlib / Excel',
        overview:
          '研究データの整理、可視化、比較用グラフの作成を支援。発表や検討に使いやすい形へ変換しました。',
        challenge: '散らばったデータを比較しやすく整え、研究判断に使える見え方にすること。',
        scope: ['データ整理', 'グラフ作成', '分析メモ作成', '資料向け出力', '再利用できる処理整理'],
        results: ['研究データの傾向把握をしやすく整理', '発表資料に転用しやすいグラフを作成', '作業手順を再現可能な形で記録'],
        metrics: ['期間: 1-2週間', '成果物: 図表・メモ', '対応: 匿名化可'],
      },
      {
        slug: 'lab-tool-development-2024',
        title: 'Lab Tool Development 2024',
        description: '研究室向けのデータ整理・運用支援ツール',
        year: '2024',
        image: workLabTool,
        tone: 'research',
        category: 'Research / Technical Support',
        role: '小規模ツール開発 / 運用整理',
        tools: 'Python / Google Sheets / GAS / GitHub',
        overview:
          '研究室内のデータ整理や共有作業を想定し、手作業を減らすための小規模な管理ツールを検討・制作しました。',
        challenge: '専門的な開発環境に依存しすぎず、研究室メンバーが扱いやすい運用に落とし込むこと。',
        scope: ['運用ヒアリング', 'データ構造整理', '簡易ツール開発', '操作手順作成', '改善案整理'],
        results: ['データ共有の手順を明確化', '定型作業を減らす小さな自動化案を作成', '研究室内で引き継ぎやすい構成に整理'],
        metrics: ['期間: 2-4週間', '範囲: 運用整理-試作', '技術: Python/GAS'],
      },
    ],
  },
]

const works = workColumns.flatMap((column) => column.items)

const newsItems: NewsItem[] = ([
  {
    slug: 'profile-site-top-renewal',
    date: '2026.05.09',
    category: 'Website',
    tone: 'website',
    title: 'プロフィールサイトのトップページ方針を更新',
    summary: 'Profile / WORK / NEWS / LINK の4セクション構成に整理しました。',
    body: [
      'プロフィールサイトのトップページを、人物理解と仕事の相談導線が伝わりやすい構成へ見直しました。',
      'これまで分かれていた「できること」と「実績」をWORKとして統合し、撮影・開発・研究支援を仕事として確認できる導線にしています。',
    ],
    points: ['Profile / WORK / NEWS / LINK の4セクション化', 'WORKカードとNEWSリストの整理', 'レスポンシブ時のハンバーガーメニュー方針を追加'],
  },
  {
    slug: 'contact-google-form-integrated',
    date: '2026.05.09',
    category: 'Website',
    tone: 'website',
    title: 'ContactフォームをGoogleフォーム連携に更新',
    summary: 'サイトのデザインになじむ入力画面から、Googleフォームへ直接送信できるようにしました。',
    body: [
      'お問い合わせページを、Googleフォームの埋め込みではなくサイト内のフォームUIとして整えました。',
      '撮影、AI開発、研究支援、Web制作、採用・協業などの相談内容を選びやすくし、返信に必要な情報だけを入力できる形にしています。',
    ],
    points: ['Googleフォームへの直接送信', '日本語の補助ラベルを追加', '相談内容のカテゴリを整理'],
  },
  {
    slug: 'matsuo-learning-note',
    date: '2026.04.05',
    category: 'Learning',
    tone: 'learning',
    title: 'AI・機械学習の学習記録を整理',
    summary: '松尾研寄附講座で学んだ内容を、個人開発や研究支援へつなげる観点で整理しました。',
    body: [
      '機械学習・深層学習の基礎を、実装や相談対応にどう活かすかという観点で学習記録を整理しました。',
      'モデルや手法の名前を覚えるだけでなく、課題に対して何を検証するべきかを考えるためのメモとして残しています。',
    ],
    points: ['学習テーマの棚卸し', '実装への接続を整理', 'PROFILE詳細ページへ反映'],
  },
  {
    slug: 'ai-business-insights-2026-completed',
    date: '2026.04.10',
    category: 'Learning',
    tone: 'learning',
    title: 'AI経営寄付講座 AI Business Insights 2026を修了',
    summary: '東京大学 松尾・岩澤研究室のAI経営寄付講座を受講し、AIを経営・事業実装へ接続する視点を学びました。',
    body: [
      '東京大学 松尾・岩澤研究室の「AI経営寄付講座 AI Business Insights 2026」を受講し、修了証をいただきました。修了証に記載された修了日は2026年4月10日です。',
      '本講座は、ビジネスとテクノロジーの両面からAIを理解し、AIの社会実装を担う人材育成を目的とした全10回のオンライン講座です。生成AI、AIエージェント、フィジカルAIなどの技術トレンドを踏まえながら、AI時代の経営や事業実装について学ぶ構成でした。',
      'カリキュラムでは、全体戦略、事業機能、バックオフィスの3つの観点から、ビジネス戦略、技術戦略、プロダクト開発、マーケティング・営業、カスタマーサポート、財務・監査、人材育成・組織運営などを横断的に扱っていました。個人開発や研究支援においても、AIを単なるツールではなく、目的・組織・運用に接続して考える重要性を再確認しました。',
    ],
    points: [
      'AI経営寄付講座 AI Business Insights 2026を修了',
      '修了証記載の修了日: 2026年4月10日',
      'AIの技術トレンドとビジネス実装を横断的に学習',
      'AI活用を目的、運用、組織設計と結びつける視点を整理',
    ],
    tags: ['AI経営', 'AI Business Insights 2026', '松尾・岩澤研究室', '生成AI', 'AIエージェント'],
    certificate: {
      src: matsuoAiBusinessCertificate,
      title: 'AI経営寄付講座 AI Business Insights 2026 修了証',
      caption: '東京大学AI経営寄付講座 AI Business Insights 2026 修了証（修了日: 2026年4月10日）',
    },
    sourceLinks: [
      {
        label: '東京大学 松尾・岩澤研究室のお知らせ',
        href: 'https://weblab.t.u-tokyo.ac.jp/news/ai-business-insights-2026/',
      },
      {
        label: 'PwC Japan 講座概要',
        href: 'https://www.pwc.com/jp/ja/seminars/ai-transformation-for-business2026.html',
      },
    ],
  },
  {
    slug: 'photo-portfolio-instagram-update',
    date: '2026.03.28',
    category: 'Photography',
    tone: 'photo',
    title: '撮影ポートフォリオの作例を更新',
    summary: 'ポートレートとイベント撮影の作例を、依頼前に見やすいよう整理しました。',
    body: [
      '撮影依頼を検討する方が雰囲気を確認しやすいよう、ポートレートとイベント撮影の作例を整理しました。',
      '自然光、余白、SNSやWebでの使いやすさが伝わるカットを中心に、今後も継続的に更新していきます。',
    ],
    points: ['ポートレート作例を整理', 'イベント撮影の用途を明示', 'Instagramへの導線を確認'],
    relatedWork: 'portrait-photography-2026',
  },
  {
    slug: 'ai-workflow-tool-github',
    date: '2026.04.20',
    category: 'Engineering',
    tone: 'ai',
    title: '個人開発ツールをGitHubに公開',
    summary: '小規模な業務効率化を想定したAIワークフローツールを公開しました。',
    body: [
      '日常的な確認作業や情報整理を効率化するための個人開発ツールをGitHubに公開しました。',
      'フォーム入力、データ整形、PDFレポート作成など、手作業で繰り返していた処理を小さく自動化することを目的にしています。',
    ],
    points: ['Googleフォームの回答を自動で集計', 'データを整形してレポート用CSVを生成', 'スケジュール実行に対応'],
    relatedWork: 'ai-workflow-tool-2026',
  },
  {
    slug: 'student-event-photo',
    date: '2026.03.15',
    category: 'Photography',
    tone: 'photo',
    title: '学生団体イベントの撮影を担当',
    summary: '学生団体のイベント記録と広報用写真の撮影を担当しました。',
    body: [
      '学生団体イベントの記録写真と広報向け素材の撮影を担当しました。',
      '集合写真だけでなく、イベント中の自然な表情や場の熱量が伝わるカットを意識して撮影しています。',
    ],
    points: ['イベント全体の記録撮影', 'SNSや活動報告向けの写真をセレクト', '集合写真とスナップを組み合わせて納品'],
    relatedWork: 'student-event-photo-2026',
  },
  {
    slug: 'research-data-support-start',
    date: '2026.02.28',
    category: 'Research',
    tone: 'research',
    title: '研究データ解析の技術支援プロジェクトに参加',
    summary: '研究データの整理、可視化、資料化を支援するプロジェクトに参加しました。',
    body: [
      '研究データを発表や検討に使いやすい形へ整理する技術支援プロジェクトに参加しました。',
      'データのばらつきや比較観点を確認しながら、グラフ化と資料化を進めています。',
    ],
    points: ['データの前処理', '散布図・棒グラフの作成', '発表資料に使える図表の整理'],
    relatedWork: 'research-data-support-2025',
  },
  {
    slug: 'portfolio-work-section-update',
    date: '2026.02.10',
    category: 'Website',
    tone: 'website',
    title: 'ポートフォリオのWORKセクションを更新',
    summary: '写真・AI・研究支援の実績が見やすくなるようにWORK構成を更新しました。',
    body: [
      'ポートフォリオのWORKセクションを整理し、実績のカテゴリや見せ方を更新しました。',
      '写真、AI/Software、Researchの3軸が分かるように、カードと一覧の構成を見直しています。',
    ],
    points: ['WORKカテゴリを3軸に整理', '実績カードの説明を更新', '問い合わせ導線との接続を改善'],
  },
] as NewsItem[]).sort((a, b) => b.date.localeCompare(a.date))

const links: LinkItem[] = [
  {
    title: 'Portfolio',
    description: '写真作品と制作実績',
    href: 'https://ryo-onodera.com/my-portfolio/',
    icon: Camera,
  },
  {
    title: 'GitHub',
    description: 'AI・Web・データ分析の実装',
    href: 'https://github.com/deraryo4559',
    icon: Github,
  },
  {
    title: 'Laboratory',
    description: '所属研究室と研究活動',
    href: 'https://hirosawalab.ynu.ac.jp/',
    icon: FlaskConical,
  },
  {
    title: 'Instagram',
    description: '写真作品と撮影活動',
    href: 'https://www.instagram.com/d_ryo_photo?igsh=eGltZTJxZzIxNG9r&utm_source=qr',
    icon: Instagram,
  },
  {
    title: 'LinkedIn',
    description: '経歴とプロフィール',
    href: linkedInUrl,
    icon: Linkedin,
  },
]

const workFilters: Array<{ label: string; value: WorkFilter }> = [
  { label: 'ALL', value: 'all' },
  { label: 'PHOTOGRAPHY', value: 'photo' },
  { label: 'AI / SOFTWARE', value: 'ai' },
  { label: 'RESEARCH / TECH SUPPORT', value: 'research' },
]

const newsFilters: Array<{ label: string; value: NewsFilter }> = [
  { label: 'ALL', value: 'all' },
  { label: 'WEBSITE', value: 'Website' },
  { label: 'ENGINEERING', value: 'Engineering' },
  { label: 'PHOTOGRAPHY', value: 'Photography' },
  { label: 'RESEARCH', value: 'Research' },
  { label: 'LEARNING', value: 'Learning' },
  { label: 'ANNOUNCEMENT', value: 'Announcement' },
]

const contactTopics = ['撮影依頼', 'AI開発相談', '研究支援', 'Web制作', '採用・協業のご相談', 'その他']

const contactRequirements = [
  'サイト内のデザインになじむフォームUIから、Googleフォームへ直接送信する',
  '撮影、AI/開発、研究支援、Web制作などの相談内容を整理して送信できる',
  '送信に失敗した場合や別画面で確認したい場合に備え、Googleフォームを別タブで開ける導線を用意する',
  '個人情報を過度に求めず、返信と相談整理に必要な範囲だけを入力してもらう',
]

const profileAboutItems: Array<{ icon: LucideIcon; label: string; value: string }> = [
  { icon: GraduationCap, label: '学歴', value: '大学院 / 材料工学専攻' },
  { icon: Building2, label: '所属', value: '東京工業大学（松尾研寄附講座 修了）' },
  { icon: MapPin, label: '所在地', value: 'Tokyo / Kawasaki / Yokohama' },
  { icon: Camera, label: '写真撮影', value: 'ポートレート・イベント・広報素材' },
  { icon: Code2, label: 'AI / ソフトウェア開発', value: 'AIワークフロー・データ分析・プロトタイプ開発' },
  { icon: Monitor, label: 'Web制作・デザイン', value: 'プロフィールサイト・UI実装・導線設計' },
  { icon: FlaskConical, label: '研究活動・技術支援', value: '研究支援・技術検証・レポート執筆' },
]

const careerItems = [
  {
    period: '2025 - 現在',
    title: '株式会社ACES 長期インターン',
    description: 'AI・アルゴリズム領域に近い実務開発で、実装・検証・改善の進め方を学んでいます。',
    path: '/about/aces-internship',
  },
  {
    period: '2024',
    title: '松尾研寄附講座 修了',
    description: '機械学習・深層学習の基礎と応用を体系的に学習しました。',
    path: '/about/matsuo-lecture',
  },
  {
    period: '2023 - 現在',
    title: 'GitHub公開リポジトリ',
    description: 'AI、Web、データ分析などのコードを継続的に公開しています。',
    path: '/about/github-repositories',
  },
  {
    period: '2022 - 現在',
    title: '撮影活動',
    description: 'ポートレート、イベント、企業・団体の広報素材の撮影に取り組んでいます。',
    path: '/about/photography-activity',
  },
]

const profileSkillColumns: Array<{ icon: LucideIcon; title: string; tone: WorkTone | 'website'; items: string[] }> = [
  {
    icon: Camera,
    title: 'Photography',
    tone: 'photo',
    items: ['ポートレート撮影', 'イベント撮影', '商品・サービス撮影', 'レタッチ / 写真編集'],
  },
  {
    icon: Code2,
    title: 'AI / Software',
    tone: 'ai',
    items: ['AIワークフロー開発', 'データ分析 / 可視化', 'Python / FastAPI', 'Webアプリプロトタイプ'],
  },
  {
    icon: FlaskConical,
    title: 'Research',
    tone: 'research',
    items: ['材料工学の研究活動', '機械学習の理論学習', '実験データ解析', '技術レポート・執筆'],
  },
  {
    icon: Monitor,
    title: 'Web / Design',
    tone: 'website',
    items: ['Webサイト制作', 'UI / デザイン設計', 'コーディング / 実装', 'ブランディング支援'],
  },
]

function createHref(path: string, hash = '') {
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '')
  return `${basePath}${normalized}${hash}`
}

function normalizePath(path: string | null) {
  if (!path) {
    return '/'
  }

  const pathOnly = path.split('?')[0].split('#')[0]
  const withSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`
  const withoutBase = basePath && withSlash.startsWith(basePath) ? withSlash.slice(basePath.length) || '/' : withSlash
  return withoutBase === '/' ? '/' : withoutBase.replace(/\/+$/, '')
}

function readPathFromLocation() {
  const redirectRoute = new URLSearchParams(window.location.search).get('route')
  if (redirectRoute) {
    const routePath = normalizePath(redirectRoute)
    window.history.replaceState({}, '', createHref(routePath))
    return routePath
  }

  return normalizePath(window.location.pathname)
}

function findWork(slug: string | undefined) {
  return works.find((item) => item.slug === slug)
}

function findNews(slug: string | undefined) {
  return newsItems.find((item) => item.slug === slug)
}

function findHighlight(slug: string | undefined) {
  return highlights.find((item) => item.slug === slug)
}

function toneLabel(tone: WorkTone) {
  if (tone === 'photo') {
    return 'PHOTOGRAPHY'
  }

  if (tone === 'ai') {
    return 'AI / SOFTWARE'
  }

  return 'RESEARCH / TECH SUPPORT'
}

function splitTools(tools: string) {
  return tools.split('/').map((tool) => tool.trim()).filter(Boolean)
}

function newsTags(news: NewsItem) {
  const relatedWork = findWork(news.relatedWork)
  const workTools = relatedWork ? splitTools(relatedWork.tools).slice(0, 3) : []
  return [news.category, ...(news.tags ?? []), ...workTools].slice(0, 7)
}

function newsTagTone(tag: string) {
  const normalized = tag.toLowerCase()

  if (
    normalized.includes('learning') ||
    tag.includes('講座') ||
    tag.includes('松尾') ||
    tag.includes('AI経営') ||
    normalized.includes('deep learning') ||
    tag.includes('生成AI') ||
    tag.includes('AIエージェント')
  ) {
    return 'learning'
  }

  if (
    normalized.includes('photo') ||
    normalized.includes('instagram') ||
    tag.includes('撮影') ||
    tag.includes('ポートレート')
  ) {
    return 'photo'
  }

  if (
    normalized.includes('research') ||
    normalized.includes('pandas') ||
    normalized.includes('matplotlib') ||
    tag.includes('研究') ||
    tag.includes('材料') ||
    tag.includes('データ')
  ) {
    return 'research'
  }

  if (
    normalized.includes('website') ||
    normalized.includes('web') ||
    normalized.includes('react') ||
    normalized.includes('ui') ||
    normalized.includes('portfolio') ||
    normalized.includes('profile')
  ) {
    return 'website'
  }

  if (
    normalized.includes('engineering') ||
    normalized.includes('ai') ||
    normalized.includes('software') ||
    normalized.includes('python') ||
    normalized.includes('fastapi') ||
    normalized.includes('openai') ||
    normalized.includes('langchain')
  ) {
    return 'ai'
  }

  return 'neutral'
}

function newsCategoryTone(value: NewsFilter) {
  if (value === 'Website') {
    return 'website'
  }

  if (value === 'Engineering') {
    return 'ai'
  }

  if (value === 'Photography') {
    return 'photo'
  }

  if (value === 'Research') {
    return 'research'
  }

  if (value === 'Learning') {
    return 'learning'
  }

  if (value === 'Announcement') {
    return 'announcement'
  }

  return 'all'
}

function newsCategoryClassName(category: string) {
  return `news-category news-category--${newsCategoryTone(category)}`
}

function newsCategoryStyle(category: string): CSSProperties {
  const tone = newsCategoryTone(category)

  if (tone === 'website') {
    return { background: 'var(--pink)', color: '#fff' }
  }

  if (tone === 'ai') {
    return { background: 'var(--blue)', color: '#fff' }
  }

  if (tone === 'photo') {
    return { background: 'var(--green)', color: '#fff' }
  }

  if (tone === 'research') {
    return { background: 'var(--yellow)', color: '#111' }
  }

  if (tone === 'learning') {
    return { background: '#111827', color: '#fff' }
  }

  if (tone === 'announcement') {
    return { background: '#6b7280', color: '#fff' }
  }

  return { background: 'var(--ink)', color: '#fff' }
}

function newsSlashStyle(category: string): CSSProperties {
  const tone = newsCategoryTone(category)

  if (tone === 'website') {
    return { background: 'var(--pink)' }
  }

  if (tone === 'photo') {
    return { background: 'var(--green)' }
  }

  if (tone === 'research') {
    return { background: 'var(--yellow)' }
  }

  if (tone === 'learning') {
    return { background: '#111827' }
  }

  if (tone === 'announcement') {
    return { background: '#6b7280' }
  }

  return { background: 'var(--blue)' }
}

function newsTagClassName(tag: string) {
  return `tag-pill tag-pill--${newsTagTone(tag)}`
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(() => readPathFromLocation())

  useEffect(() => {
    const syncPath = () => setCurrentPath(readPathFromLocation())

    window.addEventListener('popstate', syncPath)
    window.addEventListener('profile-route-change', syncPath)
    return () => {
      window.removeEventListener('popstate', syncPath)
      window.removeEventListener('profile-route-change', syncPath)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-menu-open', menuOpen)
    return () => document.body.classList.remove('is-menu-open')
  }, [menuOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const pageMeta = useMemo(() => getPageMeta(currentPath), [currentPath])

  useEffect(() => {
    document.title = pageMeta.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) {
      description.content = pageMeta.description
    }
  }, [pageMeta])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <Header
        currentPath={currentPath}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((current) => !current)}
        onNavigate={closeMenu}
      />
      <main>{renderPage(currentPath)}</main>
      <Footer />
    </div>
  )
}

function getPageMeta(path: string) {
  const [, section, slug] = path.split('/')

  if ((section === 'about' || section === 'profile') && slug) {
    const highlight = findHighlight(slug)
    return {
      title: `${highlight?.pageTitle ?? 'PROFILE'} | Ryo Onodera`,
      description: highlight?.summary ?? '小野寺 諒のプロフィール詳細ページ。',
    }
  }

  if (section === 'about' || section === 'profile') {
    return {
      title: 'PROFILE | Ryo Onodera',
      description: '小野寺 諒の経歴、活動領域、スキルをまとめたプロフィールページ。',
    }
  }

  if (section === 'link') {
    return {
      title: 'LINK | Ryo Onodera',
      description: '小野寺 諒のポートフォリオ、GitHub、SNS、研究室などのリンク集。',
    }
  }

  if (section === 'contact') {
    return {
      title: 'CONTACT | Ryo Onodera',
      description: '撮影・AI/開発・研究支援・Web制作の相談フォーム。',
    }
  }

  if (section === 'work' && slug) {
    const work = findWork(slug)
    return {
      title: `${work?.title ?? 'WORK'} | Ryo Onodera`,
      description: work?.overview ?? '小野寺 諒のWORK詳細ページ。',
    }
  }

  if (section === 'work') {
    return {
      title: 'WORK | Ryo Onodera',
      description: '撮影、AI/ソフトウェア開発、研究支援の実績一覧。',
    }
  }

  if (section === 'news' && slug) {
    const news = findNews(slug)
    return {
      title: `${news?.title ?? 'NEWS'} | Ryo Onodera`,
      description: news?.summary ?? '小野寺 諒のNEWS詳細ページ。',
    }
  }

  if (section === 'news') {
    return {
      title: 'NEWS | Ryo Onodera',
      description: '小野寺 諒の活動記録とお知らせ一覧。',
    }
  }

  return {
    title: 'Ryo Onodera / 小野寺 諒 | Photographer / AI Engineer',
    description: '小野寺 諒の公式プロフィールサイト。写真撮影、AI/ソフトウェア開発、研究活動を横断して取り組んでいます。',
  }
}

function renderPage(path: string) {
  const [, section, slug] = path.split('/')

  if ((section === 'about' || section === 'profile') && slug) {
    return <HighlightDetailPage highlight={findHighlight(slug)} />
  }

  if (section === 'about' || section === 'profile') {
    return <ProfileDetailPage />
  }

  if (section === 'link') {
    return <LinkPage />
  }

  if (section === 'contact') {
    return <ContactPage />
  }

  if (section === 'work' && slug) {
    return <WorkDetailPage work={findWork(slug)} />
  }

  if (section === 'work') {
    return <WorkIndexPage />
  }

  if (section === 'news' && slug) {
    return <NewsDetailPage news={findNews(slug)} />
  }

  if (section === 'news') {
    return <NewsIndexPage />
  }

  return <HomePage />
}

function AppLink({
  path,
  hash = '',
  className = '',
  children,
  onNavigate,
  ariaLabel,
}: {
  path: string
  hash?: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
  ariaLabel?: string
}) {
  const href = createHref(path, hash)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new Event('profile-route-change'))
    onNavigate?.()

    if (hash) {
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 40)
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a className={className} href={href} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </a>
  )
}

function Header({
  currentPath,
  menuOpen,
  onMenuToggle,
  onNavigate,
}: {
  currentPath: string
  menuOpen: boolean
  onMenuToggle: () => void
  onNavigate: () => void
}) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <AppLink className="brand brand--logo" path="/" onNavigate={onNavigate} ariaLabel="Ryo Onodera home">
          <img src={logoImage} alt="Ryo Onodera logo" />
        </AppLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active =
              item.path !== '/' ? currentPath === item.path || currentPath.startsWith(`${item.path}/`) : currentPath === '/'

            return (
              <AppLink
                key={`${item.path}${item.hash ?? ''}`}
                path={item.path}
                hash={item.hash}
                className={active ? 'is-active' : ''}
              >
                {item.label}
              </AppLink>
            )
          })}
        </nav>
        <AppLink className="header-contact" path="/contact">
          CONTACT
        </AppLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={onMenuToggle}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu__panel">
          <div className="mobile-menu__head">
            <img src={logoImage} alt="Ryo Onodera logo" />
            <button type="button" aria-label="メニューを閉じる" onClick={onMenuToggle}>
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <AppLink key={`${item.path}${item.hash ?? ''}`} path={item.path} hash={item.hash} onNavigate={onNavigate}>
                {item.label}
              </AppLink>
            ))}
            <AppLink className="mobile-menu__contact" path="/contact" onNavigate={onNavigate}>
              CONTACT
            </AppLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <ProfileSection />
      <WorkSection />
      <NewsSection />
      <LinkSection />
    </>
  )
}

function ProfileSection() {
  return (
    <section className="profile-section" id="profile">
      <div className="container profile-grid">
        <div className="profile-copy">
          <h1>
            Ryo Onodera <span>/ 小野寺 諒</span>
          </h1>
          <p className="profile-role" aria-label="Photographer / AI Engineer / Student Researcher">
            <span>Photographer</span>
            <span>AI Engineer</span>
            <span>Student Researcher</span>
          </p>
          <p className="profile-statement">
            活動の価値を、
            <br />
            写真と技術で伝える<span className="pink-dot">。</span>
          </p>
          <p className="profile-lead">
            撮影依頼・AI/ソフトウェア開発・研究支援のご相談を承っています。
            <br />
            目的や使い道に合わせて、ビジュアルとテクノロジーの両面から支援します。
          </p>
          <div className="action-row">
            <AppLink className="button button--blue" path="/work">
              WORKを見る
              <ArrowRight aria-hidden="true" />
            </AppLink>
            <AppLink className="button button--ghost" path="/contact">
              相談する
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </div>
        </div>
        <div className="profile-visual" aria-label="プロフィール写真">
          <div className="profile-visual__blue" />
          <div className="profile-visual__yellow" />
          <div className="profile-visual__green" />
          <div className="profile-visual__dots" />
          <img src={profileImage} alt="プロフィール写真" />
        </div>
      </div>
      <div className="container">
        <div className="highlight-row" aria-label="経歴ハイライト">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <AppLink className="highlight-item" path={`/about/${item.slug}`} key={item.label}>
                <Icon className={`highlight-icon highlight-icon--${item.tone}`} aria-hidden="true" />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.caption}</small>
                </span>
                <ArrowRight className="highlight-arrow" aria-hidden="true" />
              </AppLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProfileDetailPage() {
  return (
    <section className="profile-page">
      <PageHero title="PROFILE" description="プロフィール" />
      <div className="container profile-detail-layout">
        <figure className="profile-detail-photo" aria-label="プロフィール写真">
          <div className="profile-detail-photo__blue" />
          <div className="profile-detail-photo__green" />
          <div className="profile-detail-photo__dots" />
          <img src={profileImage} alt="小野寺 諒のプロフィール写真" />
        </figure>
        <div className="profile-detail-copy">
          <h1>
            Ryo Onodera <span>/ 小野寺 諒</span>
          </h1>
          <p className="profile-role profile-role--detail" aria-label="Photographer / AI Engineer / Student Researcher">
            <span>Photographer</span>
            <span>AI Engineer</span>
            <span>Student Researcher</span>
          </p>
          <p className="profile-detail-statement">
            活動の価値を、
            <br />
            写真と技術で伝える。
          </p>
          <p>
            材料工学を学ぶ大学院生として研究に取り組みながら、人物・イベント撮影、AI/ソフトウェア開発、Web制作を行っています。人や組織の価値がより伝わるように、ビジュアルとテクノロジーの両面から支援します。
          </p>
        </div>
      </div>

      <div className="container profile-detail-main">
        <aside className="profile-about-card">
          <h2>ABOUT ME</h2>
          <dl>
            {profileAboutItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label}>
                  <dt>
                    <Icon aria-hidden="true" />
                    {item.label}
                  </dt>
                  <dd>{item.value}</dd>
                </div>
              )
            })}
          </dl>
        </aside>

        <section className="career-panel" aria-labelledby="career-heading">
          <h2 id="career-heading">CAREER HIGHLIGHT</h2>
          <div className="career-timeline">
            {careerItems.map((item) => (
              <AppLink className="career-item" path={item.path} key={item.title}>
                <span>{item.period}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <ArrowRight aria-hidden="true" />
              </AppLink>
            ))}
          </div>
        </section>
      </div>

      <div className="container profile-skills-section">
        <h2>SKILLS & ACTIVITIES</h2>
        <div className="profile-skills-grid">
          {profileSkillColumns.map((column) => {
            const Icon = column.icon
            return (
              <article className={`profile-skill-card profile-skill-card--${column.tone}`} key={column.title}>
                <div>
                  <Icon aria-hidden="true" />
                  <h3>{column.title}</h3>
                </div>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>

      <div className="container">
        <ContactCta />
      </div>
    </section>
  )
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="container">
        <div className="section-title-row">
          <SectionTitle title="WORK" description="制作・開発・研究支援" />
          <AppLink className="text-link" path="/work">
            VIEW ALL
            <ArrowRight aria-hidden="true" />
          </AppLink>
        </div>
        <p className="section-lead">写真撮影からAI開発、研究支援まで。幅広い領域で活動しています。</p>
        <div className="work-columns">
          {workColumns.map((column) => {
            const Icon = column.icon

            return (
              <article className={`work-column work-column--${column.id}`} key={column.id}>
                <div className="work-column__head">
                  <Icon aria-hidden="true" />
                  <h3>{column.title}</h3>
                </div>
                <div className="work-column__line" />
                <div className="work-card-list">
                  {column.items.map((item) => (
                    <WorkCard item={item} key={item.slug} />
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ item, variant = 'compact' }: { item: WorkItem; variant?: 'compact' | 'detailed' | 'mini' }) {
  return (
    <AppLink className={`work-card work-card--${item.tone} work-card--${variant}`} path={`/work/${item.slug}`}>
      <figure>
        <img src={item.image} alt="" />
        <span className="work-card__category">{toneLabel(item.tone)}</span>
        <figcaption>{item.year}</figcaption>
      </figure>
      <div className="work-card__copy">
        <h4>{item.title}</h4>
        <p>{item.description}</p>
        {variant !== 'mini' ? (
          <ul className="work-card__metrics">
            {item.metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        ) : null}
        {variant === 'detailed' ? <small>{item.overview}</small> : null}
        <ArrowRight aria-hidden="true" />
      </div>
    </AppLink>
  )
}

function NewsSection() {
  return (
    <section className="news-section" id="news">
      <div className="container news-wrap">
        <div className="section-title-row">
          <SectionTitle title="NEWS" description="お知らせ・活動記録" />
          <AppLink className="text-link" path="/news">
            VIEW ALL
            <ArrowRight aria-hidden="true" />
          </AppLink>
        </div>
        <div className="news-list">
          {newsItems.map((item) => (
            <NewsRow item={item} key={item.slug} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsRow({ item, detail = false }: { item: NewsItem; detail?: boolean }) {
  const categoryTone = newsCategoryTone(item.category)

  return (
    <AppLink className="news-item" path={`/news/${item.slug}`}>
      <span className={`news-slash news-slash--${categoryTone}`} style={newsSlashStyle(item.category)} />
      <time>{item.date}</time>
      <span className={newsCategoryClassName(item.category)} style={newsCategoryStyle(item.category)}>
        {item.category}
      </span>
      <strong>{item.title}</strong>
      {detail ? <span className="news-detail-label">VIEW DETAIL</span> : null}
      <ArrowRight aria-hidden="true" />
    </AppLink>
  )
}

function LinkSection() {
  return (
    <section className="link-section" id="link">
      <div className="container">
        <SectionTitle title="LINK" description="各種リンク・お問い合わせ" />
        <div className="link-grid">
          {links.map((link) => {
            const Icon = link.icon
            const content = (
              <>
                <span className="link-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.description}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </>
            )

            if (link.path) {
              return (
                <AppLink key={link.title} className="link-card" path={link.path}>
                  {content}
                </AppLink>
              )
            }

            return link.href ? (
              <a key={link.title} className="link-card" href={link.href} target={link.href.startsWith('#') ? undefined : '_blank'} rel={link.href.startsWith('#') ? undefined : 'noreferrer'}>
                {content}
              </a>
            ) : (
              <span key={link.title} className="link-card link-card--disabled">
                {content}
              </span>
            )
          })}
        </div>
        <ContactCta />
      </div>
    </section>
  )
}

function LinkPage() {
  return (
    <section className="page-shell link-page">
      <PageHero title="LINK" description="外部リンク・活動アカウント" />
      <div className="container">
        <div className="link-page-intro">
          <p>
            制作物、公開コード、撮影活動、研究室情報へのリンクをまとめています。お問い合わせはページ右上または下部のContactからご連絡ください。
          </p>
        </div>
        <div className="link-grid link-grid--page">
          {links.map((link) => {
            const Icon = link.icon
            const content = (
              <>
                <span className="link-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.description}</small>
                </span>
                <ArrowRight aria-hidden="true" />
              </>
            )

            if (link.path) {
              return (
                <AppLink key={link.title} className="link-card" path={link.path}>
                  {content}
                </AppLink>
              )
            }

            return (
              <a key={link.title} className="link-card" href={link.href} target="_blank" rel="noreferrer">
                {content}
              </a>
            )
          })}
        </div>
        <ContactCta />
      </div>
    </section>
  )
}

function ContactCta({ compact = false }: { compact?: boolean }) {
  return (
    <AppLink className={`contact-cta ${compact ? 'contact-cta--compact' : ''}`} path="/contact">
      <Mail aria-hidden="true" />
      <span>
        <strong>プロジェクトの相談・ご依頼はこちらから</strong>
        <small>撮影・Web制作・ソフトウェア開発・研究支援など、お気軽にご相談ください。</small>
      </span>
      <em>
        Googleフォームから相談する
        <ArrowRight aria-hidden="true" />
      </em>
    </AppLink>
  )
}

function PageHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <SectionTitle title={title} description={description} />
      </div>
    </section>
  )
}

function WorkIndexPage() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all')
  const filteredWorks = activeFilter === 'all' ? works : works.filter((item) => item.tone === activeFilter)

  return (
    <section className="page-shell">
      <PageHero title="WORK" description="実績一覧" />
      <div className="container">
        <div className="category-filter" aria-label="Work categories">
          {workFilters.map((filter) => (
            <button
              className={activeFilter === filter.value ? 'is-active' : ''}
              type="button"
              aria-pressed={activeFilter === filter.value}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="work-index-grid">
          {filteredWorks.map((item) => (
            <WorkCard item={item} variant="detailed" key={item.slug} />
          ))}
        </div>
        <ContactCta />
      </div>
    </section>
  )
}

function WorkDetailPage({ work }: { work: WorkItem | undefined }) {
  if (!work) {
    return <NotFoundPage title="WORK" backPath="/work" />
  }

  const relatedWorks = works.filter((item) => item.slug !== work.slug).slice(0, 5)
  const tools = splitTools(work.tools)

  return (
    <article className={`detail-page detail-page--${work.tone}`}>
      <div className="container">
        <AppLink className="back-link" path="/work">
          <ArrowLeft aria-hidden="true" />
          WORK 一覧に戻る
        </AppLink>
        <div className="work-detail-hero">
          <div>
            <p className="page-kicker">WORK</p>
            <p className="detail-meta">
              <span>{work.category}</span>
              <span>{work.year}</span>
            </p>
            <h1>{work.title}</h1>
            <p>{work.description}</p>
            <div className="tag-row">
              <span>{work.role.split('/')[0].trim()}</span>
              <span>{toneLabel(work.tone)}</span>
            </div>
          </div>
          <figure>
            <img src={work.image} alt="" />
          </figure>
        </div>
        <div className="work-detail-grid">
          <aside className="detail-table" aria-label="Work detail metadata">
            <dl>
              <div>
                <dt>
                  <Tags aria-hidden="true" />
                  カテゴリ
                </dt>
                <dd>{work.category}</dd>
              </div>
              <div>
                <dt>
                  <CalendarDays aria-hidden="true" />
                  年
                </dt>
                <dd>{work.year}</dd>
              </div>
              <div>
                <dt>
                  <UserRound aria-hidden="true" />
                  役割
                </dt>
                <dd>{work.role}</dd>
              </div>
              <div>
                <dt>
                  <Wrench aria-hidden="true" />
                  使用技術
                </dt>
                <dd>{work.tools}</dd>
              </div>
            </dl>
            <AppLink className="detail-side-link" path="/contact">
              相談する
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </aside>
          <div className="detail-body">
            <DetailBlock title="概要">{work.overview}</DetailBlock>
            <DetailBlock title="課題">{work.challenge}</DetailBlock>
            <DetailList title="担当範囲" items={work.scope} />
            <DetailList title="成果" items={work.results} />
            <section className="detail-block">
              <h2>使用技術</h2>
              <div className="tag-row tag-row--muted">
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </section>
            <section className="detail-block">
              <h2>関連リンク</h2>
              <div className="related-link-grid">
                <a href="https://github.com/deraryo4559" target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" />
                  <span>
                    <strong>GitHubリポジトリを見る</strong>
                    <small>ソースコード・README</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </a>
                <AppLink path="/contact">
                  <Mail aria-hidden="true" />
                  <span>
                    <strong>似た内容を相談する</strong>
                    <small>撮影・開発・研究支援</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </AppLink>
              </div>
            </section>
          </div>
        </div>
        <section className="related-work-strip">
          <div className="section-title-row">
            <h2>関連するWORK</h2>
            <AppLink className="text-link" path="/work">
              VIEW ALL WORK
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </div>
          <div className="related-work-grid">
            {relatedWorks.map((item) => (
              <WorkCard item={item} variant="mini" key={item.slug} />
            ))}
          </div>
        </section>
        <ContactCta />
      </div>
    </article>
  )
}

function HighlightDetailPage({ highlight }: { highlight: HighlightItem | undefined }) {
  if (!highlight) {
    return <NotFoundPage title="PROFILE" backPath="/about" />
  }

  const Icon = highlight.icon
  const relatedWorks = highlight.relatedWorkSlugs
    ?.map((slug) => findWork(slug))
    .filter((work): work is WorkItem => Boolean(work)) ?? []

  return (
    <article className={`detail-page highlight-page highlight-page--${highlight.tone}`}>
      <div className="container">
        <AppLink className="back-link" path="/about">
          <ArrowLeft aria-hidden="true" />
          PROFILEに戻る
        </AppLink>
        <div className="highlight-detail-hero">
          <span className={`highlight-page-icon highlight-page-icon--${highlight.tone}`}>
            <Icon aria-hidden="true" />
          </span>
          <div>
            <p className="detail-meta">
              <span>PROFILE HIGHLIGHT</span>
            </p>
            <h1>{highlight.pageTitle}</h1>
            <p>{highlight.summary}</p>
          </div>
        </div>
        <div className="work-detail-grid">
          <aside className="detail-table" aria-label="Profile highlight metadata">
            <dl>
              <div>
                <dt>領域</dt>
                <dd>{highlight.caption}</dd>
              </div>
              <div>
                <dt>公開範囲</dt>
                <dd>守秘情報を除いた経験・学び・相談領域</dd>
              </div>
              <div>
                <dt>関連</dt>
                <dd>関連WORKとContactへ接続</dd>
              </div>
            </dl>
            <AppLink className="detail-side-link" path="/contact">
              この内容について相談する
              <ArrowRight aria-hidden="true" />
            </AppLink>
          </aside>
          <div className="detail-body">
            <DetailBlock title="概要">{highlight.lead}</DetailBlock>
            <DetailList title="主な経験・学び" items={highlight.requirements} />
            {highlight.sections.map((section) => (
              <DetailBlock title={section.title} key={section.title}>
                {section.body}
              </DetailBlock>
            ))}
            {relatedWorks.length > 0 ? (
              <section className="detail-block">
                <h2>関連するWORK</h2>
                <div className="detail-card-grid">
                  {relatedWorks.map((work) => (
                    <WorkCard item={work} key={work.slug} />
                  ))}
                </div>
              </section>
            ) : null}
            {highlight.links?.length ? (
              <section className="detail-block">
                <h2>関連リンク</h2>
                <div className="detail-link-row">
                  {highlight.links.map((link) =>
                    link.path ? (
                      <AppLink className="button button--ghost" path={link.path} key={link.label}>
                        {link.label}
                        <ArrowRight aria-hidden="true" />
                      </AppLink>
                    ) : (
                      <a className="button button--ghost" href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                        {link.label}
                        <ArrowRight aria-hidden="true" />
                      </a>
                    ),
                  )}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const params = new URLSearchParams()
    params.append(formEntries.name, String(formData.get('name') ?? ''))
    params.append(formEntries.email, String(formData.get('email') ?? ''))
    params.append(formEntries.topic, String(formData.get('topic') ?? ''))
    params.append(formEntries.timeline, String(formData.get('timeline') || '未定'))
    params.append(formEntries.budget, String(formData.get('budget') || '未定'))
    params.append(formEntries.reference, String(formData.get('reference') || 'なし'))
    params.append(formEntries.message, String(formData.get('message') ?? ''))

    try {
      await fetch(form.action, {
        method: 'POST',
        body: params,
        mode: 'no-cors',
      })
      setSubmitted(true)
      form.reset()
    } catch (error) {
      console.error('Form submission error:', error)
      window.alert('送信に失敗しました。時間をおいてもう一度お試しください。')
    }
  }

  return (
    <section className="article-page link-contact-page">
      <div className="container">
        <header className="link-contact-hero">
          <SectionTitle title="CONTACT" description="お問い合わせ" />
          <p>
            撮影依頼、AI/ソフトウェア開発、研究支援、Web制作、採用・協業のご相談はこちらからご連絡ください。内容が固まっていない段階でも大丈夫です。
          </p>
        </header>
        <div className="contact-layout">
          <aside className="useful-links">
            <h2>USEFUL LINKS</h2>
            <div className="useful-link-list">
              {links.map((link) => {
                const Icon = link.icon
                const content = (
                  <>
                    <span className="link-card__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{link.title}</strong>
                      <small>{link.description}</small>
                    </span>
                    <ArrowRight aria-hidden="true" />
                  </>
                )

                if (link.path) {
                  return (
                    <AppLink className="link-card" path={link.path} key={link.title}>
                      {content}
                    </AppLink>
                  )
                }

                return (
                  <a className="link-card" href={link.href} target="_blank" rel="noreferrer" key={link.title}>
                    {content}
                  </a>
                )
              })}
            </div>
          </aside>
          <div className="contact-form-card">
            <div className="contact-form-card__head">
              <span>CONTACT</span>
              <h1>撮影・開発・研究支援のご相談はこちらから。</h1>
              <p>内容を確認のうえ、返信できるものから順にご連絡します。</p>
            </div>
            {submitted ? (
              <div className="contact-form-success" role="status">
                <Check aria-hidden="true" />
                <p>送信しました。内容を確認のうえ、通常2から3日以内にご連絡します。</p>
              </div>
            ) : null}
            <form className="contact-native-form" action={formResponseUrl} method="POST" onSubmit={handleSubmit}>
              <div className="contact-native-form__grid">
                <label>
                  <span>Name <small>お名前</small></span>
                  <input name="name" type="text" autoComplete="name" placeholder="例: 小野寺 諒" required />
                </label>
                <label>
                  <span>Email <small>返信先メールアドレス</small></span>
                  <input name="email" type="email" autoComplete="email" placeholder="例: name@example.com" required />
                </label>
                <label>
                  <span>Topic <small>相談内容</small></span>
                  <select name="topic" required defaultValue="">
                    <option value="" disabled>
                      選択してください
                    </option>
                    {contactTopics.map((topic) => (
                      <option value={topic} key={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Timeline <small>希望時期・納期のめど</small></span>
                  <input name="timeline" type="text" placeholder="例: 6月中、未定など" />
                </label>
                <label>
                  <span>Budget <small>予算感</small></span>
                  <input name="budget" type="text" placeholder="例: 未定、相談したい" />
                </label>
                <label>
                  <span>Reference <small>参考URL・資料</small></span>
                  <input name="reference" type="text" placeholder="参考サイト、SNS、資料URLなど" />
                </label>
              </div>
              <label className="contact-native-form__message">
                <span>Message <small>相談内容の詳細</small></span>
                <textarea name="message" placeholder="目的、困っていること、撮影や開発で実現したいことを書いてください。" required />
              </label>
              <button type="submit">
                Send Message
                <ArrowRight aria-hidden="true" />
              </button>
            </form>
            <div className="contact-support-grid">
              <div>
                <p>HOW TO ORDER</p>
                <ol>
                  <li>
                    <strong>01. フォームで相談</strong>
                    <span>内容、用途、希望時期が分かる範囲で送ってください。</span>
                  </li>
                  <li>
                    <strong>02. 内容確認・提案</strong>
                    <span>必要な範囲、進め方、料金目安を一緒に整理します。</span>
                  </li>
                  <li>
                    <strong>03. 制作・納品</strong>
                    <span>撮影、開発、資料整理など、用途に合わせて進めます。</span>
                  </li>
                </ol>
              </div>
              <div>
                <p>DIRECT CONTACT</p>
                <div className="direct-contact-list">
                  <a href="mailto:onodera00.biz@gmail.com">
                    <Mail aria-hidden="true" />
                    onodera00.biz@gmail.com
                  </a>
                  <span>
                    <MapPin aria-hidden="true" />
                    Kawasaki / Yokohama
                  </span>
                  <a href="https://www.instagram.com/d_ryo_photo?igsh=eGltZTJxZzIxNG9r&utm_source=qr" target="_blank" rel="noreferrer">
                    <Instagram aria-hidden="true" />
                    Instagram
                  </a>
                  <span>
                    <Clock aria-hidden="true" />
                    通常2から3日以内に返信
                  </span>
                </div>
              </div>
            </div>
            <ul className="check-list contact-form-card__points">
              {contactRequirements.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a className="button button--blue contact-form-card__external" href={formUrl} target="_blank" rel="noreferrer">
              Googleフォームを別タブで確認する
              <ExternalLink aria-hidden="true" />
            </a>
            <p className="contact-form-card__note">このフォームはGoogleフォームに送信されます。別タブで入力したい場合は上のボタンをご利用ください。</p>
          </div>
        </div>
        <div className="contact-visual-band" aria-hidden="true">
          <Camera />
          <Monitor />
          <FlaskConical />
        </div>
        <ContactCta />
      </div>
    </section>
  )
}

function NewsIndexPage() {
  const [activeFilter, setActiveFilter] = useState<NewsFilter>('all')
  const filteredNews =
    activeFilter === 'all' ? newsItems : newsItems.filter((item) => item.category === activeFilter)

  return (
    <section className="page-shell">
      <PageHero title="NEWS" description="お知らせ・活動記録" />
      <div className="container">
        <div className="category-filter" aria-label="News categories">
          {newsFilters.map((filter) => (
            <button
              className={activeFilter === filter.value ? 'is-active' : ''}
              type="button"
              aria-pressed={activeFilter === filter.value}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="news-list news-list--index">
          {filteredNews.map((item) => (
            <NewsRow item={item} detail key={item.slug} />
          ))}
        </div>
        {filteredNews.length === 0 ? <p className="empty-state">該当するNEWSはまだありません。</p> : null}
        <ContactCta />
      </div>
    </section>
  )
}

function NewsDetailPage({ news }: { news: NewsItem | undefined }) {
  if (!news) {
    return <NotFoundPage title="NEWS" backPath="/news" />
  }

  const relatedWork = findWork(news.relatedWork)
  const tags = newsTags(news)

  return (
    <article className="article-page article-page--with-sidebar">
      <div className="container article-container">
        <AppLink className="back-link" path="/news">
          <ArrowLeft aria-hidden="true" />
          NEWS 一覧に戻る
        </AppLink>
        <div className="article-layout">
          <main>
            <header className="article-header">
              <SectionTitle title="NEWS" description="お知らせ・活動記録" />
              <p className="detail-meta">
                <span>{news.date}</span>
                <span className={newsCategoryClassName(news.category)} style={newsCategoryStyle(news.category)}>
                  {news.category}
                </span>
              </p>
              <h1>{news.title}</h1>
              <div className="tag-row">
                {tags.map((tag) => (
                  <span className={newsTagClassName(tag)} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {relatedWork ? <img className="article-hero-image" src={relatedWork.image} alt="" /> : null}
              <p>{news.summary}</p>
            </header>
            <div className="article-body">
              {news.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {news.certificate ? (
                <section className="article-certificate">
                  <div className="article-certificate__frame">
                    <object data={news.certificate.src} type="application/pdf" title={news.certificate.title}>
                      <a href={news.certificate.src} target="_blank" rel="noreferrer">
                        修了証PDFを開く
                      </a>
                    </object>
                  </div>
                  <p>{news.certificate.caption}</p>
                  <a className="text-link" href={news.certificate.src} target="_blank" rel="noreferrer">
                    修了証PDFを別タブで開く
                    <ExternalLink aria-hidden="true" />
                  </a>
                </section>
              ) : null}
              <section className="detail-block">
                <h2>主な内容</h2>
                <ul className="check-list">
                  {news.points.map((point) => (
                    <li key={point}>
                      <Check aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="detail-block">
                <h2>タグ</h2>
                <div className="tag-row tag-row--muted">
                  {tags.map((tag) => (
                    <span className={newsTagClassName(tag)} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
              {news.sourceLinks?.length ? (
                <section className="detail-block">
                  <h2>参考リンク</h2>
                  <div className="source-link-list">
                    {news.sourceLinks.map((link) => (
                      <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                        <ExternalLink aria-hidden="true" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}
              {relatedWork ? (
                <div className="related-card">
                  <img src={relatedWork.image} alt="" />
                  <div>
                    <span>RELATED WORK</span>
                    <h2>{relatedWork.title}</h2>
                    <p>{relatedWork.description}</p>
                    <AppLink className="text-link" path={`/work/${relatedWork.slug}`}>
                      WORKを見る
                      <ArrowRight aria-hidden="true" />
                    </AppLink>
                  </div>
                </div>
              ) : null}
              <div className="share-row">
                <span>シェアする</span>
                <button type="button" aria-label="Share">
                  <Share2 aria-hidden="true" />
                </button>
                <button type="button" aria-label="LinkedIn">
                  <Linkedin aria-hidden="true" />
                </button>
                <button type="button" aria-label="Copy link">
                  <Copy aria-hidden="true" />
                </button>
              </div>
            </div>
          </main>
          <aside className="article-sidebar">
            <SidebarPanel title="カテゴリー">
              {newsFilters.filter((filter) => filter.value !== 'all').map((filter) => (
                <AppLink path="/news" key={filter.value}>
                  {filter.label}
                  <ArrowRight aria-hidden="true" />
                </AppLink>
              ))}
            </SidebarPanel>
            <SidebarPanel title="最新のNEWS">
              {newsItems.slice(0, 5).map((item) => (
                <AppLink className="sidebar-news-link" path={`/news/${item.slug}`} key={item.slug}>
                  <time>{item.date}</time>
                  <span className={newsCategoryClassName(item.category)} style={newsCategoryStyle(item.category)}>
                    {item.category}
                  </span>
                  <strong>{item.title}</strong>
                </AppLink>
              ))}
            </SidebarPanel>
            <SidebarPanel title="タグ">
              <div className="tag-row tag-row--muted">
                {Array.from(new Set(newsItems.flatMap((item) => newsTags(item)))).slice(0, 8).map((tag) => (
                  <span className={newsTagClassName(tag)} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </SidebarPanel>
          </aside>
        </div>
        <ContactCta />
      </div>
    </article>
  )
}

function SidebarPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="sidebar-panel">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  )
}

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="detail-block">
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="detail-block">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function NotFoundPage({ title, backPath }: { title: string; backPath: string }) {
  return (
    <section className="page-shell">
      <div className="container not-found">
        <SectionTitle title={title} description="ページが見つかりません" />
        <p>指定されたページは存在しないか、URLが変更されています。</p>
        <AppLink className="button button--blue" path={backPath}>
          一覧に戻る
          <ArrowRight aria-hidden="true" />
        </AppLink>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p>Ryo Onodera / 小野寺 諒</p>
          <small>写真と技術で、アイデアをかたちに。人と社会に価値を届けるクリエイター。</small>
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <h2>Navigation</h2>
          <AppLink path="/about">PROFILE</AppLink>
          <AppLink path="/work">WORK</AppLink>
          <AppLink path="/news">NEWS</AppLink>
          <AppLink path="/link">LINK</AppLink>
          <AppLink path="/contact">CONTACT</AppLink>
        </nav>
        <div className="site-footer__nav">
          <h2>Categories</h2>
          <AppLink path="/work">Photography</AppLink>
          <AppLink path="/work">AI / Software</AppLink>
          <AppLink path="/work">Research / Tech Support</AppLink>
        </div>
        <div className="site-footer__social">
          <h2>Social / Link</h2>
          <a href="https://ryo-onodera.com/my-portfolio/" target="_blank" rel="noreferrer">
            <Camera aria-hidden="true" />
            Portfolio
          </a>
          <a href="https://github.com/deraryo4559" target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />
            GitHub
          </a>
          <a href="https://hirosawalab.ynu.ac.jp/" target="_blank" rel="noreferrer">
            <FlaskConical aria-hidden="true" />
            Laboratory
          </a>
          <a href="https://www.instagram.com/d_ryo_photo?igsh=eGltZTJxZzIxNG9r&utm_source=qr" target="_blank" rel="noreferrer">
            <Instagram aria-hidden="true" />
            Instagram
          </a>
          <a href={linkedInUrl} target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" />
            LinkedIn
          </a>
          <AppLink path="/contact">
            <Mail aria-hidden="true" />
            Contact
          </AppLink>
        </div>
      </div>
      <div className="site-footer__bottom">© 2026 Ryo Onodera</div>
    </footer>
  )
}

export default App
