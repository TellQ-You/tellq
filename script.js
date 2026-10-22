/* =========================================================
   TELLQ WEBSITE
   JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    document.body.style.overflow =
        mobileMenu.classList.contains("active")
            ? "hidden"
            : "";

});


mobileMenuLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");
        mobileMenu.classList.remove("active");

        document.body.style.overflow = "";

    });

});


/* =========================================================
   HIDDEN STORY PAGE
   TellQロゴを5回クリックすると開きます
========================================================= */

const tellqLogo = document.querySelector(".logo");
const secretPage = document.getElementById("secretPage");
const secretPageClose = document.getElementById("secretPageClose");
const secretPageOverlay = document.getElementById("secretPageOverlay");

let secretClickCount = 0;
let secretClickTimer = null;

function openSecretPage() {

    if (!secretPage) return;

    secretPage.classList.add("active");
    secretPage.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

}

function closeSecretPage() {

    if (!secretPage) return;

    secretPage.classList.remove("active");
    secretPage.setAttribute("aria-hidden", "true");

    if (!mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "";
    }

}

if (tellqLogo) {
    tellqLogo.addEventListener("click", (event) => {

        secretClickCount += 1;

        clearTimeout(secretClickTimer);

        secretClickTimer = setTimeout(() => {
            secretClickCount = 0;
        }, 1800);

        if (secretClickCount >= 5) {
            event.preventDefault();
            secretClickCount = 0;
            clearTimeout(secretClickTimer);
            openSecretPage();
        }

    });
}

if (secretPageClose) secretPageClose.addEventListener("click", closeSecretPage);
if (secretPageOverlay) secretPageOverlay.addEventListener("click", closeSecretPage);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && secretPage?.classList.contains("active")) {
        closeSecretPage();
    }
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("active");

    } else {

        backToTop.classList.remove("active");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   PURCHASE MODAL
========================================================= */

const buyButton = document.getElementById("buyButton");

const purchaseModal =
    document.getElementById("purchaseModal");

const modalClose =
    document.getElementById("modalClose");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductPrice =
    document.getElementById("modalProductPrice");

const modalBaseLink =
    document.getElementById("modalBaseLink");

/* BASEのショップURLはここだけ変更すればOKです。 */
const BASE_SHOP_URL = "https://thebase.in/";

if (modalBaseLink) {
    modalBaseLink.href = BASE_SHOP_URL;
}

buyButton.addEventListener("click", () => {

    const product = PRODUCT_DATA[currentProductIndex];

    if (product && modalProductName && modalProductPrice) {
        modalProductName.innerHTML = product.name;
        modalProductPrice.textContent = product.price;
    }

    purchaseModal.classList.add("active");

    document.body.style.overflow = "hidden";

});


function closeModal() {

    purchaseModal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeModal);



/* モーダル背景クリック */

document.querySelector(".modal-overlay").addEventListener(
    "click",
    closeModal
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        `${name} 様\n\nお問い合わせありがとうございます。\n\n現在はデモサイトのため、実際の送信機能は実装されていません。`
    );

    contactForm.reset();

});


/* =========================================================
   HERO SLIDESHOW
========================================================= */

/*
   Hero画像はここだけ変更すれば差し替えできます。
   初期状態では5枚とも test0001.jpg を使用しています。
*/
const HERO_IMAGES = [
    "image/heroimage1.jpg",
    "image/heroimage2.jpg",
    "image/heroimage3.jpg",
    "image/heroimage4.jpg",
    "image/heroimage5.jpg"
];

const heroSlides = document.querySelectorAll(".hero-slide");
let currentHeroIndex = 0;

heroSlides.forEach((slide, index) => {
    slide.src = HERO_IMAGES[index] || HERO_IMAGES[0];
});

if (heroSlides.length > 1) {
    setInterval(() => {
        heroSlides[currentHeroIndex].classList.remove("active");
        currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
        heroSlides[currentHeroIndex].classList.add("active");
    }, 7500);
}

/* =========================================================
   HEADER BACKGROUND
========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 100) {

        header.style.background =
            "rgba(45,38,34,0.08)";

        header.style.backdropFilter =
            "blur(8px)";

    } else {

        header.style.background = "transparent";

        header.style.backdropFilter =
            "none";

    }

});


/* =========================================================
   IMAGE HANDLING
========================================================= */

/*
   ABOUT / PRODUCTS画像はHTMLの img src を変更するだけで差し替えできます。
   CSSの固定フレーム + object-fit: cover により、画像の縦横比が変わっても
   レイアウトのサイズは変わりません。
*/

/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
/* =========================================================
   PRODUCT GALLERY + PRODUCT SELECTOR + STAFF SNAP
========================================================= */

/*
   =========================================================
   画像ファイル管理ガイド（画像を差し替えるときはここを確認）
   =========================================================
   保存場所：image/

   商品メイン画像・商品一覧サムネイル（JPG）
     商品A：image/test-A-M-01.jpg ～ image/test-A-M-06.jpg（6枚）
     商品B：image/test-B-M-01.jpg ～ image/test-B-M-06.jpg（6枚）
     商品C：image/test-C-M-01.jpg ～ image/test-C-M-08.jpg（8枚）
     商品D：image/test-D-M-01.jpg ～ image/test-D-M-02.jpg（2枚）

   ★写真枚数を変更する場所：下の PRODUCT_DATA 各商品の photoCount
     例）photoCount: 6 → 7 にすると、その商品は7枚表示します。
     画像ファイルも同じ番号まで image/ フォルダに用意してください。

   Staff Snap横スクロール・拡大表示（WebP）
     image/test-A-S-01.webp ～ image/test-A-S-05.webp
     image/test-B-S-01.webp ～ image/test-B-S-05.webp
     image/test-C-S-01.webp ～ image/test-C-S-05.webp
     image/test-D-S-01.webp ～ image/test-D-S-05.webp

   ファイル名の意味：
     A～D = 商品番号
     M = 商品メイン画像（Main）
     S = Staff Snap
     01～05 = その商品内の画像番号

   Staff Snapの画像は下の PRODUCT_DATA の staffPrefix と
   numberedStaffImage() で管理しています。画像を差し替える場合は、
   同じファイル名で image/ 内の画像を置き換えればコード変更は不要です。
   商品は A～D の4種類です。
*/
const PRODUCT_DATA = [
    {
        imagePrefix: "test-A-M-",
        photoCount: 6, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        staffPrefix: "test-A-S-",
        number: "01",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "TellQ<br>パッチワークマフラー",
        price: "¥7,400",
        description: "TellQブランドのトートバッグです。ニットを使った温かみのあるデザインで冬物の洋服に合わせやすく、上品な雰囲気と触り心地の良さを楽しめます。",
        material: "UPCYCLING KNIT",
        information: [
            "ニット素材の表情や温かみを活かし、日々の装いに自然になじむトートバッグを目指しました。",
            "ニットを使った温かみのあるデザイン。冬物の洋服に合わせやすく、上品な雰囲気と触り心地を楽しめます。",
            "アップサイクルニットを使用。素材の組成・編み地の詳細は確定後に追記します。",
            "カラー展開や寸法などの詳細は、商品仕様の確定後に追記します。",
            "ニット素材のため、引っ掛かりに注意して保管してください。洗濯方法は素材表示を確認のうえ追記します。",
            "発送時期・配送方法・送料は販売条件の確定後に追記します。"
        ]
    },
    {
        imagePrefix: "test-B-M-",
        photoCount: 6, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        staffPrefix: "test-B-S-",
        number: "02",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>02",
        price: "¥5,800",
        description: "黒色を基調とした、シックでおしゃれなトートバッグです。肌触りも良く、冬に来がちな白色の洋服にも合わせやすいく一味違った大人な雰囲気を作り出します。",
        material: "UPCYCLING MATERIAL",
        information: [
            "黒色を基調としたシックな雰囲気と、アップサイクル素材の個性を楽しむアイテムです。",
            "黒色を基調とした落ち着いたデザイン。白色の洋服にも合わせやすく、大人らしい雰囲気を演出します。",
            "アップサイクル素材を使用。素材の組成や生地の詳細は確定後に追記します。",
            "カラー展開や寸法などの詳細は、商品仕様の確定後に追記します。",
            "素材の特性に合わせたお手入れをおすすめします。具体的な洗濯・保管方法は確認後に追記します。",
            "発送時期・配送方法・送料は販売条件の確定後に追記します。"
        ]
    },
    {
        imagePrefix: "test-C-M-",
        photoCount: 8, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        staffPrefix: "test-C-S-",
        number: "03",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>03",
        price: "¥6,100",
        description: "現在検討中の商品です。商品が決まり次第、ここに詳細情報を入力できます。",
        material: "UPCYCLING MATERIAL",
        information: [
            "商品3の素材やデザインの個性を活かし、新しい価値を届けることを目指しています。",
            "現在検討中の商品です。仕様が決まり次第、商品説明を更新します。",
            "アップサイクル素材を使用予定。素材の組成や生地の詳細は確定後に追記します。",
            "黒・白・茶色・赤の4色展開を想定しています。サイズや寸法は決まり次第追記します。",
            "素材仕様の確定後、適切なお手入れ方法を記載します。",
            "発送時期・配送方法・送料は販売条件の確定後に追記します。"
        ]
    },
    {
        imagePrefix: "test-D-M-",
        photoCount: 2, // メイン写真の枚数：ここを変更すると表示枚数を調整できます
        staffPrefix: "test-D-S-",
        number: "04",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>04",
        price: "¥8,600",
        description: "現在検討中の商品です。商品が決まり次第、ここに詳細情報を入力できます。",
        material: "UPCYCLING MATERIAL",
        information: [
            "白を基調に、素材の質感とシンプルな美しさを引き立てるアイテムを目指しています。",
            "現在検討中の商品です。仕様が決まり次第、商品説明を更新します。",
            "アップサイクル素材を使用予定。素材の組成や生地の詳細は確定後に追記します。",
            "白の1色展開を想定しています。サイズや寸法は決まり次第追記します。",
            "素材仕様の確定後、適切なお手入れ方法を記載します。",
            "発送時期・配送方法・送料は販売条件の確定後に追記します。"
        ]
    }
];

/* =========================================================
   【画像・商品説明の管理場所】今後の差し替えはこの付近を編集

   1) PRODUCT_DATA（上の設定）
      商品ごとの基本情報と information 配列を管理します。
      information の順番は下の ACCORDION_CONTENTS の見出し順です。
      [0] コンセプト [1] 商品説明 [2] 素材組織
      [3] サイズ・デザイン展開 [4] お手入れ方法 [5] 発送
      商品A〜Dごとに文章を変更してください。

   2) COLOR_PHOTO_MAP（この下）
      商品番号は 0=A、1=B、2=C、3=D。
      photoIndex は 0から数えるため、0=1枚目、2=3枚目、4=5枚目など。
      色の追加・削除や、クリック時に表示する写真の紐付けはここで変更。

   3) ACCORDION_CONTENTS（この下）
      商品説明群の6つの見出し名を管理します。
      各商品の説明本文は PRODUCT_DATA 内の information を編集します。
========================================================= */
// カラーアイコンとメイン画像の対応表。photoIndex は「画像番号 - 1」です。
// 色の変更：color: "#カラーコード" を変更します。
// 2色アイコン：color の代わりに colors: ["#1色目", "#2色目"] を指定します。
// 例：{ key: "black-white", label: "BLACK / WHITE", colors: ["#171717", "#f8f5ef"], photoIndex: 0 }
const COLOR_PHOTO_MAP = {
    // 商品A・B：黒=1枚目、白=3枚目、茶=5枚目
    0: [
        { key: "black", label: "BLACK", color: "#171717", photoIndex: 0 },
        { key: "white", label: "WHITE", color: "#f8f5ef", photoIndex: 2 },
        { key: "brown", label: "BROWN", color: "#79543a", photoIndex: 4 }
    ],
    1: [
        { key: "black", label: "BLACK", color: "#171717", photoIndex: 0 },
        { key: "white", label: "WHITE", color: "#f8f5ef", photoIndex: 2 },
        { key: "brown", label: "BROWN", color: "#79543a", photoIndex: 4 }
    ],
    // 商品C：黒=1枚目、白=3枚目、茶=5枚目、赤=7枚目
    2: [
        { key: "black", label: "BLACK", color: "#171717", photoIndex: 0 },
        { key: "white", label: "WHITE", color: "#f8f5ef", photoIndex: 2 },
        { key: "brown", label: "BROWN", color: "#79543a", photoIndex: 4 },
        { key: "red", label: "RED", color: "#a83232", photoIndex: 6 }
    ],
    // 商品D：白のみ、1枚目を表示
    3: [
        { key: "white", label: "WHITE", color: "#f8f5ef", photoIndex: 0 }
    ]
};

// 商品説明群の見出し一覧。各商品の本文は PRODUCT_DATA[].information に設定します。
const ACCORDION_CONTENTS = [
    { title: "コンセプト", body: "捨てられるはずだった素材に、新しい価値と美しさを与えるTellQのものづくり。素材が持つ個性を活かし、日々の装いに自然になじむアイテムを目指しています。" },
    { title: "商品説明", body: "商品ごとの詳細は、今後この設定を編集して更新できます。掲載内容は商品に合わせて調整してください。" },
    { title: "素材組織", body: "素材の種類や組成、編み地・生地の特徴などをここに記載します。" },
    { title: "サイズ・デザイン展開", body: "サイズ、寸法、カラー、デザインの展開情報をここに記載します。カラーは商品画像と合わせてご確認ください。" },
    { title: "お手入れ方法", body: "素材に合わせたお手入れ方法をご確認ください。具体的な洗濯・保管方法は商品ごとに追記してください。" },
    { title: "発送", body: "発送時期や配送方法、送料などの情報をここに記載します。販売条件が決まり次第、内容を更新してください。" }
];

const PRODUCT_PHOTO_COUNT = 7;
const productMainImage = document.getElementById("productMainImage");
const productNumber = document.getElementById("productNumber");
const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productMaterial = document.getElementById("productMaterial");
const productDetailPrice = document.getElementById("productDetailPrice"); // 旧コードとの互換性維持
const productColorSwatches = document.getElementById("productColorSwatches");
const productColorLabel = document.getElementById("productColorLabel");
const productInformation = document.getElementById("productInformation");
const productThumbnails = document.getElementById("productThumbnails");
const productPrev = document.getElementById("productPrev");
const productNext = document.getElementById("productNext");

const staffTrack = document.getElementById("staffTrack");
const staffDots = document.getElementById("staffDots");
const staffLightbox = document.getElementById("staffLightbox");
const staffLightboxImage = document.getElementById("staffLightboxImage");
const staffLightboxClose = document.getElementById("staffLightboxClose");

let currentProductIndex = 0;
let currentProductPhotoIndex = 0;
let currentStaffIndex = 0;
let currentStaffTrackIndex = 0;
let allStaffImages = [];
let staffAnimationFrame = null;
let staffLastFrameTime = 0;
let staffOffset = 0;
let staffSetWidth = 0;
let staffIsVisible = true;
let staffIsDragging = false;
let staffPointerStartX = 0;
let staffPointerStartOffset = 0;
let staffHasDragged = false;
let staffSuppressClickUntil = 0;
let staffLastStateUpdate = 0;
const STAFF_SCROLL_SPEED = 18; // px/秒：一定速度でゆっくり横移動

// ファイル名を組み立てる共通処理。拡張子は画像の用途ごとに下の関数で指定します。
function buildImagePath(prefix, index, extension) {
    return `image/${prefix}${String(index + 1).padStart(2, "0")}.${extension}`;
}

// 商品メイン画像・商品一覧サムネイルは、従来どおりJPGを使用します。
function numberedProductImage(prefix, index) {
    return buildImagePath(prefix, index, "jpg");
}

// Staff Snapの横スクロール画像と拡大表示はWebPを使用します。
function numberedStaffImage(prefix, index) {
    return buildImagePath(prefix, index, "webp");
}

function getProductImages(product) {
    // 写真枚数は PRODUCT_DATA の photoCount で商品ごとに管理します。
    // photoCount を変更すれば、メイン写真の切り替え・前後移動にも反映されます。
    const count = Number.isInteger(product.photoCount) && product.photoCount > 0
        ? product.photoCount
        : 1;
    return Array.from({ length: count }, (_, index) => numberedProductImage(product.imagePrefix, index));
}

function getStaffImages(product) {
    return Array.from({ length: 5 }, (_, index) => numberedStaffImage(product.staffPrefix, index));
}

function buildAllStaffImages() {
    allStaffImages = PRODUCT_DATA.flatMap((product, productIndex) =>
        getStaffImages(product).map((src, photoIndex) => ({
            src,
            productIndex,
            productNumber: product.number,
            photoIndex,
            alt: `商品${product.number}のスタッフスナップ ${photoIndex + 1}`
        }))
    );
}

function renderProductThumbnails() {
    if (!productThumbnails) return;

    productThumbnails.innerHTML = PRODUCT_DATA.map((product, index) => `
        <button class="product-thumb${index === currentProductIndex ? " active" : ""}" data-product-index="${index}" aria-label="商品 ${product.number}">
            <img src="${numberedProductImage(product.imagePrefix, 0)}" alt="${product.name.replace(/<br>/g, " ")}">
            <span>${product.number}</span>
        </button>
    `).join("");

    productThumbnails.querySelectorAll(".product-thumb").forEach(button => {
        button.addEventListener("click", () => {
            showProduct(Number(button.dataset.productIndex));
            // 商品一覧をクリックしたら、切り替わったメイン商品画像へスクロール
            window.setTimeout(() => {
                const mainImageArea = document.querySelector(".product-main");
                if (mainImageArea) mainImageArea.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 180);
        });
    });
}

function updateProductImageBackdrop(src) {
    const imageFrame = productMainImage?.closest(".product-image");
    if (!imageFrame || !src) return;
    // 画像背景はCSSで右側の商品情報エリアと同じ白色にしています。
    imageFrame.style.setProperty("--product-image-backdrop", `url("${src}")`);
}

// 商品番号を、メイン写真の実際に描画されている領域の左上へ配置します。
function updateProductNumberPosition() {
    if (!productMainImage || !productNumber || !productMainImage.complete || !productMainImage.naturalWidth || !productMainImage.naturalHeight) return;

    const imageFrame = productMainImage.closest(".product-image");
    if (!imageFrame) return;

    const frameRect = imageFrame.getBoundingClientRect();
    const imageRect = productMainImage.getBoundingClientRect();
    const naturalRatio = productMainImage.naturalWidth / productMainImage.naturalHeight;
    const elementRatio = imageRect.width / imageRect.height;

    let renderedWidth = imageRect.width;
    let renderedHeight = imageRect.height;
    if (naturalRatio > elementRatio) {
        renderedHeight = imageRect.width / naturalRatio;
    } else {
        renderedWidth = imageRect.height * naturalRatio;
    }

    const renderedLeft = imageRect.left + (imageRect.width - renderedWidth) / 2;
    const renderedTop = imageRect.top + (imageRect.height - renderedHeight) / 2;
    const inset = 12;

    productNumber.style.left = `${Math.max(0, renderedLeft - frameRect.left + inset)}px`;
    productNumber.style.top = `${Math.max(0, renderedTop - frameRect.top + inset)}px`;
}

if (productMainImage) {
    updateProductImageBackdrop(productMainImage.currentSrc || productMainImage.src);
    productMainImage.addEventListener("load", () => {
        updateProductImageBackdrop(productMainImage.currentSrc || productMainImage.src);
        updateProductNumberPosition();
    });
    if (productMainImage.complete) updateProductNumberPosition();
}

function showProductPhoto(index) {
    const product = PRODUCT_DATA[currentProductIndex];
    if (!product || !productMainImage) return;

    const images = getProductImages(product);
    currentProductPhotoIndex = (index + images.length) % images.length;
    productMainImage.style.opacity = "0";

    window.setTimeout(() => {
        productMainImage.src = images[currentProductPhotoIndex];
        updateProductImageBackdrop(productMainImage.src);
        productMainImage.alt = `${product.name.replace(/<br>/g, " ")} 写真 ${currentProductPhotoIndex + 1}`;
        productMainImage.style.opacity = "1";
        updateProductColorSwatchState(currentProductPhotoIndex);
    }, 160);
}

function getColorsForCurrentProduct() {
    return COLOR_PHOTO_MAP[currentProductIndex] || [];
}

function renderProductColorSwatches(product) {
    if (!productColorSwatches) return;
    const colors = getColorsForCurrentProduct();
    const hasColorOptions = colors.length > 0;
    productColorSwatches.hidden = !hasColorOptions;
    if (productColorLabel) {
        productColorLabel.textContent = colors.length === 1 ? "1 COLOR" : `${colors.length} COLORS`;
    }
    if (!hasColorOptions) {
        productColorSwatches.innerHTML = "";
        return;
    }

    productColorSwatches.innerHTML = colors.map(color => {
        // colors が2色以上なら、アイコンを分割したグラデーションで表示します。
        const colorList = Array.isArray(color.colors) && color.colors.length > 0
            ? color.colors
            : [color.color || "#f8f5ef"];
        const background = colorList.length === 1
            ? colorList[0]
            : `linear-gradient(90deg, ${colorList.map((value, index) => {
                const start = (index / colorList.length) * 100;
                const end = ((index + 1) / colorList.length) * 100;
                return `${value} ${start}%, ${value} ${end}%`;
            }).join(", ")})`;
        return `
            <button type="button" class="product-color-swatch" data-photo-index="${color.photoIndex}"
                aria-label="${color.label}の画像を表示" title="${color.label}">
                <span class="product-color-dot" style="--swatch-color:${background}"></span>
            </button>
        `;
    }).join("");

    productColorSwatches.querySelectorAll(".product-color-swatch").forEach(button => {
        button.addEventListener("click", () => {
            const photoIndex = Number(button.dataset.photoIndex);
            showProductPhoto(photoIndex);
            updateProductColorSwatchState(photoIndex);
            // カラー選択後、メイン商品画像が見える位置へスムーズに移動します。
            window.setTimeout(() => {
                const mainImageArea = document.querySelector(".product-main");
                if (mainImageArea) mainImageArea.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 180);
        });
    });
    updateProductColorSwatchState(currentProductPhotoIndex);
}

function updateProductColorSwatchState(photoIndex) {
    if (!productColorSwatches) return;
    const colors = getColorsForCurrentProduct();
    const matchingColor = colors.find(color => color.photoIndex === photoIndex);
    productColorSwatches.querySelectorAll(".product-color-swatch").forEach(button => {
        const active = matchingColor && Number(button.dataset.photoIndex) === matchingColor.photoIndex;
        button.classList.toggle("active", Boolean(active));
        button.setAttribute("aria-pressed", active ? "true" : "false");
    });
}

function renderProductInformation(product) {
    if (!productInformation) return;

    // 各商品に設定した説明を使用し、商品を切り替えるたびに内容も切り替えます。
    const descriptions = product.information || [
        "素材が持つ魅力を活かし、新しい価値を生み出すTellQのものづくり。",
        product.description,
        `${product.material}。素材の組成や生地の詳細は、確認でき次第ここに追記できます。`,
        `カラー展開：${getColorsForCurrentProduct().map(color => ({ BLACK: "黒", WHITE: "白", BROWN: "茶色", RED: "赤" }[color.label] || color.label)).join("・") || "未設定"}。サイズや寸法は決まり次第追記できます。`,
        "素材の特性に合わせたお手入れをおすすめします。具体的な洗濯・保管方法は確認後に追記してください。",
        "発送時期・配送方法・送料などの詳細は、販売条件が決まり次第追記できます。"
    ];

    // 左右を別々の列として生成します。
    // これにより、片側で説明を開いても反対側のリストに行間の空白が発生しません。
    const renderAccordion = (item, index) => `
        <details class="product-info-accordion">
            <summary><span>${item.title}</span><span class="product-accordion-icon" aria-hidden="true"></span></summary>
            <div class="product-accordion-content"><p>${descriptions[index] || "詳細は決まり次第追記します。"}</p></div>
        </details>
    `;

    // 左列：コンセプト・素材組織・サイズ/デザイン展開
    // 右列：商品説明・お手入れ方法・発送
    // 表示順に合わせて、開いた内容も元の項目と正しく対応させます。
    const leftColumn = [0, 2, 3]
        .map(index => renderAccordion(ACCORDION_CONTENTS[index], index)).join("");
    const rightColumn = [1, 4, 5]
        .map(index => renderAccordion(ACCORDION_CONTENTS[index], index)).join("");

    productInformation.innerHTML = `
        <div class="product-information-column product-information-column-left">${leftColumn}</div>
        <div class="product-information-column product-information-column-right">${rightColumn}</div>
    `;
}
function showProduct(index) {
    if (!PRODUCT_DATA.length) return;

    currentProductIndex = (index + PRODUCT_DATA.length) % PRODUCT_DATA.length;
    currentProductPhotoIndex = 0;
    const product = PRODUCT_DATA[currentProductIndex];

    if (productMainImage) {
        productMainImage.style.opacity = "0";
        window.setTimeout(() => {
            productMainImage.src = numberedProductImage(product.imagePrefix, 0);
            updateProductImageBackdrop(productMainImage.src);
            productMainImage.alt = product.name.replace(/<br>/g, " ");
            productMainImage.style.opacity = "1";
        }, 160);
    }
    if (productNumber) productNumber.textContent = product.number;
    if (productCategory) productCategory.textContent = product.category;
    if (productName) productName.innerHTML = product.name;
    if (productPrice) productPrice.innerHTML = `${product.price} <small>(tax included)</small>`;
    if (productDescription) productDescription.textContent = product.description;
    if (productMaterial) productMaterial.textContent = product.material;
    if (productDetailPrice) productDetailPrice.textContent = product.price;
    renderProductColorSwatches(product);
    renderProductInformation(product);

    if (productThumbnails) {
        productThumbnails.querySelectorAll(".product-thumb").forEach((button, buttonIndex) => {
            button.classList.toggle("active", buttonIndex === currentProductIndex);
        });
    }

    // 商品選択に連動して、全Staff Snapの中から該当商品の先頭写真へ移動する
    focusStaffForProduct(currentProductIndex);
}

function renderAllStaff() {
    if (!staffTrack || !allStaffImages.length) return;

    // Staff Snapの画像URLは上の numberedStaffImage() が .webp として生成します。

    const count = allStaffImages.length;
    // 同じ写真群を2セット配置し、1セット分移動したら位置を戻して継ぎ目のないループにする。
    const loopedImages = [...allStaffImages, ...allStaffImages];
    currentStaffIndex = 0;
    currentStaffTrackIndex = 0;

    staffTrack.innerHTML = loopedImages.map((item, trackIndex) => `
        <button class="staff-slide" data-track-index="${trackIndex}" data-staff-index="${trackIndex % count}" data-product-index="${item.productIndex}" aria-label="${item.alt}">
            <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">
        </button>
    `).join("");

    staffTrack.querySelectorAll(".staff-slide").forEach(slide => {
        slide.addEventListener("click", () => {
            const image = slide.querySelector("img");
            if (Date.now() < staffSuppressClickUntil) return;
            if (!image || !staffLightbox || !staffLightboxImage) return;
            openStaffLightbox(image.src, image.alt);
        });
    });

    renderStaffDots();
    // 画像とレイアウトの計算後にループ幅を取得して、連続スクロールを開始する
    requestAnimationFrame(() => {
        measureStaffTrack();
        showStaff(0, true);
        startStaffAutoPlay();
    });
}

function renderStaffDots() {
    if (!staffDots) return;

    staffDots.innerHTML = allStaffImages.map((item, index) => `
        <button class="staff-dot${index === currentStaffIndex ? " active" : ""}" data-staff-index="${index}" aria-label="${item.alt}"></button>
    `).join("");

    staffDots.querySelectorAll(".staff-dot").forEach(dot => {
        dot.addEventListener("click", () => showStaff(Number(dot.dataset.staffIndex), true));
    });
}

function measureStaffTrack() {
    if (!staffTrack || !staffTrack.children.length) return;
    const count = allStaffImages.length;
    const first = staffTrack.children[0];
    const secondSetFirst = staffTrack.children[count];
    if (!first || !secondSetFirst) return;
    staffSetWidth = secondSetFirst.offsetLeft - first.offsetLeft;
}

function setStaffOffset(offset) {
    if (!staffTrack) return;
    staffOffset = offset;
    staffTrack.style.transform = `translate3d(-${staffOffset}px, 0, 0)`;
}

function updateStaffTrackPosition(animate = true) {
    if (!staffTrack || !staffTrack.children.length) return;
    measureStaffTrack();
    const slide = staffTrack.children[currentStaffTrackIndex];
    const windowElement = staffTrack.parentElement;
    if (!slide || !windowElement) return;

    const targetOffset = slide.offsetLeft + slide.offsetWidth / 2 - windowElement.clientWidth / 2;
    // 手動選択時のみ位置を合わせる。通常の自動移動にはtransitionを使わず、一定速度で進める。
    staffOffset = targetOffset;
    if (staffSetWidth > 0) {
        staffOffset = ((staffOffset % staffSetWidth) + staffSetWidth) % staffSetWidth;
    }
    staffTrack.style.transition = "none";
    setStaffOffset(staffOffset);
}

function updateStaffActiveStates() {
    if (staffTrack) {
        // 毎回60枚すべてを走査せず、前の選択と現在の選択だけを更新する
        const previousActive = staffTrack.querySelector(".staff-slide.active");
        if (previousActive) previousActive.classList.remove("active");
        const currentSlide = staffTrack.children[currentStaffTrackIndex];
        if (currentSlide) currentSlide.classList.add("active");
    }
    if (staffDots) {
        staffDots.querySelectorAll(".staff-dot").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentStaffIndex);
        });
    }
}

function showStaff(index, jump = false) {
    if (!allStaffImages.length || !staffTrack) return;
    const count = allStaffImages.length;
    currentStaffIndex = (index + count) % count;
    // 表示位置は複製セットの先頭を基準にする。ジャンプ後も連続スクロールを継続。
    currentStaffTrackIndex = currentStaffIndex;
    updateStaffTrackPosition(false);
    updateStaffActiveStates();
}

function focusStaffForProduct(productIndex) {
    const firstStaffIndex = productIndex * PRODUCT_PHOTO_COUNT;
    showStaff(firstStaffIndex, true);
}

function startStaffAutoPlay() {
    stopStaffAutoPlay();
    if (!staffTrack || allStaffImages.length < 2) return;
    staffLastFrameTime = 0;

    const animate = timestamp => {
        if (!staffTrack) return;
        if (!staffLastFrameTime) staffLastFrameTime = timestamp;
        const deltaSeconds = Math.min((timestamp - staffLastFrameTime) / 1000, 0.05);
        staffLastFrameTime = timestamp;

        if (!document.hidden && staffIsVisible && !staffIsDragging && !staffLightbox?.classList.contains("active") && staffSetWidth > 0) {
            // transitionによる「写真ごとの切り替え」ではなく、毎フレーム同じpx/秒で移動
            staffOffset += STAFF_SCROLL_SPEED * deltaSeconds;
            if (staffOffset >= staffSetWidth) staffOffset -= staffSetWidth;
            setStaffOffset(staffOffset);

            // 選択状態とドットは約4回/秒だけ更新し、描画負荷を抑える
            if (timestamp - staffLastStateUpdate > 250) {
                staffLastStateUpdate = timestamp;
                updateNearestStaffState();
            }
        }
        staffAnimationFrame = window.requestAnimationFrame(animate);
    };
    staffAnimationFrame = window.requestAnimationFrame(animate);
}

function stopStaffAutoPlay() {
    if (staffAnimationFrame !== null) {
        window.cancelAnimationFrame(staffAnimationFrame);
        staffAnimationFrame = null;
    }
    staffLastFrameTime = 0;
}

function updateNearestStaffState() {
    if (!staffTrack || !staffTrack.children.length || !allStaffImages.length) return;
    const windowElement = staffTrack.parentElement;
    if (!windowElement) return;
    const center = staffOffset + windowElement.clientWidth / 2;
    const first = staffTrack.children[0];
    const step = first ? first.offsetWidth + parseFloat(getComputedStyle(staffTrack).gap || "0") : 0;
    if (!step) return;
    currentStaffTrackIndex = Math.round((center - first.offsetWidth / 2) / step);
    currentStaffIndex = ((currentStaffTrackIndex % allStaffImages.length) + allStaffImages.length) % allStaffImages.length;
    updateStaffActiveStates();
}

if (staffTrack) {
    // 2セット目の先頭に到達したら、同じ見た目の1セット目へ瞬時に戻す。
    // transformは同じ位置に見えるため、連続した動きは途切れない。
    staffTrack.addEventListener("transitionend", () => {});
}

// Staff Snapは、左右の矢印に加えてマウス/指で直接横へドラッグできます。
const staffTrackWindow = staffTrack?.parentElement;
if (staffTrackWindow && staffTrack) {
    staffTrackWindow.addEventListener("pointerdown", event => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        staffIsDragging = true;
        staffHasDragged = false;
        staffPointerStartX = event.clientX;
        staffPointerStartOffset = staffOffset;
        staffLastFrameTime = 0;
        if (staffTrackWindow.setPointerCapture) {
            try { staffTrackWindow.setPointerCapture(event.pointerId); } catch (_) {}
        }
    });

    staffTrackWindow.addEventListener("pointermove", event => {
        if (!staffIsDragging) return;
        const deltaX = event.clientX - staffPointerStartX;
        if (Math.abs(deltaX) > 5) staffHasDragged = true;
        if (!staffHasDragged) return;
        if (staffSetWidth > 0) {
            const rawOffset = staffPointerStartOffset - deltaX;
            staffOffset = ((rawOffset % staffSetWidth) + staffSetWidth) % staffSetWidth;
        } else {
            staffOffset = Math.max(0, staffPointerStartOffset - deltaX);
        }
        setStaffOffset(staffOffset);
        updateNearestStaffState();
        event.preventDefault();
    });

    const finishStaffDrag = event => {
        if (!staffIsDragging) return;
        staffIsDragging = false;
        if (staffHasDragged) staffSuppressClickUntil = Date.now() + 350;
        staffHasDragged = false;
        staffLastFrameTime = 0;
        if (event && staffTrackWindow.hasPointerCapture?.(event.pointerId)) {
            try { staffTrackWindow.releasePointerCapture(event.pointerId); } catch (_) {}
        }
    };
    staffTrackWindow.addEventListener("pointerup", finishStaffDrag);
    staffTrackWindow.addEventListener("pointercancel", finishStaffDrag);
    staffTrackWindow.addEventListener("lostpointercapture", finishStaffDrag);
}

// Staff Snapが画面外にある間は自動移動を停止し、不要な描画処理を減らす
const staffVisibilityTarget = staffTrack?.parentElement;
if (staffVisibilityTarget && "IntersectionObserver" in window) {
    const staffVisibilityObserver = new IntersectionObserver(entries => {
        staffIsVisible = entries.some(entry => entry.isIntersecting);
    }, { threshold: 0.01 });
    staffVisibilityObserver.observe(staffVisibilityTarget);
}

window.addEventListener("resize", () => {
    measureStaffTrack();
    updateStaffTrackPosition(false);
    updateProductNumberPosition();
});

function openStaffLightbox(src, alt) {
    if (!staffLightbox || !staffLightboxImage) return;
    staffLightboxImage.src = src;
    staffLightboxImage.alt = alt;
    staffLightbox.classList.add("active");
    staffLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeStaffLightbox() {
    if (!staffLightbox) return;
    staffLightbox.classList.remove("active");
    staffLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (staffLightboxClose) staffLightboxClose.addEventListener("click", closeStaffLightbox);
if (staffLightbox) {
    staffLightbox.addEventListener("click", event => {
        if (event.target === staffLightbox) closeStaffLightbox();
    });
}
document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeStaffLightbox();
});

buildAllStaffImages();
renderProductThumbnails();
renderAllStaff();
showProduct(0);
setTimeout(() => applyLoraToNumbers(), 220);

if (productPrev) {
    productPrev.setAttribute("aria-label", "前の写真");
    productPrev.addEventListener("click", () => showProductPhoto(currentProductPhotoIndex - 1));
}
if (productNext) {
    productNext.setAttribute("aria-label", "次の写真");
    productNext.addEventListener("click", () => showProductPhoto(currentProductPhotoIndex + 1));
}

/* =========================================================
   NUMBER TYPOGRAPHY
========================================================= */

/*
   価格・金額以外の数字だけをLoraにします。
   商品価格などの要素は除外して、既存の金額表示を維持します。
*/
function applyLoraToNumbers(root = document.body) {
    if (!root) return;

    const excludedSelectors = [
        ".product-price",
        ".product-detail",
        ".modal-price",
        "script",
        "style"
    ];

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (!node.nodeValue || !/[0-9０-９]/.test(node.nodeValue)) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (node.parentElement && excludedSelectors.some(selector => node.parentElement.closest(selector))) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (node.parentElement && node.parentElement.classList.contains("lora-number")) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    textNodes.forEach(textNode => {
        const fragment = document.createDocumentFragment();
        const parts = textNode.nodeValue.split(/([0-9０-９]+)/g);

        parts.forEach(part => {
            if (/^[0-9０-９]+$/.test(part)) {
                const span = document.createElement("span");
                span.className = "lora-number";
                span.textContent = part;
                fragment.appendChild(span);
            } else {
                fragment.appendChild(document.createTextNode(part));
            }
        });

        textNode.parentNode.replaceChild(fragment, textNode);
    });
}

applyLoraToNumbers();


/* =========================================================
   SECRET PAGE / YOUTUBE CLIP NOTES
   追加機能のみ。既存機能は変更しません。
========================================================= */
(() => {
    const clipButtons = Array.from(document.querySelectorAll(".secret-video-frame"));
    if (!clipButtons.length) return;

    const players = new Map();
    let youtubeApiReady = false;
    let youtubeApiLoading = false;
    const pendingPlayers = [];

    function loadYouTubeApi() {
        if (window.YT && window.YT.Player) {
            youtubeApiReady = true;
            return;
        }
        if (youtubeApiLoading) return;
        youtubeApiLoading = true;
        const previousReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
            youtubeApiReady = true;
            if (typeof previousReady === "function") previousReady();
            while (pendingPlayers.length) pendingPlayers.shift()();
        };
        const apiScript = document.createElement("script");
        apiScript.src = "https://www.youtube.com/iframe_api";
        apiScript.async = true;
        document.head.appendChild(apiScript);
    }

    function resetClip(button) {
        const record = players.get(button);
        if (record && record.timer) {
            clearTimeout(record.timer);
            record.timer = null;
        }
        if (record && record.player) {
            try { record.player.stopVideo(); } catch (error) {}
            try { record.player.destroy(); } catch (error) {}
        }
        players.delete(button);
        const playerSlot = button.querySelector(".secret-video-player");
        if (playerSlot) playerSlot.replaceChildren();
        button.classList.remove("is-playing");
    }

    function playClip(button) {
        if (button.classList.contains("is-playing")) return;
        const videoId = button.dataset.videoId;
        const start = Number(button.dataset.start);
        const end = Number(button.dataset.end);
        const duration = Math.max(1, end - start);
        const playerSlot = button.querySelector(".secret-video-player");
        if (!videoId || !playerSlot || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) return;

        button.classList.add("is-playing");
        playerSlot.replaceChildren();
        const playerElement = document.createElement("div");
        playerSlot.appendChild(playerElement);
        const record = { player: null, timer: null, started: false };
        players.set(button, record);

        const createPlayer = () => {
            if (!button.isConnected || !button.classList.contains("is-playing")) return;
            record.player = new window.YT.Player(playerElement, {
                width: "100%",
                height: "100%",
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    start,
                    end
                },
                events: {
                    onReady(event) {
                        event.target.mute();
                        event.target.loadVideoById({ videoId, startSeconds: start, endSeconds: end });
                        event.target.mute();
                        event.target.playVideo();
                    },
                    onStateChange(event) {
                        if (event.data === window.YT.PlayerState.PLAYING && !record.started) {
                            record.started = true;
                            record.timer = window.setTimeout(() => resetClip(button), duration * 1000);
                        }
                        if (event.data === window.YT.PlayerState.ENDED) resetClip(button);
                    },
                    onError() { resetClip(button); }
                }
            });
        };

        if (youtubeApiReady && window.YT && window.YT.Player) {
            createPlayer();
        } else {
            pendingPlayers.push(createPlayer);
            loadYouTubeApi();
        }
    }

    clipButtons.forEach(button => {
        button.addEventListener("click", () => playClip(button));
    });

    // ページを閉じたときや、シークレットページを離れたときは動画を停止します。
    const secretPage = document.getElementById("secretPage");
    const closeButton = document.getElementById("secretPageClose");
    const overlay = document.getElementById("secretPageOverlay");
    function stopAllClips() {
        clipButtons.forEach(resetClip);
    }
    if (closeButton) closeButton.addEventListener("click", stopAllClips);
    if (overlay) overlay.addEventListener("click", stopAllClips);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && secretPage && secretPage.classList.contains("active")) stopAllClips();
    });
    loadYouTubeApi();
})();
