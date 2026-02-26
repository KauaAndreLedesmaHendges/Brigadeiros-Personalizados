function CarregarDados() {
    const brigadeiros = JSON.parse(localStorage.getItem('brigadeiros')) || [];
    const carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = '';
    brigadeiros.forEach((brigadeiro, index) => {
        const item = document.createElement('div');
        item.className = 'carrinho-item';
        item.innerHTML = `
            <span>${brigadeiro}</span>
            <button onclick="removerBrigadeiro(${index})">Remover</button>
        `;
        carrinho.appendChild(item);
    });
}