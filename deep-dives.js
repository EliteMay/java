window.DEEP_DIVES={
2:[
["型と割り算","intは整数、doubleは小数を扱う。Javaでは計算に使う型によって結果が変わる。","System.out.println(5 / 2);     // 2\nSystem.out.println(5.0 / 2);   // 2.5\nSystem.out.println(5 % 2);     // 1","5/2は両方intなので小数部分を捨てる。5.0にするとdouble計算になる。%は余りを求める。"],
["キャスト","型を明示して変換する操作。小数から整数へのキャストは四捨五入ではない。","double price = 198.7;\nint result = (int) price;\nSystem.out.println(result); // 198","小数部分が切り捨て（0方向に除去）られる。桁の大きな値などでは範囲にも注意。"],
["前置と後置の++","どちらも1増えるが、式の中で値を使う順番が違う。","int a = 5;\nSystem.out.println(a++); // 5\nSystem.out.println(a);   // 6\nSystem.out.println(++a); // 7","a++は値を使ってから増やし、++aは増やしてから使う。単独の行なら両方1増える。"],
["if・else if","複数条件は上から調べ、最初に当てはまる処理だけを実行する。","int score = 85;\nif (score >= 80) {\n    System.out.println(\"優\");\n} else if (score >= 60) {\n    System.out.println(\"良\");\n} else {\n    System.out.println(\"再試験\");\n}","85は60以上でもあるが、最初の条件が真なので「優」だけ表示される。条件の順番が重要。"],
["通常forと拡張for","通常forは番号を使い、拡張forは要素そのものを順番に取り出す。","int[] nums = {5, 8, 3};\nfor (int i = 0; i < nums.length; i++) {\n    System.out.println(nums[i]);\n}\nfor (int x : nums) {\n    System.out.println(x);\n}","配列の添字は0〜length-1。番号が必要なら通常for、全要素を見るだけなら拡張forが読みやすい。"]
],
3:[
["引数と戻り値","引数は処理へ渡す材料、戻り値は処理の結果。voidなら値を返さない。","static int add(int a, int b) {\n    return a + b;\n}\nint result = add(3, 4); // 7","returnした時点でメソッドを抜ける。戻り値の型とreturnの値の型を合わせる。"],
["スコープとstatic","メソッド内で宣言した変数は基本的にそのブロック内だけ。mainから直接呼ぶ練習用メソッドにはstaticを付ける。","static void sayHello() {\n    String text = \"こんにちは\";\n    System.out.println(text);\n}","sayHello内のtextは別のメソッドから直接参照できない。staticの意味は第5回で詳しく扱う。"],
["intを渡しても元の値は変わらない","Javaの引数は値をコピーして渡す。intの値を変更しても呼び出し元には反映されない。","static void change(int x) { x = 99; }\nint a = 10;\nchange(a);\nSystem.out.println(a); // 10","メソッド内のxはaのコピー。名前が違うだけでなく保存場所も別。"],
["配列の中身は変更できる","配列を渡すときは配列を指す参照の値がコピーされる。両方が同じ配列を指すので要素の変更は見える。","static void change(int[] a) { a[0] = 99; }\nint[] nums = {10, 20};\nchange(nums);\nSystem.out.println(nums[0]); // 99","配列変数そのものの付け替えと配列要素の変更を混同しない。"]
],
4:[
["クラスとインスタンス","クラスは構造の定義。newするたびに別々の実物（インスタンス）が作られる。","class Book {\n    String title;\n}\nBook a = new Book();\nBook b = new Book();\na.title = \"A\";\nb.title = \"B\";","同じBook型でもaとbは別のオブジェクト。片方のtitleを書き換えてももう片方のtitleは変わらない。"],
["フィールド・メソッド","フィールドはインスタンスが覚えている状態、メソッドはその状態を使う処理。","class Item {\n    int price;\n    int doubled() { return price * 2; }\n}","Itemをnewしてpriceを設定してからdoubled()を呼ぶ。データと処理を同じクラスにまとめられる。"],
["コンストラクタとthis","newのときに初期値を受け取る。thisは現在操作しているインスタンス自身。","class Book {\n    String title;\n    Book(String title) {\n        this.title = title;\n    }\n}","左のthis.titleはフィールド、右のtitleは引数。コンストラクタには戻り値の型を書かない。"],
["配列にオブジェクトを入れる","オブジェクトも配列でまとめて扱える。拡張forではそれぞれの参照を取り出す。","Book[] books = {\n    new Book(\"こころ\"),\n    new Book(\"走れメロス\")\n};\nfor (Book b : books) {\n    System.out.println(b.title);\n}","bはBook型の変数。b1、b2などの変数名を文字列で自動的に組み立てるわけではない。"]
],
5:[
["privateは変更を制限する","外部から直接フィールドを変えられると不正な値が入る。privateなら変更方法をクラス側で決められる。","class Item {\n    private int price;\n    Item(int price) { setPrice(price); }\n    void setPrice(int value) {\n        if (value >= 0) price = value;\n    }\n}","privateは「絶対に誰も触れない」ではなく、そのクラス自身のメソッドからはアクセスできる。"],
["getterとsetter","値を読む入口がgetter、変更する入口がsetter。必要な操作だけを公開する。","public int getPrice() { return price; }\npublic void setPrice(int value) {\n    if (value >= 0) this.price = value;\n}","無条件にsetterを作る必要はない。変更させたくない値はgetterだけにしてもよい。"],
["staticとインスタンスの違い","通常フィールドはインスタンスごと、staticフィールドはクラス全体で1つ。","class Product {\n    static int total = 0;\n    String name;\n    Product(String name) {\n        this.name = name;\n        total++;\n    }\n}","nameは商品ごと、totalは全商品共通。staticからインスタンスのthisは直接使えない。"]
],
6:[
["extendsと共通化","共通の振る舞いを親クラスに置き、違う部分を子に作る。","class Animal {\n    void eat() { System.out.println(\"食べる\"); }\n}\nclass Dog extends Animal {}\nnew Dog().eat(); // 食べる","Dogにeatを書かなくても継承したメソッドを呼べる（アクセス制限を満たす場合）。"],
["オーバーライド","親のメソッドと同じシグネチャの処理を子で書き直す。","class Animal { void speak() {} }\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"ワン\"); }\n}","@Overrideを付けると、つづりや引数の間違いをコンパイラが検知しやすい。"],
["superと初期化","子のコンストラクタから親のコンストラクタを呼べる。親が引数を必要とするときに特に重要。","class Person {\n    String name;\n    Person(String name) { this.name = name; }\n}\nclass Student extends Person {\n    Student(String name) { super(name); }\n}","super(name)で親部分を初期化する。親に引数なしのコンストラクタがなければ、適切なsuper(...)が必要。"],
["親型の変数・子の実体","親型の変数に子のインスタンスを入れられる。オーバーライドされた処理は実体の型に従う。","Animal a = new Dog();\na.speak(); // ワン","変数の型は呼べるメソッドを制限し、実体の型はどの上書き処理が動くかを決める。"]
],
7:[
["interfaceとimplements","interfaceは「この操作を提供する」という共通ルールを定める。","interface Payable { int pay(); }\nclass Cash implements Payable {\n    public int pay() { return 100; }\n}","実装メソッドをpublicにする。interface側のpublicな約束を弱いアクセス範囲にできない。"],
["ポリモーフィズム（多態性）","同じ型・同じ呼び方で、実体ごとに別の動きをする仕組み。","Payable[] pays = { new Cash() };\nfor (Payable p : pays) {\n    System.out.println(p.pay());\n}","呼び出し元が具体的な種類を気にせず共通の操作を呼べる。"],
["抽象クラス","抽象クラスには共通のデータや実装を置けるが、そのままnewできない。","abstract class Shape {\n    abstract double area();\n    void print() { System.out.println(area()); }\n}","abstractメソッドは通常の具象クラスで実装が必要。インタフェースとの使い分けは共通状態・実装の有無がポイント。"],
["interfaceは複数実装できる","Javaのクラス継承は基本1つだけだが、インタフェースはいくつも実装できる。","interface A { void a(); }\ninterface B { void b(); }\nclass C implements A, B {\n    public void a() {}\n    public void b() {}\n}","extendsとimplementsは役割が違う。共通の親クラスと複数の能力を組み合わせることもできる。"]
],
8:[
["ArrayListと配列","配列は長さが固定。ArrayListはadd/removeで要素数を変えられる。","List<String> names = new ArrayList<>();\nnames.add(\"A\");\nnames.add(\"B\");\nSystem.out.println(names.size()); // 2","Listにはimport java.util.List;、ArrayListにはimport java.util.ArrayList;が必要。"],
["Listの取り出しとループ","get(番号)で取り出す。番号は0から始まり、size()が要素数を返す。","for (int i = 0; i < names.size(); i++) {\n    System.out.println(names.get(i));\n}","get(names.size())は範囲外になる。最終要素はsize()-1番。"],
["Mapのキーと値","Mapはキーで値を探す。putは新規保存にも上書きにも使う。","Map<String, Integer> stock = new HashMap<>();\nstock.put(\"りんご\", 3);\nstock.put(\"りんご\", 5);\nSystem.out.println(stock.get(\"りんご\")); // 5","存在しないキーへのgetは通常null。intへ自動変換するときはNullPointerExceptionに注意。"],
["出現回数の集計","最初の出現を0回として扱い、そこに1を加えると簡潔。","for (String item : sold) {\n    count.put(item, count.getOrDefault(item, 0) + 1);\n}","getOrDefaultはキーがなければ初期値を返す。put(item,+1)では数え上げにならない。"]
],
9:[
["nullと参照","nullは参照先がないこと。数値の0や文字列の空文字とは違う。","String s = null;\nif (s != null) {\n    System.out.println(s.length());\n}","オブジェクトを使う前にnullかもしれない経路を考える。"],
["例外とthrow","エラー条件を発見したとき、自分で例外を投げることもできる。","int age = -1;\nif (age < 0) {\n    throw new IllegalArgumentException(\"年齢が不正\");\n}","throwは例外オブジェクトを投げる処理。throwsは呼び出し元に処理を任せる宣言で別物。"],
["try・catch・finally","try内の例外をcatchで処理し、finallyは原則最後に動く。","try {\n    System.out.println(10 / 0);\n} catch (ArithmeticException e) {\n    System.out.println(\"割れない\");\n} finally {\n    System.out.println(\"終了\");\n}","この例では「割れない」「終了」。例外を握りつぶすより何が失敗したか明示する。"],
["検査例外と実行時例外","IOExceptionなどは原則catchまたはthrowsが必要。NullPointerExceptionなどはコンパイル時の強制がない。","void read() throws java.io.IOException {\n    java.nio.file.Files.readString(\n        java.nio.file.Path.of(\"test.txt\"));\n}","throwsを書いたから安全になるわけではない。失敗をどこで扱うか設計する。"]
],
10:[
["ストリームと文字コード","ストリームは順番にデータを読み書きする入口。テキストは文字コードを決めて扱う。","var path = java.nio.file.Path.of(\"data.txt\");\nString text = java.nio.file.Files.readString(path);","ファイルが存在しなければIOExceptionになる。ファイルの場所は実行時の作業フォルダ基準になり得る。"],
["try-with-resources","閉じ忘れを防ぐ構文。ReaderやWriterを使う場合は特に重要。","try (var reader = java.nio.file.Files.newBufferedReader(\n        java.nio.file.Path.of(\"data.txt\"))) {\n    String line = reader.readLine();\n}","tryの丸括弧に書いたリソースは処理後に自動closeされる。"],
["CSVの分割と注意","単純なCSVはsplitで区切れる。ただし引用符内のカンマなどを含む本格的CSVには専用パーサーが必要。","String line = \"りんご,120,3\";\nString[] cols = line.split(\",\");\nint price = Integer.parseInt(cols[1]);","parseIntは数値以外の文字列で例外。列数や空欄の確認も必要。"],
["書き込みと追記","上書きと追記は別。上書きで既存内容を失わないか確認する。","var path = java.nio.file.Path.of(\"log.txt\");\njava.nio.file.Files.writeString(path, \"1行目\\n\");","既定のwriteStringはファイルがあれば上書き。追記するときはStandardOpenOption.APPEND等を使う。"],
["throwsの使い分け","下位メソッドでcatchせず、呼び出し元で一括して対応する選択肢もある。","static String load() throws java.io.IOException {\n    return java.nio.file.Files.readString(\n        java.nio.file.Path.of(\"data.txt\"));\n}","throwsは失敗がなくなる機能ではなく、責任の移動。"]
],
11:[
["データベースとテーブル","データベース内にテーブルを作り、列と行で情報を管理する。","CREATE TABLE products (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  price INT\n);","PRIMARY KEYは行を一意に識別する鍵。同じidを重複して登録できない。"],
["SELECTとWHERE","SELECTで取得する列を指定し、WHEREで行の条件を絞る。","SELECT name, price\nFROM products\nWHERE price >= 100;","WHEREがなければすべての行が対象。DELETEやUPDATEでは特に注意。"],
["INSERTとUPDATE","INSERTは行を追加。UPDATEは既存の行の値を変える。","INSERT INTO products (id, name, price)\nVALUES (1, 'ペン', 120);\nUPDATE products SET price = 130 WHERE id = 1;","UPDATEのWHEREを省くと全件更新になる可能性がある。"],
["JDBCでつなぐ","Connectionで接続し、PreparedStatementでSQLを準備、ResultSetで検索結果を読む。","String sql = \"SELECT name FROM products WHERE id = ?\";\ntry (var ps = conn.prepareStatement(sql)) {\n    ps.setInt(1, 1);\n    try (var rs = ps.executeQuery()) {\n        while (rs.next()) System.out.println(rs.getString(1));\n    }\n}","connは別途DriverManager等で取得する。MySQLサーバー・データベース・JDBCドライバが必要。"],
["SQLインジェクション対策","ユーザー入力をSQL文字列へ直接足すと、意図しないSQLになる危険がある。","String sql = \"SELECT * FROM products WHERE name = ?\";\nvar ps = conn.prepareStatement(sql);\nps.setString(1, userName);","値は?にバインドする。テーブル名などを?で置き換えることはできない。"]
]};