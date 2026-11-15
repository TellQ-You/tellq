/* =========================================================
   TellQ PRODUCT DATA v4.29
   商品情報・カラー別画像・カラー別BASEリンク・商品説明群の見出しを管理するファイルです。
   商品を追加・編集するときは、基本的にこのファイルを変更してください。

   【写真ごとの注意事項】
   各商品オブジェクト内の photoNotes に、表示順（1始まり）ごとの注意事項を設定します。
   3枚目・5枚目だけなど、必要な番号だけを飛び飛びで記載できます。
   default は全カラー共通、black などは特定カラー専用（共通文より優先）です。
   数字は画像ファイル名の番号ではなく、画面上で表示される順番です。
   例：photoNotes: { default: { 3: "3枚目の注意", 5: "5枚目の注意" } }

   【カラー別設定】
   各商品の variants にカラーごとの画像・スウォッチ色・BASE URLを設定します。
   imagePrefix / imageExtension / photoNumbers で連番画像を管理できます。
   photoNumbers は1から指定し、追加・削除でカラーごとの画像枚数を調整します。
   baseUrl にはそのカラー専用のBASE商品ページURLを設定します。
   script.js より前に読み込まれる必要があります。
========================================================= */

const PRODUCT_DATA = [
    {
        imagePrefix: "Patchwork-Scarf-",
        imageExtension: "JPG", // 商品画像の拡張子：jpg / png / webp など
        photoCount: 36, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        number: "パッチワークマフラー3種",
        // status: "upcoming"（販売予定） / "available"（販売中） / "soldout"（売り切れ）
        status: "available",
        // 商品詳細欄に表示する販売予定の説明文。
        upcomingText: "11月中旬に販売予定。",
        // MORE ITEMSのCOMING SOONの下に表示する文言。商品ごとに編集できます。
        moreItemsUpcomingText: "11月中旬に販売予定",
        // BASEの商品ページURL。未設定の場合は下の BASE_SHOP_URL に移動します。
        baseUrl: "https://tellqyou.base.shop/",
        // 写真ごとの注意事項。数字は表示順（1始まり）。未設定の番号は表示されません。
        // 全カラー共通：default: { 3: "3枚目の注意", 5: "5枚目の注意" }
        // カラー別：black: { 5: "BLACKの5枚目だけ別の注意" }（defaultより優先）
        photoNotes: {
            brown: {
                1: "brown(パターンA)",
                2: "brown(パターンA)",
                3: "brown(パターンA)",
                4: "brown(パターンA)",
                5: "brown(パターンB)",
                6: "brown(パターンB)",
                7: "brown(パターンB)",
                8: "brown(パターンB)"

            },
            white: {
                1: "white(パターンA)",
                2: "white(パターンA)",
                3: "white(パターンA)",
                4: "white(パターンA)",
                5: "white(パターンB)",
                6: "white(パターンB)",
                7: "white(パターンB)",
                8: "white(パターンB)",
                9: "white(パターンC)",
                10: "white(パターンC)",
                11: "white(パターンC)",
                12: "white(パターンC)",
                13: "white(パターンD)",
                14: "white(パターンD)",
                15: "white(パターンD)",
                16: "white(パターンD)"

            },
            black: {
                1: "black(パターンA)",
                2: "black(パターンA)",
                3: "black(パターンA)",
                4: "black(パターンA)",
                5: "black(パターンB)",
                6: "black(パターンB)",
                7: "black(パターンB)",
                8: "black(パターンB)",
                9: "black(パターンC)",
                10: "black(パターンC)",
                11: "black(パターンC)",
                12: "black(パターンC)"
            }
        },
        // 販売予定商品のカラー別設定。画像追加後に photoNumbers を編集します。
        variants: [
            { key: "brown", label: "BROWN", displayName: "BROWN", status: "available", color: "#79543a", imagePrefix: "Patchwork-Scarf-", imageExtension: "JPG", photoNumbers: [3, 1, 2, 4, 7, 5, 6, 8], baseUrl: "https://tellqyou.base.shop/" },
            { key: "white", label: "WHITE", displayName: "WHITE", status: "available", color: "#f8f5ef", imagePrefix: "Patchwork-Scarf-", imageExtension: "JPG", photoNumbers: [9, 11, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], baseUrl: "https://tellqyou.base.shop/" },
            { key: "black", label: "BLACK", displayName: "BLACK", status: "available", color: "#171717", imagePrefix: "Patchwork-Scarf-", imageExtension: "JPG", photoNumbers: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], baseUrl: "https://tellqyou.base.shop/" }
        ],

        category: "TELLQ / UPCYCLED COLLECTION",
        name: "<span class='tellq-product-name-en'>TellQ<br>Patchwork Scarf</span><br><span class='tellq-product-name-ja'>パッチワークマフラー</span>",
        price: "¥23,500",//"¥16,800",
        // TellQ v6.30 code audit: dormant field; current product copy is supplied by information[].
        // description: "現在検討中の商品です。",
        material: "Wool(&Mohair,Alpaca,Llama)",
        information: [
            "【コンセプト】</br></br>捨てられるはずだった素材に、新たな価値を。</br></br>100年続いた実家のニット会社に残されていた、上質なニット素材。</br></br>色や形が異なる上質な素材は、長年のものづくりの中で使われないままバラバラに残り、廃棄物となっていました。</br></br>そんな素材をもう一度輝かせたい。新たな形で価値を生み出したい。そんな想いから、このマフラーが生まれました。</br></br>量産することのできない、唯一無二のデザイン。</br></br>素材を大切に活かしながら、おしゃれを楽しむことも妥協しない。</br></br>TellQが大切にする、ものを大切にする心と、自分らしいファッションを楽しむ喜びを込めたアイテムです。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            "【商品説明】</br></br>異なる色や質感の生地を組み合わせた、表情豊かなパッチワークマフラー。</br></br>上質なウールを使用し、モヘヤやアルパカなどの素材を組み合わせることで、それぞれ異なる素材の風合いを楽しめるデザインに仕上げました。</br></br>生地をオーバーロックで縫い合わせることで生まれる、ふんわりとした立体感も魅力のひとつ。</br></br>量産することのできない、唯一無二のデザインです。</br></br>巻き方によって見える柄や素材が変わるため、その日の気分やコーディネートに合わせてさまざまな表情をお楽しみいただけます。</br></br>カラーはブラック・ホワイト・ブラウンの全3色。シンプルな装いのアクセントとしてはもちろん、秋冬のワントーンコーデにもおすすめです。</br></br>仕上げにはTellQのオリジナルプレートを一針ずつ手縫いで取り付けました。</br></br>生地の組み合わせによって一つひとつ異なる表情を持つ、特別なアイテムです。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            "【素材・組成】</br></br>* 主な素材：ウール</br>* その他の素材：モヘヤ、アルパカなど</br>* 補助素材：少量のナイロンなど</br>* 仕様：異なる生地を組み合わせたパッチワーク</br>* 仕上げ：TellQオリジナルプレートを手縫いで取り付け</br></br>【注意事項】</br></br>※使用素材や混率は商品ごとに異なる場合があります。</br></br>※正確な混率が確認できないため、素材の割合は記載していません。</br></br>商品に使用しているプレートには、製造過程や保管時に生じた細かな傷が見られる場合がございます。あらかじめご了承のうえ、ご購入いただきますようお願いいたします。</br></br>※傷が気になるお客様は、ご購入をお控えいただきますようお願いいたします。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            "【お手入れ・保管方法】</br></br>アイロン</br></br>* スチームによる仕上げのみとし、アイロン面を生地に直接当てないでください。</br>* 生地の風合いや編み地を損なわないよう、優しくお取り扱いください。</br></br>洗濯</br></br>* 水または30℃以下のぬるま湯で、つけ置き洗いをしてください。</br>* 強くこすったり、引っ張ったりしないようご注意ください。</br>* タンブラー乾燥機の使用はお避けください。</br>* 洗濯後は形を整え、素材の風合いを損なわないよう乾燥させてください。</br>※素材や生地の組み合わせによって適切なお手入れ方法が異なる場合があります。洗濯表示や販売元の指示を優先してください。</br></br>ご使用上の注意</br></br>ざっくりと編まれたニット素材を含むため、アクセサリーやバッグの金具などへの引っ掛かりにご注意ください。</br></br>糸引きが起きた場合は、糸を切らずに、編み地の内側へ優しく引き戻して整えてください。</br></br>保管方法</br></br>* 湿気や直射日光を避け、清潔で乾燥した場所に保管してください。</br>* 型崩れや引っ掛かりを防ぐため、ほかの衣類やアクセサリーと分けて保管してください。</br>* 虫食いを防ぐため、防虫対策をおすすめします。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            "【サイズ・寸法】</br></br>サイズに関してはBESEをご確認ください</br></br>※手作業で制作しているため、商品ごとに多少の個体差が生じる場合があります。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆</br></br>【カラー】</br></br>全3色</br></br>* BLACK｜ブラック</br>* WHITE｜ホワイト</br>* BROWN｜ブラウン</br>※生地の組み合わせや配置は商品ごとに異なります。</br>※商品画像は、撮影時の照明やお使いのモニター環境によって実際の色味と異なって見える場合があります。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            "【配送・返品に関する案内】</br></br>発送予定日・送料・返品交換の条件・在庫状況などの詳細は、BASEの各商品販売ページにてご確認ください。</br></br>ご不明な点がございましたら、販売ページよりお問い合わせください。</br>"
        ]
    },
    {
        imagePrefix: "knit-accessories-",
        imageExtension: "JPG", // 商品画像の拡張子：jpg / png / webp など
        photoCount: 1, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        number: "アクセサリー1種",
        // status: "upcoming"（販売予定） / "available"（販売中） / "soldout"（売り切れ）
        status: "upcoming",
        // 商品詳細欄に表示する販売予定の説明文。
        upcomingText: "11月中旬に販売予定。",
        // MORE ITEMSのCOMING SOONの下に表示する文言。商品ごとに編集できます。
        moreItemsUpcomingText: "11月中旬に販売予定",
        // BASEの商品ページURL。未設定の場合は下の BASE_SHOP_URL に移動します。
        baseUrl: "https://tellqyou.base.shop/",
        // 写真ごとの注意事項。数字は表示順（1始まり）。未設定の番号は表示されません。
        // 全カラー共通：default: { 3: "3枚目の注意", 5: "5枚目の注意" }
        // カラー別：black: { 5: "BLACKの5枚目だけ別の注意" }（defaultより優先）
        photoNotes: {},
        // 販売予定商品のカラー別設定。画像追加後に photoNumbers を編集します。
        variants: [
            { key: "white", label: "WHITE", displayName: "WHITE", status: "available", color: "#f8f5ef", imagePrefix: "knit-accessories-", imageExtension: "JPG", photoNumbers: [1], baseUrl: "" }
        ],

        category: "TELLQ / UPCYCLED COLLECTION",
        name: "<span class='tellq-product-name-en'>TellQ</span><br><span class='tellq-product-name-ja'>ふわふわニット<br>アクセサリー</span>",
        price: "¥----",//"¥8,800",
        // TellQ v6.30 code audit: dormant field; current product copy is supplied by information[].
        // description: "現在検討中の商品です。",
        material: "Knit(&Others)",
        information: [
            //"【コンセプト】</br></br>Concept｜素材に、新しい可能性を。</br></br>役目を終えたと思われていた素材にも、まだ新しい魅力が眠っている。</br></br>TellQは、実家に残されていた残布やはぎれを活用し、廃棄されるはずだった素材に新たな価値を与え、これまでにないアクセサリーへと生まれ変わらせています。</br></br>素材を無駄なく活かし、環境への負担を減らしながら、既存の枠にとらわれないデザインを追求。</br></br>ものを大切にすることと、おしゃれを楽しむこと。その両方を叶える、環境にも配慮した新しいファッションの可能性を提案します。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            //"【商品説明】</br></br>ニットの柔らかなフォルムに、パールやビーズをあしらった印象的なナローチョーカー。</br></br>フックを使わず、そのまま首に通して着用できるシンプルな仕様です。重さは○gと軽く、首元にふわふわとしたニットの心地よさを感じながら、快適に身に着けられます。ニット素材が首元をやさしく包み、暖かさを添えてくれるのも魅力です。</br></br>マットな質感のニットと、パールやビーズのきらめきが互いの魅力を引き立て、首元に豊かな表情を添えます。</br></br>シンプルなトップスに合わせるだけでコーディネートの主役に。カジュアルな装いからエレガントなスタイルまで、幅広い着こなしのアクセントとしてお楽しみいただけます。</br></br>一般的なチェーンネックレスとはひと味違う、異なる質感のコントラストと存在感のあるデザインが魅力です。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            //"【素材・組成】</br></br>【注意事項】</br></br>商品に使用しているプレートには、製造過程や保管時に生じた細かな傷が見られる場合がございます。あらかじめご了承のうえ、ご購入いただきますようお願いいたします。</br></br>※傷が気になるお客様は、ご購入をお控えいただきますようお願いいたします。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            //"【お手入れ・保管方法】</br></br>* 汚れや汗が気になる場合は、柔らかく乾いた布で表面を優しく拭き取ってください。</br>* ニット部分は毛羽立ちや引っかかりが生じやすいため、強くこすったり、引っ張ったりしないでください。</br>* パールやビーズの装飾部分に強い衝撃を与えないようご注意ください。</br></br>保管方法</br></br>* 直射日光や高温多湿を避け、風通しのよい場所で保管してください。</br>* 型崩れや装飾の絡まりを防ぐため、他のアクセサリーと分けて保管してください。</br>* ニット部分を強く折り曲げたり、重いものを上に置いたりしないでください。</br></br>ご使用上の注意</br></br>* 水濡れや汗、化粧品、香水、ヘアスプレーなどの付着は、変色や素材の劣化につながる場合があります。</br>* 洗濯機や乾燥機のご使用はお避けください。</br>* 装飾部分を強く引っ張ると、破損やパーツの脱落につながる恐れがあります。</br>素材の風合いと美しいデザインを長くお楽しみいただくため、優しくお取り扱いください。</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            //"【サイズ・寸法】</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆</br></br>【カラー】</br></br>アイボリーニットパール(Knit Pearl Necklace – Ivory)</br></br>⋆. ݁┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ ݁.⋆",
            //"【配送・返品に関する案内】</br></br>BASEの内容貼り付け</br></br>発送目安、返品・交換条件、受注生産や一点物の場合の注意点。</br></br>"
        ]
    },
    {
        imagePrefix: "CashmereL-M-",
        imageExtension: "JPG", // 商品画像の拡張子：jpg / png / webp など
        photoCount: 17, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        number: "リボンデザイン3種",
        // status: "upcoming"（販売予定） / "available"（販売中） / "soldout"（売り切れ）
        status: "soldout",
        // 商品詳細欄に表示する販売予定の説明文。
        upcomingText: "追加時期は決まり次第お知らせします",
        // MORE ITEMSのCOMING SOONの下に表示する文言。商品ごとに編集できます。
        moreItemsUpcomingText: "",
        // BASEの商品ページURL。未設定の場合は下の BASE_SHOP_URL に移動します。
        baseUrl: "https://tellqyou.base.shop/",
        // 写真ごとの注意事項。数字は表示順（1始まり）。未設定の番号は表示されません。
        // 全カラー共通：default: { 3: "3枚目の注意", 5: "5枚目の注意" }
        // カラー別：black: { 5: "BLACKの5枚目だけ別の注意" }（defaultより優先）
        photoNotes: {},
        // カラーごとに画像・表示名・販売状況・BASE販売ページを個別管理できます。
        variants: [
            { key: "black", label: "BLACK", displayName: "BLACK", status: "available", color: "#171717", imagePrefix: "CashmereL-M-", imageExtension: "JPG", photoNumbers: [1, 16, 17, 2, 3, 4, 5], baseUrl: "https://tellqyou.base.shop/items/164334669" },
            { key: "grey", label: "GREY", displayName: "GREY", status: "available", color: "#adacab", imagePrefix: "CashmereL-M-", imageExtension: "JPG", photoNumbers: [6, 16, 17, 7, 8, 9, 10], baseUrl: "https://tellqyou.base.shop/items/164345045" },
            { key: "brown-black", label: "BROWN / BLACK", displayName: "BROWN / BLACK", status: "soldout", colors: ["#c5a061", "#171717"], imagePrefix: "CashmereL-M-", imageExtension: "JPG", photoNumbers: [11, 16, 17, 12, 13, 14, 15], baseUrl: "" }
        ],

        category: "TELLQ / UPCYCLED COLLECTION",
        name: "<span class='tellq-product-name-en'>TellQ<br>Cashmere 100% Compact Scarf</span><br><span class='tellq-product-name-ja'>カシミヤ100％コンパクトマフラー</span>",
        price: "¥19,800",
        // TellQ v6.30 code audit: dormant field; current product copy is supplied by information[].
        // description: "現在検討中の商品です。",
        material: "Cashmere 100%",
        information: [
            "【コンセプト】</br></br>100年続いた実家のニット会社で長く愛されてきた人気アイテムを、現代のスタイルに合わせてリメイクしました。</br></br>「繊維の宝石」とも呼ばれるカシミヤを100％使用し、受け継がれてきたデザインに、柔らかな風合いと軽やかな着け心地を組み合わせています。日常に取り入れやすいコンパクトマフラーに仕上げました。</br></br>大きめのリボンがワンポイントになるリボンデザインと、シンプルで取り入れやすいユニセックスデザインを展開。</br></br>全７種類のラインナップで、リボンデザイン３種類、ユニセックスデザイン４種類をご用意しています。</br>",
            "【商品説明】</br></br>上質なカシミヤを100％使用した、コンパクトなマフラー。</br></br>袋編み部分に指を差し入れて首に回し、リブ編み部分を引っ張るだけで簡単に着用できるデザイン。巻き方に悩まず、日常のコーディネートに取り入れやすいアイテムです。</br></br>天然素材ならではの柔らかな風合いと、カシミヤのぬくもりをお楽しみください。</br></br>リボンデザイン</br></br>柔らかいシースルーの生地で大きめのリボンをつくり、エレガントで大人っぽいフォルムに仕上げました。</br></br>リボンのテールの先端にはパールをあしらい、さりげない華やかさをプラスしています。</br></br>リボンを首元の中央に配置するのはもちろん、斜めに配置してアシンメトリーに見せるスタイリングもおすすめです。</br></br>立体的なリボンが、シンプルな装いにも華やかなアクセントを添えてくれます。</br>",
            "【素材・組成】</br></br>素材：カシミヤ100％</br></br>カシミヤは、カシミヤヤギから採れる希少な天然繊維です。柔らかな肌触りと軽やかさ、優れた保温性が魅力とされています。</br></br>内モンゴル産のホワイトカシミヤの産毛を100％使用した素材が紹介されています。産毛は一頭から約100〜120g程度しか採れないとされ、その希少性から「繊維の宝石」とも呼ばれています。</br></br>TellQでは、カシミヤならではの風合いと素材の魅力を活かした商品をお届けします。</br></br>* 素材：カシミヤ100％</br>* 原料産地：要確認</br>* 原料の種類（ホワイトカシミヤの産毛）：要確認</br>* 生産国：日本（東京）</br></br>【注意事項】</br>商品に使用しているプレートには、製造過程や保管時に生じた細かな傷が見られる場合がございます。あらかじめご了承のうえ、ご購入いただきますようお願いいたします。</br></br>※傷が気になるお客様は、ご購入をお控えいただきますようお願いいたします。</br>",
            "【サイズ・寸法】</br></br>* 長さ：約68cm</br>* 幅：約13cm</br>* 重さ：約35g</br></br>※サイズ・重量は目安です。測定方法や個体差により多少異なる場合があります。</br></br>••┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈••</br></br>【カラー・デザイン展開】</br></br>全７種類</br></br>* リボンデザイン：３種類</br>ブラック×ホワイトリボン</br>グレー×ブラックリボン</br>ブラック×裏面ブラウン×ホワイトリボン</br></br>* ユニセックスデザイン：４種類</br>ブラック×ワインレッド</br>グレージュ×キャメル</br>ネイビー×ブラック×オータムブラウン</br>ブラック×グレー</br></br>※商品画像は、撮影時の照明やお使いのモニター環境によって実際の色味と異なって見える場合があります。</br>",
            "【お手入れ・保管方法】</br></br>《ご自宅でお手入れする場合》</br>1. 40℃以下のぬるま湯に少量の洗剤を入れ、優しく押し洗いしてください。</br>2. 十分にすすぎ、必要に応じて素材に適した柔軟剤を使用してください。</br>3. 強く絞らず、タオルなどで優しく水分を取り除いてください。</br>4. 形を整え、風通しのよい場所で平干ししてください。</br>※タンブラー乾燥機の使用は、縮みや風合いの変化につながるためお避けください。</br>※リボンやパール部分に強い力を加えたり、引っ掛けたりしないようご注意ください。</br></br>《クリーニングに出す場合》</br>カシミヤ製品および装飾パーツに対応したクリーニング店への相談をおすすめします。</br></br>《保管方法》</br>湿気や直射日光を避け、清潔で風通しのよい場所に保管してください。虫食いを防ぐため、防虫対策もおすすめします。</br></br>リボンやパールの形を保つため、他の衣類やアクセサリーなどに引っ掛からないよう、ゆとりを持たせて保管してください。</br>",
            "【配送・返品に関する案内】</br></br>発送予定日・送料・返品交換の条件・在庫状況などの詳細は、BASEの各商品販売ページにてご確認ください。</br></br>ご不明な点がございましたら、販売ページよりお問い合わせください。</br>"
        ]
    },
    {
        imagePrefix: "CashmereM-M-",
        imageExtension: "JPG", // 商品画像の拡張子：jpg / png / webp など
        photoCount: 28, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        number: "ユニセックスデザイン4種",
        // status: "upcoming"（販売予定） / "available"（販売中） / "soldout"（売り切れ）
        status: "soldout",
        // 商品詳細欄に表示する販売予定の説明文。
        upcomingText: "追加時期は決まり次第お知らせします",
        // MORE ITEMSのCOMING SOONの下に表示する文言。商品ごとに編集できます。
        moreItemsUpcomingText: "",
        // BASEの商品ページURL。未設定の場合は下の BASE_SHOP_URL に移動します。
        baseUrl: "https://tellqyou.base.shop/",
        // 写真ごとの注意事項。数字は表示順（1始まり）。未設定の番号は表示されません。
        // 全カラー共通：default: { 3: "3枚目の注意", 5: "5枚目の注意" }
        // カラー別：black: { 5: "BLACKの5枚目だけ別の注意" }（defaultより優先）
        photoNotes: {},
        // カラーごとに画像・表示名・販売状況・BASE販売ページを個別管理できます。
        variants: [
            { key: "navy-black-grey", label: "NAVY / BLACK / GREY", displayName: "NAVY / BLACK / GREY", status: "available", colors: ["#171717","#787674", "#110145"], imagePrefix: "CashmereM-M-", imageExtension: "JPG", photoNumbers: [1, 2, 3, 4, 5, 6, 27, 28, 7, 29], baseUrl: "" },
            { key: "black-wineRed", label: "BLACK / WINERED", displayName: "BLACK / WINERED", status: "available", colors: ["#171717", "#761a16"], imagePrefix: "CashmereM-M-", imageExtension: "JPG", photoNumbers: [15, 16, 17, 18, 19, 20, 27, 28, 21, 29], baseUrl: "https://tellqyou.base.shop/items/164329470" },
            { key: "black-grey", label: "BLACK / GREY", displayName: "BLACK / GREY", status: "available", colors: ["#171717", "#c6c6c6"], imagePrefix: "CashmereM-M-", imageExtension: "JPG", photoNumbers: [8, 9, 10, 11, 12, 13, 27, 28, 14, 29], baseUrl: "https://tellqyou.base.shop/items/164329829" },
            { key: "greige-Camel", label: "GREIGE / CAMEL", displayName: "GREIGE / CAMEL", status: "available", colors: ["#f4bb75", "#f1f1f1"], imagePrefix: "CashmereM-M-", imageExtension: "JPG", photoNumbers: [22, 23, 24, 25, 26, 27, 28, 29], baseUrl: "" }
        ],

        category: "TELLQ / UPCYCLED COLLECTION",
        name: "<span class='tellq-product-name-en'>TellQ<br>Cashmere 100% Compact Scarf</span><br><span class='tellq-product-name-ja'>カシミヤ100％コンパクトマフラー</span>",
        price: "¥19,800",
        // TellQ v6.30 code audit: dormant field; current product copy is supplied by information[].
        // description: "現在検討中の商品です。",
        material: "Cashmere 100%",
        information: [
            "【コンセプト】</br></br>100年続いた実家のニット会社で長く愛されてきた人気アイテムを、現代のスタイルに合わせてリメイクしました。</br></br>「繊維の宝石」とも呼ばれるカシミヤを100％使用し、受け継がれてきたデザインに、柔らかな風合いと軽やかな着け心地を組み合わせています。日常に取り入れやすいコンパクトマフラーに仕上げました。</br></br>大きめのリボンがワンポイントになるリボンデザインと、シンプルで取り入れやすいユニセックスデザインを展開。</br></br>全７種類のラインナップで、リボンデザイン３種類、ユニセックスデザイン４種類をご用意しています。</br>",
            "【商品説明】</br></br>上質なカシミヤを100％使用した、コンパクトなマフラー。</br></br>袋編み部分に指を差し入れて首に回し、リブ編み部分を引っ張るだけで簡単に着用できるデザイン。巻き方に悩まず、日常のコーディネートに取り入れやすいアイテムです。</br></br>天然素材ならではの柔らかな風合いと、カシミヤのぬくもりをお楽しみください。</br></br>ユニセックスデザイン</br></br>性別を問わず取り入れやすい、シンプルで洗練されたデザイン。</br></br>コンパクトで持ち運びやすく、外出時はもちろん、体を動かすときやお家で過ごす時間にも気軽にお使いいただけます。</br></br>ヘリンボーン柄を取り入れることで、シンプルなデザインに上品な表情と高級感をプラスしました。</br></br>首元をすっきりと見せながら、カジュアルからきれいめまで幅広いスタイルに合わせていただけます。</br>",
            "【素材・組成】</br></br>素材：カシミヤ100％</br></br>カシミヤは、カシミヤヤギから採れる希少な天然繊維です。柔らかな肌触りと軽やかさ、優れた保温性が魅力とされています。</br></br>内モンゴル産のホワイトカシミヤの産毛を100％使用した素材が紹介されています。産毛は一頭から約100〜120g程度しか採れないとされ、その希少性から「繊維の宝石」とも呼ばれています。</br></br>TellQでは、カシミヤならではの風合いと素材の魅力を活かした商品をお届けします。</br></br>* 素材：カシミヤ100％</br>* 原料産地：要確認</br>* 原料の種類（ホワイトカシミヤの産毛）：要確認</br>* 生産国：日本（東京）</br></br>【注意事項】</br>商品に使用しているプレートには、製造過程や保管時に生じた細かな傷が見られる場合がございます。あらかじめご了承のうえ、ご購入いただきますようお願いいたします。</br></br>※傷が気になるお客様は、ご購入をお控えいただきますようお願いいたします。</br>",
            "【サイズ・寸法】</br></br>* 長さ：約68cm</br>* 幅：約13cm</br>* 重さ：約35g</br></br>※サイズ・重量は目安です。測定方法や個体差により多少異なる場合があります。</br></br>••┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈••</br></br>【カラー・デザイン展開】</br></br>全７種類</br></br>* リボンデザイン：３種類</br>ブラック×ホワイトリボン</br>グレー×ブラックリボン</br>ブラック×裏面ブラウン×ホワイトリボン</br></br>* ユニセックスデザイン：４種類</br>ブラック×ワインレッド</br>グレージュ×キャメル</br>ネイビー×ブラック×オータムブラウン</br>ブラック×グレー</br></br>※商品画像は、撮影時の照明やお使いのモニター環境によって実際の色味と異なって見える場合があります。</br>",
            "【お手入れ・保管方法】</br></br>《ご自宅でお手入れする場合》</br>1. 40℃以下のぬるま湯に少量の洗剤を入れ、優しく押し洗いしてください。</br>2. 十分にすすぎ、必要に応じて素材に適した柔軟剤を使用してください。</br>3. 強く絞らず、タオルなどで優しく水分を取り除いてください。</br>4. 形を整え、風通しのよい場所で平干ししてください。</br>※タンブラー乾燥機の使用は、縮みや風合いの変化につながるためお避けください。</br>※リボンやパール部分に強い力を加えたり、引っ掛けたりしないようご注意ください。</br></br>《クリーニングに出す場合》</br>カシミヤ製品および装飾パーツに対応したクリーニング店への相談をおすすめします。</br></br>《保管方法》</br>湿気や直射日光を避け、清潔で風通しのよい場所に保管してください。虫食いを防ぐため、防虫対策もおすすめします。</br></br>リボンやパールの形を保つため、他の衣類やアクセサリーなどに引っ掛からないよう、ゆとりを持たせて保管してください。</br>",
            "【配送・返品に関する案内】</br></br>発送予定日・送料・返品交換の条件・在庫状況などの詳細は、BASEの各商品販売ページにてご確認ください。</br></br>ご不明な点がございましたら、販売ページよりお問い合わせください。</br>"
        ]
    }
    
];

/* =========================================================
   STAFF SNAP画像設定（商品とは独立して管理）

   ・画像は image/ フォルダに保存します。
   ・fileName は拡張子を除いたファイル名を指定します。
   ・imageExtension で全Staff Snap共通の拡張子を指定します。
   ・images の項目を追加／削除すると、その件数が表示枚数になります。
   ・alt は任意です。省略すると「Staff Snap 1」などが自動設定されます。
========================================================= */
const STAFF_SNAP_DATA = {
    imageExtension: "JPG",
    images: [
        { fileName: "IMG_5531", alt: "Staff Snap 01" },
        { fileName: "IMG_5532", alt: "Staff Snap 02" },
        { fileName: "IMG_5533", alt: "Staff Snap 03" },
        { fileName: "IMG_5534", alt: "Staff Snap 04" },
        { fileName: "IMG_5535", alt: "Staff Snap 05" }
        //{ fileName: "", alt: "Staff Snap 06" },
        //{ fileName: "", alt: "Staff Snap 07" },
        //{ fileName: "", alt: "Staff Snap 08" },
        //{ fileName: "", alt: "Staff Snap 09" },
        //{ fileName: "", alt: "Staff Snap 10" },
        //{ fileName: "", alt: "Staff Snap 11" },
        //{ fileName: "", alt: "Staff Snap 12" },
        //{ fileName: "", alt: "Staff Snap 13" },
        //{ fileName: "", alt: "Staff Snap 14" },
        //{ fileName: "", alt: "Staff Snap 15" },
        //{ fileName: "", alt: "Staff Snap 16" },
        //{ fileName: "", alt: "Staff Snap 17" },
        //{ fileName: "", alt: "Staff Snap 18" },
        //{ fileName: "", alt: "Staff Snap 19" },
        //{ fileName: "", alt: "Staff Snap 20" }
    ]
};

/* =========================================================
   【画像・商品説明の管理場所】

   商品ごとのカラー別設定は PRODUCT_DATA[].variants で管理します。
   ・label / displayName：スウォッチの識別名 / 商品情報欄に表示するカラー名
   ・status：カラーごとの販売状況（available / soldout）
   ・color / colors：スウォッチ表示色
   ・imagePrefix / imageExtension：画像ファイル名と拡張子
   ・photoNumbers：そのカラーで表示する画像番号（1から指定）
   ・baseUrl：そのカラー専用のBASE商品ページURL

   例：photoNumbers: [1, 2, 3] は画像01～03を表示します。
   例：imagePrefix: "scarf-black-" なら image/scarf-black-01.jpg など。
   例：baseUrl: "https://..." にカラー専用の販売ページURLを設定できます。

   カラー別 baseUrl が空欄の場合は、商品共通 baseUrl、
   それも空欄の場合は script.js の BASE_SHOP_URL に移動します。

========================================================= */
// 商品説明群の見出し一覧。各商品の本文は PRODUCT_DATA[].information に設定します。
const ACCORDION_CONTENTS = [
    { title: "コンセプト", body: "捨てられるはずだった素材に、新しい価値と美しさを与えるTellQのものづくり。素材が持つ個性を活かし、日々の装いに自然になじむアイテムを目指しています。" },
    { title: "商品説明", body: "商品ごとの詳細は、今後この設定を編集して更新できます。掲載内容は商品に合わせて調整してください。" },
    { title: "素材組織", body: "素材の種類や組成、編み地・生地の特徴などをここに記載します。" },
    { title: "サイズ・デザイン展開", body: "サイズ、寸法、カラー、デザインの展開情報をここに記載します。カラーは商品画像と合わせてご確認ください。" },
    { title: "お手入れ方法", body: "素材に合わせたお手入れ方法をご確認ください。具体的な洗濯・保管方法は商品ごとに追記してください。" },
    { title: "発送", body: "発送時期や配送方法、送料などの情報をここに記載します。販売条件が決まり次第、内容を更新してください。" }
];


