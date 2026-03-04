const STORAGE_KEY = 'brigadeiros_cart';

const FLAVORS = [
  {
    id: 'tradicional',
    name: 'Brigadeiro Tradicional',
    img: 'https://www.marajoaraalimentos.com.br/2018/wp-content/uploads/2020/07/349-scaled.jpg'
  },
  {
    id: 'leite-ninho',
    name: 'Brigadeiro de Leite Ninho',
    img: 'https://cozinhadakika.com.br/wp-content/uploads/2019/06/Receita-de-Brigadeiro-de-Leite-Ninho-960x586.jpg'
  },
  {
    id: 'morango',
    name: 'Brigadeiro de Morango',
    img: 'https://receitadaboa.com.br/wp-content/uploads/2024/08/iStock-1315466891.jpg'
  },
  {
    id: 'nutella',
    name: 'Brigadeiro de Ninho com Nutella',
    img: 'https://guiadacozinha.com.br/wp-content/uploads/2019/10/brigadeiro-ninho-nutella-1.jpg'
  },
  {
    id: 'beijinho',
    name: 'Brigadeiro de Beijinho',
    img: 'https://assets.betalabs.net/production/bakeawish/item-images/833b04fd2e6c534f0c139764cba0ae67.jpg'
  },
  {
    id: 'pistache',
    name: 'Brigadeiro de Pistache',
    img: 'https://www.lemebrigadeiros.com.br/wp-content/uploads/2024/07/10bec868-6437-4fc3-8b16-6eca4a2d1903.jpg'
  },
  {
    id: 'oreo',
    name: 'Brigadeiro de Oreo',
    img: 'https://www.mariareceita.com.br/wp-content/uploads/2025/03/Brigadeiro-de-Oreo-ou-Negresco.jpg'
  },
  {
    id: 'esticadinho',
    name: 'Brigadeiro de stikadinho',
    img: 'data:image/jpeg;base64,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'
  },
  {
    id: 'churrus',
    name: 'Brigadeiro de Churrus',
    img: 'https://www.confeitariahelena.com.br/img/painel/medias/docinho-brigadeiro-de-churros-confeitaria-helena.jpg'
  }
];

// estado
let state = {
  trayLimit: null,
  counts: {},
  customer: { name: '', phone: '' }
};

// inicializa counts
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


const FALLBACK_IMG = 'https://via.placeholder.com/400x300?text=Imagem+indispon%C3%ADvel';

// render opções com imagem em cima
function renderOptions(){
  optionsList.innerHTML = '';
  FLAVORS.forEach(f => {
    const card = document.createElement('div');
    card.className = 'option-card';
    card.innerHTML = `
      <img src="${f.img}" alt="${f.name}" class="brigadeiro-img" onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" />
      <h3>${f.name}</h3>
      <div style="margin-top:8px; display:flex; gap:4px; justify-content:center; flex-wrap:wrap;">
        <button data-id="${f.id}" data-qty="1" class="add-btn">+1</button>
        <button data-id="${f.id}" data-qty="5" class="add-btn">+5</button>
        <button data-id="${f.id}" data-qty="10" class="add-btn">+10</button>
      </div>
    `;
    optionsList.appendChild(card);
  });

  // binds (quantity buttons)
  optionsList.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const qty = Number(btn.getAttribute('data-qty')) || 1;
      addBrigadeiro(id, qty);
    });
  });
}

// render carrinho
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
          <img src="${flavor.img}" alt="${flavor.name}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;margin-right:8px" onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" />
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
    cartList.querySelectorAll('button.inc').forEach(b => b.addEventListener('click', () => addBrigadeiro(b.getAttribute('data-id'))));
    cartList.querySelectorAll('button.dec').forEach(b => b.addEventListener('click', () => removeOne(b.getAttribute('data-id'))));
    cartList.querySelectorAll('button.remove').forEach(b => b.addEventListener('click', () => removeAllOf(b.getAttribute('data-id'))));
  }

  updateSummary();
}

// lógica
function totalUnits(){ return Object.values(state.counts).reduce((a,b)=>a+b,0); }

function updateSummary(){
  const total = totalUnits();
  totalUnitsEl.textContent = total;
  trayLimitEl.textContent = state.trayLimit || '—';
  if(state.trayLimit) {
    const remaining = Math.max(0, state.trayLimit - total);
    unitsRemainingEl.textContent = remaining;
    sendBtn.disabled = (total !== state.trayLimit);
  } else {
    unitsRemainingEl.textContent = '—';
    sendBtn.disabled = true;
  }
  saveToStorage();
}

function addBrigadeiro(flavorId, qty = 1){
  if(!state.trayLimit){
    alert('Selecione o tamanho da bandeja antes de adicionar sabores.');
    return;
  }
  const total = totalUnits();
  const remaining = state.trayLimit - total;
  if(qty > remaining){
    if(remaining > 0) {
      alert(`Só restam ${remaining} unidade(s) disponíveis na bandeja.`);
    } else {
      alert('Limite da bandeja atingido.');
    }
    return;
  }
  state.counts[flavorId] = (state.counts[flavorId] || 0) + qty;
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

// storage
function saveToStorage(){
  
  state.customer.name = custNameEl.value.trim();
  state.customer.phone = custPhoneEl.value.trim();

  const payload = {
    trayLimit: state.trayLimit,
    counts: state.counts,
    customer: { ...state.customer }
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
    if(p.trayLimit){
      state.trayLimit = p.trayLimit;
      traySelect.value = String(p.trayLimit);
    }
    if(p.counts){
      Object.keys(state.counts).forEach(k => state.counts[k] = p.counts[k] || 0);
    }
    if(p.customer){
      state.customer.name = p.customer.name || '';
      state.customer.phone = p.customer.phone || '';
      custNameEl.value = state.customer.name;
      custPhoneEl.value = state.customer.phone;
    }
  } catch(e) {
    console.warn('Erro ao carregar localStorage', e);
  }
}

// whatsapp
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

// eventos
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

sendBtn.addEventListener('click', () => sendViaWhatsApp());
[custNameEl, custPhoneEl].forEach(el => el.addEventListener('input', saveToStorage));

// boot
document.addEventListener('DOMContentLoaded', () => {
  renderOptions();
  loadFromStorage();
  renderCart();
});