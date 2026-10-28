TellQ Homepage v4.22 — JOURNAL & NEWS compact表示・商品データ分離

【ファイル】
- index.html：ホームページ
- style.css：共通デザイン
- script.js：既存機能およびホームのJOURNAL & NEWS表示
- journal.html：記事一覧・記事詳細ページのテンプレート
- journal.js：カテゴリ絞り込み、時系列表示、ページ分割、記事詳細表示
- journal-data.js：記事データの一元管理
- product-data.js：商品データ・カラー設定・商品説明群の一元管理
- README.txt：この説明書

【反映方法】
1. ZIPを展開します。
2. 既存のTellQフォルダに上記8ファイル一式を反映します。
3. 既存の image フォルダやその他の画像は削除・置換しないでください。
4. ローカルで index.html と journal.html を確認してから、GitHub Pagesへ反映してください。

【記事を追加する方法】
journal-data.js の window.TELLQ_JOURNAL_DATA 配列に、記事オブジェクトを1件追加します。
各記事には id（重複しない値）、date（YYYY-MM-DD）、category、status、pinned、title、summary、image、content、relatedLinks を設定します。

category：
- important：重要なお知らせ
- journal：記念記録・ブランドの歩み
- information：販売・イベント情報

status：
- published：公開
- draft：非表示（下書き）
pinned：
- true：トップページ・一覧で優先表示
- false：通常の公開日順
content：詳細ページ本文。段落ごとの文字列を配列で設定します。
relatedLinks：例 [{ "label": "商品ページを見る", "url": "https://..." }]。不要なら []。
image：記事詳細ページに表示する画像パス。画像が不要なら空欄にします。

【表示仕様】
- トップページは公開記事を最大6件表示します。
- JOURNAL & NEWS一覧は公開記事を公開日降順で表示し、カテゴリで絞り込めます。
- 一覧は12件ごとにページ分割されます。
- 記事タイトルまたは READ STORY から個別URL（journal.html?id=記事ID）で詳細を開けます。
- 関連リンクは設定されている場合のみ詳細ページに表示されます。
- 記事は削除せず、必要に応じて status を draft にするなどで公開状態を管理できます。

【注意】
- このサイトはGitHub Pagesの静的サイトです。記事の追加・編集後はGitHubへ反映する必要があります。
- 公開予定日時による自動公開は実装していません。公開するタイミングで status を published に変更してください。
- 画像フォルダは従来どおり維持してください。


【v4.22 商品情報の管理】
商品情報もニュースと同様に、表示処理とは別の product-data.js に分離しました。
商品名・価格・商品説明・商品画像枚数・スタッフスナップ・色と画像の対応・商品説明群の見出しを編集できます。
商品情報を変更するときは product-data.js を編集し、index.html / script.js / style.css など既存ファイルは基本的に変更不要です。
GitHub Pagesへ公開する際は product-data.js も必ず一緒にアップロードしてください。

【v4.22 JOURNAL & NEWS】
トップページの記事一覧をコンパクトにし、記事ごとの仕切り線をなくしました。


【v4.22の変更】
・トップページのJOURNAL & NEWSは日付の新しい記事が先頭に表示されます。
・トップページの記事の余白、日付、タイトル、概要、リンクを小さくし、一覧性を高めました。
・上記以外の機能変更は行っていません。
