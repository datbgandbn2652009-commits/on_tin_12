const storedSubject = localStorage.getItem("web3-current-subject");
let currentSubject = storedSubject || "tin";
let subjectSelected = Boolean(storedSubject);
let activeUid = "";
function courseStore(key) { const prefix = currentSubject === "tin" ? "tin12" : currentSubject === "bio" ? "bio12" : "en12"; return `${prefix}-${activeUid || "guest"}-${key}`; }
let tfData = window.TF_DATA;
let mcData = window.MC_DATA;
let topics = [
  {
    name: "Mạng máy tính",
    icon: "🌐",
    color: "#eeeaff",
    desc: "Hub, switch, router, modem, Wi-Fi và các thiết bị mạng.",
  },
  {
    name: "Địa chỉ & giao thức",
    icon: "🔗",
    color: "#e8f5ff",
    desc: "IP, MAC, TCP/IP, DNS, HTTP và cách dữ liệu truyền đi.",
  },
  {
    name: "Chia sẻ & an toàn số",
    icon: "🛡️",
    color: "#e8f8ef",
    desc: "Chia sẻ tệp, quyền truy cập và văn hóa ứng xử trên mạng.",
  },
  {
    name: "Trí tuệ nhân tạo",
    icon: "🤖",
    color: "#fff2e6",
    desc: "Khái niệm AI, ứng dụng, AI tạo sinh và những điều cần lưu ý.",
  },
  {
    name: "Thiết bị số",
    icon: "💻",
    color: "#fff0f4",
    desc: "Kết nối thiết bị, trình chiếu và truyền tệp hiệu quả.",
  },
];
let concepts = [
  [
    "Hub và Switch",
    "Hub phát dữ liệu đến mọi cổng; switch chuyển đến cổng của thiết bị nhận nên giảm xung đột.",
  ],
  [
    "Router và Modem",
    "Router định tuyến giữa các mạng. Modem chuyển đổi tín hiệu để kết nối mạng nội bộ với nhà cung cấp Internet.",
  ],
  [
    "TCP/IP",
    "IP định địa chỉ và chuyển gói tin giữa các mạng; TCP kiểm soát thứ tự, phát hiện mất gói và yêu cầu truyền lại.",
  ],
  [
    "DNS và địa chỉ IP",
    "DNS phân giải tên miền thành địa chỉ IP. IPv4 dài 4 byte, thường viết thành bốn nhóm số.",
  ],
  [
    "Chia sẻ thư mục",
    "Bật khám phá mạng và chia sẻ trên mạng riêng; cấp đúng quyền cần thiết cho người dùng.",
  ],
  [
    "AI tạo sinh",
    "Có thể hỗ trợ tạo văn bản, hình ảnh; cần kiểm chứng vì có nguy cơ tạo thông tin sai hoặc thiên lệch.",
  ],
];
function esc(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function renderChoiceContent(value) {
  let text = String(value),
    match = text.match(/^H.nh\s+(5\.\d+)\.?$/i);
  if (!match) return esc(text);
  let figure = match[1],
    src = "media/figures/hinh-" + figure.replace(".", "-") + ".png";
  return `<span class="figure-choice"><span>${esc(text)}</span><img src="${src}" alt="${esc(text)}" loading="lazy"></span>`;
}
const tinTopics = topics;
const tinConcepts = concepts;
let topicsNames = [
  ...new Set([...topics.map((x) => x.name), ...tfData.map((x) => x.t)]),
];
let normalizedTf = tfData.map((x) => ({ ...x, type: "tf" }));
let allQuestions = [
  ...normalizedTf,
  ...mcData.map((x) => ({ ...x, type: "mc" })),
];
document.getElementById("totalStat").textContent = allQuestions.length;
function setupTopics() {
  document.getElementById("topicCards").innerHTML = topics
    .map(
      (t) =>
        `<article class="card topic-card"><div class="topic-top"><div class="topic-icon" style="background:${t.color}">${t.icon}</div><span class="pill" style="font-size:9px;padding:6px 8px">${allQuestions.filter((q) => q.t === t.name).length} câu</span></div><h3>${t.name}</h3><p>${t.desc}</p><div class="topic-foot"><span>${currentSubject === "tin" ? "ĐỀ CƯƠNG TIN 12" : currentSubject === "bio" ? "ÔN TẬP SINH 12" : "ENGLISH 12 · UNIT 1–3"}</span><button class="link-btn" data-filtertopic="${esc(t.name)}">Ôn chủ đề →</button></div></article>`,
    )
    .join("");
  document.getElementById("studyCards").innerHTML = (concepts.length ? concepts : topics.map((t) => [t.name, t.desc]))
    .map(
      (c) =>
        `<article class="card"><div class="topic-icon">📖</div><h3>${c[0]}</h3><p>${c[1]}</p><div class="topic-foot"><span>GHI NHỚ NHANH</span><span>✦</span></div></article>`,
    )
    .join("");
  let opts = topicsNames
    .map((n) => `<option value="${esc(n)}">${esc(n)}</option>`)
    .join("");
  document.getElementById("topicFilter").innerHTML = '<option value="all">Tất cả chủ đề</option>' + opts;
  document.getElementById("quizTotal").textContent =
    currentSubject === "en" ? `${allQuestions.length} c\u00e2u tr\u1eafc nghi\u1ec7m A/B/C/D` : `${allQuestions.length} c\u00e2u/nh\u00f3m tr\u1ed9n chung`;
  document.getElementById("totalStat").textContent = allQuestions.length;
  document.querySelector(".brand small").textContent = !subjectSelected ? "CHỌN MÔN HỌC" : currentSubject === "tin" ? "TIN HỌC 12 · ÔN TẬP GIỮA KÌ" : currentSubject === "bio" ? "SINH HỌC 12 · ÔN TẬP GIỮA KÌ" : "TIẾNG ANH 12 · UNIT 1–3";
  document.getElementById("activeCourseLabel").textContent = currentSubject === "tin" ? "Đang học: Ôn tập GK1 Tin học 12" : currentSubject === "bio" ? "Đang học: Ôn tập GK1 Sinh học 12" : "Đang học: Ôn tập Tiếng Anh 12 · Unit 1–3";
  document.getElementById("welcomeTag").textContent = currentSubject === "en" ? "ÔN TẬP UNIT 1–3 · TIẾNG ANH 12" : `ÔN TẬP GK1 · ${currentSubject === "tin" ? "TIN HỌC" : "SINH HỌC"} 12`;
  document.querySelector("#course .hero h1").innerHTML = currentSubject === "tin" ? "Học chắc kiến thức.<br>Vào quiz là tự tin." : currentSubject === "bio" ? "Khám phá sự sống.<br>Vững vàng Sinh học." : "Build your English.<br>One unit at a time.";
  document.querySelector("#course .hero p").textContent = currentSubject === "tin"
    ? "Ôn tập Tin học lớp 12 theo từng chủ đề, hỏi nhanh điều bạn chưa hiểu và thử sức với quiz tính điểm."
    : currentSubject === "bio" ? "Ôn tập Sinh học lớp 12 theo ngân hàng câu hỏi giữa kì: trắc nghiệm, đúng/sai và trả lời ngắn." : "Ôn từ vựng, ngữ pháp và luyện đề Unit 1–3 theo tài liệu Tiếng Anh 12.";
  document.getElementById("courseNavTitle").textContent = currentSubject === "tin" ? "TIN HỌC 12 · ÔN TẬP GK1" : currentSubject === "bio" ? "SINH HỌC 12 · ÔN TẬP GK1" : "TIẾNG ANH 12 · UNIT 1–3";
  document.querySelector("#quiz h2").textContent = currentSubject === "en" ? "Ôn tập Unit 1–3 Tiếng Anh 12" : `Ôn tập GK1 ${currentSubject === "tin" ? "Tin học" : "Sinh học"} 12`;
  document.querySelector("#quiz .card h3").textContent = currentSubject === "en" ? "Luyện tập toàn bộ Unit 1–3" : `Toàn bộ đề cương ${currentSubject === "tin" ? "Tin học" : "Sinh học"} 12`;
  document.getElementById("courseAskTitle").textContent = currentSubject === "tin" ? "💬 Hỏi đáp Tin học" : currentSubject === "bio" ? "🧬 Hỏi đáp Sinh học" : "🇬🇧 Hỏi đáp Tiếng Anh";
  document.getElementById("askInput").placeholder = currentSubject === "tin" ? "Ví dụ: Switch khác hub như thế nào?" : currentSubject === "bio" ? "Ví dụ: ADN nhân đôi theo nguyên tắc nào?" : "Ví dụ: Khi nào dùng past continuous?";
  const courseQuick = document.querySelector("#course .quick");
  if (courseQuick) courseQuick.innerHTML = currentSubject === "tin"
    ? "<button>TCP dùng để làm gì?</button><button>Địa chỉ IP là gì?</button><button>Chia sẻ thư mục thế nào?</button>"
    : currentSubject === "bio" ? "<button>ADN nhân đôi theo nguyên tắc nào?</button><button>Đột biến điểm là gì?</button><button>Quy luật phân li độc lập là gì?</button>" : "<button>When và while khác nhau thế nào?</button><button>Khi nào dùng a hay an?</button><button>Care đi với giới từ nào?</button>";
  document.querySelector("#practice .section-head p").textContent = currentSubject === "tin"
    ? "Gõ câu hỏi bằng lời của bạn — hệ thống tra cứu trong kiến thức Tin 12."
    : currentSubject === "bio" ? "Gõ câu hỏi bằng lời của bạn — hệ thống tra cứu trong ngân hàng Sinh học 12." : "Ask about vocabulary or grammar from English Units 1–3.";
  document.querySelector("#practice .quick").innerHTML = currentSubject === "tin"
    ? "<button>Hub và switch khác nhau thế nào?</button><button>DNS có vai trò gì?</button><button>AI hẹp là gì?</button><button>Quyền Read cho phép làm gì?</button>"
    : currentSubject === "bio" ? "<button>DNA và RNA khác nhau thế nào?</button><button>Đột biến gene là gì?</button><button>Nhiễm sắc thể có cấu trúc thế nào?</button><button>Lai phân tích dùng để làm gì?</button>" : "<button>What does ‘biography’ mean?</button><button>Complete: she ___ (read) at 9 p.m.</button><button>Use the correct article: ___ UK</button>";
  document.querySelector('#typeFilter option[value="mc"]').textContent = currentSubject === "bio" ? "Tr\u1eafc nghi\u1ec7m / Tr\u1ea3 l\u1eddi ng\u1eafn" : "Tr\u1eafc nghi\u1ec7m A / B / C / D";
  document.getElementById("courseNav").hidden = !subjectSelected;
  const vocabularyNav = document.getElementById("vocabularyNav");
  if (vocabularyNav) vocabularyNav.hidden = currentSubject !== "en";
  document.getElementById("sideNote").hidden = !subjectSelected;
  document.getElementById("sideNote").innerHTML = currentSubject === "tin"
    ? "📘 <b>Nguồn ôn tập</b><br>Đề cương Tin học 12; đáp án lấy từ ngân hàng câu hỏi của môn học."
    : currentSubject === "bio" ? "🧬 <b>Nguồn ôn tập</b><br>Ngân hàng ôn tập giữa kì 1 Sinh học 12 trong tài liệu Word." : "🇬🇧 <b>Nguồn ôn tập</b><br>Từ vựng, ngữ pháp và bài tập Unit 1–3 trong TH_TA_UNIT_123.";
}

function activateSubject(subject, persist = true) {
  currentSubject = ["tin", "bio", "en"].includes(subject) ? subject : "tin";
  if (persist) subjectSelected = true;
  if (currentSubject === "bio") {
    const bank = window.BIO_DATA || { tf: [], mc: [], short: [] };
    tfData = bank.tf;
    mcData = [...bank.mc, ...bank.short];
    topics = [
      { name: "Di truyền phân tử", icon: "🧬", color: "#e8f8ef", desc: "DNA, gene, nhân đôi, phiên mã và dịch mã." },
      { name: "Đột biến và công nghệ gene", icon: "🔬", color: "#e8f5ff", desc: "Đột biến gene, công nghệ gene và ứng dụng." },
      { name: "Nhiễm sắc thể", icon: "🧫", color: "#eeeaff", desc: "Cấu trúc, hình thái và phân bào." },
      { name: "Di truyền Mendel", icon: "🌱", color: "#fff2e6", desc: "Quy luật di truyền và các phép lai." },
    ];
    concepts = [];
  } else if (currentSubject === "en") {
    const bank = window.EN_DATA || [];
    tfData = [];
    mcData = bank;
    topics = [
      { name: "Unit 1 · Life Stories We Admire", icon: "📖", color: "#eeeaff", desc: "Từ vựng về những câu chuyện truyền cảm hứng; quá khứ đơn, quá khứ tiếp diễn và when/while." },
      { name: "Unit 2 · A Multicultural World", icon: "🌍", color: "#e8f5ff", desc: "Ẩm thực, phong tục, giao tiếp đa văn hóa và cách dùng a, an, the, Ø." },
      { name: "Unit 3 · Green Living", icon: "🌱", color: "#e8f8ef", desc: "Từ vựng môi trường, động từ đi với giới từ và mệnh đề which." },
      { name: "Tổng hợp Unit 1–3", icon: "🇬🇧", color: "#fff2e6", desc: "Đề tổng hợp từ vựng và ngữ pháp trong tài liệu ôn tập." },
    ];
    concepts = [
      ["Past simple & past continuous", "Past simple kể hành động đã hoàn tất; past continuous diễn tả hành động đang diễn ra tại một thời điểm hoặc bị hành động khác xen vào."],
      ["When & while", "When thường giới thiệu hành động ngắn xen vào; while thường đi với hành động đang diễn ra hoặc hai hành động song song."],
      ["Articles: a, an, the, Ø", "Chọn a/an theo âm đầu; dùng the cho đối tượng xác định; Ø khi nói chung về ngôn ngữ, môn học hoặc danh từ không đếm được."],
      ["Verbs with prepositions & which", "Ghi nhớ care about, wait for, agree on, make use of, responsible for; dùng , which để nhận xét hoặc nêu kết quả của cả mệnh đề trước."],
    ];
  } else {
    tfData = window.TF_DATA;
    mcData = window.MC_DATA;
    topics = tinTopics;
    concepts = tinConcepts;
  }
  normalizedTf = tfData.map((q) => ({ ...q, type: "tf" }));
  allQuestions = [...normalizedTf, ...mcData.map((q) => ({ ...q, type: q.type || "mc" }))];
  topicsNames = [...new Set([...topics.map((q) => q.name), ...allQuestions.map((q) => q.t)])];
  document.querySelectorAll(".course-card").forEach((card) => card.classList.toggle("selected", card.querySelector("[data-subject]")?.dataset.subject === currentSubject));
  document.querySelectorAll(".subject-nav [data-subject]").forEach((button) => button.classList.toggle("active", button.dataset.subject === currentSubject));
  setupTopics();
  renderLibrary();
  renderHistory();
  showProfile();
  refreshLeaderboard();
  if (persist) localStorage.setItem("web3-current-subject", currentSubject);
  updateCourseLaunchButtons();
}
document.querySelectorAll("[data-subject]").forEach((button) => button.addEventListener("click", () => {
  activateSubject(button.dataset.subject);
  switchPage("course");
}));
function questionText(q) {
  return [q.q, ...(q.items || []).map((x) => x.text)].join(" ");
}
function renderLibrary() {
  let term = document
      .getElementById("searchInput")
      .value.toLocaleLowerCase("vi"),
    topic = document.getElementById("topicFilter").value,
    type = document.getElementById("typeFilter").value;
  let xs = allQuestions.filter(
    (q) =>
      (!term || questionText(q).toLocaleLowerCase("vi").includes(term)) &&
      (topic === "all" || q.t === topic) &&
      (type === "all" || (type === "tf") === (q.type === "tf")),
  );
  document.getElementById("libraryCount").textContent = `${xs.length} câu`;
  document.getElementById("questionList").innerHTML = xs.length
    ? xs
        .slice(0, 100)
        .map(
          (q, i) =>
            `<article class="question-row"><div class="q-num">${i + 1}</div><div><div class="q-text">${esc(q.q)}</div>${q.type === "tf" ? `<ol class="bank-statements">${q.items.map((x) => `<li>${esc(x.text)}</li>`).join("")}</ol>` : ""}<div class="q-kind">${esc(q.t)} · ${q.type === "tf" ? "4 ý Đúng / Sai" : q.type === "short" ? "Trả lời ngắn" : "Trắc nghiệm"}</div></div></article>`,
        )
        .join("")
    : '<div class="empty">Không tìm thấy câu hỏi phù hợp. Thử một từ khóa khác nhé.</div>';
}
function renderEnglishVocabulary() {
  const root = document.getElementById("vocabularyGroups");
  if (!root) return;
  const query = (document.getElementById("vocabularySearch")?.value || "").trim().toLocaleLowerCase("vi");
  const unit = document.getElementById("vocabularyUnit")?.value || "all";
  const entries = (window.EN_VOCABULARY || []).filter((entry) =>
    (unit === "all" || entry.unit === unit) && `${entry.word} ${entry.ipa} ${entry.meaning}`.toLocaleLowerCase("vi").includes(query),
  );
  document.getElementById("vocabularyCount").textContent = `${entries.length} / ${(window.EN_VOCABULARY || []).length} mục`;
  root.innerHTML = ["Unit 1", "Unit 2", "Unit 3"].map((name) => {
    const rows = entries.filter((entry) => entry.unit === name);
    if (!rows.length) return "";
    const title = name === "Unit 1" ? "Life Stories We Admire" : name === "Unit 2" ? "A Multicultural World" : "Green Living";
    return `<section class="vocab-unit"><header><span>${name}</span><h3>${title}</h3><small>${rows.length} mục</small></header><div class="vocab-table-wrap"><table class="vocab-table"><thead><tr><th>Từ / cụm từ</th><th>Phiên âm</th><th>Nghĩa tiếng Việt</th></tr></thead><tbody>${rows.map((entry) => `<tr><td>${esc(entry.word)}</td><td>${esc(entry.ipa)}</td><td>${esc(entry.meaning)}</td></tr>`).join("")}</tbody></table></div></section>`;
  }).join("") || '<div class="empty">Không tìm thấy từ phù hợp. Hãy thử từ khóa khác.</div>';
}
document.getElementById("vocabularySearch")?.addEventListener("input", renderEnglishVocabulary);
document.getElementById("vocabularyUnit")?.addEventListener("change", renderEnglishVocabulary);
const pageIds = ["home", "course", "vocabulary", "library", "practice", "quiz", "ranking", "answers", "adminUsers"];
let currentPage = pageIds.includes(location.hash.slice(1))
  ? location.hash.slice(1)
  : "home";
if (!subjectSelected || currentPage === "home") currentPage = "home";
let routeIndex = 0;
function updateBackButton() {
  let b = document.getElementById("backButton");
  b.disabled = routeIndex === 0;
  b.setAttribute("aria-disabled", String(routeIndex === 0));
}
function isRankingUnlocked() {
  return localStorage.getItem(courseStore("rank-unlocked")) === "true";
}
function updateRankingAccess() {
  let nav = document.getElementById("rankNav");
  if (nav) nav.hidden = false;
}
function switchPage(name, push = true) {
  if (!pageIds.includes(name)) name = "home";
  if (name !== "home" && !subjectSelected) name = "home";
  if (name === "answers" && !canViewAnswers()) name = "course";
  if (name === "adminUsers" && !isAdmin()) name = "course";
  if (name === "vocabulary" && currentSubject !== "en") name = "course";
  if (push && name !== currentPage) {
    routeIndex++;
    history.pushState(
      { web3Page: name, web3Index: routeIndex },
      "",
      "#" + name,
    );
  }
  currentPage = name;
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.toggle("show", p.id === name));
  document
    .querySelectorAll(".nav button")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === name));
  document.getElementById("courseNav").hidden = !subjectSelected || name === "home";
  document.getElementById("sideNote").hidden = !subjectSelected || name === "home";
  if (name === "library") renderLibrary();
  if (name === "vocabulary") renderEnglishVocabulary();
  if (name === "ranking") refreshLeaderboard();
  if (name === "answers") renderAllAnswers("adminAnswers");
  if (name === "adminUsers") loadRegisteredUsers();
  updateBackButton();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.addEventListener("popstate", (e) => {
  if (modal && modal.classList.contains("open")) exitQuiz();
  if (e.state && e.state.web3Page) {
    routeIndex = e.state.web3Index || 0;
    switchPage(e.state.web3Page, false);
  } else {
    routeIndex = 0;
    switchPage("home", false);
  }
});
document.getElementById("backButton").onclick = () => {
  if (routeIndex > 0) history.back();
  else switchPage("home", false);
};
document
  .querySelectorAll(".nav button")
  .forEach((b) => (b.onclick = () => switchPage(b.dataset.page)));
document
  .querySelectorAll("[data-go]")
  .forEach((b) => (b.onclick = () => switchPage(b.dataset.go)));
function answerQuestion(raw) {
  let s = raw
    .toLocaleLowerCase("vi")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  let rules = [
    [/hub|switch|bo chuyen mach/, "Mạng máy tính"],
    [/router|modem|wifi|wi-fi|access point|mang lan/, "Mạng máy tính"],
    [
      /tcp|http|https|dns|ipv|dia chi ip|dia chi mac|giao thuc/,
      "Địa chỉ & giao thức",
    ],
    [/chia se|thu muc|may in|quyen read|full control/, "Chia sẻ & an toàn số"],
    [/ai|tri tue nhan tao|deepfake|ngon ngu tu nhien/, "Trí tuệ nhân tạo"],
    [/bluetooth|may chieu|hdmi|man hinh|truyen tep/, "Thiết bị số"],
  ];
  let topic = (rules.find((r) => r[0].test(s)) || [])[1];
  let words = s.split(/\W+/).filter((w) => w.length > 2);
  let pool = allQuestions.filter((q) => !topic || q.t === topic);
  let ranked = pool
    .map((q) => ({
      q,
      score: words.reduce(
        (n, w) =>
          n +
          ((q.q + " " + q.t + " " + q.e)
            .toLocaleLowerCase("vi")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(w)
            ? 1
            : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  let best = ranked[0]?.q;
  if (currentSubject === "bio" && best && ranked[0].score > 0) {
    let answer = best.type === "tf"
      ? best.items.map((item, i) => `${String.fromCharCode(65 + i)}. ${item.a === 0 ? "Đúng" : "Sai"}`).join(" · ")
      : best.type === "short"
        ? `Đáp án ngắn: ${Array.isArray(best.a) ? best.a.join(" / ") : best.a}`
        : `Đáp án: ${(Array.isArray(best.a) ? best.a : [best.a]).map((i) => `${String.fromCharCode(65 + i)}. ${best.c[i]}`).join(" / ")}`;
    return `<b>${esc(best.t)}:</b> ${esc(answer)}<br><span style="color:#777">Câu liên quan: “${esc(best.q)}”</span>`;
  }
  let direct = concepts.find((c) =>
    s.includes(
      c[0]
        .toLocaleLowerCase("vi")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    ),
  );
  if (direct) return `<b>${esc(direct[0])}:</b> ${esc(direct[1])}`;
  if (best && ranked[0].score > 0)
    return `<b>${esc(best.t)}:</b> ${esc(best.e)}<br><span style="color:#777">Câu liên quan trong đề cương: “${esc(best.q)}”</span>`;
  let tips = topic
    ? concepts.filter((c) =>
        new RegExp(
          topic === "Mạng máy tính"
            ? "Hub|Router|DNS"
            : topic === "Địa chỉ & giao thức"
              ? "TCP|DNS"
              : topic === "Chia sẻ & an toàn số"
                ? "Chia sẻ"
                : "AI|Hub",
        ).test(c[0]),
      )
    : concepts.slice(0, 3);
  return `Mình chưa tìm thấy đúng câu hỏi đó trong đề cương. Bạn có thể hỏi cụ thể hơn về <b>${topic || "Hub, Switch, Router, TCP/IP, DNS, chia sẻ thư mục hoặc AI"}</b> nhé.`;
}
function bindAsk(inputId, btnId, boxId) {
  let input = document.getElementById(inputId),
    btn = document.getElementById(btnId),
    box = document.getElementById(boxId);
  function go() {
    if (!input.value.trim()) {
      input.focus();
      box.classList.add("on");
      box.textContent = "Bạn nhập một câu hỏi trước nhé.";
      return;
    }
    box.innerHTML = answerQuestion(input.value.trim());
    box.classList.add("on");
  }
  btn.onclick = go;
  input.onkeydown = (e) => {
    if (e.key === "Enter") go();
  };
  const quick = input.parentElement.parentElement.querySelector(".quick");
  if (quick) quick.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    input.value = button.textContent;
    go();
  });
}
bindAsk("askInput", "askBtn", "answerBox");
bindAsk("askInput2", "askBtn2", "answerBox2");
document.querySelectorAll(".quick button").forEach((b) => {});
document.getElementById("searchInput").oninput = renderLibrary;
document.getElementById("topicFilter").onchange = renderLibrary;
document.getElementById("typeFilter").onchange = renderLibrary;
document.addEventListener("click", (e) => {
  let b = e.target.closest("[data-filtertopic]");
  if (b) {
    switchPage("library");
    document.getElementById("topicFilter").value = b.dataset.filtertopic;
    renderLibrary();
  }
});
const modal = document.getElementById("quizModal"),
  box = document.getElementById("quizBox");
let run = [],
  idx = 0,
  score = 0,
  locked = false,
  answered = 0,
  correctCount = 0,
  tfSelections = [],
  wrongQuestions = [],
  runMode = "normal",
  runFinished = false,
  activeAudio = null,
  audioStopTimer = null,
  transitionInterval = null,
  transitionTimeout = null,
  pendingAdvance = false,
  awaitingSubmit = false,
  restoredTfSelections = null;
const soundFiles = {
  correct: ["dung1.mp3", "dung2.mp3", "dung3.mp3", "dung4.mp3"],
  wrong: ["sai1.mp3", "sai2.mp3", "sai3.mp3", "sai4.mp3"],
};
const soundPool = {
  correct: soundFiles.correct.map((name) => new Audio("media/" + name)),
  wrong: soundFiles.wrong.map((name) => new Audio("media/" + name)),
};
Object.values(soundPool)
  .flat()
  .forEach((audio) => {
    audio.preload = "auto";
    audio.load();
  });
function stopActiveAudio() {
  if (audioStopTimer) {
    clearTimeout(audioStopTimer);
    audioStopTimer = null;
  }
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio.onended = null;
    activeAudio = null;
  }
}
function playAnswerSound(correct) {
  stopActiveAudio();
  let choices = correct ? soundPool.correct : soundPool.wrong;
  let audio = choices[Math.floor(Math.random() * choices.length)];
  activeAudio = audio;
  audio.currentTime = 0;
  audio.volume = 0.8;
  audio.onended = () => {
    if (activeAudio === audio) stopActiveAudio();
  };
  audio.play().catch(() => {
    if (activeAudio === audio) stopActiveAudio();
  });
  audioStopTimer = setTimeout(stopActiveAudio, 5000);
}
function clearTransition() {
  if (transitionInterval) {
    clearInterval(transitionInterval);
    transitionInterval = null;
  }
  if (transitionTimeout) {
    clearTimeout(transitionTimeout);
    transitionTimeout = null;
  }
}
function advanceQuestion() {
  clearTransition();
  stopActiveAudio();
  pendingAdvance = false;
  if (idx === run.length - 1) showResult();
  else {
    idx++;
    showQuestion();
  }
}
function startTransition(button) {
  clearTransition();
  if (idx === run.length - 1) {
    pendingAdvance = false;
    awaitingSubmit = true;
    saveQuizProgress();
    button.disabled = false;
    button.style.visibility = "visible";
    button.textContent = "N\u1ed9p b\u00e0i";
    button.onclick = submitFinalQuiz;
    return;
  }
  pendingAdvance = true;
  awaitingSubmit = false;
  saveQuizProgress();
  let seconds = 3;
  button.disabled = true;
  button.style.visibility = "visible";
  button.textContent = "T\u1ef1 chuy\u1ec3n sau " + seconds + " gi\u00e2y";
  transitionInterval = setInterval(() => {
    seconds--;
    if (seconds > 0)
      button.textContent = "T\u1ef1 chuy\u1ec3n sau " + seconds + " gi\u00e2y";
  }, 1000);
  transitionTimeout = setTimeout(() => {
    clearTransition();
    advanceQuestion();
  }, 3000);
}
function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function startQuiz(
  n = allQuestions.length,
  topic = "all",
  subset = null,
  retry = false,
) {
  if (
    !(localStorage.getItem("tin12-student-name") || "").trim() ||
    !(localStorage.getItem("tin12-student-id") || "").trim()
  ) {
    openProfile();
    return;
  }
  if (restoreQuizProgress()) {
    modal.classList.add("open");
    if (rebirthRequired) showMandatoryRebirth();
    else if (awaitingSubmit) showPendingSubmit();
    else showQuestion();
    return;
  }
  clearTransition();
  stopActiveAudio();
  let pool =
    subset || allQuestions.filter((q) => topic === "all" || q.t === topic);
  run = shuffled(pool).slice(0, Math.min(n, pool.length));
  questionScores = new Map();
  idx = 0;
  score = 0;
  answered = 0;
  correctCount = 0;
  wrongQuestions = [];
  runMode = retry ? "retry" : "normal";
  runFinished = false;
  locked = false;
  pendingAdvance = false;
  awaitingSubmit = false;
  rebirthRequired = false;
  restoredTfSelections = null;
  modal.classList.add("open");
  saveQuizProgress();
  showQuestion();
}
let resumeRun = null,
  questionScores = new Map();
let rebirthRequired = false;
function questionIndex(q) { return allQuestions.indexOf(q); }
function encodeRunState(state) {
  if (!state) return null;
  return { run: state.run.map(questionIndex), idx: state.idx, score: state.score, answered: state.answered, correctCount: state.correctCount, wrongQuestions: state.wrongQuestions.map(questionIndex), runMode: state.runMode, replacedPoints: state.replacedPoints };
}
function decodeRunState(state) {
  if (!state) return null;
  return { ...state, run: state.run.map((i) => allQuestions[i]).filter(Boolean), wrongQuestions: state.wrongQuestions.map((i) => allQuestions[i]).filter(Boolean) };
}
function saveQuizProgress() {
  if (!run.length || runFinished) return;
  const snapshot = {
    run: run.map(questionIndex), idx, score, answered, correctCount,
    wrongQuestions: wrongQuestions.map(questionIndex), runMode,
    questionScores: [...questionScores].map(([q, points]) => [questionIndex(q), points]),
    tfSelections, pendingAdvance, awaitingSubmit, rebirthRequired, resumeRun: encodeRunState(resumeRun),
  };
  try { localStorage.setItem(courseStore("quiz-progress"), JSON.stringify(snapshot)); } catch {}
  updateCourseLaunchButtons();
}
function clearQuizProgress() {
  localStorage.removeItem(courseStore("quiz-progress"));
  updateCourseLaunchButtons();
}
function restoreQuizProgress() {
  let snapshot;
  try { snapshot = JSON.parse(localStorage.getItem(courseStore("quiz-progress")) || "null"); } catch { return false; }
  if (!snapshot || !Array.isArray(snapshot.run)) return false;
  run = snapshot.run.map((i) => allQuestions[i]).filter(Boolean);
  if (!run.length) { clearQuizProgress(); return false; }
  idx = Math.min(snapshot.idx + (snapshot.pendingAdvance ? 1 : 0), run.length);
  score = snapshot.score || 0;
  answered = snapshot.answered || 0;
  correctCount = snapshot.correctCount || 0;
  wrongQuestions = (snapshot.wrongQuestions || []).map((i) => allQuestions[i]).filter(Boolean);
  runMode = snapshot.runMode || "normal";
  questionScores = new Map((snapshot.questionScores || []).map(([i, points]) => [allQuestions[i], points]).filter(([q]) => q));
  resumeRun = decodeRunState(snapshot.resumeRun);
  pendingAdvance = false;
  awaitingSubmit = Boolean(snapshot.awaitingSubmit);
  rebirthRequired = Boolean(snapshot.rebirthRequired);
  restoredTfSelections = snapshot.pendingAdvance ? null : snapshot.tfSelections;
  runFinished = false;
  locked = false;
  return true;
}
function showPendingSubmit() {
  locked = true;
  box.innerHTML = `<div class="result"><div class="trophy">📝</div><div class="quiz-label">BÀI LÀM ĐÃ ĐỦ CÂU</div><h2>Kiểm tra và nộp bài</h2><p>Bạn đã trả lời đủ ${run.length} câu. Nhấn nút nộp bài để chốt điểm và xem đáp án đầy đủ.</p><div class="result-score">${score} điểm</div><button class="next-btn" id="confirmSubmit">Nộp bài và xem kết quả</button></div>`;
  document.getElementById("confirmSubmit").onclick = submitFinalQuiz;
}
function submitFinalQuiz() {
  if (!awaitingSubmit) return;
  awaitingSubmit = false;
  showResult();
}
function updateCourseLaunchButtons() {
  let hasProgress = Boolean(localStorage.getItem(courseStore("quiz-progress")));
  document.querySelectorAll("#launchQuizButton, #fullQuiz").forEach((button) => {
    button.textContent = hasProgress ? "Chơi tiếp →" : "Bắt đầu chơi →";
  });
  document.getElementById("resetQuiz").hidden = !hasProgress;
  const desc = document.querySelector("#launchQuiz p");
  if (desc) desc.textContent = hasProgress ? "Bạn đang có lượt chơi chưa hoàn thành. Tiếp tục đúng câu đang dở." : "Trả lời nhanh, tích lũy điểm và xem kết quả sau khi nộp bài.";
}
function offerRebirth() {
  if (
    runMode !== "normal" ||
    idx >= run.length - 1 ||
    !wrongQuestions.length ||
    Math.random() > 0.22
  ) return false;
  rebirthRequired = true;
  pendingAdvance = false;
  saveQuizProgress();
  return true;
}
function showMandatoryRebirth() {
  locked = true;
  clearTransition();
  saveQuizProgress();
  box.innerHTML = `<div class="phoenix-gate"><div class="phoenix-icon" aria-hidden="true">\u{1F525}</div><p class="quiz-label">S\u1EF0 KI\u1EC6N B\u1EA4T NG\u1EDC</p><h2>Ph\u01B0\u1EE3ng ho\u00E0ng t\u00E1i sinh!</h2><p>B\u1EA1n ph\u1EA3i l\u00E0m l\u1EA1i ${wrongQuestions.length} c\u00E2u \u0111\u00E3 sai tr\u01B0\u1EDBc khi ti\u1EBFp t\u1EE5c l\u01B0\u1EE3t ch\u01A1i.</p><button class="next-btn phoenix-start" id="startRebirth" type="button">T\u00E1i sinh ngay \u2192</button></div>`;
  document.getElementById("startRebirth").onclick = beginRandomRebirth;
}
function beginRandomRebirth() {
  if (!rebirthRequired) return;
  clearTransition();
  let misses = [...wrongQuestions];
  resumeRun = {
    run,
    idx: idx + 1,
    score,
    answered,
    correctCount,
    wrongQuestions,
    runMode,
    replacedPoints: misses.reduce(
      (sum, q) => sum + (questionScores.get(q) || 0),
      0,
    ),
  };
  run = shuffled(misses);
  idx = 0;
  score = 0;
  answered = 0;
  correctCount = 0;
  wrongQuestions = [];
  runMode = "retry";
  rebirthRequired = false;
  saveQuizProgress();
  showQuestion();
}
function renderQuestionImage(q, alt) {
  if (!q.image) return "";
  const imageClass = q.imageKind === "wide-table" ? "question-image question-table-image" : "question-image";
  const image = `<img class="${imageClass}" src="${esc(q.image)}" alt="${esc(alt)}" loading="lazy">`;
  return q.imageKind === "wide-table"
    ? `<div class="question-image-scroll" role="region" aria-label="Bảng dữ liệu; có thể cuộn ngang trên màn hình nhỏ" tabindex="0">${image}</div>`
    : image;
}
function showQuestion() {
  if (idx >= run.length) return showResult();
  locked = false;
  let q = run[idx];
  tfSelections = q.type === "tf" ? Array(q.items.length).fill(null) : [];
  if (q.type === "tf" && restoredTfSelections && restoredTfSelections.length === q.items.length) {
    tfSelections = [...restoredTfSelections];
  }
  restoredTfSelections = null;
  let body =
    q.type === "tf"
      ? `<div class="tf-statements">${q.items.map((item, i) => `<div class="tf-row" data-row="${i}"><div class="tf-statement"><span class="tf-index">${i + 1}</span>${esc(item.text)}</div><div class="tf-pick"><button type="button" data-assert="${i}" data-value="0">Đúng</button><button type="button" data-assert="${i}" data-value="1">Sai</button></div></div>`).join("")}</div>`
      : q.type === "short" ? `<div class="short-answer"><input id="shortInput" autocomplete="off" placeholder="Nhập câu trả lời của bạn"><button class="primary" id="submitShort" type="button">Trả lời</button></div>`
      : `<div class="answers">${q.c.map((c, i) => `<button class="answer-choice" data-answer="${i}"><span class="choice-letter">${String.fromCharCode(65 + i)}</span>${renderChoiceContent(c)}</button>`).join("")}</div>`;
  box.innerHTML = `<div class="quiz-top"><span class="quiz-brand">✦ ${currentSubject === "tin" ? "TIN H\u1eccC 12" : currentSubject === "bio" ? "SINH H\u1eccC 12" : "TI\u1ebeNG ANH 12"} <span class="quiz-meta">/ ${runMode === "retry" ? "TÁI SINH" : "ÔN TẬP GK1"}</span></span><span class="quiz-meta">${idx + 1} / ${run.length} <button class="close" id="closeQuiz" aria-label="Đóng">×</button></span></div><div class="progress"><i style="width:${(idx / run.length) * 100}%"></i></div><div class="quiz-settings"><span>Trả lời xong, tự chuyển sau 3 giây.</span></div><div class="quiz-label">${esc(q.t)} · ${q.type === "tf" ? "CHỌN ĐÚNG / SAI CHO CẢ 4 Ý" : q.type === "short" ? "TRẢ LỜI NGẮN" : "TRẮC NGHIỆM"}</div><h2>${esc(q.q)}</h2>${renderQuestionImage(q, "Hình minh họa câu hỏi")}${body}<div class="feedback" id="feedback"></div><div class="quiz-bottom"><span class="score-live">⭐ ${score} điểm</span>${q.type === "tf" ? '<button class="next-btn" id="submitTf" disabled>Nộp cả 4 ý</button>' : '<button class="next-btn" id="nextBtn" style="visibility:hidden">Câu tiếp theo →</button>'}</div>`;
  document.getElementById("closeQuiz").onclick = exitQuiz;
  if (q.type === "tf") {
    document.querySelectorAll("[data-assert]").forEach((button) => {
      if (tfSelections[+button.dataset.assert] === +button.dataset.value) button.classList.add("selected");
    });
    document.getElementById("submitTf").disabled = tfSelections.some((value) => value === null);
  }
  saveQuizProgress();
  if (q.type === "tf") {
    document
      .querySelectorAll("[data-assert]")
      .forEach(
        (el) =>
          (el.onclick = () => selectTf(+el.dataset.assert, +el.dataset.value)),
      );
    document.getElementById("submitTf").onclick = () => submitTf(q);
  } else if (q.type === "short") {
    document.getElementById("submitShort").onclick = () => submitShort(q);
    document.getElementById("shortInput").onkeydown = (event) => { if (event.key === "Enter") submitShort(q); };
  } else {
    document
      .querySelectorAll("[data-answer]")
      .forEach((el) => (el.onclick = () => choose(+el.dataset.answer, q)));
  }
}
function exitQuiz() {
  if (rebirthRequired) return;
  clearTransition();
  stopActiveAudio();
  if (runFinished) clearQuizProgress();
  modal.classList.remove("open");
}
function selectTf(row, value) {
  if (locked) return;
  tfSelections[row] = value;
  document
    .querySelectorAll(`[data-row="${row}"] .tf-pick button`)
    .forEach((b) => b.classList.toggle("selected", +b.dataset.value === value));
  document.getElementById("submitTf").disabled = tfSelections.some(
    (x) => x === null,
  );
  saveQuizProgress();
}
function submitTf(q) {
  if (locked || tfSelections.some((x) => x === null)) return;
  locked = true;
  answered++;
  let correct = 0;
  document.querySelectorAll("[data-row]").forEach((row, i) => {
    let right = q.answers[i],
      chosen = tfSelections[i];
    if (chosen === right) correct++;
    row.classList.add(chosen === right ? "is-correct" : "is-wrong");
    row.querySelectorAll("button").forEach((b) => {
      b.disabled = true;
      if (+b.dataset.value === right) b.classList.add("answer-key");
      if (+b.dataset.value === chosen && chosen !== right)
        b.classList.add("answer-miss");
    });
  });
  playAnswerSound(correct === q.items.length);
  if (correct < q.items.length) wrongQuestions.push(q);
  score += correct * 25;
  questionScores.set(q, correct * 25);
  if (correct === q.items.length) correctCount++;
  document.querySelector(".score-live").textContent = `⭐ ${score} điểm`;
  document.getElementById("feedback").innerHTML =
    `<b>${correct === q.items.length ? "Cả 4 ý đều đúng!" : `Bạn đúng ${correct}/4 ý.`}</b> Mỗi ý đúng được 25 điểm. Đáp án đúng được tô xanh.`;
  if (correct < q.items.length && offerRebirth()) return showMandatoryRebirth();
  let next = document.createElement("button");
  next.className = "next-btn";
  next.textContent = "T\u1ef1 chuy\u1ec3n sau 3 gi\u00e2y";
  next.disabled = true;
  document.getElementById("submitTf").replaceWith(next);
  startTransition(next);
}
function choose(a, q) {
  if (locked) return;
  locked = true;
  answered++;
  let correctAnswers = Array.isArray(q.a) ? q.a : [q.a];
  let ok = correctAnswers.includes(a);
  playAnswerSound(ok);
  if (ok) {
    score += 100;
    correctCount++;
  } else wrongQuestions.push(q);
  questionScores.set(q, ok ? 100 : 0);
  document.querySelectorAll("[data-answer]").forEach((el, i) => {
    el.disabled = true;
    if (correctAnswers.includes(i)) el.classList.add("correct");
    else if (i === a) el.classList.add("wrong");
  });
  document.getElementById("feedback").innerHTML =
    `<b style="color:${ok ? "var(--green)" : "var(--red)"}">${ok ? "Chính xác! +100 điểm" : "Chưa đúng rồi."}</b> ${esc(q.e || "Đáp án đúng: " + correctAnswers.map((i) => q.c[i]).join(" / ") + ".")}`;
  document.querySelector(".score-live").textContent = `⭐ ${score} điểm`;
  if (!ok && offerRebirth()) return showMandatoryRebirth();
  startTransition(document.getElementById("nextBtn"));
}
function submitShort(q) {
  if (locked) return;
  const field = document.getElementById("shortInput");
  const normalize = (value) => currentSubject === "en"
    ? String(value).trim().toLocaleLowerCase("en").replace(/[^a-z0-9]/g, "")
    : String(value).trim().replace(/\s+/g, "").replace(/,/g, ".").toLocaleLowerCase("vi");
  if (!field.value.trim()) { field.focus(); return; }
  locked = true; answered++;
  const ok = (Array.isArray(q.a) ? q.a : [q.a]).some((answer) => normalize(answer) === normalize(field.value));
  playAnswerSound(ok);
  if (ok) { score += 100; correctCount++; } else wrongQuestions.push(q);
  questionScores.set(q, ok ? 100 : 0);
  field.disabled = true;
  document.getElementById("submitShort").disabled = true;
  document.getElementById("feedback").innerHTML = `<b style="color:${ok ? "var(--green)" : "var(--red)"}">${ok ? "Chính xác! +100 điểm" : "Chưa đúng rồi."}</b> Đáp án: ${esc(Array.isArray(q.a) ? q.a.join(" / ") : q.a)}${q.e ? ` · ${esc(q.e)}` : ""}`;
  document.querySelector(".score-live").textContent = `⭐ ${score} điểm`;
  if (!ok && offerRebirth()) return showMandatoryRebirth();
  startTransition(document.getElementById("nextBtn"));
}
function showResult() {
  if (resumeRun) {
    let replayScore = score,
      replayCorrect = correctCount,
      replayMisses = [...wrongQuestions],
      resume = resumeRun;
    resumeRun = null;
    run = resume.run;
    idx = resume.idx;
    score = resume.score - resume.replacedPoints + replayScore;
    answered = resume.answered;
    correctCount = resume.correctCount + replayCorrect;
    wrongQuestions = replayMisses;
    runMode = resume.runMode;
    locked = true;
    pendingAdvance = false;
    saveQuizProgress();
    box.innerHTML = `<div class="result"><div class="trophy">&#10024;</div><div class="quiz-label">T&#193;I SINH HO&#192;N T&#7844;T</div><h2>&#272;&#227; l&#224;m l&#7841;i ${resume.run.length} c&#226;u sai</h2><p>L&#432;&#7907;t t&#225;i sinh: ${replayScore} &#273;i&#7875;m. Ti&#7871;p t&#7909;c l&#432;&#7907;t l&#224;m b&#224;i.</p><button class="next-btn" id="resumeQuiz">Ti&#7871;p t&#7909;c</button></div>`;
    document.getElementById("resumeQuiz").onclick = () => {
      locked = false;
      showQuestion();
    };
    return;
  }
  runFinished = true;
  clearQuizProgress();
  let pct = run.length ? Math.round((score / (run.length * 100)) * 100) : 0,
    wrongCount = run.length - correctCount,
    title =
      pct >= 80
        ? "Xu&#7845;t s&#7855;c!"
        : pct >= 50
          ? "L&#224;m t&#7889;t l&#7855;m!"
          : "C&#7889; g&#7855;ng th&#234;m nh&#233;!",
    studentName = localStorage.getItem("tin12-student-name") || "Guest",
    studentId = localStorage.getItem("tin12-student-id") || "?";
  let history = JSON.parse(localStorage.getItem(courseStore("history")) || "[]");
  history.unshift({
    score,
    pct,
    n: run.length,
    date: new Date().toLocaleDateString("vi-VN"),
  });
  history = history.slice(0, 5);
  localStorage.setItem(courseStore("history"), JSON.stringify(history));
  document.getElementById("bestStat").textContent =
    Math.max(...history.map((h) => h.pct)) + "%";
  if (runMode === "normal" && run.length === allQuestions.length) {
    saveLeaderboard(pct);
    localStorage.setItem(courseStore("rank-unlocked"), "true");
    localStorage.setItem(courseStore("answer-key-unlocked"), "true");
    updateRankingAccess();
    showProfile();
  }
  renderHistory();
  box.innerHTML = `<div class="result-page"><div class="result"><div class="trophy">${pct >= 80 ? "&#127942;" : pct >= 50 ? "&#127881;" : "&#128170;"}</div><div class="quiz-label">&#272;&#195; N&#7896;P B&#192;I</div><h2>${title}</h2><div class="result-score">${score}</div><p><b>H&#7885; t&#234;n:</b> ${esc(studentName)}<br><b>ID:</b> ${esc(studentId)}<br><b>&#272;i&#7875;m s&#7889;:</b> ${score}<br><b>&#272;&#250;ng:</b> ${correctCount} &nbsp; <b>Sai:</b> ${wrongCount}<br><b>T&#7881; l&#7879; &#273;&#250;ng:</b> ${pct}% (${correctCount}/${run.length})</p><div class="result-actions"><button class="secondary" id="resultClose">&#272;&#243;ng</button><button class="next-btn" id="resultAgain">L&#224;m l&#7841;i</button></div></div><section class="result-review"><h2>&#272;&#225;p &#225;n &#273;&#7847;y &#273;&#7911; (${run.length} c&#226;u)</h2><div id="resultAnswers" class="answer-review"></div></section></div>`;
  renderAllAnswers("resultAnswers", run);
  document.getElementById("resultClose").onclick = () => exitQuiz();
  document.getElementById("resultAgain").onclick = () => startQuiz(run.length);
}
function renderAllAnswers(targetId, questions = allQuestions) {
  let el = document.getElementById(targetId);
  if (!el) return;
  if (currentSubject === "en") {
    el.innerHTML = questions.map((q, i) => {
      const english = q.type === "short" ? (Array.isArray(q.a) ? q.a[0] : q.a) : q.c[q.a];
      const answerKey = String(english).replace(/[.!?]+$/, "");
      const meanings = window.EN_ANSWER_VI || {};
      const vietnamese = meanings[english] || meanings[answerKey] || meanings[answerKey.toLocaleLowerCase("en")] || "ch\u01b0a c\u00f3 ngh\u0129a ti\u1ebfng Vi\u1ec7t";
      return `<article class="review-item"><h3>Câu ${i + 1} · ${esc(q.t)}</h3><p class="english-original"><b>Question:</b> ${esc(q.q)}</p><p class="english-translation"><b>Nghĩa:</b> ${esc(q.tv || "")}</p><p class="review-correct"><b>Answer:</b> ${esc(english)} <span>(${esc(vietnamese)})</span></p></article>`;
    }).join("");
    return;
  }
  el.innerHTML = questions
    .map(
      (q, i) =>
        `<article class="review-item"><h3>C&#226;u ${i + 1} &#183; ${esc(q.t)}</h3><p>${esc(q.q)}</p>${renderQuestionImage(q, "Hình minh họa câu hỏi")}${q.type === "tf" ? `<ol>${q.items.map((item, j) => `<li>${esc(item.text)} <strong>${q.answers[j] === 0 ? "&#272;&#250;ng" : "Sai"}</strong></li>`).join("")}</ol>` : q.type === "short" ? `<p class="review-correct"><b>Đáp án:</b> ${esc(Array.isArray(q.a) ? q.a.join(" / ") : q.a)}</p>` : `<ol type="A">${q.c.map((choice, j) => { const right = (Array.isArray(q.a) ? q.a : [q.a]).includes(j); return `<li class="${right ? "review-correct" : ""}">${renderChoiceContent(choice)} ${right ? "<strong>← Đáp án</strong>" : ""}</li>`; }).join("")}</ol>`}</article>`,
    )
    .join("");
}
document.getElementById("launchQuizButton").onclick = () =>
  startQuiz(allQuestions.length);
document.getElementById("resetQuiz").onclick = () => {
  if (!localStorage.getItem(courseStore("quiz-progress"))) return;
  clearQuizProgress();
  startQuiz(allQuestions.length);
};
document.getElementById("fullQuiz").onclick = () =>
  startQuiz(allQuestions.length);
modal.onclick = (e) => {
  if (e.target === modal) exitQuiz();
};
const firebaseConfig = window.FIREBASE_CONFIG || {};
let firebaseApp = null, firebaseAuth = null, firebaseDatabase = null;
const firebaseReady = Boolean(window.firebase && firebaseConfig.apiKey && firebaseConfig.databaseURL);
if (firebaseReady) {
  firebaseApp = firebase.initializeApp({
    ...firebaseConfig,
    authDomain: firebaseConfig.authDomain || "lop-hoc-so-12.firebaseapp.com",
    projectId: firebaseConfig.projectId || "lop-hoc-so-12",
  });
  firebaseAuth = firebase.auth();
  firebaseDatabase = firebase.database();
  firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(() => {});
}
let currentAuthUser = null, activeProfile = null, authMode = "register", authBusy = false, isAdminAccount = false;
const profileModal = document.getElementById("profileModal");
const nameInput = document.getElementById("nameInput");
const classInput = document.getElementById("classInput");
const idInput = document.getElementById("idInput");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const authError = document.getElementById("authError");
function isAdmin() { return Boolean(currentAuthUser && isAdminAccount); }
function canViewAnswers() {
  return isAdmin() || localStorage.getItem(courseStore("answer-key-unlocked")) === "true";
}
function setAuthMessage(message) {
  authError.textContent = message || "";
  document.getElementById("authRetry").hidden = !message;
}
function showAuthMode(mode) {
  if (authMode === "complete") return;
  authMode = mode;
  document.getElementById("authForms").hidden = false;
  document.getElementById("accountView").hidden = true;
  document.getElementById("registerForm").hidden = mode !== "register";
  document.getElementById("loginForm").hidden = mode !== "login";
  registerEmail.readOnly = false;
  registerPassword.required = true;
  registerPassword.closest(".password-field").hidden = false;
  document.querySelector('label[for="registerPassword"]').hidden = false;
  document.querySelector('label[for="registerEmail"]').textContent = "Email";
  document.querySelectorAll("[data-auth-view]").forEach((button) => {
    button.hidden = false;
    button.classList.toggle("active", button.dataset.authView === mode);
  });
  document.querySelector('#registerForm button[type="submit"]').textContent = "T\u1ea1o t\u00e0i kho\u1ea3n";
  document.getElementById("changeAuthAccount").hidden = true;
  document.getElementById("profileClose").hidden = !activeProfile;
  setAuthMessage("");
}
function showProfile() {
  const savedName = localStorage.getItem("tin12-student-name") || "";
  const savedId = localStorage.getItem("tin12-student-id") || "";
  document.getElementById("profileLabel").textContent = activeProfile
    ? `${savedName} \u00b7 ${savedId}`
    : "\u0110\u0103ng nh\u1eadp";
  if (savedName) document.getElementById("welcomeTag").textContent = `Ch\u00e0o, ${savedName}!`;
  document.getElementById("answersNav").hidden = !canViewAnswers();
  document.getElementById("adminUsersNav").hidden = !isAdmin();
  document.getElementById("adminNavGroup").hidden = !isAdmin();
  document.getElementById("clearRanking").hidden = !isAdmin();
  document.getElementById("accountEmail").textContent = currentAuthUser?.email || "";
  document.getElementById("accountDetails").textContent = activeProfile
    ? `${activeProfile.name} \u00b7 ${activeProfile.className} \u00b7 ID ${activeProfile.studentId}`
    : "";
  document.getElementById("adminUpgradeForm").hidden = !activeProfile || isAdmin();
  document.getElementById("adminUpgradeBadge").hidden = !isAdmin();
  document.getElementById("authForms").hidden = Boolean(activeProfile);
  document.getElementById("accountView").hidden = !activeProfile;
  document.getElementById("profileClose").hidden = !activeProfile;
  if (currentPage === "answers" && !canViewAnswers()) switchPage("home", false);
}
function openProfile() {
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
  if (activeProfile) showProfile();
  else {
    document.getElementById("authForms").hidden = false;
    document.getElementById("accountView").hidden = true;
    document.getElementById("profileClose").hidden = true;
    (authMode === "complete" ? nameInput : authMode === "login" ? document.getElementById("loginEmail") : nameInput).focus();
  }
}
function closeProfile() {
  if (!activeProfile) return;
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
}
function forceProfileModal() {
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
  document.getElementById("authForms").hidden = false;
  document.getElementById("accountView").hidden = true;
  document.getElementById("profileClose").hidden = true;
}
function setRegisterFormMode(mode, user = null) {
  authMode = mode;
  document.getElementById("authForms").hidden = false;
  document.getElementById("accountView").hidden = true;
  document.getElementById("registerForm").hidden = false;
  document.getElementById("loginForm").hidden = true;
  document.querySelectorAll("[data-auth-view]").forEach((button) => { button.hidden = true; });
  document.getElementById("profileClose").hidden = true;
  document.querySelector("#registerForm .auth-intro").textContent = mode === "complete"
    ? "T\u00e0i kho\u1ea3n \u0111\u00e3 \u0111\u0103ng nh\u1eadp. Ho\u00e0n t\u1ea5t h\u1ed3 s\u01a1 \u0111\u1ec3 v\u00e0o l\u1edbp h\u1ecdc."
    : "T\u1ea1o t\u00e0i kho\u1ea3n \u0111\u1ec3 l\u01b0u h\u1ed3 s\u01a1 v\u00e0 ti\u1ebfp t\u1ee5c b\u00e0i l\u00e0m tr\u00ean thi\u1ebft b\u1ecb n\u00e0y.";
  const emailLabel = document.querySelector('label[for="registerEmail"]');
  registerEmail.value = user?.email || "";
  registerEmail.readOnly = mode === "complete";
  registerPassword.required = mode !== "complete";
  registerPassword.closest(".password-field").hidden = mode === "complete";
  document.querySelector('label[for="registerPassword"]').hidden = mode === "complete";
  emailLabel.textContent = mode === "complete" ? "Email t\u00e0i kho\u1ea3n" : "Email";
  document.querySelector('#registerForm button[type="submit"]').textContent = mode === "complete" ? "Ho\u00e0n t\u1ea5t h\u1ed3 s\u01a1" : "T\u1ea1o t\u00e0i kho\u1ea3n";
  document.getElementById("changeAuthAccount").hidden = mode !== "complete";
  setAuthMessage("");
}
function normalizeStudentId(value) {
  const digits = String(value || "").trim();
  if (!/^\d{1,4}$/.test(digits)) throw new Error("ID ph\u1ea3i l\u00e0 s\u1ed1 t\u1eeb 0001 \u0111\u1ebfn 1000.");
  const number = Number(digits);
  if (number < 1 || number > 1000) throw new Error("ID ch\u1ec9 n\u1eb1m trong d\u1ea3i 0001\u20131000.");
  return String(number).padStart(4, "0");
}
async function saveAccountProfile(user, fields) {
  const studentId = normalizeStudentId(fields.studentId);
  const profile = {
    name: fields.name.trim().slice(0, 60),
    className: fields.className.trim().slice(0, 20),
    studentId,
    idSystem: "pool-1000-v1",
    email: user.email || fields.email.trim(),
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    updatedAt: firebase.database.ServerValue.TIMESTAMP,
  };
  if (!profile.name || !profile.className || !profile.studentId) throw new Error("Vui l\u00f2ng nh\u1eadp \u0111\u1ee7 h\u1ecd t\u00ean, l\u1edbp v\u00e0 ID.");
  const claimRef = firebaseDatabase.ref(`studentIdClaimsV2/${studentId}`);
  const claim = await claimRef.transaction((current) => current == null || current === user.uid ? user.uid : undefined);
  if (!claim.committed || claim.snapshot.val() !== user.uid) throw new Error("ID n\u00e0y \u0111\u00e3 c\u00f3 t\u00e0i kho\u1ea3n kh\u00e1c. H\u00e3y ch\u1ecdn ID kh\u00e1c trong d\u1ea3i 0001\u20131000.");
  try {
    await firebaseDatabase.ref(`users/${user.uid}`).set(profile);
  } catch (error) {
    try { await claimRef.transaction((current) => current === user.uid ? null : undefined); } catch {}
    throw error;
  }
  acceptAccountProfile(user, profile);
}
function acceptAccountProfile(user, profile) {
  currentAuthUser = user;
  activeUid = user.uid;
  activeProfile = profile;
  localStorage.setItem("tin12-student-name", profile.name);
  localStorage.setItem("tin12-student-id", profile.studentId);
  localStorage.setItem("tin12-student-class", profile.className);
  showProfile();
  closeProfile();
  activateSubject(currentSubject, false);
}
function friendlyAuthError(error) {
  const code = error?.code || "";
  const messages = {
    "auth/email-already-in-use": "Email n\u00e0y \u0111\u00e3 c\u00f3 t\u00e0i kho\u1ea3n. H\u00e3y \u0111\u0103ng nh\u1eadp.",
    "auth/invalid-email": "Email ch\u01b0a \u0111\u00fang \u0111\u1ecbnh d\u1ea1ng.",
    "auth/weak-password": "M\u1eadt kh\u1ea9u c\u1ea7n \u00edt nh\u1ea5t 6 k\u00fd t\u1ef1.",
    "auth/invalid-credential": "Email ho\u1eb7c m\u1eadt kh\u1ea9u ch\u01b0a \u0111\u00fang.",
    "auth/user-not-found": "Ch\u01b0a c\u00f3 t\u00e0i kho\u1ea3n v\u1edbi email n\u00e0y.",
    "auth/wrong-password": "M\u1eadt kh\u1ea9u ch\u01b0a \u0111\u00fang.",
    "auth/network-request-failed": "Kh\u00f4ng k\u1ebft n\u1ed1i \u0111\u01b0\u1ee3c Firebase. Ki\u1ec3m tra m\u1ea1ng r\u1ed3i th\u1eed l\u1ea1i.",
    "PERMISSION_DENIED": "Firebase t\u1eeb ch\u1ed1i l\u01b0u h\u1ed3 s\u01a1. H\u00e3y c\u1eadp nh\u1eadt Realtime Database Rules theo file FIREBASE_RULES.json.",
  };
  if (code === "PERMISSION_DENIED" || /permission_denied/i.test(error?.message || "")) return messages.PERMISSION_DENIED;
  return messages[code] || error?.message || "C\u00f3 l\u1ed7i x\u1ea3y ra. H\u00e3y th\u1eed l\u1ea1i.";
}
function setAuthBusy(busy) {
  authBusy = busy;
  document.querySelectorAll(".auth-submit").forEach((item) => item.disabled = busy);
}
document.getElementById("nameTrigger").onclick = openProfile;
document.getElementById("profileClose").onclick = closeProfile;
document.getElementById("authRetry").onclick = () => {
  setAuthMessage("");
  const target = authMode === "login" ? document.getElementById("loginPassword") : idInput;
  target.focus();
};
document.querySelectorAll("[data-password-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordToggle);
    const showing = input.type === "password";
    input.type = showing ? "text" : "password";
    button.textContent = showing ? "Ẩn" : "Hiện";
    button.setAttribute("aria-pressed", String(showing));
    button.setAttribute("aria-label", showing ? "Ẩn mật khẩu" : "Hiện mật khẩu");
    input.focus();
  });
});
document.querySelectorAll("[data-auth-view]").forEach((button) => button.addEventListener("click", () => showAuthMode(button.dataset.authView)));
profileModal.onclick = (event) => { if (event.target === profileModal) closeProfile(); };
document.getElementById("registerForm").onsubmit = async (event) => {
  event.preventDefault(); if (authBusy || !firebaseReady) return setAuthMessage("Firebase ch\u01b0a t\u1ea3i \u0111\u01b0\u1ee3c. H\u00e3y k\u1ebft n\u1ed1i m\u1ea1ng v\u00e0 t\u1ea3i l\u1ea1i trang.");
  setAuthBusy(true); setAuthMessage("");
  const fields = { name: nameInput.value.trim(), className: classInput.value.trim(), studentId: idInput.value.trim(), email: registerEmail.value.trim() };
  let createdUser = null;
  try {
    let user = currentAuthUser;
    if (authMode !== "complete") {
      fields.studentId = normalizeStudentId(fields.studentId);
      const credential = await firebaseAuth.createUserWithEmailAndPassword(fields.email, registerPassword.value);
      user = credential.user; createdUser = user; currentAuthUser = user; activeUid = user.uid;
    }
    await saveAccountProfile(user, fields);
  } catch (error) {
    const message = friendlyAuthError(error);
    if (createdUser && !activeProfile) {
      try { await createdUser.delete(); await firebaseAuth.signOut(); currentAuthUser = null; activeUid = ""; }
      catch { setAuthMessage(message + " T\u00e0i kho\u1ea3n Firebase v\u1eeba t\u1ea1o ch\u01b0a t\u1ef1 x\u00f3a \u0111\u01b0\u1ee3c; h\u00e3y \u0111\u0103ng nh\u1eadp l\u1ea1i \u0111\u1ec3 ho\u00e0n t\u1ea5t h\u1ed3 s\u01a1."); }
    }
    setAuthMessage(message);
  } finally { setAuthBusy(false); }
};
document.getElementById("loginForm").onsubmit = async (event) => {
  event.preventDefault();
  if (authBusy) return;
  if (!firebaseReady) return setAuthMessage("Firebase ch\u01b0a s\u1eb5n s\u00e0ng. Ki\u1ec3m tra k\u1ebft n\u1ed1i m\u1ea1ng v\u00e0 t\u1ea3i l\u1ea1i trang.");
  const submit = document.querySelector("#loginForm button[type=\"submit\"]");
  const originalLabel = submit.textContent;
  setAuthBusy(true); submit.textContent = "\u0110ang \u0111\u0103ng nh\u1eadp..."; setAuthMessage("\u0110ang ki\u1ec3m tra t\u00e0i kho\u1ea3n...");
  try {
    await firebaseAuth.signInWithEmailAndPassword(document.getElementById("loginEmail").value.trim(), document.getElementById("loginPassword").value);
    setAuthMessage("\u0110\u0103ng nh\u1eadp th\u00e0nh c\u00f4ng. \u0110ang m\u1edf h\u1ed3 s\u01a1...");
  } catch (error) { setAuthMessage(friendlyAuthError(error)); }
  finally { setAuthBusy(false); submit.textContent = originalLabel; }
};
document.getElementById("logoutButton").onclick = async () => { if (!authBusy) await firebaseAuth.signOut(); };
document.getElementById("changeAuthAccount").onclick = async () => {
  if (authBusy || !firebaseAuth) return;
  await firebaseAuth.signOut();
  showAuthMode("register");
};
document.getElementById("adminUpgradeForm").onsubmit = async (event) => {
  event.preventDefault();
  if (!currentAuthUser || !activeProfile || !firebaseReady || isAdmin()) return;
  const button = document.getElementById("adminUpgradeButton");
  const status = document.getElementById("adminUpgradeStatus");
  const code = document.getElementById("promotionCode").value.trim();
  button.disabled = true;
  status.textContent = "";
  try {
    const uid = currentAuthUser.uid;
    const request = firebaseDatabase.ref(`promotionRequests/${uid}`);
    await request.set(code);
    await firebaseDatabase.ref(`adminClaims/${uid}`).set(true);
    isAdminAccount = true;
    try { await request.remove(); } catch {}
    document.getElementById("promotionCode").value = "";
    status.textContent = "M\u00e3 h\u1ee3p l\u1ec7. T\u00e0i kho\u1ea3n \u0111\u00e3 \u0111\u01b0\u1ee3c th\u0103ng c\u1ea5p.";
    showProfile();
  } catch (error) {
    status.textContent = error?.code === "PERMISSION_DENIED" || /permission_denied/i.test(error?.message || "")
      ? "M\u00e3 kh\u00f4ng \u0111\u00fang, ho\u1eb7c Firebase ch\u01b0a \u0111\u01b0\u1ee3c c\u1ea5u h\u00ecnh m\u00e3 th\u0103ng c\u1ea5p trong Rules/Data."
      : "Ch\u01b0a th\u1ec3 th\u0103ng c\u1ea5p l\u00fac n\u00e0y. H\u00e3y th\u1eed l\u1ea1i sau.";
  } finally { button.disabled = false; }
};
if (firebaseReady) {
  firebaseAuth.onAuthStateChanged(async (user) => {
    currentAuthUser = user;
    if (!user) {
      activeUid = ""; activeProfile = null; isAdminAccount = false; authMode = "register";
      ["tin12-student-name", "tin12-student-id", "tin12-student-class"].forEach((key) => localStorage.removeItem(key));
      showAuthMode("register"); showProfile(); forceProfileModal(); refreshLeaderboard(); return;
    }
    activeUid = user.uid;
    try {
      const adminSnapshot = await firebaseDatabase.ref(`adminClaims/${user.uid}`).once("value");
      isAdminAccount = adminSnapshot.val() === true;
      const snapshot = await firebaseDatabase.ref(`users/${user.uid}`).once("value");
      const profile = snapshot.val();
      if (profile?.name && profile?.className && profile?.studentId && profile?.idSystem === "pool-1000-v1") {
        acceptAccountProfile(user, profile);
        showProfile();
        if (currentPage === "ranking") refreshLeaderboard();
  } else {
        activeProfile = null;
        nameInput.value = profile?.name || ""; classInput.value = profile?.className || ""; idInput.value = profile?.studentId || "";
        setRegisterFormMode("complete", user); forceProfileModal();
        if (profile?.studentId && profile?.idSystem !== "pool-1000-v1") setAuthMessage("H\u1ec7 th\u1ed1ng ID \u0111\u00e3 \u0111\u01b0\u1ee3c c\u1ea5p l\u1ea1i. Ch\u1ecdn ID m\u1edbi t\u1eeb 0001 \u0111\u1ebfn 1000 \u0111\u1ec3 ti\u1ebfp t\u1ee5c.");
      }
    } catch (error) { activeProfile = null; forceProfileModal(); setAuthMessage(friendlyAuthError(error)); }
  });
} else {
  forceProfileModal();
  setAuthMessage("Firebase SDK ch\u01b0a t\u1ea3i \u0111\u01b0\u1ee3c. Ki\u1ec3m tra k\u1ebft n\u1ed1i Internet r\u1ed3i t\u1ea3i l\u1ea1i trang.");
}

function escapeAdminCell(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
async function loadRegisteredUsers() {
  const status = document.getElementById("adminUsersStatus");
  const body = document.getElementById("adminUsersBody");
  const empty = document.getElementById("adminUsersEmpty");
  if (!isAdmin()) { status.textContent = "Ch\u1ec9 qu\u1ea3n tr\u1ecb vi\u00ean m\u1edbi xem danh s\u00e1ch."; return; }
  status.textContent = "\u0110ang t\u1ea3i danh s\u00e1ch t\u00e0i kho\u1ea3n…";
  try {
    const snapshot = await firebaseDatabase.ref("users").once("value");
    const users = Object.entries(snapshot.val() || {}).map(([uid, profile]) => ({ uid, ...profile }))
      .sort((a, b) => String(a.studentId).localeCompare(String(b.studentId)));
    body.innerHTML = users.map((profile) => {
      const createdAt = Number(profile.createdAt || profile.updatedAt);
      const date = Number.isFinite(createdAt) && createdAt > 0 ? new Date(createdAt).toLocaleString("vi-VN") : "—";
      return `<tr><td>${escapeAdminCell(profile.studentId)}</td><td>${escapeAdminCell(profile.name)}</td><td>${escapeAdminCell(profile.className)}</td><td>${escapeAdminCell(profile.email)}</td><td class="admin-uid">${escapeAdminCell(profile.uid)}</td><td>${escapeAdminCell(date)}</td><td><button type="button" class="secondary admin-reset-password" data-reset-email="${escapeAdminCell(profile.email)}">G\u1eedi link</button></td></tr>`;
    }).join("");
    empty.hidden = users.length > 0;
    status.textContent = `T\u1ed5ng c\u1ed9ng ${users.length} t\u00e0i kho\u1ea3n \u0111\u00e3 \u0111\u0103ng k\u00fd.`;
  } catch (error) {
    status.textContent = friendlyAuthError(error);
  }
}
document.getElementById("refreshUsers").onclick = loadRegisteredUsers;
document.getElementById("adminUsersBody").addEventListener("click", async (event) => {
  const button = event.target.closest("[data-reset-email]");
  if (!button || !isAdmin() || !firebaseAuth) return;
  const email = button.dataset.resetEmail;
  if (!email || !confirm(`Gửi email đặt lại mật khẩu tới ${email}?`)) return;
  button.disabled = true;
  const status = document.getElementById("adminUsersStatus");
  status.textContent = `Đang gửi liên kết đặt lại mật khẩu tới ${email}...`;
  try {
    await firebaseAuth.sendPasswordResetEmail(email);
    status.textContent = `Đã gửi email đặt lại mật khẩu tới ${email}.`;
  } catch (error) { status.textContent = friendlyAuthError(error); }
  finally { button.disabled = false; }
});
document.onkeydown = (event) => {
  if (event.key === "Escape") {
    if (rebirthRequired) { event.preventDefault(); return; }
    exitQuiz(); closeProfile();
  }
};
function readLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(courseStore("leaderboard-full")) || "[]");
  } catch {
    return [];
  }
}
const leaderboardStatus = document.getElementById("leaderboardStatus");
function setLeaderboardStatus(message) { if (leaderboardStatus) leaderboardStatus.textContent = message; }
function leaderboardUrl(path = "") { return `${firebaseConfig.databaseURL.replace(/\/$/, "")}/leaderboard${path}.json`; }
async function fetchSharedLeaderboard() {
  if (!firebaseReady || !currentAuthUser || !activeProfile) return readLeaderboard();
  const token = await currentAuthUser.getIdToken();
  const response = await fetch(`${leaderboardUrl()}?auth=${encodeURIComponent(token)}`, { cache: "no-store" });
  if (!response.ok) throw new Error("read failed");
  const data = await response.json();
  const rootRows = data && typeof data === "object" ? Object.values(data) : [];
  const legacyRows = rootRows.filter((row) => row && typeof row === "object" && row.subject === currentSubject);
  const courseRows = data && data[currentSubject] && typeof data[currentSubject] === "object" ? Object.values(data[currentSubject]) : [];
  const rows = [...legacyRows, ...courseRows];
  localStorage.setItem(courseStore("leaderboard-full"), JSON.stringify(rows));
  return rows;
}
function renderLeaderboard(rows = readLeaderboard()) {
  let board = rows.filter((row) => (row.subject || "tin") === currentSubject).sort(
    (a, b) => b.score - a.score || b.pct - a.pct,
  );
  let body = document.getElementById("leaderboardBody"),
    empty = document.getElementById("leaderboardEmpty");
  if (!body) return;
  empty.style.display = board.length ? "none" : "block";
  body.innerHTML = board
    .map(
      (row, i) =>
        `<tr><td>${i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td><td>${esc(row.name)}</td><td>${esc(row.id || "?")}</td><td><strong>${row.score}</strong> điểm</td><td>${row.pct}%</td><td>${esc(row.date)}</td></tr>`,
    )
    .join("");
}
async function saveLeaderboard(pct) {
  let name =
      (localStorage.getItem("tin12-student-name") || "Kh?ch").trim() || "Kh?ch",
    board = readLeaderboard(),
    id = localStorage.getItem("tin12-student-id") || "?",
    key = currentSubject + "|" + name.toLocaleLowerCase("vi") + "|" + id.toLocaleLowerCase("vi"),
    i = board.findIndex(
      (row) =>
        row.name.toLocaleLowerCase("vi") +
          "|" +
          (row.id || "?").toLocaleLowerCase("vi") ===
        key,
    ),
    entry = {
      uid: activeUid,
      name,
      id,
      subject: currentSubject,
      score,
      pct,
      n: run.length,
      date: new Date().toLocaleDateString("vi-VN"),
    };
  if (i < 0) board.push(entry);
  else if (
    score > board[i].score ||
    (score === board[i].score && pct > board[i].pct)
  )
    board[i] = entry;
  board.sort((a, b) => b.score - a.score || b.pct - a.pct);
  localStorage.setItem(courseStore("leaderboard-full"), JSON.stringify(board));
  renderLeaderboard();
  if (!firebaseReady || !currentAuthUser || !activeProfile) {
    setLeaderboardStatus("\u0110\u0103ng nh\u1eadp \u0111\u1ec3 l\u01b0u \u0111i\u1ec3m v\u00e0o b\u1ea3ng chung.");
    return;
  }
  try {
    const path = `/${currentSubject}/${activeUid}`;
    const token = await currentAuthUser.getIdToken();
    const url = `${leaderboardUrl(path)}?auth=${encodeURIComponent(token)}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("read failed");
    const previous = await response.json();
    if (!previous || score > previous.score || (score === previous.score && pct > previous.pct)) {
      const write = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(entry) });
      if (!write.ok) throw new Error("write failed");
    }
    await refreshLeaderboard();
  } catch {
    setLeaderboardStatus("Kh\u00f4ng th\u1ec3 c\u1eadp nh\u1eadt b\u1ea3ng chung. Ki\u1ec3m tra c\u1ea5u h\u00ecnh v\u00e0 quy\u1ec1n Firebase.");
  }
}
async function refreshLeaderboard() {
  if (!currentAuthUser || !activeProfile) { renderLeaderboard(readLeaderboard()); return; }
  try {
    const rows = await fetchSharedLeaderboard();
    renderLeaderboard(rows);
    setLeaderboardStatus(firebaseReady ? "B\u1ea3ng x\u1ebfp h\u1ea1ng chung \u0111\u00e3 k\u1ebft n\u1ed1i." : "B\u1ea3ng hi\u1ec7n l\u01b0u tr\u00ean thi\u1ebft b\u1ecb n\u00e0y; c\u1ea7n c\u1ea5u h\u00ecnh Firebase \u0111\u1ec3 chia s\u1ebb cho m\u1ecdi ng\u01b0\u1eddi.");
  } catch {
    renderLeaderboard();
    setLeaderboardStatus("Kh\u00f4ng t\u1ea3i \u0111\u01b0\u1ee3c b\u1ea3ng chung; hi\u1ec3n th\u1ecb d\u1eef li\u1ec7u tr\u00ean thi\u1ebft b\u1ecb n\u00e0y.");
  }
}
document.getElementById("clearRanking").onclick = () => {
  if (!isAdmin() || !confirm("Xoa bang xep hang chung?")) return;
  if (!firebaseReady) {
    localStorage.removeItem(courseStore("leaderboard-full"));
    renderLeaderboard();
    setLeaderboardStatus("Firebase chua duoc cau hinh; chi xoa du lieu tren thiet bi nay.");
    return;
  }
  const modal = document.getElementById("adminAuthModal");
  modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
  document.getElementById("adminEmail").focus();
};
document.getElementById("adminAuthClose").onclick = () => {
  const modal = document.getElementById("adminAuthModal");
  modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true");
  document.getElementById("adminAuthForm").reset();
};
document.getElementById("adminAuthForm").onsubmit = async (event) => {
  event.preventDefault();
  const error = document.getElementById("adminAuthError");
  const submit = document.getElementById("adminAuthSubmit");
  error.textContent = ""; submit.disabled = true;
  try {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(firebaseConfig.apiKey)}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: document.getElementById("adminEmail").value.trim(), password: document.getElementById("adminPassword").value, returnSecureToken: true }),
    });
    const auth = await response.json();
    if (!response.ok) throw new Error("Dang nhap that bai. Kiem tra tai khoan Firebase.");
    const deleted = await fetch(`${leaderboardUrl()}?auth=${encodeURIComponent(auth.idToken)}`, { method: "DELETE" });
    if (!deleted.ok) throw new Error("Tai khoan khong co quyen xoa. Kiem tra UID trong Firebase Rules.");
    localStorage.removeItem(courseStore("leaderboard-full"));
    document.getElementById("adminAuthClose").click();
    await refreshLeaderboard();
  } catch (err) { error.textContent = err.message; }
  finally { submit.disabled = false; }
};
function renderHistory() {
  let h = JSON.parse(localStorage.getItem(courseStore("history")) || "[]"),
    el = document.getElementById("historyList");
  document.getElementById("historyText").textContent = h.length
    ? "Các lượt chơi gần nhất được lưu trên trình duyệt này."
    : "Chưa có lượt chơi nào. Hoàn thành quiz đầu tiên để ghi lại thành tích.";
  el.innerHTML = "";
  if (h.length) {
    el.innerHTML = h
      .map(
        (x) =>
          `<div class="topic-foot"><span>${x.date} · ${x.n} câu</span><b>${x.pct}% · ${x.score} điểm</b></div>`,
      )
      .join("");
  }
}
activateSubject(currentSubject, Boolean(storedSubject));
window.setInterval(() => {
  if (currentPage === "ranking" && firebaseReady) refreshLeaderboard();
}, 10000);
showProfile();
updateRankingAccess();
history.replaceState({ web3Page: currentPage, web3Index: 0 }, "");
switchPage(currentPage, false);
