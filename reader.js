(() => {
  "use strict";
  const KEYWORDS = new Set(("package import public private protected class interface enum abstract static final void " +
    "int double float long short byte char boolean if else switch case break continue for while do " +
    "return new try catch finally throw throws extends implements this super instanceof default " +
    "record var null true false synchronized transient volatile assert").split(" "));
  const TYPES = new Set(("String System Integer Double Boolean Long Character Math Object Class " +
    "ArrayList List HashMap Map HashSet Set Scanner BufferedReader BufferedWriter " +
    "File Files Path Paths IOException SQLException Exception RuntimeException " +
    "Connection PreparedStatement ResultSet DriverManager Collections Arrays " +
    "PrintWriter StringBuilder Thread LocalDate").split(" "));
  const SQL = new Set(("SELECT FROM WHERE INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE " +
    "PRIMARY KEY NOT NULL AND OR ORDER BY GROUP LIMIT JOIN LEFT RIGHT INNER " +
    "AS INT VARCHAR COUNT DISTINCT DESC ASC").split(" "));
  const TOKEN = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|@[A-Za-z_$][\w$]*|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?\b/g;

  function syntaxColor(root) {
    const text = root.textContent;
    const sql = /^\s*(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/im.test(text) &&
      !/\b(?:public\s+class|System\.out|static\s+void)\b/.test(text);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      // 元から付いているコメント・番号の装飾は維持する。
      if (!node.parentElement.closest(".cm, .cn, .syn-keyword, .syn-type, .syn-string")) {
        nodes.push(node);
      }
    }
    for (const textNode of nodes) {
      const source = textNode.nodeValue;
      let offset = 0;
      let touched = false;
      const fragment = document.createDocumentFragment();
      TOKEN.lastIndex = 0;
      for (const match of source.matchAll(TOKEN)) {
        const word = match[0];
        let kind = "";
        if (word[0] === '"' || word[0] === "'") kind = "string";
        else if (word[0] === "@") kind = "annotation";
        else if (/^\d/.test(word)) kind = "number";
        else if (sql && SQL.has(word.toUpperCase())) kind = "sql";
        else if (!sql && KEYWORDS.has(word)) kind = "keyword";
        else if (!sql && (TYPES.has(word) || /^[A-Z][\w$]*$/.test(word))) kind = "type";
        if (!kind) continue;
        fragment.append(document.createTextNode(source.slice(offset, match.index)));
        const span = document.createElement("span");
        span.className = "syn-" + kind;
        span.textContent = word;
        fragment.append(span);
        offset = match.index + word.length;
        touched = true;
      }
      if (touched) {
        fragment.append(document.createTextNode(source.slice(offset)));
        textNode.replaceWith(fragment);
      }
    }
  }

  function enableLineMarker(pre) {
    // 行内容を変更せずにハイライトするので、既存の「コピー」処理に影響しない。
    pre.tabIndex = 0;
    pre.title = "行にカーソルを合わせると強調。クリックで固定、Escで解除";
    let pinned = null;
    const rowCount = pre.textContent.split(/\r\n|\r|\n/).length;
    function mark(line) {
      if (line === null) {
        pre.classList.remove("reader-active");
        pre.style.removeProperty("--reader-line-top");
        return;
      }
      const style = getComputedStyle(pre);
      const lineHeight = parseFloat(style.lineHeight);
      const padding = parseFloat(style.paddingTop);
      const offset = padding + line * lineHeight;
      pre.style.setProperty("--reader-line-height", lineHeight + "px");
      pre.style.setProperty("--reader-line-top", offset + "px");
      pre.classList.add("reader-active");
    }
    function lineAt(event) {
      const rect = pre.getBoundingClientRect();
      const style = getComputedStyle(pre);
      const row = Math.floor((event.clientY - rect.top + pre.scrollTop -
        parseFloat(style.borderTopWidth) - parseFloat(style.paddingTop)) /
        parseFloat(style.lineHeight));
      return Math.max(0, Math.min(rowCount - 1, row));
    }
    pre.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      if (pinned === null) mark(lineAt(e));
    });
    pre.addEventListener("pointerleave", () => mark(pinned));
    pre.addEventListener("click", (e) => {
      if (window.getSelection()?.toString()) return;
      const line = lineAt(e);
      pinned = pinned === line ? null : line;
      mark(pinned);
    });
    pre.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { pinned = null; mark(null); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre.code").forEach((pre) => {
      syntaxColor(pre);
      enableLineMarker(pre);
    });
    document.querySelectorAll("code.ex").forEach(syntaxColor);
  });
})();