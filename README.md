# Java 学習教材

**公開サイト：** https://elitemay.github.io/java/


## どこから始める？

| 目的 | 入口 |
| --- | --- |
| 第2回〜第13回の授業内容を順に学ぶ | [講義一覧](index.html) |
| `this`、`static`、拡張for文など、分からない概念を復習する | [つまずき解説](concepts/index.html) |
| 自分でコードを書いて理解度を確かめる | [問題集](problems.html) |

**利用者向け:** HTML教材は上の公開サイトからそのまま開けます。**開発者向け:** GitHubの`main`を正本とし、共通の制作ルールは[web-project-guide](https://github.com/EliteMay/web-project-guide)を参照します。


## 方針
元の授業教材を基本に、必要な定義・考え方・図解・コード・Eclipseの操作手順・演習・解答を残しながら、重複する説明を整理した復習サイトです。元の白背景・オレンジの見出し・濃いコード欄を維持します。

## 収録
- [つまずき解説（12テーマ）](concepts/index.html)：講義ごとの苦戦しやすい概念を、動くコード・実行結果・よくある間違い・ミニ問題で補足
- 第2〜13回の12講義：`lesson02.html`〜`lesson13.html`
- 問題集：`problems.html`
- 講義一覧：`index.html`

## 変更点（元教材から）
- 講義一覧と講義間のナビゲーションを追加。
- 説明を短くするため、内容が重複する「今日の授業内容」一覧、「使う場面」の表、図解と重複する「たとえ ↔ Java」の対応表を削除。
- 定義・理由・図解・サンプルコード・Eclipse手順・元の課題と解答は維持。
- 用語集を必要なときだけ開く方式へ変更（内容は保持）。
- 第2〜13回の各講義に「30秒の理解チェック」を1問ずつ追加。クリックすると答えと理由を確認できます。
- `reader.css` で見出しマーカーとコード表示を改善。
- `reader.js` で構文色分け・コードの注目行ハイライトを追加。Java実行機能はありません。

## 補足解説の作り方
講義は元教材の説明を維持しながら簡潔に保ち、拡張for文、値渡し、this、static、継承、interface、HashMap、null、ファイル操作、JDBCの補足は独立したページにまとめています。各講義の冒頭から対応する補足へ直接移動できます。元の課題や解答は削除していません。

## 初心者と復習者を両立する学習導線（2026-10-13）

- [初めてのJava](start.html)：Javaの実行・`main`・括弧とセミコロン・Eclipseの最小限の基礎。講義本文には混ぜない。
- トップページに **「最初から学ぶ」「今の知識で復習する」** という2つの入口を設置。
- 全12講義（第2〜13回）に **「さっと復習」「基礎から理解」** の切替を追加。初期状態は簡潔に、基礎モードだけ前提用語3個・段階表示のコード解説・確認問題1問を開く。
- 既存の講義・コードコピー・折り返し・目次・演習と解答はそのまま残し、学習補助だけ独立した `learning-support-data.js` / `learning-support.js` / `learning-support.css` へ分離。
- モードはブラウザのローカルストレージに保存。学習結果・個人情報の送信や会員登録は不要。
- Java以外のSQL断片・3層の概念図はJavaコードと明確に区別し、実際に動かせるコードと誤認させない。
- 追加した内容とリンクは `node tests/validate-learning.mjs` で検証。

### 教育設計の参考資料
- [Nielsen Norman Group: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)：付加情報は必要なときに開く
- [Ten quick tips for creating an effective lesson](https://pmc.ncbi.nlm.nih.gov/articles/PMC6459472/)：手順付きの例と学習者の習熟度による支援の調整
- [Effects of worked-out examples and metacognitive scaffolding on programming (2023)](https://doi.org/10.1177/07356331231174454)：プログラミング初学者の例題支援に関する研究

研究結果がこのサイトの学習成果を直接保証するわけではありません。UIと教材の有効性には実利用者による確認も必要です。

## 開発・検証
ビルド不要のHTML/CSS/JavaScriptです。`.github/workflows/deploy.yml` はGitHub Pagesへの公開前に、次の検証を実行します。

- `node tests/validate-content.mjs` — 講義・補足解説の構造と参照先
- `node tests/validate-ux.mjs` — ナビゲーション、コード表示、モバイル向けの静的チェック
- `node tests/validate-examples.mjs` — JDK 17で補足解説の独立したJavaサンプル9件をコンパイル・実行し、出力を検証

※ これらは**全講義・全問題のJavaコードを実行しているわけではありません**。問題集の全問検証と、利用者による実ブラウザ操作の確認は別途必要です。

## 最新教材ZIP（2026-10-13）
- 受領した `Javaプログラミング.zip` を照合し、第12回「PreparedStatementで追加・更新・削除」と第13回「DTO・DAO・3層」を追加。
- 第2〜11回と問題集はZIP内の元の本文が従来教材と一致するため、サイト側に積み重ねた説明整理・見た目・操作性の改善を保持。
- 新規第12・13回にも解説の整理・30秒チェック・目次・コードコピー・折り返し・前後ナビゲーションを適用。
- ZIP同梱のMySQL Connector/J（JAR）とMySQLインストール用PDFは教材データとして保持し、学習サイトへは転記していません。必要な環境は別途用意してください。
