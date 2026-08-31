export const members = [
  { id: 1, name: 'Prime', image: '/members_prime.jpg', desc: 'Patrik “Prime” Helge represents the first Swedish hip-hop generation. He started in 1983 and helped shape the crew with originality, musicality and deep funk foundations.' },
  { id: 2, name: 'Quill', image: '/members_quill.jpg', desc: 'Tomas “Quill” Strandgren is one of the crew’s original funkateers, active since hip-hop first spread through Sweden in the early eighties.' },
  { id: 3, name: 'RobOne', image: '/members_robone.jpg', desc: 'Robert “RobOne” Wägar came from breaking in the eighties, found the funk styles and became one of Sweden’s most prominent lockers.' },
  { id: 4, name: 'Sven', image: '/members_sven.jpg', desc: 'Sven Forshell was a dancer, friend and the designer of the original Mass Destruction website. This archive is preserved in his memory.' },
];

export function getMember(id) {
  return members.find((member) => String(member.id) === String(id));
}
