# ♟️ Xadrez Web

> Uma experiência clássica e moderna de Xadrez, rodando diretamente no seu navegador.

Bem-vindo ao **Xadrez Web**! Este projeto é uma implementação elegante e modular do jogo de xadrez utilizando **Vanilla JavaScript (ES Modules)**, focada em código limpo, performance e uma interface intuitiva.

Desafie seus amigos ou teste suas estratégias em um tabuleiro responsivo e interativo!

## ✨ Funcionalidades

- **Tabuleiro Interativo**: Renderização dinâmica com peças em Unicode.
- **Regras Completas**: Validação de movimentos legais para todas as peças.
- **Assistência Visual**: Highlights automáticos para movimentos possíveis e capturas.
- **Sistema de Status**:
  - Indicador de Turno (Brancas/Pretas).
  - Detecção de Xeque (⚠️ CHECK!).
  - Detecção de Fim de Jogo (Xeque-mate ou Empate).
- **Controles**: Botão para iniciar nova partida e desistir (Resign).

## 🚀 Como Executar

Este projeto não requer build tools complexos. É puro JavaScript!

### Opção 1: Servidor Local (Recomendado)

Para evitar bloqueios de CORS com módulos ES6, é ideal rodar um servidor local simples.

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Na raiz do projeto, rode:

   ```bash
   npx serve .
   ```

3. Acesse `http://localhost:3000` (ou a porta indicada).

### Opção 2: VS Code Live Server

Se você usa o VS Code, basta instalar a extensão **Live Server** e clicar em "Go Live".

## 📂 Estrutura do Projeto

O código foi organizado seguindo princípios de responsabilidade única:

```
src/
├── scripts/
│   ├── main.js             # Ponto de entrada e controlador de UI
│   ├── constants.js        # Constantes (Peças Unicode, Cores)
│   ├── game/
│   │   └── ChessGame.js    # Lógica "core" do jogo (regras, estado)
│   ├── component/
│   │   └── boardComponent.js # Renderização e manipulação do DOM do tabuleiro
│   └── utils/
│       └── dom.js          # Helpers para manipulação do DOM
└── styles/
    ├── main.css            # Estilos gerais
    └── board.css           # Estilos específicos do tabuleiro
```

## 🛠️ Tecnologias

- **HTML5 & CSS3**: Layout semântico e estilização responsiva.
- **JavaScript (ES6+)**: Módulos nativos, Classes e Arrow Functions.

## 🔮 Futuras Melhorias

- [ ] Histórico de movimentos (PGN).
- [ ] Visualização das peças capturadas (Painel lateral).
- [ ] IA Básica para jogar contra o computador.
- [ ] Multiplayer Online via WebSockets.

---

<div align="center">
    <b>Produzido com 💜 por Bill Carioca</b>
</div>
