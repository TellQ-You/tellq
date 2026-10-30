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

    // 商品全体または選択中カラーが販売予定・売り切れの場合は購入モーダルを開きません。
    if (!product || getEffectiveProductStatus(product) !== "available") return;

    if (product && modalProductName && modalProductPrice) {
        modalProductName.innerHTML = product.name;
        modalProductPrice.textContent = product.price;
    }

    // 選択中カラー専用のBASE URLを優先し、未設定時は商品共通URLを使用します。
    const selectedVariant = getCurrentProductVariant(product);
    if (modalBaseLink) {
        modalBaseLink.href =
            (selectedVariant && selectedVariant.baseUrl) ||
            product.baseUrl ||
            BASE_SHOP_URL;
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
   CONTACT
   v4.14: お問い合わせはInstagram DMへ。FAQはHTMLのdetailsで動作します。
========================================================= */


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

   商品メイン画像・商品一覧サムネイル
     商品ごとの imagePrefix / photoCount / imageExtension を
     product-data.js の PRODUCT_DATA で管理します。

   Staff Snap
     画像ファイル名・表示枚数・拡張子は product-data.js の
     STAFF_SNAP_DATA.images / imageExtension で独立して管理します。
     images 配列にファイル名（拡張子なし）を追加・削除すると、
     その配列の件数が表示枚数になります。

   商品名のサイズを商品ごとに変えたい場合：
   各商品の name の次の行に nameFontSize: "clamp(25px, 3vw, 40px)", のように追加します。
   指定しない商品は、style.css の共通レスポンシブ設定をそのまま使います。
*/
/* 商品情報・カラー設定・商品説明群の見出しは product-data.js で管理します。 */

const productMainImage = document.getElementById("productMainImage");
const productNumber = document.getElementById("productNumber");
const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productStatus = document.getElementById("productStatus");
const buyButtonLabel = document.getElementById("buyButtonLabel");
const buyButtonArrow = document.getElementById("buyButtonArrow");
const productDescription = document.getElementById("productDescription");
const productMaterial = document.getElementById("productMaterial");
const productDetailPrice = document.getElementById("productDetailPrice"); // 旧コードとの互換性維持
const productColorSwatches = document.getElementById("productColorSwatches");
const productColorLabel = document.getElementById("productColorLabel");
const productPhotoIndicator = document.getElementById("productPhotoIndicator");
const productPhotoIndicatorDots = document.getElementById("productPhotoIndicatorDots");
const productPhotoIndicatorCount = document.getElementById("productPhotoIndicatorCount");
const productInformation = document.getElementById("productInformation");
const productInfoPanel = document.querySelector(".product-info");
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
let currentProductVariantIndex = 0;
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

// 現在の商品で選択されているカラー（variant）を取得します。
function getCurrentProductVariant(product = PRODUCT_DATA[currentProductIndex]) {
    if (!product || !Array.isArray(product.variants) || !product.variants.length) return null;
    const safeIndex = Math.min(
        Math.max(currentProductVariantIndex, 0),
        product.variants.length - 1
    );
    return product.variants[safeIndex];
}

// カラーごとに独立した画像一覧を生成します。
// variants.images を指定すれば個別ファイル名、
// imagePrefix + photoNumbers なら連番ファイルを管理できます。
function getProductImages(product, variant = null) {
    if (!product) return [];

    const selectedVariant = variant || getCurrentProductVariant(product);

    if (selectedVariant && Array.isArray(selectedVariant.images) && selectedVariant.images.length) {
        return selectedVariant.images.map(fileName => {
            const cleanName = String(fileName).replace(/^\/+/, "");
            return cleanName.startsWith("image/") ? cleanName : `image/${cleanName}`;
        });
    }

    if (selectedVariant && Array.isArray(selectedVariant.photoNumbers) && selectedVariant.photoNumbers.length) {
        const prefix = selectedVariant.imagePrefix || product.imagePrefix || "";
        const extension = String(
            selectedVariant.imageExtension || product.imageExtension || "jpg"
        ).replace(/^\\./, "");
        return selectedVariant.photoNumbers.map(number =>
            `image/${prefix}${String(number).padStart(2, "0")}.${extension}`
        );
    }

    // variants が未設定の既存商品でも、従来の商品共通画像設定で動作します。
    const count = Number.isInteger(product.photoCount) && product.photoCount > 0
        ? product.photoCount
        : 1;
    const extension = String(product.imageExtension || "jpg").replace(/^\\./, "");
    return Array.from({ length: count }, (_, index) =>
        `image/${product.imagePrefix}${String(index + 1).padStart(2, "0")}.${extension}`
    );
}

function getFirstProductImage(product) {
    const images = getProductImages(product, product && product.variants && product.variants[0]);
    return images[0] || "";
}

// 商品メイン写真の前後画像を先読みし、矢印を押した際の読み込み待ちを減らします。
// キャッシュは直近で必要な画像だけに限定し、画像を大量に保持し続けないようにします。
const productPhotoPreloadCache = new Map();

function preloadProductPhoto(src) {
    if (!src) return Promise.resolve(null);

    const cached = productPhotoPreloadCache.get(src);
    if (cached) return cached;

    const promise = new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
        if (image.complete && image.naturalWidth > 0) resolve(image);
    });

    productPhotoPreloadCache.set(src, promise);
    return promise;
}

function preloadAdjacentProductPhotos(product = PRODUCT_DATA[currentProductIndex], photoIndex = currentProductPhotoIndex) {
    if (!product) return;

    const images = getProductImages(product, product === PRODUCT_DATA[currentProductIndex]
        ? getCurrentProductVariant(product)
        : (product.variants && product.variants[0]));
    if (images.length <= 1) return;

    const previousIndex = (photoIndex - 1 + images.length) % images.length;
    const nextIndex = (photoIndex + 1) % images.length;
    const keep = new Set([images[photoIndex], images[previousIndex], images[nextIndex]]);

    // 今の商品で前後移動に必要な画像以外はキャッシュ参照から外します。
    for (const src of productPhotoPreloadCache.keys()) {
        if (!keep.has(src)) productPhotoPreloadCache.delete(src);
    }

    preloadProductPhoto(images[previousIndex]);
    preloadProductPhoto(images[nextIndex]);
}

function getStaffImages() {
    const extension = String(STAFF_SNAP_DATA.imageExtension || "webp").replace(/^\./, "");
    const images = Array.isArray(STAFF_SNAP_DATA.images) ? STAFF_SNAP_DATA.images : [];

    return images
        .filter(item => item && item.fileName)
        .map((item, index) => ({
            src: `image/${item.fileName}.${extension}`,
            alt: item.alt || `Staff Snap ${index + 1}`
        }));
}

function buildAllStaffImages() {
    // Staff Snapは商品と独立した画像リストを、そのまま表示します。
    allStaffImages = getStaffImages();
}

function getEffectiveProductStatus(product = PRODUCT_DATA[currentProductIndex]) {
    if (!product) return "available";
    const productStatusValue = product.status || "available";
    // 商品全体の販売予定・売り切れ設定を優先し、販売中商品の場合のみカラー別状況を反映します。
    if (productStatusValue !== "available") return productStatusValue;
    const variant = getCurrentProductVariant(product);
    return variant && variant.status === "soldout" ? "soldout" : "available";
}

function updateProductVariantDisplay() {
    const product = PRODUCT_DATA[currentProductIndex];
    if (!product) return;

    const variant = getCurrentProductVariant(product);
    const productStatusValue = getEffectiveProductStatus(product);
    const productStatusLabels = {
        upcoming: `COMING SOON / ${product.upcomingText || "追加時期は決まり次第お知らせします"}`,
        available: "販売中",
        soldout: "SOLD OUT / 売り切れ"
    };
    if (productStatus) {
        productStatus.dataset.status = productStatusValue;
        productStatus.textContent = productStatusLabels[productStatusValue] || productStatusLabels.available;
    }

    const productImageFrame = productMainImage?.closest(".product-image");
    if (productImageFrame) {
        productImageFrame.dataset.productStatus = productStatusValue;
        productImageFrame.dataset.statusLabel = productStatusValue === "upcoming"
            ? "COMING SOON"
            : productStatusValue === "soldout" ? "SOLD OUT" : "";
    }

    const isAvailable = productStatusValue === "available";
    if (buyButton) {
        buyButton.disabled = !isAvailable;
        buyButton.setAttribute("aria-disabled", isAvailable ? "false" : "true");
    }
    if (buyButtonLabel) {
        buyButtonLabel.textContent = productStatusValue === "upcoming"
            ? "COMING SOON"
            : productStatusValue === "soldout" ? "SOLD OUT" : "PURCHASE";
    }
    if (buyButtonArrow) buyButtonArrow.hidden = !isAvailable;

    // COLOR VARIATION欄には、選択中カラーの表示名を出します。
    if (productColorLabel) {
        productColorLabel.textContent = variant
            ? (variant.displayName || variant.label || "未設定")
            : "未設定";
    }
}

function renderProductThumbnails() {
    if (!productThumbnails) return;

    productThumbnails.innerHTML = PRODUCT_DATA.map((product, index) => {
        const status = product.status || "available";
        const statusLabels = { upcoming: "COMING SOON", soldout: "SOLD OUT" };
        const statusLabel = statusLabels[status] || "";
        const statusMarkup = statusLabel
            ? `<span class="product-thumb-status product-thumb-status--${status}">${statusLabel}</span>`
            : "";
        const accessibleStatus = statusLabel ? `・${statusLabel}` : "";
        return `
            <button class="product-thumb${index === currentProductIndex ? " active" : ""}" data-product-index="${index}" aria-label="商品 ${product.number}${accessibleStatus}">
                <img src="${getFirstProductImage(product)}" alt="${product.name.replace(/<br>/g, " ")}">
                <span>${product.number}</span>
                ${statusMarkup}
            </button>
        `;
    }).join("");

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

// 商品画像は object-fit: cover でフレーム全体に表示するため、
// 商品番号も画像の縦横比から計算せず、フレーム左上から一定距離に固定します。
function updateProductNumberPosition() {
    if (!productMainImage || !productNumber) return;
    productNumber.style.left = "12px";
    productNumber.style.top = "12px";
}

if (productMainImage) {
    updateProductImageBackdrop(productMainImage.currentSrc || productMainImage.src);
    productMainImage.addEventListener("load", () => {
        updateProductImageBackdrop(productMainImage.currentSrc || productMainImage.src);
        updateProductNumberPosition();
    });
    if (productMainImage.complete) updateProductNumberPosition();
}

let productPhotoChangeToken = 0;

function updateProductPhotoIndicator() {
    if (!productPhotoIndicator) return;
    const product = PRODUCT_DATA[currentProductIndex];
    if (!product) return;
    const images = getProductImages(product, getCurrentProductVariant(product));
    const total = images.length;
    const current = total ? currentProductPhotoIndex + 1 : 0;

    if (productPhotoIndicatorCount) {
        productPhotoIndicatorCount.textContent = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }
    if (productPhotoIndicatorDots) {
        productPhotoIndicatorDots.innerHTML = images.map((_, index) => `
            <span class="product-photo-indicator-dot${index === currentProductPhotoIndex ? " active" : ""}" aria-hidden="true"></span>
        `).join("");
    }
    productPhotoIndicator.setAttribute("aria-label", `全${total}枚中${current}枚目の商品写真を表示中`);
    productPhotoIndicator.hidden = total === 0;
}

function showProductPhoto(index) {
    const product = PRODUCT_DATA[currentProductIndex];
    if (!product || !productMainImage) return;

    const variant = getCurrentProductVariant(product);
    const images = getProductImages(product, variant);
    if (!images.length) return;

    const nextPhotoIndex = (index + images.length) % images.length;
    const nextPhotoSrc = images[nextPhotoIndex];
    const changeToken = ++productPhotoChangeToken;

    currentProductPhotoIndex = nextPhotoIndex;
    // 写真の切り替え操作ごとに、現在位置をインジケーターへ即時反映します。
    updateProductPhotoIndicator();
    productMainImage.alt = `${product.name.replace(/<br>/g, " ")} ${variant ? variant.label + " " : ""}写真 ${nextPhotoIndex + 1}`;
    updateProductColorSwatchState();

    // 画像の読み込みが終わるまでは現在の写真を表示し、読み込み完了後に切り替えます。
    preloadProductPhoto(nextPhotoSrc).then(() => {
        if (changeToken !== productPhotoChangeToken) return;

        productMainImage.style.opacity = "0";
        window.setTimeout(() => {
            if (changeToken !== productPhotoChangeToken) return;

            productMainImage.src = nextPhotoSrc;
            updateProductImageBackdrop(nextPhotoSrc);
            productMainImage.style.opacity = "1";
            preloadAdjacentProductPhotos(product, nextPhotoIndex);
        }, 0);
    });
}

function getColorsForCurrentProduct() {
    const product = PRODUCT_DATA[currentProductIndex];
    return product && Array.isArray(product.variants) ? product.variants : [];
}

function renderProductColorSwatches(product) {
    if (!productColorSwatches) return;
    const variants = Array.isArray(product.variants) ? product.variants : [];
    const hasColorOptions = variants.length > 0;
    productColorSwatches.hidden = !hasColorOptions;

    if (productColorLabel) {
        const selectedVariant = variants[currentProductVariantIndex] || variants[0];
        productColorLabel.textContent = selectedVariant
            ? (selectedVariant.displayName || selectedVariant.label || "未設定")
            : "未設定";
    }

    if (!hasColorOptions) {
        productColorSwatches.innerHTML = "";
        return;
    }

    productColorSwatches.innerHTML = variants.map((variant, index) => {
        const colorList = Array.isArray(variant.colors) && variant.colors.length > 0
            ? variant.colors
            : [variant.color || "#f8f5ef"];

        let background;
        if (colorList.length === 1) {
            background = colorList[0];
        } else if (colorList.length === 2) {
            background = `linear-gradient(135deg, ${colorList[0]} 0%, ${colorList[0]} 42%, ${colorList[1]} 58%, ${colorList[1]} 100%)`;
        } else {
            background = `linear-gradient(90deg, ${colorList.map((value, colorIndex) => {
                const start = (colorIndex / colorList.length) * 100;
                const finish = ((colorIndex + 1) / colorList.length) * 100;
                return `${value} ${start}%, ${value} ${finish}%`;
            }).join(", ")})`;
        }

        return `
            <button type="button" class="product-color-swatch"
                data-variant-index="${index}"
                aria-label="${variant.label}の商品画像を表示"
                title="${variant.label}">
                <span class="product-color-dot" style="--swatch-color:${background}"></span>
            </button>
        `;
    }).join("");

    productColorSwatches.querySelectorAll(".product-color-swatch").forEach(button => {
        button.addEventListener("click", () => {
            selectProductVariant(Number(button.dataset.variantIndex));
            window.setTimeout(() => {
                const mainImageArea = document.querySelector(".product-main");
                if (mainImageArea) mainImageArea.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 180);
        });
    });

    updateProductColorSwatchState();
}

function selectProductVariant(index) {
    const product = PRODUCT_DATA[currentProductIndex];
    if (!product || !Array.isArray(product.variants) || !product.variants.length) return;

    currentProductVariantIndex = (index + product.variants.length) % product.variants.length;
    currentProductPhotoIndex = 0;
    productPhotoChangeToken += 1;

    const images = getProductImages(product, getCurrentProductVariant(product));
    if (!images.length) return;

    updateProductColorSwatchState();
    updateProductVariantDisplay();
    showProductPhoto(0);
}

function updateProductColorSwatchState() {
    if (!productColorSwatches) return;
    productColorSwatches.querySelectorAll(".product-color-swatch").forEach((button, index) => {
        const active = index === currentProductVariantIndex;
        button.classList.toggle("active", active);
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

    // 商品自体を切り替えたら、前の商品写真に関する未完了の切り替え処理を無効化します。
    productPhotoChangeToken += 1;
    currentProductIndex = (index + PRODUCT_DATA.length) % PRODUCT_DATA.length;
    currentProductPhotoIndex = 0;
    currentProductVariantIndex = 0;
    const product = PRODUCT_DATA[currentProductIndex];
    const initialProductImage = getFirstProductImage(product);
    // 2・3枚目の商品は、カラー選択群とPURCHASEの間隔を自然に保つため表示位置だけを調整します。
    if (productInfoPanel) {
        productInfoPanel.classList.toggle(
            "product-info--adjusted-color-gap",
            currentProductIndex === 1 || currentProductIndex === 2
        );
    }
    preloadAdjacentProductPhotos(product, 0);

    if (productMainImage) {
        productMainImage.style.opacity = "0";
        window.setTimeout(() => {
            productMainImage.src = initialProductImage;
            updateProductImageBackdrop(productMainImage.src);
            productMainImage.alt = product.name.replace(/<br>/g, " ");
            productMainImage.style.opacity = "1";
        }, 160);
    }
    if (productNumber) productNumber.textContent = product.number;
    if (productCategory) productCategory.textContent = product.category;
    if (productName) {
        productName.innerHTML = product.name;
        // nameFontSize が商品データに指定されている場合だけ、その商品の商品名サイズを上書きします。
        // 未指定の場合は style.css の PC／タブレット／スマートフォン別の共通設定を使います。
        if (product.nameFontSize) {
            productName.style.setProperty("--product-name-font-size", product.nameFontSize);
        } else {
            productName.style.removeProperty("--product-name-font-size");
        }
    }
    if (productPrice) productPrice.innerHTML = `${product.price} <small>(tax included)</small>`;

    // 商品全体の販売状況と、選択中カラーの販売状況を反映します。
    updateProductVariantDisplay();

    if (productDescription) productDescription.textContent = product.description;
    if (productMaterial) productMaterial.textContent = product.material;
    if (productDetailPrice) productDetailPrice.textContent = product.price;
    renderProductColorSwatches(product);
    updateProductVariantDisplay();
    updateProductPhotoIndicator();
    renderProductInformation(product);

    if (productThumbnails) {
        productThumbnails.querySelectorAll(".product-thumb").forEach((button, buttonIndex) => {
            button.classList.toggle("active", buttonIndex === currentProductIndex);
        });
    }

}

function renderAllStaff() {
    if (!staffTrack || !allStaffImages.length) return;

    const count = allStaffImages.length;
    // 同じ写真群を2セット配置し、1セット分移動したら位置を戻して継ぎ目のないループにする。
    const loopedImages = [...allStaffImages, ...allStaffImages];
    currentStaffIndex = 0;
    currentStaffTrackIndex = 0;

    staffTrack.innerHTML = loopedImages.map((item, trackIndex) => `
        <button class="staff-slide" data-track-index="${trackIndex}" data-staff-index="${trackIndex % count}" aria-label="${item.alt}">
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
        showStaff(0);
        startStaffAutoPlay();
    });
}

function renderStaffDots() {
    if (!staffDots) return;

    staffDots.innerHTML = allStaffImages.map((item, index) => `
        <button class="staff-dot${index === currentStaffIndex ? " active" : ""}" data-staff-index="${index}" aria-label="${item.alt}"></button>
    `).join("");

    staffDots.querySelectorAll(".staff-dot").forEach(dot => {
        dot.addEventListener("click", () => showStaff(Number(dot.dataset.staffIndex)));
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

function showStaff(index) {
    if (!allStaffImages.length || !staffTrack) return;
    const count = allStaffImages.length;
    currentStaffIndex = (index + count) % count;
    // 表示位置は複製セットの先頭を基準にする。ジャンプ後も連続スクロールを継続。
    currentStaffTrackIndex = currentStaffIndex;
    updateStaffTrackPosition(false);
    updateStaffActiveStates();
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
preloadAdjacentProductPhotos(PRODUCT_DATA[0], 0);
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


/* =========================================================
   JOURNAL & NEWS: データからトップページの記事を生成
   アーカイブページと共通のカードデザインで表示します。
   記事データ・リンク先・表示件数など既存の仕様は維持します。
========================================================= */
(function initTellQJournalHome() {
    const list = document.getElementById("homeJournalList");
    const articles = Array.isArray(window.TELLQ_JOURNAL_DATA) ? window.TELLQ_JOURNAL_DATA : [];
    if (!list) return;

    const categoryLabels = {
        important: "IMPORTANT",
        journal: "JOURNAL",
        information: "INFORMATION"
    };

    const published = articles
        .filter(item => item.status === "published")
        .slice()
        .sort((a, b) => String(b.date).localeCompare(String(a.date)))
        .slice(0, 6);

    const escapeJournalText = value => String(value ?? "").replace(/[&<>\"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;"
    }[char]));

    const formatDate = value => {
        const date = new Date(`${value}T00:00:00`);
        if (Number.isNaN(date.getTime())) return escapeJournalText(value || "");
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };

    list.innerHTML = published.map(item => `
        <article class="journal-archive-card" data-category="${escapeJournalText(item.category)}"${item.pinned ? ' data-pinned="true"' : ""}>
            <div class="journal-archive-date">${formatDate(item.date)}${item.pinned ? "<small>PINNED</small>" : ""}</div>
            <div>
                <span class="journal-archive-category" data-category="${escapeJournalText(item.category)}">${categoryLabels[item.category] || "JOURNAL"}</span>
                <h2><a href="journal.html?id=${encodeURIComponent(item.id)}">${escapeJournalText(item.title)}</a></h2>
                <p>${escapeJournalText(item.summary || "")}</p>
                <a class="news-read-more" href="journal.html?id=${encodeURIComponent(item.id)}">READ STORY <span aria-hidden="true">↗</span></a>
            </div>
        </article>`).join("");

    if (!published.length) {
        list.innerHTML = '<p class="news-empty">新しいお知らせを準備しています。</p>';
    }
})();

// ========================================
// COPYRIGHT YEAR
// 現在の年を自動表示
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
