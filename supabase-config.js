// ==========================================================
// Supabase 設定ファイル（クレジットカード登録不要・無料）
//
// 1. https://supabase.com/ にアクセスし、「Start your project」→
//    GitHubアカウントでログイン（クレジットカード登録は不要）
// 2. 「New project」でプロジェクトを作成
//    （Database Password は自動生成のままでOK。忘れずにどこかにメモ）
// 3. 作成後、左メニューの「SQL Editor」を開き、
//    README.md に載っているSQLをそのまま貼り付けて実行
//    （同期用のテーブルとアクセスルールが作られます）
// 4. 左メニュー「Project Settings」→「API」を開く
// 5. 表示される「Project URL」と「anon public」キーを、
//    下の YOUR_... の部分にそのまま貼り付け
// 6. このファイルを保存して、他のファイルと一緒にサーバーへアップロード
//
// 設定しない場合、アプリはローカル保存のみで動作します
// （書き出し/読み込みボタンでの手動同期は引き続き使えます）。
// ==========================================================

window.SUPABASE_CONFIG = {
  url: "YOUR_SUPABASE_PROJECT_URL",       // 例: https://xxxxxxxx.supabase.co
  anonKey: "YOUR_SUPABASE_ANON_KEY"       // 「anon public」というラベルの長い文字列
};
