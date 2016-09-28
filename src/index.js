const sprockets_require_regex = /=\s+require\s+([\S]+)/;

export default function ({ types: t, template }) {
  const buildRequire = template(`require(SOURCE);`);

  return {
    visitor: {
      Program(path, { file: { ast: { comments } } }) {
        let sources = [];

        for (let comment of comments) {
          if (comment.value.match(sprockets_require_regex)) {
            let match = sprockets_require_regex.exec(comment.value);
            sources.push(match[1]);
            comment.ignore = true;
          }
        }

        path.unshiftContainer(
          'body',
          sources.map(source => buildRequire({ SOURCE: t.stringLiteral(source) }))
        );
      }
    }
  };
}
