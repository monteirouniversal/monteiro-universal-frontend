import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';

interface NifLookupProps {
    onEnableManual?: () => void;
    onDataFound: (data: { nome: string; nif: string; tipo?: string }) => void;
    initialValue?: string;
    className?: string; // Additional classes
}

export const NifLookup: React.FC<NifLookupProps> = ({ onDataFound, onEnableManual, initialValue = '', className }) => {
    const [nif, setNif] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (nif.length === 9 || nif.length === 14) {
            lookupNif(nif);
        } else {
            setSuccess(false);
            setError(null);
        }
    }, [nif]);

    const lookupNif = async (nifValue: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.get(`/nif/${nifValue}`);
            // Assuming response.data is the API response object.
            // Check specific fields returned by AngolaAPI
            if (response.data) {
                setSuccess(true);
                onDataFound({
                    nif: response.data.nif || nifValue,
                    nome: response.data.nome || response.data.name || '',
                    tipo: response.data.tipo || 'Desconhecido'
                });
            } else {
                throw new Error("Dados inválidos");
            }
        } catch (err) {
            console.error(err);
            setError("Não conseguimos localizar este NIF automaticamente. Por favor, preencha manualmente.");
            if (onEnableManual) onEnableManual();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative group ${className || ''}`}>
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-2 block">
                NIF / N.º CONTRIBUINTE
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={nif}
                    onChange={(e) => setNif(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                    placeholder="Digite o NIF (9 ou 14 dígitos)..."
                    maxLength={14}
                    className={`
                        w-full bg-black/50 border backdrop-blur-md p-4 pr-12 text-sm text-gold font-bold outline-none transition-all
                        ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-gold'}
                        ${success ? 'border-green-500/50' : ''}
                    `}
                    style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.1)' }}
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {loading && <Loader2 className="w-4 h-4 text-gold animate-spin" />}
                    {!loading && success && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {!loading && error && <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>
            </div>

            {/* Feedback Message */}
            <div className="h-6 mt-2">
                {loading && <p className="text-[10px] text-gold animate-pulse">Consultando Angola API...</p>}
                {error && <p className="text-[10px] text-red-400">{error}</p>}
                {success && <p className="text-[10px] text-green-400">Entidade localizada com sucesso.</p>}
            </div>
        </div>
    );
};
