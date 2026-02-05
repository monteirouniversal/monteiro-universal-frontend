import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.status === 200 || response.status === 201) {
        login(response.data.user, response.data.token);
        navigate('/portal-monteiro/dashboard');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Erro de conexão com o servidor de elite.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden text-foreground">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="glass-card p-10 space-y-8 relative">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-sm flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter text-white">Acesso Restrito.</h1>
            <p className="text-white/40 text-sm font-medium">
              Autentique-se para gerir a infraestrutura da Monteiro Universal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-white/30 ml-1">Endereço de Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-primary/50 text-white pl-12 pr-4 py-4 rounded-sm transition-all outline-none"
                  placeholder="admin@monteirouniversal.ao"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-white/30 ml-1">Senha de Autoridade</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 focus:border-primary/50 text-white pl-12 pr-4 py-4 rounded-sm transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-elite btn-elite-primary w-full group"
            >
              {loading ? 'A processar...' : 'Validar Credenciais'}
              {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="pt-6 border-t border-white/5 text-center">
            <Link to="/" className="text-xs font-bold text-white/20 hover:text-white transition-colors tracking-widest uppercase">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}