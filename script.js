const STORAGE_KEY = 'brigadeiros_cart';

// sabores
const FLAVORS = [
  { id: 'tradicional', name: 'Brigadeiro Tradicional' },
  { id: 'leite-ninho',  name: 'Brigadeiro de Leite Ninho' },
  { id: 'morango',      name: 'Brigadeiro de Morango' },
  { id: 'nutella',      name: 'Brigadeiro de Ninho com Nutella' },
  { id: 'beijinho',     name: 'Brigadeiro de Beijinho' },
  { id: 'pistache',     name: 'Brigadeiro de Pistache' },
  { id: 'oreo',         name: 'Brigadeiro de Oreo' },
  { id: 'esticadinho',  name: 'Brigadeiro de Esticadinho' },
  { id: 'churrus',      name: 'Brigadeiro de Churrus' }
];

// estado
let state = {
  trayLimit: null,           // número (20,40,80)
  counts: {},               // { flavorId: qty }
  customer: { name:'', phone:'' }
};

// inicializa contadores
FLAVORS.forEach(f => state.counts[f.id] = 0);


const optionsList = document.getElementById('optionsList');
const cartList = document.getElementById('cartList');
const traySelect = document.getElementById('tray');
const totalUnitsEl = document.getElementById('totalUnits');
const trayLimitEl = document.getElementById('trayLimit');
const unitsRemainingEl = document.getElementById('unitsRemaining');
const custNameEl = document.getElementById('custName');
const custPhoneEl = document.getElementById('custPhone');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const sendBtn = document.getElementById('sendBtn');


function renderOptions(){
  optionsList.innerHTML = '';
  FLAVORS.forEach(f => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.innerHTML = `
      <h3>${f.name}</h3>
      <div>
        <button data-id="${f.id}" class="add-btn">Adicionar</button>
      </div>
    `;
    optionsList.appendChild(card);
  });

  
  optionsList.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      addBrigadeiro(id);
    });
  });
}

function renderCart(){
  cartList.innerHTML = '';
  const entries = Object.entries(state.counts).filter(([_, qty]) => qty > 0);
  if(entries.length === 0){
    cartList.innerHTML = '<div class="muted small">Carrinho vazio</div>';
  } else {
    entries.forEach(([id, qty]) => {
      const flavor = FLAVORS.find(f => f.id === id);
      const node = document.createElement('div');
      node.className = 'cart-item';
      node.innerHTML = `
        <div class="left">
          <div>
            <div style="font-weight:600">${flavor.name}</div>
            <div class="small muted">${qty} unidade(s)</div>
          </div>
        </div>
        <div>
          <button class="dec" data-id="${id}">−</button>
          <span class="qty">${qty}</span>
          <button class="inc" data-id="${id}">+</button>
          <button class="remove" data-id="${id}">Remover</button>
        </div>
      `;
      cartList.appendChild(node);
    });

    // binds
    cartList.querySelectorAll('button.inc').forEach(b => b.addEventListener('click', () => {
      addBrigadeiro(b.getAttribute('data-id'));
    }));
    cartList.querySelectorAll('button.dec').forEach(b => b.addEventListener('click', () => {
      removeOne(b.getAttribute('data-id'));
    }));
    cartList.querySelectorAll('button.remove').forEach(b => b.addEventListener('click', () => {
      removeAllOf(b.getAttribute('data-id'));
    }));
  }

  updateSummary();
}

// LOGICA
function totalUnits(){
  return Object.values(state.counts).reduce((a,b)=>a+b,0);
}

function updateSummary(){
  const total = totalUnits();
  totalUnitsEl.textContent = total;
  trayLimitEl.textContent = state.trayLimit || '—';
  if(state.trayLimit) {
    const remaining = Math.max(0, state.trayLimit - total);
    unitsRemainingEl.textContent = remaining;
    // se bandeja completa habilita enviar
    sendBtn.disabled = (total !== state.trayLimit);
  } else {
    unitsRemainingEl.textContent = '—';
    sendBtn.disabled = true;
  }
  saveToStorage(); // persist sempre que resumo é atualizado
}

function addBrigadeiro(flavorId){
  if(!state.trayLimit){
    alert('Selecione o tamanho da bandeja antes de adicionar sabores.');
    return;
  }
  if(totalUnits() >= state.trayLimit){
    alert('Limite da bandeja atingido.');
    return;
  }
  state.counts[flavorId] = (state.counts[flavorId] || 0) + 1;
  renderCart();
}

function removeOne(flavorId){
  if((state.counts[flavorId] || 0) <= 0) return;
  state.counts[flavorId] -= 1;
  renderCart();
}

function removeAllOf(flavorId){
  state.counts[flavorId] = 0;
  renderCart();
}

function clearCart(){
  Object.keys(state.counts).forEach(k => state.counts[k] = 0);
  state.trayLimit = null;
  traySelect.value = '';
  custNameEl.value = '';
  custPhoneEl.value = '';
  state.customer = {name:'', phone:''};
  renderCart();
  saveToStorage();
}

// STORAGE
function saveToStorage(){
  const payload = {
    trayLimit: state.trayLimit,
    counts: state.counts,
    customer: {
      name: custNameEl.value.trim(),
      phone: custPhoneEl.value.trim()
    }
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch(e) {
    console.warn('Falha ao salvar localStorage', e);
  }
}

function loadFromStorage(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;
  try {
    const p = JSON.parse(raw);
    if(p.trayLimit) {
      state.trayLimit = p.trayLimit;
      traySelect.value = String(p.trayLimit);
    }
    if(p.counts){
      Object.keys(state.counts).forEach(k => state.counts[k] = p.counts[k] || 0);
    }
    if(p.customer){
      custNameEl.value = p.customer.name || '';
      custPhoneEl.value = p.customer.phone || '';
    }
  } catch(e) {
    console.warn('Erro ao carregar localStorage', e);
  }
}

// WHATSAPP
function validateBeforeSend(){
  if(!state.trayLimit){ alert('Selecione o tamanho da bandeja.'); return false; }
  const total = totalUnits();
  if(total !== state.trayLimit){ alert(`A bandeja deve estar completa. Faltam ${state.trayLimit - total} unidade(s).`); return false; }
  const name = custNameEl.value.trim();
  const phone = custPhoneEl.value.trim();
  if(!name){ alert('Preencha o nome.'); return false; }
  if(!/^\d{10,15}$/.test(phone)){ alert('Preencha o WhatsApp com apenas números e código do país (ex: 5511999887766).'); return false; }
  return true;
}

function sendViaWhatsApp(){
  if(!validateBeforeSend()) return;
  const name = encodeURIComponent(custNameEl.value.trim());
  const phone = custPhoneEl.value.trim();
  const lines = [];
  lines.push(`*Pedido — Brigadeiros*`);
  lines.push(`Cliente: ${custNameEl.value.trim()}`);
  lines.push(`Bandeja: ${state.trayLimit} unidades`);
  lines.push(`Sabores:`);
  Object.entries(state.counts).forEach(([id, qty]) => {
    if(qty > 0){
      const f = FLAVORS.find(x => x.id === id);
      lines.push(`${f.name} x ${qty}`);
    }
  });
  const text = encodeURIComponent(lines.join('\n'));
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, '_blank');
}

traySelect.addEventListener('change', (e) => {
  const v = e.target.value;
  state.trayLimit = v ? Number(v) : null;
  updateSummary();
});

saveBtn.addEventListener('click', () => {
  saveToStorage();
  alert('Pedido salvo no navegador.');
});

clearBtn.addEventListener('click', () => {
  if(confirm('Limpar carrinho e dados?')) clearCart();
});

sendBtn.addEventListener('click', () => {
  sendViaWhatsApp();
});

custNameEl.addEventListener('input', saveToStorage);
custPhoneEl.addEventListener('input', saveToStorage);


document.addEventListener('DOMContentLoaded', () => {
  renderOptions();
  loadFromStorage();
  renderCart();
});