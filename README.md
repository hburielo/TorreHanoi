# Torre de Hanói — Visualização Interativa

Aplicação web interativa que demonstra a resolução da Torre de Hanói com visualização em tempo real de recursão, pilha de chamadas e busca DFS.

## Funcionalidades

### Modo Jogo
- Mova os discos manualmente clicando nas torres
- Contador de movimentos e cálculo de eficiência em relação ao mínimo possível (2ⁿ − 1)
- Validação de movimentos inválidos com feedback visual
- Banner de vitória com comparação ao resultado ótimo

### Modo Automático
- Resolução automática com controle de velocidade
- Navegação passo a passo (avançar e retroceder)
- Indicador visual do movimento atual (origem → destino)

### Painéis de Visualização
| Painel | Descrição |
|--------|-----------|
| **Árvore Recursiva** | Exibe a árvore de chamadas recursivas em tempo real, destacando a chamada ativa |
| **Pilha de Chamadas** | Mostra o empilhamento e desempilhamento de frames a cada passo |
| **Busca DFS** | Demonstra como o DFS percorre a árvore recursiva |
| **Histórico** | Lista todos os movimentos realizados até o passo atual |
| **Didático** | Informações sobre complexidade, fórmula T(n) = 2ⁿ − 1 e chamadas ativas |

## Stack

- **React 18** — interface e gerenciamento de estado
- **Vite** — bundler e servidor de desenvolvimento
- **Framer Motion** — animações dos discos e transições de UI

## Como rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura do projeto

```
src/
├── algorithms/
│   ├── hanoi.js        # Gera movimentos e árvore de chamadas recursivas
│   ├── dfs.js          # Estrutura da árvore DFS e ordem de visitação
│   └── complexity.js   # Cálculos de complexidade
├── components/
│   ├── Tower.jsx        # Renderização das torres e discos
│   ├── Controls.jsx     # Controles de play/pause/velocidade
│   ├── RecursiveTree.jsx
│   ├── StackViewer.jsx
│   ├── InfoPanel.jsx
│   ├── MoveHistory.jsx
│   ├── SearchExplanation.jsx
│   └── TutorialModal.jsx
├── hooks/
│   ├── useHanoiAnimation.js  # Lógica do modo automático
│   ├── useHanoiGame.js       # Lógica do modo jogo
│   └── useRecursionTree.js
└── pages/
    ├── Home.jsx       # Tela inicial
    └── HanoiPage.jsx  # Tela principal com os dois modos
```

## Complexidade

A Torre de Hanói com `n` discos requer exatamente **2ⁿ − 1** movimentos na solução ótima.

```
T(1) = 1
T(n) = 2·T(n−1) + 1  →  T(n) = 2ⁿ − 1
```

| Discos | Movimentos mínimos |
|--------|--------------------|
| 2 | 3 |
| 3 | 7 |
| 4 | 15 |
| 5 | 31 |
| 6 | 63 |
| 7 | 127 |
