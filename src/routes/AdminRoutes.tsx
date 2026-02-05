import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import Leads from '../pages/admin/Leads';
import Contacts from '../pages/admin/Contacts';
import Clients from '../pages/admin/Clients';
import Meetings from '../pages/admin/Meetings';
import Payments from '../pages/admin/Payments';
import Services from '../pages/admin/Services';
import Appointments from '../pages/admin/Appointments';
import Reports from '../pages/admin/BusinessReports';
import AuditLogs from '../pages/admin/AuditLogs';
import Availability from '../pages/admin/Availability';
import Settings from '../pages/admin/Settings';
import Finances from '../pages/admin/Finances';
import Invoices from '../pages/admin/Invoices';
import Integrations from '../pages/admin/Integrations';
import FiscalIntelligence from '../pages/admin/FiscalIntelligence';
import Campaigns from '../pages/admin/Campaigns';

import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

export default function AdminRoutes() {
    const { isAuthenticated, user, logout } = useAuth();
    // 1. Check if authenticated
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    // 2. Check if user is an Admin (Role must not be CLIENT)
    if (user?.role === 'CLIENT') {
        logout(); // Security measure: logout if trying to bypass admin routes
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <>
            <Helmet>
                <title>Portal Monteiro | MG Admin</title>
            </Helmet>
            <Routes>
                <Route element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="leads" element={<Leads />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="meetings" element={<Meetings />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="services" element={<Services />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="availability" element={<Availability />} />
                    <Route path="finances" element={<Finances />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="fiscal-intelligence" element={<FiscalIntelligence />} />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="integrations" element={<Integrations />} />
                    <Route path="biz-reports" element={<Reports />} />
                    <Route path="audit-logs" element={<AuditLogs />} />
                    <Route path="settings" element={<Settings />} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Route>
            </Routes>
        </>
    );
}

