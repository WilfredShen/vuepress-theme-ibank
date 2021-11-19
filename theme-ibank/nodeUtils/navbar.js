const { defaultType } = require("./defaults");

const buildNavbar = node => {
  const list = [];
  if (!node.$children) return list;
  Object.entries(node.$children).forEach(
    ([k, v]) =>
      (v.$data && v.$data.frontmatter && v.$data.frontmatter.navbar !== undefined
        ? v.$data.frontmatter.navbar
        : true) /*console.log(v.$data.title, Object.keys(v.$children || {})) ||*/ &&
      list.push({
        text: k,
        link: v.$data.frontmatter && v.$data.frontmatter.permalink,
        children: v.$data && v.$data.frontmatter && v.$data.frontmatter.type === defaultType ? undefined : buildNavbar(v),
        $data: v.$data,
        $children: v.$children,
      }),
  );
  return list.sort(({ $data: { order: a } }, { $data: { order: b } }) => a.localeCompare(b));
};

module.exports = { buildNavbar };
