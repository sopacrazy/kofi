// Dados locais em memória para desenvolvimento do frontend sem depender do backend/DB.
// Troque por chamadas reais de API quando o banco estiver pronto novamente.

export interface MockUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  category?: string;
  location?: string;
  avatarUrl?: string;
  coverUrl?: string;
  createdAt: Date;
  followers: number;
  skills: string[];
  /** Se ausente, o login mock aceita qualquer senha para esse usuário. */
  password?: string;
}

export interface MockProjectImage {
  id: string;
  imageUrl: string;
  orderIndex: number;
}

export interface MockProject {
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverUrl: string;
  category: string;
  tools: string[];
  createdAt: Date;
  images: MockProjectImage[];
  likeCount: number;
  commentCount: number;
}

const mockUsers: MockUser[] = [
  {
    id: 'admin',
    username: 'admin',
    email: 'admin',
    fullName: 'Admin',
    bio: 'Conta de teste local.',
    category: 'Criador',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-01-01'),
    followers: 0,
    skills: ['Criador'],
    password: 'admin',
  },
  {
    id: 'u1',
    username: 'anacreator',
    email: 'ana@example.com',
    fullName: 'Ana Ribeiro',
    bio: 'Product designer focada em experiências digitais limpas e funcionais.',
    category: 'UI/UX Designer',
    location: 'São Paulo, BR',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-01-10'),
    followers: 342,
    skills: ['UI/UX', 'Design de Produto', 'Design System'],
  },
  {
    id: 'u2',
    username: 'joaodev',
    email: 'joao@example.com',
    fullName: 'João Andrade',
    bio: 'Desenvolvedor full-stack apaixonado por performance e DX.',
    category: 'Dev',
    location: 'Lisboa, PT',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    coverUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-02-20'),
    followers: 128,
    skills: ['Dev', 'Frontend', 'Backend'],
  },
  {
    id: 'u3',
    username: 'melillustra',
    email: 'mel@example.com',
    fullName: 'Mel Souza',
    bio: 'Ilustradora digital, apaixonada por cores vibrantes e personagens.',
    category: 'Ilustração',
    location: 'Curitiba, BR',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-03-05'),
    followers: 891,
    skills: ['Ilustração', 'Character Design', 'Arte Digital'],
  },
  {
    id: 'u4',
    username: 'rafaelfoto',
    email: 'rafael@example.com',
    fullName: 'Rafael Lima',
    bio: 'Fotógrafo documental, sempre em busca de luz natural e histórias reais.',
    category: 'Fotografia',
    location: 'Austin, EUA',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-04-02'),
    followers: 210,
    skills: ['Fotografia', 'Edição', 'Direção de Arte'],
  },
  {
    id: 'u5',
    username: 'biatorres3d',
    email: 'bia@example.com',
    fullName: 'Bia Torres',
    bio: 'Artista 3D e motion designer, criando mundos e objetos que não existem.',
    category: '3D',
    location: 'Tóquio, JP',
    avatarUrl: 'https://i.pravatar.cc/150?img=26',
    coverUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-05-08'),
    followers: 156,
    skills: ['3D', 'Motion', 'Blender'],
  },
  {
    id: 'u6',
    username: 'carlosbrand',
    email: 'carlos@example.com',
    fullName: 'Carlos Nunes',
    bio: 'Designer de marcas, construindo identidades visuais com propósito.',
    category: 'Branding',
    location: 'Berlim, DE',
    avatarUrl: 'https://i.pravatar.cc/150?img=53',
    coverUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-05-22'),
    followers: 75,
    skills: ['Branding', 'Identidade Visual', 'Ilustração'],
  },
];

const mockProjects: MockProject[] = [
  {
    id: 'p1',
    userId: 'u1',
    title: 'Redesign do App Financeiro',
    description: 'Um redesign completo focado em simplificar o controle financeiro pessoal, com hierarquia visual clara e microinterações.',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    category: 'UI/UX',
    tools: ['Figma', 'Principle'],
    createdAt: new Date('2024-06-01'),
    images: [
      { id: 'p1i1', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', orderIndex: 0 },
      { id: 'p1i2', imageUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1600&auto=format&fit=crop', orderIndex: 1 },
    ],
    likeCount: 128,
    commentCount: 12,
  },
  {
    id: 'p2',
    userId: 'u2',
    title: 'Dashboard de Analytics em Tempo Real',
    description: 'Plataforma de dashboards com atualização em tempo real via WebSockets, construída com React e Node.',
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    category: 'Dev',
    tools: ['React', 'Node.js', 'WebSockets'],
    createdAt: new Date('2024-05-15'),
    images: [
      { id: 'p2i1', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 94,
    commentCount: 8,
  },
  {
    id: 'p3',
    userId: 'u3',
    title: 'Série de Personagens - Reino Encantado',
    description: 'Coleção de ilustrações digitais de personagens para um livro infantil.',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop',
    category: 'Ilustração',
    tools: ['Procreate', 'Photoshop'],
    createdAt: new Date('2024-07-02'),
    images: [
      { id: 'p3i1', imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop', orderIndex: 0 },
      { id: 'p3i2', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1600&auto=format&fit=crop', orderIndex: 1 },
    ],
    likeCount: 156,
    commentCount: 19,
  },
  {
    id: 'p4',
    userId: 'u1',
    title: 'Landing Page - Startup de Viagens',
    description: 'Landing page com foco em conversão para uma startup de viagens sustentáveis.',
    coverUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1600&auto=format&fit=crop',
    category: 'UI/UX',
    tools: ['Figma', 'Webflow'],
    createdAt: new Date('2024-04-18'),
    images: [
      { id: 'p4i1', imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1600&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 102,
    commentCount: 7,
  },
  {
    id: 'p5',
    userId: 'u3',
    title: 'Capa de Álbum - Noites de Verão',
    description: 'Arte de capa para um álbum indie, explorando texturas pintadas à mão.',
    coverUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&h=1400&auto=format&fit=crop',
    category: 'Ilustração',
    tools: ['Procreate'],
    createdAt: new Date('2024-07-20'),
    images: [
      { id: 'p5i1', imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&h=1400&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 88,
    commentCount: 6,
  },
  {
    id: 'p6',
    userId: 'u2',
    title: 'Site Institucional - Estúdio de Arquitetura',
    description: 'Site minimalista para um estúdio de arquitetura, com foco em fotografia de projetos.',
    coverUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&h=1000&auto=format&fit=crop',
    category: 'Dev',
    tools: ['Next.js', 'Tailwind'],
    createdAt: new Date('2024-06-25'),
    images: [
      { id: 'p6i1', imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&h=1000&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 137,
    commentCount: 18,
  },
  {
    id: 'p7',
    userId: 'u1',
    title: 'App de Meditação - Onboarding',
    description: 'Fluxo de onboarding para um app de meditação, com microanimações suaves.',
    coverUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1000&h=1500&auto=format&fit=crop',
    category: 'UI/UX',
    tools: ['Figma', 'After Effects'],
    createdAt: new Date('2024-03-11'),
    images: [
      { id: 'p7i1', imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1000&h=1500&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 63,
    commentCount: 4,
  },
  {
    id: 'p8',
    userId: 'u3',
    title: 'Ensaio Fotográfico - Luz Natural',
    description: 'Série fotográfica explorando luz natural em ambientes internos.',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&h=900&auto=format&fit=crop',
    category: 'Fotografia',
    tools: ['Câmera Analógica', 'Lightroom'],
    createdAt: new Date('2024-08-01'),
    images: [
      { id: 'p8i1', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&h=900&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 71,
    commentCount: 5,
  },
  {
    id: 'p9',
    userId: 'u4',
    title: 'Ensaio Urbano - Concreto e Luz',
    description: 'Registro fotográfico da arquitetura brutalista sob luz dura de meio-dia.',
    coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&h=1000&auto=format&fit=crop',
    category: 'Fotografia',
    tools: ['Câmera Analógica', 'Lightroom'],
    createdAt: new Date('2024-08-10'),
    images: [
      { id: 'p9i1', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&h=1000&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 45,
    commentCount: 3,
  },
  {
    id: 'p10',
    userId: 'u5',
    title: 'Objetos Impossíveis',
    description: 'Série de renders 3D explorando formas e materiais que desafiam a física.',
    coverUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&h=1500&auto=format&fit=crop',
    category: '3D',
    tools: ['Blender', 'Octane'],
    createdAt: new Date('2024-06-14'),
    images: [
      { id: 'p10i1', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&h=1500&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 112,
    commentCount: 9,
  },
  {
    id: 'p11',
    userId: 'u6',
    title: 'Identidade Visual - Café Origem',
    description: 'Sistema de marca completo para uma torrefadora de café especial.',
    coverUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&h=1100&auto=format&fit=crop',
    category: 'Branding',
    tools: ['Illustrator', 'InDesign'],
    createdAt: new Date('2024-07-28'),
    images: [
      { id: 'p11i1', imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1600&h=1100&auto=format&fit=crop', orderIndex: 0 },
    ],
    likeCount: 39,
    commentCount: 2,
  },
];

function userSummary(user: MockUser) {
  const { id, username, fullName, avatarUrl, email } = user;
  return { id, username, fullName, avatarUrl, email };
}

function userWithProfile(user: MockUser) {
  const { id, username, fullName, avatarUrl, coverUrl, category, location, bio, followers, skills } = user;
  return { id, username, fullName, avatarUrl, coverUrl, category, location, bio, followers, skills };
}

export function getCreators() {
  return [...mockUsers]
    .filter((u) => u.followers > 0)
    .sort((a, b) => b.followers - a.followers)
    .map((u) => userWithProfile(u));
}

export function getProjects() {
  return [...mockProjects]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((p) => ({
      ...p,
      user: userSummary(mockUsers.find((u) => u.id === p.userId)!),
    }));
}

export function getLatestProjects(limit: number) {
  return getProjects().slice(0, limit);
}

export function getProjectById(id: string) {
  const project = mockProjects.find((p) => p.id === id);
  if (!project) return null;
  const user = mockUsers.find((u) => u.id === project.userId)!;
  return {
    ...project,
    user: userWithProfile(user),
    likes: [],
    comments: [],
  };
}

export function getUserByUsername(username: string) {
  const user = mockUsers.find((u) => u.username === username);
  if (!user) return null;
  const { password: _password, ...rest } = user;
  const userProjects = mockProjects
    .filter((p) => p.userId === user.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return { ...rest, projects: userProjects };
}

export function createMockProject(userId: string, data: {
  title: string; description: string; category: string; tools: string[]; coverUrl: string; gallery: string[];
}) {
  const id = `p${mockProjects.length + 1}-${Date.now()}`;
  const project: MockProject = {
    id,
    userId,
    title: data.title,
    description: data.description,
    coverUrl: data.coverUrl,
    category: data.category,
    tools: data.tools,
    createdAt: new Date(),
    images: data.gallery.map((url, index) => ({ id: `${id}i${index}`, imageUrl: url, orderIndex: index })),
    likeCount: 0,
    commentCount: 0,
  };
  mockProjects.push(project);
  return project;
}

export function mockLogin(emailOrUsername: string, password: string) {
  const user = mockUsers.find((u) => u.email === emailOrUsername || u.username === emailOrUsername);
  if (!user) throw new Error('Credenciais inválidas');
  if (user.password && user.password !== password) throw new Error('Credenciais inválidas');
  return { token: `mock-token-${user.id}`, user: userSummary(user) };
}

export function mockRegister(data: { username: string; email: string; password: string; fullName: string }) {
  if (mockUsers.some((u) => u.email === data.email || u.username === data.username)) {
    throw new Error('Usuário já existe');
  }
  const user: MockUser = {
    id: `u${mockUsers.length + 1}-${Date.now()}`,
    username: data.username,
    email: data.email,
    fullName: data.fullName,
    createdAt: new Date(),
    followers: 0,
    skills: [],
  };
  mockUsers.push(user);
  return { token: `mock-token-${user.id}`, user: userSummary(user) };
}
