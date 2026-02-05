export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-20 text-center border border-white/5 bg-[#0A0A0A] rounded-xl">
            <div className="w-16 h-16 bg-[#D4AF37]/10 flex items-center justify-center rounded-full mb-6">
                <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-2xl font-serif text-white mb-2">{title}</h2>
            <p className="text-white/40">This module is currently under construction by the architecture team.</p>
        </div>
    );
}
