import { db } from './src/db/index.ts';
import { users, projects } from './src/db/schema.ts';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function seedUser() {
  console.log('Seeding Adriano...');
  
  const existing = await db.query.users.findFirst({
    where: eq(users.username, 'adrianoborges')
  });

  if (existing) {
    console.log('User already seeded!');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash('123456', 10);
  const userId = uuidv4();
  
  await db.insert(users).values({
    id: userId,
    username: 'adrianoborges',
    email: 'adrianoborges.ti@gmail.com',
    passwordHash: passwordHash,
    fullName: 'Adriano Borges',
    bio: 'Desenvolvedor Full-stack apaixonado por criar soluções inovadoras e escaláveis. Especialista em React e Node.js.',
    category: 'Dev',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2564&auto=format&fit=crop',
    createdAt: new Date()
  });

  const projectsData = [
    {
      id: uuidv4(),
      userId: userId,
      title: 'Plataforma de Cursos Online',
      description: 'Uma plataforma completa para venda e consumo de cursos online, com sistema de pagamentos, progresso de aulas e emissão de certificados.',
      category: 'Dev',
      coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      tools: JSON.stringify(['React', 'Node.js', 'PostgreSQL']),
      createdAt: new Date()
    },
    {
      id: uuidv4(),
      userId: userId,
      title: 'App de Gestão de Tarefas',
      description: 'Aplicativo minimalista para gestão de tarefas diárias, com suporte a colaboração em tempo real e modo offline.',
      category: 'Dev',
      coverUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop',
      tools: JSON.stringify(['React Native', 'Firebase']),
      createdAt: new Date()
    }
  ];

  await db.insert(projects).values(projectsData);

  console.log('Adriano seeded successfully!');
  process.exit(0);
}

seedUser().catch(err => {
  console.error(err);
  process.exit(1);
});
