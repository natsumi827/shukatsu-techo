// ==========================================================
// Firebase 設定ファイル
//
// 1. https://console.firebase.google.com/ で無料プロジェクトを作成
// 2. 「Firestore Database」を作成（本番モードでOK。ルールはREADME参照）
// 3. 「プロジェクトの設定」→「マイアプリ」→ ウェブアプリを追加
// 4. 表示される firebaseConfig の値を、下の YOUR_... の部分にそのまま貼り付け
// 5. このファイルを保存して、他のファイルと一緒にサーバーへアップロード
//
// 設定しない場合、アプリはローカル保存のみで動作します
// （書き出し/読み込みボタンでの手動同期は引き続き使えます）。
// ==========================================================

window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
