/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProposalsList } from './pages/ProposalsList';
import { ProposalWizard } from './pages/ProposalWizard';
import { BusinessProfile } from './pages/BusinessProfile';
import { FOIAEngine } from './pages/FOIAEngine';
import { ManagedDelivery } from './pages/ManagedDelivery';
import { ClientAccountDetail } from './pages/ClientAccountDetail';
import { ClientPortal } from './pages/ClientPortal';
import { Settings } from './pages/Settings';
import ProposalWorkspace from './pages/ProposalWorkspace';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProposalsList />} />
          <Route path="proposals" element={<ProposalsList />} />
          <Route path="business-profile" element={<BusinessProfile />} />
          <Route path="foia" element={<FOIAEngine />} />
          <Route path="managed-delivery" element={<ManagedDelivery />} />
          <Route path="managed-delivery/:clientId" element={<ClientAccountDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/proposals/new" element={<ProposalWizard />} />
        <Route path="/workspace" element={<ProposalWorkspace />} />
        <Route path="/client-portal" element={<ClientPortal />} />
      </Routes>
    </BrowserRouter>
  );
}
