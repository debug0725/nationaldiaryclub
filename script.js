
(() => {
  "use strict";

  const SAVE_KEY = "national-diary-association-save-v2";

  const defaultState = {
    investigation: 0,
    danger: 1,
    recovery: 12,
    affection: { hogeng: 0, gamja: 0, lazy: 0 },
    flags: [],
    foundCharacters: [],
    foundRules: [],
    endings: [],
    archive: [
      { from:"SYSTEM", title:"신규 조사자 등록", body:"전국 일기 협회 조사 단말기에 접속했습니다." },
      { from:"UNKNOWN", title:"발신자 미상", body:"수칙은 한 장이 아닙니다. 세 사람도 한곳에 있지 않습니다." }
    ]
  };

  let state = loadState();
  let currentCaseId = null;
  let currentSceneId = null;

  const $ = (id) => document.getElementById(id);

  function cloneDefaultState() {
    return JSON.parse(JSON.stringify(defaultState));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return cloneDefaultState();
      const parsed = JSON.parse(raw);
      return normalizeState(parsed);
    } catch (error) {
      console.warn("저장 데이터 복구 실패:", error);
      return cloneDefaultState();
    }
  }

  function normalizeState(value) {
    const safe = cloneDefaultState();
    if (!value || typeof value !== "object") return safe;
    safe.investigation = Number.isFinite(value.investigation) ? value.investigation : 0;
    safe.danger = Number.isFinite(value.danger) ? value.danger : 1;
    safe.recovery = Number.isFinite(value.recovery) ? value.recovery : 12;
    safe.affection = {
      hogeng: Number(value.affection?.hogeng) || 0,
      gamja: Number(value.affection?.gamja) || 0,
      lazy: Number(value.affection?.lazy) || 0
    };
    safe.flags = Array.isArray(value.flags) ? value.flags : [];
    safe.foundCharacters = Array.isArray(value.foundCharacters) ? value.foundCharacters : [];
    safe.foundRules = Array.isArray(value.foundRules) ? value.foundRules : [];
    safe.endings = Array.isArray(value.endings) ? value.endings : [];
    safe.archive = Array.isArray(value.archive) ? value.archive : safe.archive;
    return safe;
  }

  function saveState() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function addUnique(array, value) {
    if (value && !array.includes(value)) array.push(value);
  }

  function applyEffects(effects = {}) {
    state.investigation += Number(effects.investigation) || 0;
    state.danger = Math.max(0, state.danger + (Number(effects.danger) || 0));
    state.recovery = Math.min(100, state.recovery + (Number(effects.recovery) || 0));
    state.affection.hogeng += Number(effects.hogeng) || 0;
    state.affection.gamja += Number(effects.gamja) || 0;
    state.affection.lazy += Number(effects.lazy) || 0;
  }

  function setView(name) {
    document.querySelectorAll(".view").forEach((view) => view.classList.add("hidden"));
    $("caseDetailView").classList.add("hidden");
    $(`${name}View`).classList.remove("hidden");
    document.querySelectorAll(".nav-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === name);
    });
    renderAll();
  }

  function renderCases() {
    const caseCards = Object.entries(GAME_DATA.cases).map(([id, item]) => `
      <button class="case-button" type="button" data-case-id="${id}">
        <div class="card-header">
          <strong>${item.code}</strong>
          <span class="muted">열람 가능</span>
        </div>
        <p>${item.title}</p>
        <p class="muted">${item.summary}</p>
      </button>
    `).join("");

    const finalUnlocked = state.foundRules.length === GAME_DATA.rules.length;
    const finalCard = `
      <div class="content-card ${finalUnlocked ? "" : "locked"}">
        <div class="card-header">
          <strong>NDA-EXIT</strong>
          <span class="muted">수칙 ${state.foundRules.length}/${GAME_DATA.rules.length}</span>
        </div>
        <p>세 사람의 귀환 기록</p>
        <p class="muted">수칙서 아홉 장을 모으면 최종 구조 작전을 실행할 수 있습니다.</p>
        ${finalUnlocked ? '<button id="finalMissionButton" class="secondary-button" type="button">최종 구조 작전 실행</button>' : ""}
      </div>
    `;

    $("caseList").innerHTML = caseCards + finalCard;

    document.querySelectorAll("[data-case-id]").forEach((button) => {
      button.addEventListener("click", () => openCase(button.dataset.caseId));
    });
    $("finalMissionButton")?.addEventListener("click", runFinalMission);
  }

  function openCase(caseId) {
    currentCaseId = caseId;
    currentSceneId = GAME_DATA.cases[caseId].start;
    $("casesView").classList.add("hidden");
    $("caseDetailView").classList.remove("hidden");
    renderScene();
  }

  function renderScene() {
    const caseData = GAME_DATA.cases[currentCaseId];
    const scene = caseData.scenes[currentSceneId];

    $("caseCode").textContent = caseData.code;
    $("caseTitle").textContent = caseData.title;
    $("storyLog").innerHTML = scene.messages.map(([speaker, text]) => `
      <div class="story-message">
        <div class="story-speaker">${speaker}</div>
        <div>${text}</div>
      </div>
    `).join("");

    $("choiceList").innerHTML = scene.choices.map((choice, index) => `
      <button class="choice-button" type="button" data-choice-index="${index}">
        [ ${choice.text} ]
      </button>
    `).join("");

    document.querySelectorAll("[data-choice-index]").forEach((button) => {
      button.addEventListener("click", () => choose(Number(button.dataset.choiceIndex)));
    });
  }

  function choose(index) {
    const scene = GAME_DATA.cases[currentCaseId].scenes[currentSceneId];
    const choice = scene.choices[index];
    if (!choice) return;

    applyEffects(choice.effects);
    addUnique(state.flags, choice.flag);
    addUnique(state.foundCharacters, choice.character);
    addUnique(state.foundRules, choice.rule);
    addUnique(state.endings, choice.ending);

    if (choice.archive) {
      state.archive.push({
        from: "RECOVERED",
        title: choice.archive,
        body: choice.end || "복구된 통신 기록입니다."
      });
    }

    saveState();

    if (choice.next) {
      currentSceneId = choice.next;
      renderScene();
    } else {
      $("storyLog").insertAdjacentHTML("beforeend", `
        <div class="story-message">
          <div class="story-speaker">선택 결과</div>
          <div>${choice.end || "기록이 종료되었습니다."}</div>
        </div>
      `);
      $("choiceList").innerHTML = '<button id="returnButton" class="choice-button" type="button">[ 조사 목록으로 돌아가기 ]</button>';
      $("returnButton").addEventListener("click", backToCases);
    }

    renderStatus();
    flashMessage("선택 결과가 저장되었습니다.");
  }

  function backToCases() {
    $("caseDetailView").classList.add("hidden");
    $("casesView").classList.remove("hidden");
    renderCases();
  }

  function renderCharacters() {
    $("characterList").innerHTML = GAME_DATA.characters.map((character) => {
      const found = state.foundCharacters.includes(character.id);
      const affection = state.affection[character.id] || 0;
      return `
        <article class="content-card ${found ? "" : "locked"}">
          <div class="card-header">
            <div>
              <span class="badge">${character.label}</span>
              <h3 class="profile-name">${found ? character.name : "이름 미확인"}</h3>
            </div>
            <span class="muted">${character.status}</span>
          </div>
          <p>${found ? character.description : "괴이 조사 중 해당 인물의 생존 신호를 확보해야 상세 정보가 열립니다."}</p>
          <p class="muted">호감도 ${affection}</p>
        </article>
      `;
    }).join("");
  }

  function renderRules() {
    const query = ($("ruleSearch").value || "").trim().toLowerCase();
    const filtered = GAME_DATA.rules.filter((rule) => {
      const haystack = `${rule.title} ${rule.place} ${rule.lines.join(" ")}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    $("ruleList").innerHTML = filtered.map((rule) => {
      const found = state.foundRules.includes(rule.id);
      return `
        <article class="content-card rule-card ${found ? "" : "locked"}">
          <div class="card-header">
            <strong>${found ? rule.title : "복구되지 않은 수칙서"}</strong>
            <span class="muted">${found ? rule.place : "접근 제한"}</span>
          </div>
          ${found
            ? `<ol>${rule.lines.map((line) => `<li>${line}</li>`).join("")}</ol>`
            : "<p>괴이 조사 중 해당 문서를 발견해야 내용을 열람할 수 있습니다.</p>"}
        </article>
      `;
    }).join("");
  }

  function renderArchive() {
    $("archiveList").innerHTML = state.archive.map((item) => `
      <article class="content-card">
        <div class="card-header">
          <strong>${item.title}</strong>
          <span class="muted">${item.from}</span>
        </div>
        <p>${item.body}</p>
      </article>
    `).join("");
  }

  function renderEndings() {
    $("endingList").innerHTML = Object.entries(GAME_DATA.endings).map(([id, name]) => {
      const found = state.endings.includes(id);
      return `
        <article class="content-card ${found ? "" : "locked"}">
          <strong>${found ? name : "미확인 엔딩"}</strong>
          <p class="muted">${found ? "기록 완료" : "조건을 충족하면 기록됩니다."}</p>
        </article>
      `;
    }).join("");
  }

  function renderStatus() {
    $("investigationStat").textContent = state.investigation;
    $("dangerStat").textContent = state.danger;
    $("hogengStat").textContent = state.affection.hogeng;
    $("gamjaStat").textContent = state.affection.gamja;
    $("lazyStat").textContent = state.affection.lazy;
    $("recoveryText").textContent = `${state.recovery}%`;
    $("recoveryBar").style.width = `${state.recovery}%`;
    $("ruleCount").textContent = `${state.foundRules.length}/${GAME_DATA.rules.length}`;
    $("archiveCount").textContent = state.archive.length;
    $("flagList").textContent = state.flags.join(" · ") || "없음";
    $("foundCharacters").textContent = state.foundCharacters
      .map((id) => GAME_DATA.characters.find((character) => character.id === id)?.name)
      .filter(Boolean)
      .join(" · ") || "없음";
  }

  function runFinalMission() {
    const allFound = GAME_DATA.characters.every((character) => state.foundCharacters.includes(character.id));
    if (!allFound) {
      flashMessage("세 사람의 위치를 모두 확인해야 합니다.");
      return;
    }

    const trueEnding =
      state.affection.hogeng >= 5 &&
      state.affection.gamja >= 5 &&
      state.affection.lazy >= 5;

    const endingId = trueEnding ? "true_all" : "alone";
    addUnique(state.endings, endingId);
    saveState();

    const result = trueEnding
      ? "수칙 아홉 장을 순서대로 낭독하자 복도, 식당, 교실이 하나의 출구로 이어졌습니다. 호갱은 마지막까지 지원을 요청했고, 감자는 남은 식량을 셋으로 나눴으며, 귀차니즘은 애인에게 ‘곧 간다’고 문자를 보냈습니다. 세 사람은 모두 돌아왔습니다."
      : "출구는 열렸지만 세 사람의 목소리가 서로 다른 방향에서 들렸습니다. 당신은 한 사람도 포기하지 않으려 했고, 결국 단말기만 바깥으로 돌아왔습니다.";

    $("casesView").classList.add("hidden");
    $("caseDetailView").classList.remove("hidden");
    $("caseCode").textContent = "FINAL RECORD";
    $("caseTitle").textContent = "세 사람의 귀환 기록";
    $("storyLog").innerHTML = `
      <div class="ending-result">
        <h2>${trueEnding ? "TRUE END" : "ENDING"}</h2>
        <p>${result}</p>
      </div>
    `;
    $("choiceList").innerHTML = '<button id="returnButton" class="choice-button" type="button">[ 조사 목록으로 돌아가기 ]</button>';
    $("returnButton").addEventListener("click", backToCases);
    renderStatus();
  }

  function flashMessage(message) {
    $("systemMessage").textContent = message;
    $("systemMessage").classList.add("glitch");
    window.setTimeout(() => {
      $("systemMessage").textContent = "시스템 정상";
      $("systemMessage").classList.remove("glitch");
    }, 1700);
  }

  function renderAll() {
    renderCases();
    renderCharacters();
    renderRules();
    renderArchive();
    renderEndings();
    renderStatus();
  }

  $("unlockButton").addEventListener("click", () => {
    $("lockScreen").classList.add("hidden");
    $("app").classList.remove("hidden");
    renderAll();
  });

  $("backButton").addEventListener("click", backToCases);

  $("resetButton").addEventListener("click", () => {
    if (!window.confirm("모든 진행 상황을 초기화할까요?")) return;
    state = cloneDefaultState();
    saveState();
    renderAll();
    setView("cases");
    flashMessage("진행 상황이 초기화되었습니다.");
  });

  $("ruleSearch").addEventListener("input", renderRules);

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  window.setInterval(() => {
    $("clock").textContent = new Date().toLocaleTimeString("ko-KR", { hour12:false });
  }, 1000);
})();
