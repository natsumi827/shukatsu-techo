# 就活手帳（PWA版）セットアップ手順

このフォルダの中身をそのまま自分のサーバー／ホスティングサービスにアップロードすると、
スマホ・パソコンどちらからも「アプリ」として使えるようになります。

```
shukatsu-techo-app/
├── index.html
├── manifest.json
├── service-worker.js
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

## 1. どこに置けばいい？

**必ずHTTPS対応のホスティングが必要です**（Service Worker はHTTPSでないと動きません。
`localhost` は例外的にOKなので、開発中はローカルでも試せます）。

無料で手軽なものを挙げると：

- **GitHub Pages**（GitHubアカウントがあれば無料。リポジトリを作って
  このフォルダの中身をアップロードし、Settings → Pages で公開するだけ）
- **Netlify** / **Vercel**（フォルダをドラッグ＆ドロップするだけで公開できる）
- 自分のレンタルサーバーがあれば、そこにFTPでアップロードでもOK

どれを使うにしても、**フォルダの中身（index.html, manifest.json, service-worker.js, icons/）を
そのままの相対関係でアップロードしてください。**

## 2. スマホでアプリ化する

1. 公開したURLをスマホのブラウザ（iPhoneはSafari、AndroidはChrome）で開く
2. 共有メニュー（iPhone）またはメニュー（Android）から
   **「ホーム画面に追加」／「アプリをインストール」** を選ぶ
3. ホーム画面に「就活手帳」のアイコンが追加され、タップするとブラウザのアドレスバーなしで
   アプリのように起動します

## 3. パソコンでアプリ化する

1. Chrome または Edge で公開したURLを開く
2. アドレスバー右側の「インストール」アイコン（🖥️＋）をクリック
   （または右上メニュー → 「アプリをインストール」）
3. デスクトップやスタートメニューにアイコンが追加され、専用ウィンドウで開けるようになります

## 4. オフラインで使えるようにする（初回だけネット接続が必要）

初回にオンラインで一度アプリを開くと、`service-worker.js` が画面一式を端末内にキャッシュします。
以降は機内モードやWi-Fiがない場所でも、ホーム画面のアイコンから普通に開いて使えます。

## 5. データの保存について

このアプリはブラウザの `localStorage` にデータを保存します。これは**端末ごと・ブラウザごとに
別々の保存場所**になるため、そのままでは自動的には同期されません。

### 手動で同期する（設定不要）
アプリ上部の

- **「⇩ 書き出す」** → JSONファイルとしてダウンロード
- **「⇧ 読み込む」** → そのJSONファイルを読み込んで上書き

を使って、手動でスマホ⇄パソコン間を移せます（AirDrop、メール、Google Driveなど）。

### 自動で同期する（Supabase・無料／クレジットカード不要）
「🔗 自動同期を設定」ボタンから、無料の **Supabase** を使ってリアルタイム自動同期ができます。
Supabaseは無料プランでもクレジットカードの登録が不要です。
初回だけ次のセットアップが必要です。

1. https://supabase.com/ にアクセスし、「Start your project」→ **GitHubアカウントでログイン**
   （クレジットカードの入力画面は出てきません）
2. 「New project」をクリックし、以下を入力してプロジェクトを作成
   - Name：好きな名前（例：shukatsu-techo）
   - Database Password：自動生成された、もしくは自分で決めたパスワード
     （後で使うことはほぼありませんが、念のためどこかにメモしておくと安心です）
   - Region：`Northeast Asia (Tokyo)` がおすすめ
   - 「Create new project」をクリック（1〜2分ほど準備にかかります）
3. 左メニューの **「SQL Editor」** を開き、「New query」→ 以下のSQLをそのまま貼り付けて
   右下の **「Run」** をクリック（同期用のテーブルと、コードを知っている人だけが
   読み書きできるようにするルールが一度に作られます）：

   ```sql
   create table if not exists shukatsu_techo (
     code text primary key,
     payload jsonb not null,
     last_writer text,
     updated_at timestamptz default now()
   );

   alter table shukatsu_techo enable row level security;

   create policy "allow all with code"
     on shukatsu_techo
     for all
     using (true)
     with check (true);

   alter publication supabase_realtime add table shukatsu_techo;

   -- 2026年5月30日以降に作成したプロジェクトでは、テーブルを作っただけでは
   -- 外部からアクセスできないため、次の2行が必須です
   grant usage on schema public to anon, authenticated;
   grant select, insert, update, delete on table shukatsu_techo to anon, authenticated;
   ```

4. 左メニューの **「Project Settings」**（歯車アイコン）→ **「API」** を開く
5. 表示される **「Project URL」** と、**「anon public」** というラベルの長いキーをコピー
6. このフォルダの **`supabase-config.js`** を開き、`YOUR_SUPABASE_PROJECT_URL` と
   `YOUR_SUPABASE_ANON_KEY` の部分を、コピーした実際の値に書き換えて保存
7. 更新した `supabase-config.js` を含め、フォルダ一式を再度サーバーにアップロード

> 上記のSQLでは、同期コードさえ知っていれば誰でもそのコードのデータを読み書きできる
> シンプルなルールにしています。同期コードは他人に共有しないようにしてください。

### 実際の使い方
1. 1台目の端末でアプリを開き、「🔗 自動同期を設定」→「新しいコードを作成」
2. 表示された同期コード（例：`a3f9k2p1x7q2`）をメモ、または「コピー」
3. 2台目の端末（もう一方のスマホ／パソコン）でアプリを開き、
   「🔗 自動同期を設定」→ コード入力欄に同じコードを入力して「連携する」
4. 以降、どちらかで入力・編集した内容が自動的にもう一方にも反映されます
   （画面上部の緑の点が点灯していれば同期中です）

> 同期コードは他人に知られるとその人もデータを読み書きできてしまうため、
> 第三者と共有しないでください。

### 料金について
Supabaseの無料プランには次のような上限がありますが、就活手帳の個人利用であれば
まず超えることはありません。

- データベース容量：500MBまで（テキストデータ中心のこのアプリなら十分すぎる余裕があります）
- 上限に達しても自動課金されることはなく、書き込みが一時停止するだけです
- ただし**7日間まったくアクセスしないとプロジェクトが一時停止**します。
  再度開けば数十秒で自動的に復帰するので、内容が消えることはありません。


