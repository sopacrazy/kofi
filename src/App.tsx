import { Routes, Route, Link, useNavigate } from 'react-router';
import { useAuthStore } from './store/auth';
import { Heart, Home, Bell, PlusSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage';
import CreateProjectPage from './pages/CreateProjectPage';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">Folio</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <Link to={`/@${user.username}`}>Sua página</Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link to="/create">
                  <PlusSquare className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Link to="/">
                  <Home className="w-5 h-5" />
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full ml-1 outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="w-9 h-9 border border-gray-100">
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to={`/@${user.username}`}>Meu perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Cadastrar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage isRegister />} />
          <Route path="/:handle" element={<ProfilePage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/create" element={<CreateProjectPage />} />
        </Routes>
      </main>
    </div>
  );
}
