import { TranslationSchema } from '../types';
import { en } from './en';

export const ja: TranslationSchema = {
  ...en,
  nav: {
    overview: 'ダッシュボード',
    clients: '顧客管理 CRM',
    qr: '動的QRコード',
    pages: 'ランディングページ',
    links: 'スマートリンク',
    cards: 'デジタル名刺',
    menus: 'デジタルメニュー',
    templates: 'テンプレート',
    media: 'メディアライブラリ',
    analytics: '分析・統計',
    domains: 'カスタムドメイン',
    import: '一括インポート',
    audit: '監査ログ',
    settings: '設定'
  },
  sections: {
    corePlatform: 'コアプラットフォーム',
    digitalSolutions: 'デジタルソリューション',
    growthIntelligence: '分析とインサイト',
    administration: 'システム管理'
  },
  header: {
    createQr: 'QRを作成',
    switchWorkspace: 'ワークスペース切替',
    workspaces: 'ワークスペース一覧',
    createNewWorkspace: '新規作成',
    profile: 'プロフィール',
    signOut: 'ログアウト',
    theme: 'テーマ',
    language: '言語',
    activeWorkspace: '現在のワークスペース'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'ESAIA エンタープライズ',
    enterpriseTier: 'エンタープライズ版',
    welcomeSubtitle: '動的QRコード、ランディングページ、デジタル名刺を一元管理するクラウドSaaSプラットフォーム。',
    bulkCsvImport: 'CSV一括インポート',
    newDynamicQr: '動的QR新規作成',
    activeClients: 'アクティブ顧客数',
    dynamicQrCodes: '動的QRコード数',
    totalScans: '合計スキャン数 (30日間)',
    activeLandingPages: '公開中のページ'
  },
  pagesModule: {
    ...en.pagesModule,
    title: '動的ランディングページ & マイクロサイト',
    subtitle: 'モバイル最適化されたWebページ、デジタルメニュー、リンクハブ。',
    createPage: 'ページを作成',
    searchPlaceholder: 'タイトルまたはスラッグで検索...',
    viewsCount: '回閲覧',
    previewLive: 'ライブプレビュー',
    openBuilder: 'ビルダーを開く'
  },
  qrModule: {
    ...en.qrModule,
    title: '動的QRコードフリート管理',
    subtitle: '遷移先をいつでも変更できる高速リダイレクトエンジン。',
    createQr: '動的QRを作成',
    searchPlaceholder: '名前、コード、URLで検索...'
  },
  themes: {
    dark: 'ダークモード',
    light: 'ライトモード',
    beige: 'ウォームベージュ',
    selectTheme: 'テーマを選択'
  },
  actions: {
    ...en.actions,
    create: '作成',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    export: 'エクスポート',
    import: 'インポート',
    search: '検索...',
    preview: 'プレビュー'
  }
};
