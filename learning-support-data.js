window.JAVA_SUPPORT_DATA = {
  2: {
    title:"変数・条件分岐・繰り返しのつながり",
    summary:"値を保存する → 条件で判断する → 同じ処理を繰り返す。3つを組み合わせると集計ができる。",
    connects:"Javaを初めて見るなら「Javaを動かす最初の一歩」から始めよう。",
    basics:[["変数","int count = 0; は「countという名前で整数0を覚える」。右の値を左へ入れる。"],["if","if (条件) は、条件がtrueの場合だけ中の処理をする。"],["配列とfor","int[] scores は整数を複数持つ。for文はそれらを順番に取り出すためにも使う。"]],
    snippet:"int[] scores = {60, 90, 80};\nint total = 0;\nfor (int score : scores) {\n    total += score;\n}\nSystem.out.println(total);",
    steps:["scoresに60・90・80が入っている。totalは0から始まる。","1回目はscore=60なのでtotal=60。","2回目はscore=90なのでtotal=150。","3回目はscore=80なのでtotal=230。最後に230を表示する。"],
    question:"繰り返しが終わったとき total の値は？",choices:["80","150","230"],answer:2,
    reason:"totalに各要素を足している。変数は前の合計を覚え続ける。",link:"concepts/enhanced-for.html",linkText:"拡張for文と通常for文の違い"
  },
  3: {
    title:"メソッドと値渡し",
    summary:"メソッドは「処理に名前をつけて呼ぶ」仕組み。引数は入力、returnは結果を呼び出し元へ返す。",
    connects:"前回の変数・型が分かると、引数と戻り値の型も読める。",
    basics:[["メソッドを呼ぶ","add(2, 3) はaddという処理に2と3を渡して実行する。"],["引数","(int a, int b) は呼ばれた側で受け取る変数。"],["return","計算結果を呼び出し元へ返す。printlnは表示するだけで、returnとは別。"]],
    snippet:"static int add(int a, int b) {\n    return a + b;\n}\nint sum = add(2, 3);\nSystem.out.println(sum);",
    steps:["add(2,3)を呼ぶと引数aに2、bに3が入る。","return a+b で5を返し、addは終了する。","返った5がsumに入り、5を表示する。"],
    question:"addの中でreturnせずprintlnだけした場合、intを返すメソッドとして成立する？",choices:["する","しない","引数による"],answer:1,
    reason:"戻り値の型がintなら、返すべき処理の経路でintをreturnする必要がある。",link:"concepts/value-pass.html",linkText:"値渡しと配列の挙動"
  },
  4: {
    title:"クラス・インスタンス・this",
    summary:"クラスは設計図、newしたインスタンスは実物。thisは今操作している実物自身を指す。",
    connects:"第3回の「メソッド」は、クラスの中にも書ける。フィールドはその実物の情報。",
    basics:[["クラス","Productは商品が持つ名前や価格、動作をまとめる設計図。"],["new","new Product(...) は設計図を使って実物を作る。"],["コンストラクタ","newした直後に動き、フィールドの初期値を設定できる。"]],
    snippet:"class Product {\n    String name;\n    Product(String name) {\n        this.name = name;\n    }\n}\nProduct p = new Product(\"ペン\");",
    steps:["Productクラスはnameフィールドを持つ。","new Product(\"ペン\") で実物が作られ、コンストラクタが呼ばれる。","this.nameにはその実物の名前が保存される。"],
    question:"this.name = name の右側のnameは？",choices:["引数","クラス名","別のインスタンス"],answer:0,
    reason:"左のthis.nameはフィールド、右のnameは引数。",link:"concepts/this-constructor.html",linkText:"thisをもっと詳しく"
  },
  5: {
    title:"privateとstaticは別の仕事",
    summary:"privateはアクセス制限、staticはクラス全体での共有。どちらも同時に使える。",
    connects:"第4回のインスタンスをイメージすると、共有フィールドとの違いが分かる。",
    basics:[["フィールド","各Productが持つpriceなどの情報。"],["private","外のクラスから勝手に変更できないようにする。"],["static","newした実物ごとではなく、クラスに属する共有メンバー。"]],
    snippet:"class Product {\n    private int price = 100;\n    static int count = 0;\n    Product() { count++; }\n}\nnew Product();\nnew Product();\nSystem.out.println(Product.count);",
    steps:["countはProductクラスに1つだけあり、最初は0。","new Product()のたびにコンストラクタがcountを増やす。","2回newしたので共有のcountは2になる。"],
    question:"2個newしたとき、staticのcountはいくつ作られる？",choices:["0個","1個","2個"],answer:1,
    reason:"staticフィールドの実体はクラスに属し、インスタンスごとに別々には作られない。",link:"concepts/static-instance.html",linkText:"staticとインスタンス"
  },
  6: {
    title:"継承とオーバーライド",
    summary:"子クラスは親の使える機能を受け継ぎ、同じメソッドを上書きすると子の動作に変えられる。",
    connects:"クラスの設計図を拡張する考え方。第4回のclassとnewが前提。",
    basics:[["extends","class Dog extends Animal はAnimalを継承する。"],["@Override","親のメソッドを上書きすることをコンパイラに伝える。"],["super","親のコンストラクタやメソッドを呼ぶときに使う。"]],
    snippet:"class Animal {\n    void speak() { System.out.println(\"動物\"); }\n}\nclass Dog extends Animal {\n    @Override void speak() {\n        System.out.println(\"ワン\");\n    }\n}\nAnimal a = new Dog();\na.speak();",
    steps:["DogはAnimalの子クラス。speakを上書きしている。","Animal型の変数aにDogのインスタンスを入れている。","a.speak()の実行時には実体Dogのspeakが動き、ワンと表示する。"],
    question:"a.speak()が表示するのは？",choices:["動物","ワン","両方"],answer:1,
    reason:"オーバーライドされた実装は実体のクラスに従って選ばれる。",link:"concepts/override-super.html",linkText:"superとの違い"
  },
  7: {
    title:"interfaceと多態性",
    summary:"interfaceは「これができる」という約束。異なる実装でも、同じ型で呼べるようになる。",
    connects:"第6回の親クラス型の変数と同じように、interface型に異なる実体を入れられる。",
    basics:[["interface","実装側に必要なメソッドを約束する。"],["implements","このクラスがそのinterfaceを実装する宣言。"],["多態性","同じメソッド呼び出しでも実体ごとに違う動作になること。"]],
    snippet:"interface Speaker { void speak(); }\nclass Dog implements Speaker {\n    public void speak() { System.out.println(\"ワン\"); }\n}\nSpeaker s = new Dog();\ns.speak();",
    steps:["Speakerはspeakという操作を約束する。","Dogがその操作の中身を実装する。","Speaker型の変数sからspeakを呼ぶと、Dogの処理が動く。"],
    question:"Dogでspeakを実装するとき、publicを省いてよい？",choices:["よい","だめ"],answer:1,
    reason:"interfaceで宣言された通常の抽象メソッドはpublic。実装でアクセス権を狭められない。",link:"concepts/interface.html",linkText:"interfaceと抽象クラス"
  },
  8: {
    title:"ListとMapの使い分け",
    summary:"Listは順番で管理、Mapはキーで取り出す。数を集計するときはMapの古い値を取得してから更新する。",
    connects:"第2回の配列を柔軟にしたものがList。Mapは「名前→値」の対応を覚える。",
    basics:[["ArrayList","要素を後から増やせるリスト。get(0)のように番号で取り出す。"],["HashMap","キーと値をペアで保存する。get(\"ペン\")のように名前で探せる。"],["put","値を登録または上書きする。自動で加算はしない。"]],
    snippet:"Map<String, Integer> count = new HashMap<>();\nString[] sold = {\"ペン\", \"ノート\", \"ペン\"};\nfor (String item : sold) {\n    int old = count.getOrDefault(item, 0);\n    count.put(item, old + 1);\n}\nSystem.out.println(count.get(\"ペン\"));",
    steps:["最初のペンは未登録なので0を取得して1を保存。","ノートも未登録なので1を保存。","2回目のペンは1を取得して2を保存。表示は2。"],
    question:"put(item, 1)を毎回呼ぶと回数が増える？",choices:["増える","増えない"],answer:1,
    reason:"putは値を上書きするだけ。前の値に1を足してputする。Mapには適切なimportが必要。",link:"concepts/hashmap.html",linkText:"Mapで集計する練習"
  },
  9: {
    title:"nullと例外",
    summary:"nullは参照先がない状態。例外は実行中の問題を伝える仕組み。catchすれば原因が直るわけではない。",
    connects:"第4回でnewしたインスタンスの参照と、何も指していないnullを区別する。",
    basics:[["null","String name = null は文字列オブジェクトがない状態。"],["try-catch","危険な処理を試し、失敗時の処理を書く。"],["throw","自分から例外を発生させる命令。"]],
    snippet:"String name = null;\ntry {\n    System.out.println(name.length());\n} catch (NullPointerException e) {\n    System.out.println(\"名前がない\");\n}",
    steps:["nameはnullなので文字列がない。","name.length()ではNullPointerExceptionが発生する。","catchへ移動し「名前がない」を表示する。"],
    question:"String name = \"\"; のname.length()は？",choices:["0","例外"],answer:0,
    reason:"空文字は長さ0の文字列。nullとは違う。",link:"concepts/null-exception.html",linkText:"例外とnullの詳しい説明"
  },
  10: {
    title:"ファイル・ストリーム・例外",
    summary:"ファイルを読む・書くには「場所」「文字コード」「閉じ方」を考える。try-with-resourcesは閉じ忘れを防ぐ。",
    connects:"第9回の例外を使い、ファイルがなくても落ちっぱなしにならないようにする。",
    basics:[["パス","Path.of(\"memo.txt\")は、実行時の作業フォルダを基準にする相対パス。"],["IOException","読み書きで問題が起きたときなどの検査例外。"],["try (...)","カッコ内で作ったリソースを、処理が終わると自動でcloseする。"]],
    snippet:"Path p = Path.of(\"memo.txt\");\ntry {\n    Files.writeString(p, \"こんにちは\");\n    String s = Files.readString(p);\n    System.out.println(s);\n} catch (IOException e) {\n    System.out.println(\"失敗\");\n}",
    steps:["Pathでファイルの場所を指定する。","Files.writeStringでファイルに文字列を保存。既存ファイルは通常上書き。","readStringで読み戻し、表示する。失敗時はcatchへ進む。"],
    question:"throws IOException と書くと読み込み失敗が起きなくなる？",choices:["なる","ならない"],answer:1,
    reason:"throwsは呼び出し元へ例外処理を任せる宣言で、失敗そのものを防ぐ仕組みではない。",link:"concepts/file-io.html",linkText:"ファイル入出力の詳細"
  },
  11: {
    title:"SQLとJDBCの役割",
    summary:"SQLはDBへの命令、JDBCはJavaからその命令を渡す仕組み。executeQueryは検索結果を返す。",
    connects:"第10回でCSVを読み書きしたように、ここからはデータの保存先がDBになる。",
    basics:[["DBとテーブル","データの集合と、その中の表。行は1件の記録、列は項目。"],["SELECT","データを読み取るSQL。WHEREで条件を指定する。"],["JDBC","JavaからSQLを実行する標準API。接続とドライバが必要。"]],
    snippet:"SELECT name, price\nFROM products\nWHERE price < 200;",
    steps:["SELECT name,priceで取り出す列を指定。","FROM productsで商品テーブルを指定。","WHERE price < 200で200未満の商品だけ選ぶ。"],
    question:"SELECTは表の中身を変更する命令？",choices:["変更する","基本的に読み取る"],answer:1,
    reason:"SELECTは照会。データの変更にはINSERT、UPDATE、DELETEなどを使う。",link:"concepts/jdbc.html",linkText:"JDBCを詳しく"
  },
  12: {
    title:"PreparedStatementで安全に変更",
    summary:"SELECTで読むだけでなく、INSERT・UPDATE・DELETEで保存データを変更する。?に値を渡すときはsetXxxを使う。",
    connects:"第11回のSELECT・JDBCに加えて、DBを書き換える操作を学ぶ。",
    basics:[["プレースホルダー","SQLの?は、あとから値を埋める場所。文字列の連結とは違う。"],["setIntなど","1番目の?に数値を入れるならsetInt(1,値)。番号は1から始まる。"],["executeUpdate","INSERT・UPDATE・DELETEの影響行数を返す。executeQueryと使い分ける。"]],
    snippet:"String sql = \"UPDATE products SET price = ? WHERE id = ?\";\nPreparedStatement ps = conn.prepareStatement(sql);\nps.setInt(1, 300);\nps.setInt(2, 5);\nint changed = ps.executeUpdate();",
    steps:["SQLの1番目の?は新しいprice、2番目の?は対象id。","setInt(1,300)、setInt(2,5)で値を設定する。","executeUpdateでDBを更新し、影響を受けた行数を返す。接続・closeなどは省略した断片。"],
    question:"setInt(2, 5)が入れるのは、2番目の?？",choices:["はい","いいえ"],answer:0,
    reason:"番号は1から。WHERE id = ?の?が2番目。実際のDB接続と適切な後片付けが必要。",link:"concepts/preparedstatement.html",linkText:"PreparedStatementと更新処理"
  },
  13: {
    title:"DTO・DAO・Serviceを分ける理由",
    summary:"データを持つDTO、保存・取得を担当するDAO、業務ルールを考えるService。仕事を分けると変更しやすい。",
    connects:"第4〜8回のクラス、メソッド、第11〜12回のDBアクセスがここでつながる。",
    basics:[["DTO","名前や価格などのデータをまとめて渡す入れ物。"],["DAO","SQLを使ってDBから読み書きする係。"],["Service","何を許可するか・どう計算するかなど、業務ルールを扱う係。"]],
    snippet:"// 処理の流れ（概念図）\n画面: 商品IDを受け取る\n  ↓\nService: 販売できるか確認する\n  ↓\nDAO: SQLで在庫を更新する\n  ↓\nDTO: 商品情報を持ち運ぶ",
    steps:["画面側がユーザーの操作を受け取る。","Serviceで値のチェックや処理の順番を決める。","DAOがDBへ問い合わせる。DTOは情報を層間で渡すときに使う。"],
    question:"SQLを直接扱う責任は一般にどの層？",choices:["DTO","DAO","画面"],answer:1,
    reason:"DAOがデータの永続化に責任を持つ。DTOはデータを運び、Serviceが業務ルールを扱う。",link:"concepts/dto-dao.html",linkText:"DTO・DAO・3層の理解"
  },
  14: {
    title:"Swingで画面とボタンを動かす",
    summary:"JFrameで画面を作り、JButtonのクリック時に動く処理を登録する。商品登録はServiceへ任せる。",
    connects:"第13回のDTO・DAO・Serviceを使い、コンソールのMainをボタンのある画面に置き換える。",
    basics:[["JFrame","アプリのウィンドウを表すSwingのクラス。"],["JButton","押せるボタンを作る部品。"],["イベント","クリックなどの操作が起きたこと。addActionListenerでそのときの動きを登録する。"]],
    snippet:"JButton addButton = new JButton(\"追加\");\naddButton.addActionListener(e -> addProduct());\n// クリックしたら addProduct() が呼ばれる",
    steps:["まず「追加」ボタンを作る。","addActionListenerに、押されたとき実行する処理を登録する。","利用者がボタンを押したときだけaddProduct()が呼ばれる。"],
    question:"クリックしてもボタンの処理が動かない。まず何を確認する？",
    choices:["addActionListenerで処理を登録したか","setTextでボタン名を変えたか","SQLのSELECTを実行したか"],answer:0,
    reason:"操作と処理が結び付いていなければ、ボタンを押しても反応しない。",link:"lesson14.html#lesson-part-3",linkText:"Swingの解説とコード"
  },
  15: {
    title:"ユースケース図で『誰が何をするか』を整理",
    summary:"UMLは図の共通の描き方。ユースケース図は利用者の役割と、システムでできることを整理する。",
    connects:"第14回で作った商品在庫管理の画面を、作る前に何が必要か考えるための表現。",
    basics:[["アクター","システムを使う人や外部システムの役割。棒人間などで表す。"],["ユースケース","利用者がシステムで実現したい機能。楕円で表す。"],["シナリオ","ユースケースの手順を、実際の人物・商品などを入れた1回分の例にする。"]],
    snippet:"担当者 ── （商品を登録する）\n担当者 ── （商品を検索する）\n※ UMLの関係を簡略化した概念図。Javaコードではありません。",
    steps:["棒人間に当たる『担当者』がアクター。","楕円の『商品を登録する』『商品を検索する』はユースケース。","線は担当者がその機能を利用する関係。詳しい形は講義のUML図で確認する。"],
    question:"ユースケース図で『商品を登録する』を表す基本の形は？",
    choices:["棒人間","楕円","ひし形"],answer:1,
    reason:"楕円がユースケース、棒人間がアクター、システムの範囲は四角で描く。",link:"lesson15.html#lesson-part-3",linkText:"ユースケース図と記述の解説"
  },
  16: {
    title:"クラス図とオブジェクト図の違い",
    summary:"クラス図は型や関係の設計、オブジェクト図は実際のインスタンスとある瞬間の値を描く。",
    connects:"第13回のDTO・DAO・Serviceというクラスと、第15回のUML表記が前提です。",
    basics:[["クラス図","クラスの名前・属性・操作と、クラス同士の関係を描く。"],["可視性","+ は public、- は private。属性や操作の先頭に記号を付ける。"],["オブジェクト図","具体的なインスタンスの現在値やリンクを示す。クラス図と違って操作の段はない。"]],
    snippet:"// UMLを文字で簡略化した概念図（Javaコードではありません）\nProductDTO\n  - id : int\n  - price : int\n\npen : ProductDTO\n  id = 3\n  price = 150",
    steps:["ProductDTOのクラス図ではフィールド名と型を宣言する。","pen : ProductDTO はそのクラスから作られた実体を表す。","オブジェクト図では、その瞬間のidやpriceの実際の値を書く。"],
    question:"『pen : ProductDTO』『price = 150』を描く図は？",choices:["クラス図","オブジェクト図","ユースケース図"],answer:1,
    reason:"実際のインスタンスと値を描くのがオブジェクト図。クラス図は設計の形を描きます。",link:"lesson16.html#lesson-part-3",linkText:"図の記号と書き方"
  },
  17: {
    title:"シーケンス図で処理の順番を読む",
    summary:"シーケンス図は、オブジェクト間の呼び出しを時間順に描く。alt は条件分岐、loop は繰り返しを表す。",
    connects:"第13回のDAO・Service、第14回の画面と、第15〜16回のUMLがつながる。",
    basics:[["ライフライン","各オブジェクトから下へ伸びる破線。時間は上から下へ進む。"],["メッセージ","矢印がメソッドの呼び出し、戻りの矢印が結果を表す。"],["複合フラグメント","alt で条件ごとに分け、loop で指定範囲を繰り返す。"]],
    snippet:"※ Javaコードではない簡略UML図\n画面 → Service : add(p)\nService → DAO : insert(p)\nDAO ⇢ Service : 結果\nalt [入力が正しい]\n  登録\nelse [不正]\n  エラー表示",
    steps:["縦に並ぶ呼び出しを、上から下へ順に追う。","画面がServiceを呼び、ServiceがDAOへ処理を渡す。","条件で分かれる所はalt、繰り返す所はloopの枠で示す。"],
    question:"Javaの if / else のような分岐を表す枠は？",choices:["alt","loop","ライフライン"],answer:0,
    reason:"altは条件分岐。loopは繰り返し、ライフラインは参加者の存在を示す。",link:"lesson17.html#lesson-part-3",linkText:"シーケンス図の解説"
  },
  18: {
    title:"ステートマシン図で状態の変化を追う",
    summary:"状態は『いまどうなっているか』、遷移は『どの条件で変わるか』。矢印をJavaの条件分岐に対応させる。",
    connects:"第17回は登場人物の呼び出し順、第18回は1つの商品の状態変化に注目する。",
    basics:[["状態","『在庫あり』『売り切れ』など、今の様子を角丸四角で描く。"],["遷移","イベントで別の状態へ移る矢印。同じ状態へ戻る自己遷移もある。"],["ガード条件","矢印の[ ]に書く条件。条件の重なりや抜けに注意する。"]],
    snippet:"※ Javaコードではない簡略UML図\n● → 在庫あり\n在庫あり --売る [在庫が残る]--> 在庫あり\n在庫あり --売る [残り0]--> 売り切れ",
    steps:["開始の黒丸から最初の状態を読む。","『売る』のイベントと条件によって進む矢印が変わる。","どの条件にも当てはまらない操作を、コード側でどう扱うか確認する。"],
    question:"状態を表す四角には何を書く？",choices:["『売る』などの操作名","『在庫あり』などの今の様子"],answer:1,
    reason:"操作は遷移の矢印に書く。状態には今の様子を書く。",link:"lesson18.html#lesson-part-3",linkText:"ステートマシン図の解説"
  }
};