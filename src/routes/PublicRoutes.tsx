import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import Services from '../pages/public/Services';
import Contact from '../pages/public/Contact';
import Appointment from '../pages/public/Appointment';
import Payment from '../pages/public/Payment';
import Schedule from '../pages/public/Schedule';
import ServiceDetail from '../pages/public/ServiceDetail';

export default function PublicRoutes() {
    const location = useLocation();

    return (
        <PublicLayout>
            <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/sobre" element={<About />} />
                    <Route path="/servicos" element={<Services />} />
                    <Route path="/servicos/:slug" element={<ServiceDetail />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/agendar" element={<Schedule />} />
                    <Route path="/pagamentos" element={<Payment />} />
                    <Route path="/appointment" element={<Appointment />} />
                </Routes>
            </AnimatePresence>
        </PublicLayout>
    );
}
