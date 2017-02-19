const sprockets_require_regex = /=\s*require\s+([\S]+)/;

export default function ({ types: t, template }) {
  const buildRequire = template(`require(SOURCE);`);

  return {
    visitor: {
      Program(path, state) {
        const blacklist = state.opts.blacklist || [];
        const filterBlacklistedSources = source => blacklist.reduce((acc, curr) => {
          if (curr instanceof RegExp) {
            return acc && !curr.test(source);
          } else if (typeof curr === 'string') {
            return acc && curr !== source;
          }
        }, true);
        let sources = [];

        for (let comment of state.file.ast.comments) {
          if (comment.value.match(sprockets_require_regex)) {
            let match = sprockets_require_regex.exec(comment.value);
            sources.push(match[1]);
            comment.ignore = true;
          }
        }

        path.unshiftContainer(
          'body',
          sources
            .filter(filterBlacklistedSources)
            .map(source => buildRequire({ SOURCE: t.stringLiteral(source) }))
        );
      }
    }
  };
}
