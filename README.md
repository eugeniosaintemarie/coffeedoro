# Coffedoro - Temporizador Pomodoro

Coffedoro es una aplicación de temporizador Pomodoro con una interfaz minimalista que muestra una taza de café animada. La aplicación permite configurar tiempos de trabajo y descanso personalizados.

## Características

- Temporizador Pomodoro con tiempos de trabajo y descanso configurables
- Interfaz minimalista con una taza de café animada
- Notificaciones al finalizar los periodos de trabajo y descanso
- Diseño responsive y accesible

## Estructura del Proyecto

El proyecto está organizado en una estructura modular para facilitar su mantenimiento y extensión:

### Componentes

- `pomodoro-timer.tsx`: Componente principal que integra todos los componentes del temporizador
- `coffee-cup.tsx`: Componente que muestra la taza de café animada
- `timer-display.tsx`: Componente para mostrar el tiempo restante
- `timer-controls.tsx`: Componente para los controles del temporizador (iniciar/reiniciar)
- `timer-config.tsx`: Componente para configurar los tiempos de trabajo y descanso

### Hooks

- `useTimer.ts`: Hook personalizado que encapsula toda la lógica del temporizador

### Utilidades

- `timerUtils.ts`: Funciones auxiliares para el manejo del temporizador

## Tecnologías Utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React (iconos)

## Cómo Usar

1. Configura el tiempo de trabajo (en minutos) usando el primer campo numérico
2. Configura el tiempo de descanso (en minutos) usando el segundo campo numérico
3. Haz clic en el botón de reproducción para iniciar el temporizador
4. Para reiniciar el temporizador, haz clic en el botón de reinicio

## Desarrollo

### Requisitos

- Node.js (versión 14 o superior)
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd coffedoro

# Instalar dependencias
npm install
# o
pnpm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
# o
pnpm dev
```

### Construir para producción

```bash
npm run build
# o
pnpm build
```

## Licencia

MIT