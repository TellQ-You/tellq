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
   PRODUCT SLIDER
========================================================= */

/*
   商品画像・商品名・価格などはここから変更できます。
   画像ファイルはHTMLと同じフォルダに置いてください。
   product01.jpg ～ product05.jpg の5枚を想定しています。
*/
const PRODUCT_DATA = [
    {
        image: "image/item1.JPG",
        number: "01",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "TellQ<br>トートバッグ",
        price: "¥7,400",
        description: "TellQブランドのトートバッグです。ニットを使った温かみのあるデザインで冬物の洋服に合わせやすく、上品な雰囲気と触り心地の良さを楽しめます。",
        material: "UPCYCLING KNIT"
    },
    {
        image: "image/item2.1.jpg",
        number: "TellQトート（ブラック）",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>02",
        price: "¥5,800",
        description: "黒色を基調とした、シックでおしゃれなトートバッグです。肌触りも良く、冬に来がちな白色の洋服にも合わせやすいく一味違った大人な雰囲気を作り出します。",
        material: "UPCYCLING MATERIAL"
    },
    {
        image: "image/item3.1.jpg",
        number: "TellQトート（ハーフ）",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>03",
        price: "¥6,100",
        description: "現在検討中の商品です。商品が決まり次第、ここに詳細情報を入力できます。",
        material: "UPCYCLING MATERIAL"
    },
    {
        image: "image/item4.1.jpg",
        number: "TellQショルダーニット",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>04",
        price: "¥8,600",
        description: "現在検討中の商品です。商品が決まり次第、ここに詳細情報を入力できます。",
        material: "UPCYCLING MATERIAL"
    },
    {
        image: "image/item5.1.jpg",
        number: "TellQニットバック（ホワイト）",
        category: "TELLQ / UPCYCLED COLLECTION",
        name: "Product<br>05",
        price: "¥7,000",
        description: "現在検討中の商品です。商品が決まり次第、ここに詳細情報を入力できます。",
        material: "UPCYCLING MATERIAL"
    }
];

const productMainImage = document.getElementById("productMainImage");
const productNumber = document.getElementById("productNumber");
const productCategory = document.getElementById("productCategory");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productMaterial = document.getElementById("productMaterial");
const productDetailPrice = document.getElementById("productDetailPrice");
const productThumbnails = document.getElementById("productThumbnails");
const productPrev = document.getElementById("productPrev");
const productNext = document.getElementById("productNext");

let currentProductIndex = 0;

function renderProductThumbnails() {
    if (!productThumbnails) return;

    productThumbnails.innerHTML = PRODUCT_DATA.map((product, index) => `
        <button class="product-thumb${index === currentProductIndex ? " active" : ""}" data-product-index="${index}" aria-label="商品 ${product.number}">
            <img src="${product.image}" alt="${product.name.replace(/<br>/g, " ")}">
            <span>${product.number}</span>
        </button>
    `).join("");

    productThumbnails.querySelectorAll(".product-thumb").forEach(button => {
        button.addEventListener("click", () => {
            showProduct(Number(button.dataset.productIndex));
        });
    });
}

function showProduct(index) {
    if (!PRODUCT_DATA.length) return;

    currentProductIndex = (index + PRODUCT_DATA.length) % PRODUCT_DATA.length;
    const product = PRODUCT_DATA[currentProductIndex];

    productMainImage.style.opacity = "0";

    setTimeout(() => {
        productMainImage.src = product.image;
        productMainImage.alt = product.name.replace(/<br>/g, " ");
        productNumber.textContent = product.number;
        productCategory.textContent = product.category;
        productName.innerHTML = product.name;
        productPrice.innerHTML = `${product.price} <small>(tax included)</small>`;
        productDescription.textContent = product.description;
        productMaterial.textContent = product.material;
        productDetailPrice.textContent = product.price;
        productMainImage.style.opacity = "1";
    }, 160);

    productThumbnails.querySelectorAll(".product-thumb").forEach((button, buttonIndex) => {
        button.classList.toggle("active", buttonIndex === currentProductIndex);
    });
}

renderProductThumbnails();
showProduct(0);
setTimeout(() => applyLoraToNumbers(), 220);

if (productPrev) {
    productPrev.addEventListener("click", () => {
        showProduct(currentProductIndex - 1);
    });
}

if (productNext) {
    productNext.addEventListener("click", () => {
        showProduct(currentProductIndex + 1);
    });
}

/* =========================================================
   STAFF SNAP SLIDER + LIGHTBOX
========================================================= */

const staffSlides = document.querySelectorAll(".staff-slide");
const staffTrack = document.getElementById("staffTrack");
const staffPrev = document.getElementById("staffPrev");
const staffNext = document.getElementById("staffNext");
const staffDots = document.getElementById("staffDots");
const staffLightbox = document.getElementById("staffLightbox");
const staffLightboxImage = document.getElementById("staffLightboxImage");
const staffLightboxClose = document.getElementById("staffLightboxClose");

let currentStaffIndex = 0;

function renderStaffDots() {
    if (!staffDots || !staffSlides.length) return;

    staffDots.innerHTML = Array.from(staffSlides).map((_, index) => `
        <button class="staff-dot${index === 0 ? " active" : ""}" data-staff-index="${index}" aria-label="スタッフスナップ ${index + 1}"></button>
    `).join("");

    staffDots.querySelectorAll(".staff-dot").forEach(dot => {
        dot.addEventListener("click", () => {
            showStaff(Number(dot.dataset.staffIndex));
        });
    });
}

function showStaff(index) {
    if (!staffSlides.length || !staffTrack) return;

    currentStaffIndex = (index + staffSlides.length) % staffSlides.length;
    staffTrack.style.transform = `translateX(-${currentStaffIndex * 100}%)`;

    staffSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentStaffIndex);
    });

    if (staffDots) {
        staffDots.querySelectorAll(".staff-dot").forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentStaffIndex);
        });
    }
}

renderStaffDots();
showStaff(0);

if (staffPrev) {
    staffPrev.addEventListener("click", () => {
        showStaff(currentStaffIndex - 1);
    });
}

if (staffNext) {
    staffNext.addEventListener("click", () => {
        showStaff(currentStaffIndex + 1);
    });
}

staffSlides.forEach(slide => {
    slide.addEventListener("click", () => {
        const image = slide.querySelector("img");
        if (!image || !staffLightbox || !staffLightboxImage) return;

        staffLightboxImage.src = image.src;
        staffLightboxImage.alt = image.alt;
        staffLightbox.classList.add("active");
        staffLightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

function closeStaffLightbox() {
    if (!staffLightbox) return;

    staffLightbox.classList.remove("active");
    staffLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (staffLightboxClose) {
    staffLightboxClose.addEventListener("click", closeStaffLightbox);
}

if (staffLightbox) {
    staffLightbox.addEventListener("click", event => {
        if (event.target === staffLightbox) {
            closeStaffLightbox();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeStaffLightbox();
    }
});

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
