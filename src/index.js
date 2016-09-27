  export default function ({ types: t, template, transform }) {
    const sprockets_require_regex = /=\s+require\s+([\S]+)/;

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

          sources.reverse().forEach(source => {
            path.unshiftContainer(
              'body',
              buildRequire({ SOURCE: t.stringLiteral(source) })
            );
          });
        }
      }
    };
  }
