export const siteTitleDefault = "Beyond the smartphone";

export const siteSubtitleDefault = "Towards calm, minimal technology.";

export const siteDescriptionDefault = [
  {
    _type: "block",
    _key: "desc2",
    style: "normal",
    markDefs: [
      {
        _key: "descLink",
        _type: "link",
        href: "https://astridmathilde.no",
        openInNewTab: true,
      },
    ],
    children: [
      { _type: "span", _key: "desc2a", text: "A diploma project by ", marks: [] },
      { _type: "span", _key: "desc2b", text: "Astrid Boberg", marks: ["descLink"] },
      { _type: "span", _key: "desc2c", text: ".", marks: [] },
    ],
  },
  {
    _type: "block",
    _key: "desc3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "desc3a",
        text: "Interaction design, AHO, Spring 2027.",
        marks: [],
      },
    ],
  },
];

export const siteResourcesDefault = [
  {
    label: "Research",
    url: "https://www.are.na/astrid-mathilde-boberg/my-diploma-research",
  },
  {
    label: "Tools & methods",
    url: "https://www.are.na/astrid-mathilde-boberg/my-diploma-tools-methods",
  },
];

export const siteFooterDefault = [
  {
    _type: "block",
    _key: "footer1",
    style: "normal",
    markDefs: [
      {
        _key: "footerLink",
        _type: "link",
        href: "https://astridmathilde.no",
        openInNewTab: true,
      },
    ],
    children: [
      { _type: "span", _key: "footer1a", text: "© ", marks: [] },
      { _type: "span", _key: "footer1b", text: "Astrid Mathilde Boberg", marks: ["footerLink"] },
      { _type: "span", _key: "footer1c", text: " 2026/2027", marks: [] },
    ],
  },
];
