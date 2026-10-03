/**
 * LigaMaster - Módulo de Tesorería y Finanzas Oficial
 * Asociación de Fútbol de Arauco
 * 
 * Reemplaza y supera con creces el software arcaico de SUYMI ($70.000/año)
 * permitiendo a la directiva y tesorero de la asociación llevar:
 * - Libro de Ingresos (Cuotas de clubes, multas de tarjetas amarillas/rojas, pases)
 * - Libro de Egresos (Pago a ternas del CAPA, arriendo de estadio, balones, premiación)
 * - Balance Financiero en tiempo real y descarga en Excel/CSV
 * - Emisión e impresión de Comprobantes Oficiales de Ingreso/Egreso
 */

import { getDb, saveDb } from './data.js';

let currentFilter = 'all';

export function initTreasuryModule() {
  renderTreasuryOverview();
  renderTransactionsTable();
  setupTreasuryEventListeners();
}

/**
 * Renderiza los totales consolidados de la caja chica y finanzas
 */
export function renderTreasuryOverview() {
  const db = getDb();
  const ledger = db.treasuryLedger || [];

  let totalIngresos = 0;
  let totalEgresos = 0;

  ledger.forEach(item => {
    if (item.type === 'ingreso') totalIngresos += item.amount;
    else if (item.type === 'egreso') totalEgresos += item.amount;
  });

  const balanceNeto = totalIngresos - totalEgresos;

  const totalIngEl = document.getElementById('treasury-total-ingresos');
  const totalEgrEl = document.getElementById('treasury-total-egresos');
  const balanceEl = document.getElementById('treasury-balance-neto');
  const countEl = document.getElementById('treasury-movements-count');

  if (totalIngEl) totalIngEl.textContent = formatCurrency(totalIngresos);
  if (totalEgrEl) totalEgrEl.textContent = formatCurrency(totalEgresos);
  if (balanceEl) {
    balanceEl.textContent = formatCurrency(balanceNeto);
    balanceEl.style.color = balanceNeto >= 0 ? 'var(--accent-pitch)' : 'var(--accent-red-card)';
  }
  if (countEl) countEl.textContent = `${ledger.length} movimientos registrados`;
}

/**
 * Renderiza la tabla de movimientos contables
 */
export function renderTransactionsTable(filter = currentFilter) {
  const db = getDb();
  const tbody = document.getElementById('treasury-table-body');
  if (!tbody) return;

  const ledger = db.treasuryLedger || [];
  const filtered = ledger.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          No se registran movimientos contables para el filtro seleccionado.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  const sorted = [...filtered].reverse();

  sorted.forEach(item => {
    const isIngreso = item.type === 'ingreso';
    const badgeClass = isIngreso ? 'habilitado' : 'alerta';
    const amountColor = isIngreso ? '#00ff85' : '#f87171';
    const sign = isIngreso ? '+' : '-';

    html += `
      <tr>
        <td style="font-family: monospace; font-size: 0.8rem; color: var(--text-muted);">${item.date}</td>
        <td>
          <span class="status-badge ${badgeClass}" style="text-transform: uppercase; font-size: 0.68rem;">
            ${isIngreso ? '🟢 Ingreso' : '🔴 Egreso'}
          </span>
        </td>
        <td>
          <strong style="color: #fff; font-size: 0.85rem;">${item.category}</strong><br>
          <small style="color: var(--text-muted); font-size: 0.72rem;">${item.clubName}</small>
        </td>
        <td style="font-size: 0.8rem; color: #cbd5e1; max-width: 320px;">${item.concept}</td>
        <td style="font-family: var(--font-display); font-weight: 800; font-size: 0.95rem; color: ${amountColor}; text-align: right;">
          ${sign}${formatCurrency(item.amount)}
        </td>
        <td style="font-family: monospace; font-size: 0.75rem; color: var(--accent-gold); text-align: center;">
          ${item.receiptFolio}
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm btn-secondary btn-print-receipt" data-folio="${item.receiptFolio}" title="Ver e Imprimir Comprobante Oficial">
            🖨️
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;

  document.querySelectorAll('.btn-print-receipt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const folio = e.currentTarget.getAttribute('data-folio');
      printReceiptModal(folio);
    });
  });
}

/**
 * Agrega un nuevo movimiento al libro de tesorería
 */
export function addTreasuryMovement(movementData) {
  const db = getDb();
  if (!db.treasuryLedger) db.treasuryLedger = [];

  const nextId = 'mov-' + String(db.treasuryLedger.length + 1).padStart(2, '0');
  const nextFolioNum = String(db.treasuryLedger.length + 85).padStart(3, '0');
  const prefix = movementData.type === 'ingreso' ? 'ING-2026-' : 'EGR-2026-';

  const newMovement = {
    id: nextId,
    date: movementData.date || new Date().toLocaleDateString('es-CL'),
    type: movementData.type,
    category: movementData.category,
    clubId: movementData.clubId || 'asociacion',
    clubName: movementData.clubName || 'Asociación de Fútbol de Arauco',
    concept: movementData.concept,
    amount: parseInt(movementData.amount, 10) || 0,
    receiptFolio: prefix + nextFolioNum,
    status: "pagado"
  };

  db.treasuryLedger.push(newMovement);
  saveDb(db);

  renderTreasuryOverview();
  renderTransactionsTable();
  return newMovement;
}

/**
 * Exporta el libro de tesorería completo a un archivo CSV compatible con Excel
 */
export function exportTreasuryToCsv() {
  const db = getDb();
  const ledger = db.treasuryLedger || [];

  let csvContent = "Folio,Fecha,Tipo,Categoria,Club/Entidad,Concepto,Monto (CLP),Estado\n";

  ledger.forEach(item => {
    const cleanConcept = `"${item.concept.replace(/"/g, '""')}"`;
    const cleanClub = `"${item.clubName.replace(/"/g, '""')}"`;
    csvContent += `${item.receiptFolio},${item.date},${item.type.toUpperCase()},${item.category},${cleanClub},${cleanConcept},${item.amount},${item.status}\n`;
  });

  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Balance_Tesoreria_Arauco_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Modal con Comprobante Oficial Imprimible
 */
export function printReceiptModal(folioId) {
  const db = getDb();
  const item = (db.treasuryLedger || []).find(m => m.receiptFolio === folioId);
  if (!item) return;

  const modal = document.getElementById('modal-receipt-backdrop');
  const content = document.getElementById('modal-receipt-content');
  if (!modal || !content) {
    const msg = `Comprobante Oficial • Folio: ${item.receiptFolio} • ${item.concept} • Monto: ${formatCurrency(item.amount)}`;
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(msg, 'info');
    } else {
      alert(msg);
    }
    return;
  }

  const isIngreso = item.type === 'ingreso';

  content.innerHTML = `
    <div style="background: white; color: #1e293b; padding: 2rem; border-radius: 12px; max-width: 520px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-family: sans-serif;">
      
      <!-- Encabezado Oficial -->
      <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div style="font-size: 1.1rem; font-weight: 900; text-transform: uppercase; color: #0f172a; letter-spacing: 0.05em;">
          ASOCIACIÓN DE FÚTBOL DE ARAUCO
        </div>
        <div style="font-size: 0.8rem; color: #64748b; font-weight: 700;">
          LIGAMASTER • SISTEMA DE GESTIÓN Y ESTADÍSTICAS DEL FÚTBOL
        </div>
        <div style="font-size: 0.75rem; color: #64748b;">
          Sede Oficial: Julio Montt Nº 386, Población 10 de Julio, Arauco
        </div>
        
        <div style="margin-top: 1rem; display: inline-block; background: ${isIngreso ? '#dcfce7' : '#fee2e2'}; color: ${isIngreso ? '#15803d' : '#b91c1c'}; padding: 0.35rem 1rem; border-radius: 20px; font-weight: 900; font-size: 0.9rem;">
          COMPROBANTE OFICIAL DE ${item.type.toUpperCase()} • FOLIO: ${item.receiptFolio}
        </div>
      </div>

      <!-- Detalle de la Operación -->
      <div style="font-size: 0.88rem; line-height: 1.8; margin-bottom: 1.5rem;">
        <div><strong>Fecha de Operación:</strong> ${item.date}</div>
        <div><strong>Club / Beneficiario:</strong> ${item.clubName}</div>
        <div><strong>Categoría Contable:</strong> ${item.category}</div>
        <div><strong>Glosa / Concepto:</strong> ${item.concept}</div>
        <div style="margin-top: 0.75rem; padding: 0.75rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid ${isIngreso ? '#00ff85' : '#ef4444'}; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 1rem;">TOTAL CANCELADO:</span>
          <span style="font-family: monospace; font-size: 1.3rem; font-weight: 900; color: #0f172a;">${formatCurrency(item.amount)}</span>
        </div>
      </div>

      <!-- Firmas de Responsabilidad -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; text-align: center; margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px dashed #cbd5e1;">
        <div>
          <div style="border-bottom: 1px solid #94a3b8; height: 35px; margin-bottom: 0.3rem;"></div>
          <div style="font-size: 0.75rem; font-weight: 800; color: #334155;">Tesorero General</div>
          <div style="font-size: 0.65rem; color: #64748b;">Directorio Oficial</div>
        </div>
        <div>
          <div style="border-bottom: 1px solid #94a3b8; height: 35px; margin-bottom: 0.3rem;"></div>
          <div style="font-size: 0.75rem; font-weight: 800; color: #334155;">Firma y Timbre Conforme</div>
          <div style="font-size: 0.65rem; color: #64748b;">Club / Entidad Receptora</div>
        </div>
      </div>

      <!-- Botón de Impresión -->
      <div style="margin-top: 1.5rem; text-align: center;">
        <button class="btn btn-sm btn-primary" onclick="window.print()" style="padding: 0.5rem 1.5rem;">
          🖨️ Imprimir Comprobante Oficial
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function setupTreasuryEventListeners() {
  const filterSelect = document.getElementById('treasury-filter-type');
  filterSelect?.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderTransactionsTable(currentFilter);
  });

  document.getElementById('btn-export-treasury-csv')?.addEventListener('click', () => {
    exportTreasuryToCsv();
  });

  document.getElementById('btn-new-treasury-movement')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-new-movement-backdrop');
    if (modal) modal.classList.add('active');
  });

  document.getElementById('modal-movement-close')?.addEventListener('click', () => {
    document.getElementById('modal-new-movement-backdrop')?.classList.remove('active');
  });

  document.getElementById('modal-receipt-close')?.addEventListener('click', () => {
    document.getElementById('modal-receipt-backdrop')?.classList.remove('active');
  });

  const form = document.getElementById('form-new-treasury-movement');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('mov-type')?.value;
    const category = document.getElementById('mov-category')?.value;
    const clubId = document.getElementById('mov-club')?.value;
    const clubName = document.getElementById('mov-club')?.selectedOptions[0]?.text || 'Asociación de Fútbol de Arauco';
    const amount = document.getElementById('mov-amount')?.value;
    const concept = document.getElementById('mov-concept')?.value;

    addTreasuryMovement({ type, category, clubId, clubName, amount, concept });

    document.getElementById('modal-new-movement-backdrop')?.classList.remove('active');
    form.reset();
    if (window.showToast) window.showToast("Movimiento registrado y comprobante emitido exitosamente.");
  });
}

function formatCurrency(val) {
  return '$' + (val || 0).toLocaleString('es-CL');
}
