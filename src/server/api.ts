import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.ts';
import { users, projects, projectImages, likes, follows, comments } from '../db/schema.ts';
import { eq, desc, sql } from 'drizzle-orm';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Need to install uuid

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_mvp_key';

// -- MIDDLEWARE --
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Configuração do Multer para upload local
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// -- AUTH ROUTES --
router.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const id = uuidv4();
    
    await db.insert(users).values({
      id, username, email, passwordHash, fullName,
      createdAt: new Date()
    });
    
    const token = jwt.sign({ id, username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id, username, email, fullName } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, fullName: user.fullName } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/auth/me', authenticate, async (req: any, res) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, req.user.id),
    columns: { passwordHash: false }
  });
  res.json(user);
});

// -- UPLOAD --
router.post('/upload', authenticate, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// -- PROJECTS --
router.get('/projects', async (req, res) => {
  try {
    const allProjects = await db.query.projects.findMany({
      orderBy: [desc(projects.createdAt)],
      with: {
        user: { columns: { id: true, username: true, fullName: true, avatarUrl: true } }
      }
    });
    res.json(allProjects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, req.params.id),
      with: {
        user: { columns: { id: true, username: true, fullName: true, avatarUrl: true, category: true, bio: true } },
        images: { orderBy: (images, { asc }) => [asc(images.orderIndex)] },
        likes: true,
        comments: {
          with: { user: { columns: { id: true, username: true, fullName: true, avatarUrl: true } } }
        }
      }
    });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/projects', authenticate, async (req: any, res) => {
  try {
    const { title, description, category, tools, coverUrl, gallery } = req.body;
    const projectId = uuidv4();
    
    await db.insert(projects).values({
      id: projectId,
      userId: req.user.id,
      title, description, category, coverUrl,
      tools: JSON.stringify(tools),
      createdAt: new Date()
    });

    if (gallery && gallery.length > 0) {
      const imageInserts = gallery.map((url: string, index: number) => ({
        id: uuidv4(),
        projectId,
        imageUrl: url,
        orderIndex: index
      }));
      await db.insert(projectImages).values(imageInserts);
    }
    
    res.json({ id: projectId });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -- USER PROFILE --
router.get('/users/:username', async (req, res) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, req.params.username),
      columns: { passwordHash: false },
      with: {
        projects: { orderBy: [desc(projects.createdAt)] }
      }
    });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router as apiRouter };
