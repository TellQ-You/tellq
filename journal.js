/* TellQ Journal: archive, filters, pagination, and article detail */
(() => {
    const data = Array.isArray(window.TELLQ_JOURNAL_DATA) ? window.TELLQ_JOURNAL_DATA : [];
    const labels = { important: "IMPORTANT", journal: "JOURNAL", information: "INFORMATION" };
    const pageSize = 12;
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");
    const listView = document.getElementById("journalListView");
    const detailView = document.getElementById("journalDetailView");
    const list = document.getElementById("journalArchiveList");
    const pagination = document.getElementById("journalPagination");
    let activeFilter = "all";
    let currentPage = 1;

    const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
    const formatDate = value => {
        const date = new Date(`${value}T00:00:00`);
        if (Number.isNaN(date.getTime())) return escapeHTML(value || "");
        return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")}`;
    };
    const sortArticles = items => items.slice().sort((a,b) => {
        if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
        return String(b.date).localeCompare(String(a.date));
    });
    const published = sortArticles(data.filter(item => item.status === "published"));

    function renderDetail(item) {
        listView.hidden = true;
        detailView.hidden = false;
        const paragraphs = Array.isArray(item.content) ? item.content : [item.content || item.summary || ""];
        const links = Array.isArray(item.relatedLinks) ? item.relatedLinks.filter(link => link && link.url && link.label) : [];
        detailView.dataset.category = item.category || "journal";
        detailView.dataset.pinned = item.pinned ? "true" : "false";
        detailView.innerHTML = `
            <div class="journal-detail-kicker"><span>TELLQ</span><i></i><span>JOURNAL / ${escapeHTML(labels[item.category] || "JOURNAL")}</span></div>
            <div class="journal-detail-meta">
                <span class="journal-detail-date">${formatDate(item.date)}</span>
                <span class="journal-detail-category" data-category="${escapeHTML(item.category)}">${escapeHTML(labels[item.category] || "JOURNAL")}</span>
                ${item.pinned ? '<span class="journal-detail-category">IMPORTANT NOTICE</span>' : ""}
            </div>
            <h1>${escapeHTML(item.title)}</h1>
            ${item.image ? `<img class="journal-detail-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy">` : ""}
            <div class="journal-detail-content">${paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("")}</div>
            ${links.length ? `<section class="journal-detail-links"><h2>RELATED LINKS</h2>${links.map(link => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} ↗</a>`).join("")}</section>` : ""}
            <div class="journal-detail-footer">
                <span class="journal-detail-footer-mark">TELLQ</span>
                <p>BEAUTY FROM WHAT REMAINS.</p>
                <a class="journal-back" href="journal.html">← ALL JOURNAL &amp; NEWS</a>
            </div>`;
        document.title = `${item.title} | TellQ JOURNAL`;
    }

    function renderList() {
        detailView.hidden = true;
        listView.hidden = false;
        const filtered = published.filter(item => activeFilter === "all" || item.category === activeFilter);
        const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
        currentPage = Math.min(currentPage, pageCount);
        const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        list.innerHTML = pageItems.length ? pageItems.map(item => `
            <article class="journal-archive-card" data-category="${escapeHTML(item.category)}"${item.pinned ? ' data-pinned="true"' : ""}>
                <div class="journal-archive-date">${formatDate(item.date)}${item.pinned ? "<small>PINNED</small>" : ""}</div>
                <div>
                    <span class="journal-archive-category" data-category="${escapeHTML(item.category)}">${escapeHTML(labels[item.category] || "JOURNAL")}</span>
                    <h2><a href="journal.html?id=${encodeURIComponent(item.id)}">${escapeHTML(item.title)}</a></h2>
                    <p>${escapeHTML(item.summary || "")}</p>
                    <a class="news-read-more" href="journal.html?id=${encodeURIComponent(item.id)}">READ STORY ↗</a>
                </div>
            </article>`).join("") : '<p class="journal-no-results">このカテゴリの記事はまだありません。</p>';

        pagination.innerHTML = pageCount > 1
            ? Array.from({length: pageCount}, (_, i) => `<button type="button" data-page="${i+1}" aria-current="${currentPage === i+1 ? "page" : "false"}">${i+1}</button>`).join("")
            : "";
        pagination.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
            currentPage = Number(button.dataset.page);
            renderList();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }));
        document.title = "JOURNAL & NEWS. | TellQ";
    }

    document.querySelectorAll(".journal-filter button").forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter || "all";
            currentPage = 1;
            document.querySelectorAll(".journal-filter button").forEach(other =>
                other.setAttribute("aria-pressed", String(other === button)));
            renderList();
        });
    });

    if (articleId) {
        const item = published.find(entry => entry.id === articleId);
        if (item) renderDetail(item);
        else {
            detailView.hidden = false;
            listView.hidden = true;
            detailView.innerHTML = '<h1>記事が見つかりませんでした。</h1><p>記事が公開されていないか、URLが変更された可能性があります。</p><a class="journal-back" href="journal.html">← ALL JOURNAL &amp; NEWS</a>';
        }
    } else {
        renderList();
    }
})();