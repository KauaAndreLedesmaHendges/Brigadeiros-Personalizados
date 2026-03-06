🍫 Brigadeiros Personalizados

Sistema web simples para montar bandejas de brigadeiros personalizados, permitindo escolher sabores, visualizar opções com imagens e montar um pedido diretamente pelo navegador.

O projeto foi desenvolvido com HTML, CSS e JavaScript puro, focado em simplicidade, organização de código e utilização de LocalStorage para persistência de dados do carrinho.

📸 Demonstração

O usuário pode:

visualizar diferentes sabores de brigadeiro

adicionar sabores ao carrinho

escolher o tamanho da bandeja

salvar o pedido no navegador

enviar o pedido via WhatsApp

Cada sabor possui imagem, nome e botão de adicionar, criando uma experiência visual simples e intuitiva.

🚀 Funcionalidades

✔ Exibição de sabores com imagens
✔ Sistema de carrinho de pedidos
✔ Seleção de tamanho da bandeja
✔ Controle de quantidade de brigadeiros
✔ Persistência de dados com LocalStorage
✔ Envio do pedido diretamente para WhatsApp
✔ Interface simples e responsiva

🧠 Tecnologias Utilizadas

HTML5 – Estrutura da aplicação

CSS3 – Estilização e layout

JavaScript (Vanilla) – Lógica da aplicação

LocalStorage API – Persistência de dados no navegador

📂 Estrutura do Projeto
Brigadeiros-Personalizados
│
├── index.html
├── style.css
├── script.js
└── README.md

index.html
Estrutura da página e layout do sistema.

style.css
Responsável pela aparência visual da aplicação.

script.js
Contém toda a lógica do sistema:

renderização dos sabores

controle do carrinho

armazenamento local

envio do pedido

⚙️ Como Executar o Projeto

Clone o repositório

git clone https://github.com/KauaAndreLedesmaHendges/Brigadeiros-Personalizados.git

Acesse a pasta

cd Brigadeiros-Personalizados

Abra o arquivo:

index.html

em qualquer navegador.

Nenhuma instalação adicional é necessária.

💾 Armazenamento de Dados

O sistema utiliza LocalStorage, permitindo que o pedido permaneça salvo mesmo após atualizar a página.

Exemplo de chave utilizada:

brigadeiros_cart

Isso permite manter o carrinho ativo até que o usuário limpe os dados.

📱 Envio de Pedido

Após montar a bandeja, o sistema gera automaticamente uma mensagem formatada e abre o WhatsApp com o pedido pronto para envio.

Exemplo de mensagem:

Pedido - Brigadeiros

Cliente: João
Bandeja: 20 unidades

Sabores:
Brigadeiro Tradicional x 10
Brigadeiro de Ninho x 5
Brigadeiro de Morango x 5
🎯 Objetivo do Projeto

Este projeto foi desenvolvido como exercício prático de desenvolvimento web, com foco em:

manipulação do DOM

organização de código JavaScript

persistência de dados no navegador

construção de interfaces simples

Também pode servir como base para sistemas de pedidos para pequenas docerias ou confeitaria.

📌 Melhorias Futuras

integração com banco de dados

painel administrativo

sistema de login

cálculo automático de preço

deploy online

👨‍💻 Autor

Kauã André Ledesma Hendges

Estudante e desenvolvedor em formação focado em desenvolvimento web.

GitHub:
https://github.com/KauaAndreLedesmaHendges
