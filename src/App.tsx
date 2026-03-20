/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProposalsList } from './pages/ProposalsList';
import { ProposalWizard } from './pages/ProposalWizard';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { FOIAEngine } from './pages/FOIAEngine';
import ProposalWorkspace from './pages/ProposalWorkspace';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProposalsList />} />
          <Route path="proposals" element={<ProposalsList />} />
          <Route path="knowledge" element={<KnowledgeBase />} />
          <Route path="foia" element={<FOIAEngine />} />
          <Route path="settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
        </Route>
        <Route path="/proposals/new" element={<ProposalWizard />} />
        <Route path="/workspace" element={<ProposalWorkspace />} />
      </Routes>
    </BrowserRouter>
  );
}
