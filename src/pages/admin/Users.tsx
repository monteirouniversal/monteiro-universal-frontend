import { useState, useEffect } from 'react';
import {
  Plus,
  Circle,
  Trash2,
  Loader2,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import socket from '../../services/socket';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CLIENTE' });

  useEffect(() => {
    fetchUsers();

    socket.on('admin:user_created', fetchUsers);
    socket.on('admin:user_updated', fetchUsers);
    socket.on('admin:user_deleted', fetchUsers);

    return () => {
      socket.off('admin:user_created');
      socket.off('admin:user_updated');
      socket.off('admin:user_deleted');
    };
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', formData);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'CLIENTE' });
      fetchUsers();
    } catch (error) {
      alert("Erro ao criar usuário");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Certeza que deseja remover este utilizador?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert("Erro ao deletar");
      }
    }
  };

  const roles = [
    { value: 'ADMIN', label: 'Admin', color: 'bg-primary' },
    { value: 'FINANCEIRO', label: 'Financeiro', color: 'bg-acid-green' },
    { value: 'AUDITOR', label: 'Auditor', color: 'bg-blue-600' },
    { value: 'OPERACIONAL', label: 'Operacional', color: 'bg-blue-500' },
    { value: 'SUPORTE', label: 'Suporte', color: 'bg-orange-500' },
    { value: 'CLIENTE', label: 'Cliente', color: 'bg-white/20' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tighter">
            GESTÃO DE <span className="text-primary italic">UTILIZADORES</span>
          </h1>
          <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mt-1">Controle de acessos e perfis da Monteiro Universal</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        >
          <Plus className="w-4 h-4" />
          Novo Utilizador
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-deep-charcoal border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01]">
              <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Identidade</th>
              <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Nível</th>
              <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Estado</th>
              <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-20"><Loader2 className="animate-spin mx-auto text-primary" /></td></tr>
            ) : users.map(user => (
              <tr key={user.id} className="hover:bg-white/[0.02] group">
                <td className="px-8 py-5">
                  <p className="text-[11px] font-black uppercase text-white">{user.name}</p>
                  <p className="text-[10px] text-white/30">{user.email}</p>
                </td>
                <td className="px-8 py-5">
                  <span className="px-2 py-0.5 bg-white/10 text-[9px] font-black uppercase">{user.role}</span>
                </td>
                <td className="px-8 py-5">
                  <Circle className={`w-2 h-2 fill-current ${user.active ? 'text-acid-green' : 'text-red-500'}`} />
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => handleDeleteUser(user.id)} className="p-2 hover:bg-red-500/20 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-deep-charcoal border border-white/10 p-8 w-full max-w-md relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/20 hover:text-white"><X /></button>
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-tighter">Novo <span className="text-primary italic">Registro</span></h2>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <input
                type="text" placeholder="NOME COMPLETO"
                className="w-full bg-white/5 border border-white/10 p-4 text-[10px] font-bold text-white outline-none focus:border-primary"
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
              />
              <input
                type="email" placeholder="EMAIL"
                className="w-full bg-white/5 border border-white/10 p-4 text-[10px] font-bold text-white outline-none focus:border-primary"
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required
              />
              <input
                type="password" placeholder="SENHA INICIAL"
                className="w-full bg-white/5 border border-white/10 p-4 text-[10px] font-bold text-white outline-none focus:border-primary"
                value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required
              />
              <select
                className="w-full bg-white/5 border border-white/10 p-4 text-[10px] font-bold text-white outline-none"
                value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
              >
                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              <button type="submit" className="w-full py-4 bg-primary text-black font-black uppercase text-[10px] hover:bg-white transition-all">
                Salvar Utilizador
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}