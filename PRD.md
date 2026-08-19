# PRD - ClimaView Hash
## Product Requirements Document

**Data de Criação:** 18/08/2026  
**Versão:** 1.0  
**Status:** Aprovado

---

## 1. Visão Geral

**ClimaView Hash** é uma aplicação web de previsão do tempo que fornece informações climáticas detalhadas e visualizações sofisticadas para todo o Brasil. A aplicação é acessível, responsiva e combina dados em tempo real com análises históricas para ajudar usuários a entender e acompanhar padrões climáticos.

---

## 2. Escopo

### 2.1 Cobertura Geográfica
- **Área:** Todo o Brasil
- Suporte a consulta de clima em qualquer cidade/região brasileira

### 2.2 Funcionalidades Principais

1. **Previsão Simples e Direta**
   - Exibição clara de temperatura, chuva e vento
   
2. **Alertas de Eventos Severos**
   - Notificações para tempestades, geadas e outros eventos extremos
   
3. **Comparação Histórica**
   - Análise de padrões climáticos dos últimos 7 dias
   
4. **Dados em Tempo Real**
   - Atualização contínua e frequente de informações
   
5. **Visualizações Gráficas Sofisticadas**
   - Múltiplos formatos de apresentação de dados

---

## 3. Funcionalidades Detalhadas

### 3.1 Fluxo de Entrada
O aplicativo oferece múltiplas formas de acesso:
- **Localização Padrão:** Abre com a última cidade consultada ou localização pré-definida
- **Geolocalização Automática:** Detecta automaticamente a localização do usuário
- **Seleção Manual:** Permite que o usuário busque e escolha qualquer cidade/região no Brasil
- **Combinação Inteligente:** Tenta geolocalização primeiro; se falhar, oferece seleção manual

### 3.2 Períodos de Previsão
- **Hoje (24h):** Previsão das próximas 24 horas
- **7 Dias:** Previsão padrão (padrão ao abrir o app)
- **15 Dias:** Previsão estendida
- **Seleção Customizável:** Usuário pode escolher o período desejado

### 3.3 Alertas
- **Indicadores Visuais:** Badges e avisos na tela indicando eventos severos
- **Push Notifications:** Notificações do navegador para eventos críticos (tempestades, geadas, etc)
- **Eventos Cobertos:** Tempestades, geadas e outros eventos climáticos extremos

### 3.4 Dados Climáticos Exibidos
- Temperatura (mínima e máxima)
- Umidade do ar
- Velocidade do vento
- Pressão atmosférica
- Índice UV
- Chance de chuva + volume esperado
- Sensação térmica
- Horários de nascer e pôr do sol

### 3.5 Visualizações de Dados
O app apresenta informações através de múltiplos formatos:
- **Cards/Painéis Simples:** Dados estruturados com ícones e textos
- **Gráficos de Linha:** Tendências de temperatura e outros parâmetros ao longo dos dias
- **Mapas de Calor:** Visualização de variações regionais e temporais
- **Radar de Chuva:** Representação visual da precipitação esperada
- **Integração:** Todos os formatos disponíveis simultaneamente

### 3.6 Histórico de Dados
- **Período Mantido:** Últimos 7 dias de dados históricos
- **Visualização de Sessão:** Também permite visualizar apenas dados da sessão atual (sem persistência)
- **Uso:** Comparação de padrões climáticos e análise de tendências

### 3.7 Atualização de Dados
- **Automática a cada 1 hora**
- **Automática a cada 30 minutos**
- **Automática a cada 15 minutos**
- **Manual:** Botão para o usuário atualizar quando desejar
- **Flexibilidade:** Combinação de atualizações automáticas + opção manual

### 3.8 Tratamento de Erros
- **Sem Conectividade:** Exibir mensagem de erro clara ao usuário
- **API Indisponível:** Mensagem de erro amigável explicando o problema

---

## 4. Requisitos Técnicos

### 4.1 Plataformas Suportadas
- **Desktop**
- **Tablet**
- **Mobile**
- **Responsividade Total:** Design responsivo que se adapta a todos os tamanhos de tela

### 4.2 Autenticação
- **Sem Login/Conta:** Acesso completamente livre, sem necessidade de autenticação
- **Armazenamento Local:** Preferências e histórico salvos em localStorage do navegador

### 4.3 Fonte de Dados
- **API Pública Gratuita:** Integração com serviços como Open-Meteo ou OpenWeatherMap (versão free)
- **Sem Backend Próprio:** Apenas frontend + integração com API externa

---

## 5. Out of Scope (Fora do Escopo)

As seguintes funcionalidades **explicitamente não** serão incluídas:

- ❌ **Previsão de Longo Prazo:** Sem previsões de meses ou anos à frente
- ❌ **E-commerce:** Sem venda de produtos ou serviços
- ❌ **Autenticação/Conta:** Sem login, registro ou gerenciamento de contas de usuário
- ❌ **Redes Sociais/Compartilhamento:** Sem integração de compartilhamento em redes sociais
- ❌ **Backend Customizado:** Sem desenvolvimento de servidor próprio; apenas integração com APIs existentes

---

## 6. Comportamentos de UX

### 6.1 Experiência Inicial
1. App abre com geolocalização automática (se autorizado)
2. Se geolocalização falha, exibe opção de busca manual
3. Exibe previsão padrão de 7 dias imediatamente
4. Oferece opção de estender para 15 dias ou ver apenas hoje

### 6.2 Navegação
- Busca de cidades acessível e rápida
- Troca fácil entre períodos (hoje, 7 dias, 15 dias)
- Histórico de últimas cidades consultadas

### 6.3 Alertas
- Alertas aparecem como badges na tela quando há eventos severos
- Push notifications enviadas para eventos críticos
- Visual claro e não intrusivo

### 6.4 Atualizações
- Indicador visual mostrando quando a próxima atualização automática ocorrerá
- Botão "Atualizar Agora" sempre disponível
- Usuário informado quando dados foram atualizados pela última vez

---

## 7. Edge Cases

### 7.1 Conectividade
- **Sem Internet:** Mensagem de erro clara, sem fallback de cache
- **API Fora do Ar:** Mensagem indicando indisponibilidade temporária do serviço

### 7.2 Geolocalização
- **Permissão Negada:** Fallback automático para busca manual
- **Falha Silenciosa:** Graceful fallback para interface de seleção

### 7.3 LocalStorage
- **Espaço Limitado:** Limpeza automática de dados históricos com mais de 7 dias
- **Dados Corrompidos:** Fallback para estado padrão sem persistência

### 7.4 Cidades
- **Cidade Não Encontrada:** Mensagem clara com sugestões
- **Múltiplas Cidades com Mesmo Nome:** Exibir desambiguação (ex: estado/região)

---

## 8. Sucesso & Métricas

A aplicação é considerada pronta quando:
- ✅ Funciona em desktop, tablet e mobile sem problemas
- ✅ Geolocalização funciona e fallback para busca manual é suave
- ✅ Todos os 8 parâmetros climáticos são exibidos corretamente
- ✅ Visualizações (cards, gráficos, mapas, radar) carregam sem erros
- ✅ Alertas aparecem corretamente para eventos severos
- ✅ Atualização automática funciona em todos os intervalos
- ✅ Histórico de 7 dias persiste corretamente no localStorage
- ✅ Mensagens de erro são claras e informativas

---

## 9. Notas Adicionais

- O nome "Hash" é escolhido por razões de branding/estética
- Prioridade: usabilidade, responsividade e precisão dos dados
- Foco em experiência do usuário intuitiva e não intrusiva
