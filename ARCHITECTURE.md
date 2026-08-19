# ARCHITECTURE - ClimaView Hash
## Arquitetura Técnica da Aplicação

**Data de Criação:** 18/08/2026  
**Versão:** 1.0  
**Status:** Aprovado

---

## 1. Stack Tecnológico

### 1.1 Frontend
| Camada | Tecnologia | Versão | Propósito |
|--------|-----------|--------|----------|
| **Framework** | React | ^18.0 | Biblioteca de UI |
| **Build Tool** | Vite | ^5.0 | Bundler e dev server |
| **Roteamento** | React Router | ^6.0 | Navegação SPA |
| **HTTP Client** | Fetch API | nativo | Requisições básicas |
| **Cache/Dados** | TanStack Query | ^5.0 | Cache e sincronização de dados |
| **State Management** | Context API + useState | nativo | Estado local e global |
| **Styling** | Vanilla CSS | nativo | Estilização customizada |
| **Gráficos** | Canvas API | nativo | Visualizações customizadas |
| **Mapas** | Google Maps API | latest | Radar e visualizações geográficas |
| **PWA** | Service Workers | nativo | Offline-first e instalação |

### 1.2 Hospedagem & Deploy
- **Plataforma:** GitHub Pages
- **Build:** Vite (saída estática)
- **CI/CD:** GitHub Actions (automático ao fazer push)
- **Domínio:** climaview-hash.github.io (ou customizado)

### 1.3 APIs Externas
- **Clima:** Open-Meteo API (gratuita, sem chave)
- **Mapas:** Google Maps API (requer chave de API)
- **Geolocalização:** Geolocation API (navegador nativo)

---

## 2. Estrutura de Pastas

```
climaview-hash/
├── public/
│   ├── index.html
│   ├── manifest.json          # PWA manifest
│   ├── service-worker.js      # Service worker
│   └── icons/                 # Ícones PWA
│
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Root component
│   ├── index.css             # Estilos globais
│   │
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Weather/
│   │   │   ├── WeatherCard.jsx
│   │   │   ├── WeatherGrid.jsx
│   │   │   ├── TemperatureChart.jsx
│   │   │   ├── HeatmapChart.jsx
│   │   │   └── RadarMap.jsx
│   │   ├── Location/
│   │   │   ├── LocationSearch.jsx
│   │   │   ├── LocationSelector.jsx
│   │   │   └── LocationFavorites.jsx
│   │   ├── Alerts/
│   │   │   ├── AlertBanner.jsx
│   │   │   ├── AlertNotification.jsx
│   │   │   └── AlertList.jsx
│   │   └── Common/
│   │       ├── Loading.jsx
│   │       ├── ErrorMessage.jsx
│   │       └── Button.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── About.jsx
│   │   └── NotFound.jsx
│   │
│   ├── hooks/
│   │   ├── useWeather.js      # Hook para fetch de clima
│   │   ├── useLocation.js     # Hook para geolocalização
│   │   ├── useAlerts.js       # Hook para alertas
│   │   └── useLocalStorage.js # Hook para persistência
│   │
│   ├── context/
│   │   ├── WeatherContext.jsx # Context para clima
│   │   ├── LocationContext.jsx # Context para localização
│   │   └── AlertContext.jsx    # Context para alertas
│   │
│   ├── services/
│   │   ├── weatherApi.js      # Integração Open-Meteo
│   │   ├── mapsApi.js         # Integração Google Maps
│   │   ├── geolocation.js     # Geolocalização
│   │   └── storage.js         # LocalStorage helpers
│   │
│   ├── utils/
│   │   ├── formatters.js      # Formatação de dados
│   │   ├── converters.js      # Conversão de unidades
│   │   ├── validators.js      # Validação
│   │   └── constants.js       # Constantes
│   │
│   ├── styles/
│   │   ├── global.css         # Estilos globais
│   │   ├── variables.css      # Variáveis CSS (cores, etc)
│   │   ├── responsive.css     # Media queries
│   │   ├── components/
│   │   │   ├── weather.css
│   │   │   ├── location.css
│   │   │   ├── alerts.css
│   │   │   └── layout.css
│   │   └── charts/
│   │       ├── charts.css
│   │       └── heatmap.css
│   │
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── weather-icons/
│
├── .env.example               # Template de variáveis de ambiente
├── vite.config.js            # Configuração Vite
├── package.json
├── package-lock.json
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deploy
│
├── PRD.md                    # Product Requirements Document
├── ARCHITECTURE.md           # Este arquivo
└── README.md
```

---

## 3. Fluxo de Dados

### 3.1 Arquitetura de Componentes

```
App (Root)
├── Router (React Router)
│   ├── Home (/)
│   ├── Dashboard (/weather/:location)
│   └── About (/about)
│
└── Providers (Context)
    ├── LocationProvider
    ├── WeatherProvider
    └── AlertProvider
```

### 3.2 Fluxo de Dados (Clima)

```
User Action (busca/geoloc)
    ↓
LocationContext atualiza
    ↓
useWeather hook dispara
    ↓
TanStack Query fetch (Open-Meteo)
    ↓
Cache em memória + localStorage
    ↓
WeatherContext atualiza
    ↓
Componentes re-renderizam
    ↓
Gráficos/Cards/Mapas atualizados
```

### 3.3 Alertas

```
Dados de clima recebidos
    ↓
AlertService valida condições severas
    ↓
AlertContext atualiza
    ↓
AlertBanner renderiza (visual)
    ↓
Push notification enviada (service worker)
```

---

## 4. Componentes Principais

### 4.1 Páginas

- **Home.jsx:** Landing page com busca inicial
- **Dashboard.jsx:** Visualização principal de clima
- **About.jsx:** Sobre o app
- **NotFound.jsx:** 404

### 4.2 Componentes de Clima

- **WeatherCard.jsx:** Exibição de parâmetro único (temp, umidade, etc)
- **WeatherGrid.jsx:** Grid com múltiplos cards
- **TemperatureChart.jsx:** Gráfico de linha de temperatura (Canvas)
- **HeatmapChart.jsx:** Mapa de calor (Canvas)
- **RadarMap.jsx:** Radar de chuva (Google Maps)

### 4.3 Componentes de Localização

- **LocationSearch.jsx:** Busca de cidades
- **LocationSelector.jsx:** Seleção com geoloc fallback
- **LocationFavorites.jsx:** Histórico/favoritos

### 4.4 Componentes de Alertas

- **AlertBanner.jsx:** Banner superior com alertas
- **AlertNotification.jsx:** Notificação visual
- **AlertList.jsx:** Lista de alertas ativas

---

## 5. Hooks Customizados

### 5.1 useWeather
```javascript
// Fetch dados de clima para localização
const { data, loading, error, refetch } = useWeather(lat, lon, period)
```

### 5.2 useLocation
```javascript
// Geolocalização automática + busca manual
const { location, geoloc, searchLocation, error } = useLocation()
```

### 5.3 useAlerts
```javascript
// Monitora alertas de eventos severos
const { alerts, sendNotification } = useAlerts(weatherData)
```

### 5.4 useLocalStorage
```javascript
// Persistência de dados no localStorage
const [value, setValue] = useLocalStorage(key, defaultValue)
```

---

## 6. Contextos (Context API)

### 6.1 WeatherContext
- Dados de clima atuais
- Histórico de 7 dias
- Estado de loading/erro
- Função para refetch

### 6.2 LocationContext
- Localização atual (lat/lon)
- Nome da cidade/região
- Últimas localizações consultadas
- Função para mudar localização

### 6.3 AlertContext
- Alertas ativos
- Histórico de alertas
- Função para enviar notificações
- Configurações de alerta

---

## 7. Serviços (Services)

### 7.1 weatherApi.js
- `fetchWeather(lat, lon, period)` → Promise
- Usa Open-Meteo API
- Formata dados para o app

### 7.2 mapsApi.js
- `initMap(container, options)` → Google Maps instance
- `renderRadar(map, weatherData)` → void
- Integração com Google Maps API

### 7.3 geolocation.js
- `getCurrentPosition()` → Promise<{lat, lon}>
- Wrapper para Geolocation API
- Tratamento de erros

### 7.4 storage.js
- `saveToStorage(key, data)` → void
- `getFromStorage(key)` → data
- `clearOldData(olderThan)` → void

---

## 8. Variáveis de Ambiente

```env
# .env
VITE_GOOGLE_MAPS_API_KEY=seu_google_maps_api_key
VITE_WEATHER_API_URL=https://api.open-meteo.com/v1
VITE_APP_NAME=ClimaView Hash
VITE_APP_VERSION=1.0.0
```

---

## 9. Build & Deploy

### 9.1 Desenvolvimento
```bash
npm install
npm run dev      # Vite dev server em http://localhost:5173
```

### 9.2 Build
```bash
npm run build    # Gera /dist com arquivos estáticos
npm run preview  # Preview do build
```

### 9.3 Deploy (GitHub Pages)
1. Push para `main` branch
2. GitHub Actions executa workflow
3. Build é gerado e deployado automaticamente
4. Disponível em `https://username.github.io/climaview-hash/`

---

## 10. PWA (Progressive Web App)

### 10.1 Service Worker
- Cache de assets (shell architecture)
- Offline fallback
- Background sync para dados

### 10.2 Manifest
- Nome: ClimaView Hash
- Ícones (192x192, 512x512)
- Cor de tema
- Display: standalone

### 10.3 Funcionalidades
- Installável em home screen
- Funciona offline (com dados em cache)
- Push notifications para alertas

---

## 11. Performance & Otimizações

- **Code Splitting:** Lazy loading de componentes (React.lazy)
- **Image Optimization:** WebP com fallback
- **Caching Strategy:** TanStack Query + localStorage
- **CSS Minification:** Vite (automático)
- **Bundle Analysis:** `npm run build -- --analyze`

---

## 12. Segurança

- **API Keys:** Em variáveis de ambiente (não commitadas)
- **CORS:** Configurado para Open-Meteo (sem CORS) e Google Maps
- **localStorage:** Sem dados sensíveis
- **CSP:** Headers de segurança (se em servidor próprio)

---

## 13. Testing (Manuais)

- ✅ Teste geolocalização em diferentes navegadores
- ✅ Teste responsividade (desktop, tablet, mobile)
- ✅ Teste offline (DevTools → offline)
- ✅ Teste PWA install em Chrome
- ✅ Teste push notifications
- ✅ Teste com diferentes cidades (norte, sul, litorânea, etc)

---

## 14. Roadmap Técnico (Futuro)

- [ ] Testes automatizados (Vitest + RTL)
- [ ] Backend próprio (Node.js + Express)
- [ ] Autenticação (Firebase Auth)
- [ ] Database (Firestore)
- [ ] CI/CD avançado
- [ ] Analytics (Google Analytics)
- [ ] Monitoring (Sentry)
