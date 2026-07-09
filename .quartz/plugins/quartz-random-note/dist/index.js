import { createRequire } from 'module';

createRequire(import.meta.url);

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/random-note.ts
var markdownExtensions = [".md", ".markdown"];
var excludedSlugPrefixes = ["tag/", "tags/", "folder/", "folders/"];
var excludedSlugs = ["tag", "tags", "folder", "folders"];
var normalizePath = (value) => typeof value === "string" ? value.replace(/\\/g, "/").toLowerCase() : "";
var normalizeSlug = (value) => typeof value === "string" ? value.replace(/^\/+/, "").replace(/\/+$/, "") : "";
var getTitle = (file) => {
  const frontmatter = file.frontmatter;
  if (typeof frontmatter?.title === "string" && frontmatter.title.trim().length > 0) {
    return frontmatter.title;
  }
  if (typeof file.slug === "string") {
    const parts = file.slug.split("/");
    return parts.at(-1) ?? file.slug;
  }
  return "Untitled";
};
var isMarkdownVaultFile = (file) => {
  const filePath = normalizePath(file.filePath ?? file.relativePath);
  return markdownExtensions.some((extension) => filePath.endsWith(extension));
};
var isContentPage = (file) => {
  if (!isMarkdownVaultFile(file)) return false;
  const explicitPageType = file.pageType ?? file.type;
  if (typeof explicitPageType === "string" && explicitPageType !== "content") {
    return false;
  }
  const slug = normalizeSlug(file.slug);
  if (excludedSlugs.includes(slug)) return false;
  if (excludedSlugPrefixes.some((prefix) => slug.startsWith(prefix))) return false;
  return true;
};
var getRandomNoteCandidates = (allFiles, currentSlug, includeCurrentPage = false) => {
  const normalizedCurrentSlug = typeof currentSlug === "string" ? currentSlug : void 0;
  return allFiles.filter((file) => typeof file.slug === "string").filter(isContentPage).filter((file) => includeCurrentPage || file.slug !== normalizedCurrentSlug).map((file) => ({
    slug: file.slug,
    title: getTitle(file)
  }));
};

// src/components/styles/random-note.scss
var random_note_default = '.random-note {\n  align-items: center;\n  background: transparent;\n  border: 0;\n  color: var(--darkgray);\n  cursor: pointer;\n  display: inline-flex;\n  height: 2rem;\n  justify-content: center;\n  padding: 0;\n  width: 2rem;\n}\n.random-note:hover, .random-note:focus-visible {\n  color: var(--secondary);\n}\n.random-note:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}\n.random-note:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n.random-note-die {\n  border: 1.75px solid currentColor;\n  border-radius: 4px;\n  box-sizing: border-box;\n  flex: 0 0 auto;\n  height: 1.25rem;\n  padding: 2px;\n  position: relative;\n  width: 1.25rem;\n}\n\n.random-note-dot {\n  background: currentColor;\n  border-radius: 50%;\n  display: none;\n  height: 3px;\n  left: 50%;\n  position: absolute;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 3px;\n}\n\n.random-note-dot-1 {\n  left: 25%;\n  top: 25%;\n}\n\n.random-note-dot-2 {\n  left: 50%;\n  top: 25%;\n}\n\n.random-note-dot-3 {\n  left: 75%;\n  top: 25%;\n}\n\n.random-note-dot-4 {\n  left: 25%;\n  top: 50%;\n}\n\n.random-note-dot-5 {\n  left: 50%;\n  top: 50%;\n}\n\n.random-note-dot-6 {\n  left: 75%;\n  top: 50%;\n}\n\n.random-note-dot-7 {\n  left: 25%;\n  top: 75%;\n}\n\n.random-note-dot-8 {\n  left: 50%;\n  top: 75%;\n}\n\n.random-note-dot-9 {\n  left: 75%;\n  top: 75%;\n}\n\n.random-note[data-face="1"] .random-note-dot-5,\n.random-note[data-face="2"] .random-note-dot-1,\n.random-note[data-face="2"] .random-note-dot-9,\n.random-note[data-face="3"] .random-note-dot-1,\n.random-note[data-face="3"] .random-note-dot-5,\n.random-note[data-face="3"] .random-note-dot-9,\n.random-note[data-face="4"] .random-note-dot-1,\n.random-note[data-face="4"] .random-note-dot-3,\n.random-note[data-face="4"] .random-note-dot-7,\n.random-note[data-face="4"] .random-note-dot-9,\n.random-note[data-face="5"] .random-note-dot-1,\n.random-note[data-face="5"] .random-note-dot-3,\n.random-note[data-face="5"] .random-note-dot-5,\n.random-note[data-face="5"] .random-note-dot-7,\n.random-note[data-face="5"] .random-note-dot-9,\n.random-note[data-face="6"] .random-note-dot-1,\n.random-note[data-face="6"] .random-note-dot-3,\n.random-note[data-face="6"] .random-note-dot-4,\n.random-note[data-face="6"] .random-note-dot-6,\n.random-note[data-face="6"] .random-note-dot-7,\n.random-note[data-face="6"] .random-note-dot-9 {\n  display: block;\n}';

// src/components/scripts/random-note.inline.ts
var random_note_inline_default = 'var s="quartz-random-note-pending-face",f=()=>String(Math.floor(Math.random()*6)+1),u=a=>a.replace(/^\\/+/,"").replace(/\\/+$/,""),g=a=>u(a).replace(/\\/index$/,""),l=a=>{let e=a.dataset.notes;if(!e)return[];try{let t=JSON.parse(e);return Array.isArray(t)?t.filter(n=>typeof n.slug=="string"&&n.slug.length>0):[]}catch{return[]}},m=async()=>{try{return new Set(Object.keys(await fetchData))}catch{return null}},h=async a=>{let e=await m();return e?a.filter(t=>e.has(t.slug)):a},p=a=>{let e=g(a.dataset.currentSlug??""),t=u(decodeURIComponent(window.location.pathname));if(e.length>0&&t.endsWith(`/${e}`))return`/${t.slice(0,-e.length).replace(/\/+$/,"")}`;if(e.length>0&&t===e)return"";let r=t.split("/").filter(Boolean)[0]??"";return window.location.hostname.endsWith("github.io")&&r?`/${r}`:""},w=(a,e)=>{let t=g(a),n=p(e),o=t.length>0?`${n}/${t}`:`${n}/`;return new URL(o,window.location.origin)},S=async(a,e)=>{let t=g(a),o=new URL("/see-also/"+t,window.location.origin);if(window.spaNavigate){await window.spaNavigate(o,!1);return}window.location.assign(o)},i=()=>{let a=document.querySelectorAll("[data-random-note]"),e=[],t=sessionStorage.getItem(s);t&&sessionStorage.removeItem(s);for(let n of a){if(t&&(n.dataset.face=t),n.dataset.randomNoteBound==="true")continue;n.dataset.randomNoteBound="true";let o=l(n);n.toggleAttribute("disabled",o.length===0);let c=async()=>{let r=await h(l(n));if(r.length===0)return;let d=r[Math.floor(Math.random()*r.length)];d&&(sessionStorage.setItem(s,f()),await S(d.slug,n))};n.addEventListener("click",c),e.push(()=>n.removeEventListener("click",c))}window.addCleanup&&window.addCleanup(()=>e.forEach(n=>n()))};typeof document<"u"&&(i(),document.addEventListener("nav",i),document.addEventListener("render",i));\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/RandomNote.tsx
var dieDots = Array.from({ length: 9 }, (_, index) => /* @__PURE__ */ u2("span", { class: `random-note-dot random-note-dot-${index + 1}` }));
var RandomNote_default = ((opts) => {
  const { className = "", label = "Open a random note", includeCurrentPage = false } = opts ?? {};
  const Component = (props) => {
    const notes = getRandomNoteCandidates(props.allFiles, props.fileData?.slug, includeCurrentPage);
    return /* @__PURE__ */ u2(
      "button",
      {
        type: "button",
        class: classNames("random-note", className, props.displayClass),
        "aria-label": label,
        title: label,
        "data-random-note": true,
        "data-notes": JSON.stringify(notes),
        "data-current-slug": props.fileData?.slug,
        "data-face": "1",
        children: /* @__PURE__ */ u2("span", { class: "random-note-die", "aria-hidden": "true", children: dieDots })
      }
    );
  };
  Component.css = random_note_default;
  Component.afterDOMLoaded = random_note_inline_default;
  return Component;
});

export { RandomNote_default as RandomNote };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map