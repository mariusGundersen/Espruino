#!/usr/bin/node
const fs = require('fs');

require("./common.js").readAllWrapperFiles(function(json) {
  json = json.filter(j => j.typedef);
  const classes = new Map(json
    .filter(j => j.type === 'class')
    .map(j => [j.class, {...j, members: []}]));

  const libraries = new Map(json
    .filter(j => j.type === 'library')
    .map(j => [j.class, {...j, members: []}]));

  const members = json
    .filter(j => j.type !== 'class' && j.class);

  for(const member of members){
    const owner = classes.get(member.class) ?? libraries.get(member.class);
    if(!owner) console.error('missing owner for ', member.name, 'expected', member.class);
    else owner.members.push(member)
  }

  let content = [...classes.values()]
    .map(c => typeComment(c) + '\n' + c.typedef + ' {\n' + c.members
      .sort((a, b) => getSorting(a).localeCompare(getSorting(b)))
      .map(m => renderMember(m)
        .split('\n')
        .map(l => '  ' + l)
        .join('\n'))
      .join('\n\n') + '\n}\n\n')
    .join('\n');

  content = content.concat(json.filter( j => !j.class).map(renderMember).join('\n\n'));

  fs.writeFileSync('./types.d.ts', content);
});

function getSorting(t){
  switch(t.type){
    case 'staticproperty': return 0+t.name;
    case 'property': return 1+t.name;
    case 'constructor': return 2+t.name;
    case 'event': return 3+t.name;
    case 'method': return 4+t.name;
    case 'staticmethod': return 5+t.name;
    default: return 6;
  }
}

function typeComment(c){
  if(!c.description) return '';
  return '/**\n'+ c.description.split('\r\n').map(l => ' * '+l).join('\n')+'\n */';
}

function renderMember(member){
  return [
    '/**',
    ...(member.description?.split('\r\n').map(l => ' * '+l) ?? []),

    ...(member.params?.map(p => ' * @param '+p[0]+' '+p[2]) ?? []),
    ...(member.return?.[' * @returns ' + member.return[1]] ?? []),
    ' */',
    ...(Array.isArray(member.typedef) ? member.typedef : [member.typedef])
  ].join('\n')
}