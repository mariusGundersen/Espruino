#!/usr/bin/node
const fs = require('fs');

require("./common.js").readAllWrapperFiles(function(json) {
  json = json.filter(j => j.typedef);
  const classes = new Map(json
    .filter(j => j.type === 'class')
    .map(j => [j.class, {...j, members: []}]));

  const members = json
    .filter(j => j.type !== 'class' && j.class);

  for(const member of members){
    classes.get(member.class).members.push(member)
  }

  let content = [...classes.values()]
    .map(c => c.typedef + ' {\n' + c.members.map(m => renderMember(m).split('\n').map(l => '  '+l).join('\n')).join('\n') + '\n}\n\n').join('\n');

  content = content.concat(json.filter( j => !j.class).map(renderMember).join('\n\n'));

  fs.writeFileSync('./types.d.ts', content);
});

function renderMember(member){
  return [
    '/**',
    ...member.description.split('\r\n').map(l => ' * '+l),

    ...(member.params ? member.params.map(p => ' * @param '+p[0]+' '+p[2]) : []),
    ...(member.return ? [' * @returns ' + member.return[1]] : []),
    '*/',
    ...(Array.isArray(member.typedef) ? member.typedef : [member.typedef])
  ].join('\n')
}