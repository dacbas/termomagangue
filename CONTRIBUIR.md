# Guía de Contribución - TermoMagangué

## Bienvenida a TermoMagangué 👋

¡Gracias por tu interés en contribuir a TermoMagangué! Somos un proyecto de código abierto dedicado a llevar la educación en termodinámica y física a Magangué, Bolívar.

## Código de Conducta

Por favor, sé respetuoso con todos los contribuidores. Cualquier forma de acoso o discriminación no será tolerada.

## ¿Cómo Contribuir?

### 1. Reportar Bugs

Si encuentras un bug:
- Verifica que no haya sido reportado antes
- Crea un nuevo Issue con etiqueta `bug`
- Describe cómo reproducir el problema
- Incluye capturas de pantalla si es relevante

### 2. Sugerir Mejoras

- Crea un Issue con etiqueta `enhancement`
- Describe la mejora claramente
- Explica por qué sería útil

### 3. Contribuir Código

#### Requisitos previos
- Fork el repositorio
- Crea una rama: `git checkout -b feature/amazing-feature`
- Commit con mensajes claros: `git commit -m 'Add amazing feature'`
- Push a la rama: `git push origin feature/amazing-feature`
- Abre un Pull Request

#### Estándares de Código

**TypeScript**
```typescript
// ✅ Bien - Tipos explícitos
function calcularBTU(params: CalculadoraBTUParams): CalculadoraBTUResult {
  return result;
}

// ❌ Evitar - Tipos implícitos
function calcularBTU(params: any): any {
  return result;
}
```

**Componentes React**
```typescript
// ✅ Bien - Functional component con tipos
interface SimuladorProps {
  titulo: string;
}

export const Simulador: React.FC<SimuladorProps> = ({ titulo }) => {
  return <div>{titulo}</div>;
};

// ❌ Evitar - Sin tipos
export const Simulador = ({ titulo }) => {
  return <div>{titulo}</div>;
};
```

**Nombres**
- Componentes: PascalCase (`SimuladorTechoTermico.tsx`)
- Funciones: camelCase (`calcularBTU()`)
- Constantes: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)
- Variables: camelCase (`usuarioId`)

**Comentarios**
```typescript
// ✅ Bien - Explica el POR QUÉ, no el QUÉ
// Multiplicamos por 1.1 para agregar margen de seguridad
const btuConMargen = btu * 1.1;

// ❌ Evitar - Redundante
// Multiplicar por 1.1
const btuConMargen = btu * 1.1;
```

#### Commits

```bash
# ✅ Bien
git commit -m "feat: add thermal roof simulator"
git commit -m "fix: incorrect BTU calculation for large rooms"
git commit -m "docs: update API documentation"

# ❌ Evitar
git commit -m "update stuff"
git commit -m "Fix bugs lol"
git commit -m "wip"
```

Formato: `type: description`

Tipos:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato/Prettier
- `refactor`: Refactorización sin cambios de funcionalidad
- `perf`: Mejora de performance
- `test`: Agregar/actualizar tests
- `chore`: Cambios en dependencias, config, etc.

### 4. Mejorar Documentación

- Corrige errores en README.md
- Agrega ejemplos de uso
- Clarifica instrucciones confusas
- Traduce a otros idiomas

## Proceso de Review

1. Verifica que tu PR sea coherente
2. Asegúrate de que los tests pasen
3. Uno o más mantenedores revisarán el código
4. Pueden solicitar cambios
5. Una vez aprobado, tu PR será merged

## Configuración para Desarrollo

```bash
# Instalar dependencias de desarrollo
cd backend_tcc
npm install

cd ../Frontend_tcc
npm install

# Ejecutar linter
npm run lint

# Ejecutar type checking
npm run type-check

# Ejecutar tests (próximamente)
npm run test
```

## Adición de Nuevos Simuladores

### Pasos

1. **Crear archivo de tipos** en `Frontend_tcc/src/types/index.ts`:
```typescript
export interface MiSimuladorParams {
  temperatura: number;
  presion: number;
  // ...
}

export interface MiSimuladorResult {
  resultado: number;
  recomendaciones: string[];
}
```

2. **Crear función de cálculo** en `backend_tcc/src/utils/thermalCalculations.ts`:
```typescript
export function calcularMiSimulador(params: MiSimuladorParams): MiSimuladorResult {
  // Implementar fórmulas
  return { resultado, recomendaciones };
}
```

3. **Crear componente** en `Frontend_tcc/src/components/simulators/`:
```typescript
export const MiSimulador: React.FC = () => {
  // Implementar UI
};
```

4. **Agregar ruta** en `Frontend_tcc/src/App.tsx`:
```typescript
<Route path="/simuladores/mi-simulador" element={<MiSimulador />} />
```

5. **Agregar endpoint** en `backend_tcc/src/routes/index.ts`:
```typescript
router.post('/simulaciones/mi-simulador', authMiddleware, SimulacionController.crear);
```

## Areas de Contribución Prioritarias

- [ ] Completar simuladores faltantes (7 de 10 implementados)
- [ ] Exportación a PDF/Excel
- [ ] Tests unitarios e integración
- [ ] Historial y búsqueda avanzada
- [ ] Optimización de performance
- [ ] Localización i18n
- [ ] Accesibilidad (A11y)
- [ ] Documentación API completa

## Recursos

- **Documentación**: [README.md](README.md), [ARQUITECTURA.md](ARQUITECTURA.md)
- **Issues Abiertos**: [GitHub Issues](https://github.com/termomagangue/issues)
- **Discussions**: [GitHub Discussions](https://github.com/termomagangue/discussions)

## Preguntas?

- Abre una issue con etiqueta `question`
- Participa en discussions
- Email: support@thermomagangue.com

---

## Gracias por Contribuir 🙌

Tus contribuciones hacen de TermoMagangué un mejor proyecto para todos.

**Happy Coding!** 💻
