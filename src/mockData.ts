// Dados locais em memória para desenvolvimento do frontend sem depender do backend/DB.
// Troque por chamadas reais de API quando o banco estiver pronto novamente.

export interface MockUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  bio?: string;
  category?: string;
  avatarUrl?: string;
  coverUrl?: string;
  createdAt: Date;
  followers: number;
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
    password: 'admin',
  },
  {
    id: 'u1',
    username: 'anacreator',
    email: 'ana@example.com',
    fullName: 'Ana Ribeiro',
    bio: 'Product designer focada em experiências digitais limpas e funcionais.',
    category: 'UI/UX Designer',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-01-10'),
    followers: 342,
  },
  {
    id: 'u2',
    username: 'joaodev',
    email: 'joao@example.com',
    fullName: 'João Andrade',
    bio: 'Desenvolvedor full-stack apaixonado por performance e DX.',
    category: 'Dev',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    coverUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-02-20'),
    followers: 128,
  },
  {
    id: 'u3',
    username: 'melillustra',
    email: 'mel@example.com',
    fullName: 'Mel Souza',
    bio: 'Ilustradora digital, apaixonada por cores vibrantes e personagens.',
    category: 'Ilustração',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    coverUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop',
    createdAt: new Date('2024-03-05'),
    followers: 891,
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
  },
];

function userSummary(user: MockUser) {
  const { id, username, fullName, avatarUrl, email } = user;
  return { id, username, fullName, avatarUrl, email };
}

function userWithProfile(user: MockUser) {
  const { id, username, fullName, avatarUrl, category, bio, followers } = user;
  return { id, username, fullName, avatarUrl, category, bio, followers };
}

export function getProjects() {
  return [...mockProjects]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((p) => ({
      ...p,
      user: userSummary(mockUsers.find((u) => u.id === p.userId)!),
    }));
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
  };
  mockUsers.push(user);
  return { token: `mock-token-${user.id}`, user: userSummary(user) };
}
