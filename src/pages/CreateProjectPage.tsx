import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/auth';
import { UploadCloud, X, Plus } from 'lucide-react';
import { createMockProject } from '../mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CreateProjectPage() {
  const { token, user } = useAuthStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tools, setTools] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpload = async (file: File) => {
    // Sem backend por enquanto: usa um blob URL local só para preview em desenvolvimento.
    return URL.createObjectURL(file);
  };

  const onCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const url = await handleUpload(e.target.files[0]);
        setCoverUrl(url);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const onGalleryChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const newUrls = [];
        for (let i = 0; i < e.target.files.length; i++) {
          const url = await handleUpload(e.target.files[i]);
          newUrls.push(url);
        }
        setGalleryUrls([...galleryUrls, ...newUrls]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!coverUrl) return alert('Por favor, adicione uma capa.');
    
    setLoading(true);
    
    const toolsArray = tools.split(',').map(t => t.trim()).filter(Boolean);

    try {
      const project = createMockProject(user.id, {
        title, description, category, tools: toolsArray, coverUrl, gallery: galleryUrls
      });

      navigate(`/project/${project.id}`);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card className="p-8 md:p-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Novo Projeto</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Capa do Projeto</label>
            <div
              onClick={() => coverInputRef.current?.click()}
              className={`w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-colors ${coverUrl ? 'border-transparent' : 'border-gray-200 hover:border-primary/60 bg-gray-50 hover:bg-primary/5'}`}
            >
              {coverUrl ? (
                <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-gray-500">
                  <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <span className="text-sm font-medium">Clique para fazer upload da capa</span>
                </div>
              )}
            </div>
            <input type="file" ref={coverInputRef} onChange={onCoverChange} accept="image/*" className="hidden" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Título</label>
                <Input
                  type="text" required value={title} onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Redesign do App Financeiro"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Categoria</label>
                <select
                  value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full h-10 px-4 py-2 rounded-xl border border-input bg-background text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="UI/UX">UI/UX Design</option>
                  <option value="Ilustração">Ilustração</option>
                  <option value="Branding">Branding</option>
                  <option value="Dev">Desenvolvimento Web</option>
                  <option value="Fotografia">Fotografia</option>
                  <option value="3D">3D</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Ferramentas (separadas por vírgula)</label>
                <Input
                  type="text" value={tools} onChange={e => setTools(e.target.value)}
                  placeholder="Figma, React, Tailwind..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Descrição</label>
              <Textarea
                rows={8} value={description} onChange={e => setDescription(e.target.value)}
                className="resize-none"
                placeholder="Conte sobre o processo, o desafio e a solução..."
              />
            </div>
          </div>

          {/* Gallery */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-bold text-gray-900">Galeria de Imagens</label>
              <button
                type="button" onClick={() => galleryInputRef.current?.click()}
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="w-4 h-4" /> Adicionar imagens
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryUrls.map((url, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                  <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button" onClick={() => setGalleryUrls(galleryUrls.filter((_, idx) => idx !== i))}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div
                onClick={() => galleryInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/60 bg-gray-50 flex items-center justify-center cursor-pointer transition-colors"
              >
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <input type="file" multiple ref={galleryInputRef} onChange={onGalleryChange} accept="image/*" className="hidden" />
          </div>

          <div className="pt-8 flex justify-end">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? 'Publicando...' : 'Publicar Projeto'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
