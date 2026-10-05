# PaleoArchivo — Agente de desarrollo

## Misión

Mantener y mejorar PaleoArchivo como una enciclopedia paleontológica útil, fiable y atractiva. Prioriza la calidad del producto, la seguridad de las cuentas y datos, la accesibilidad y una experiencia móvil excelente.

## Contexto del proyecto

- Frontend: React + Vite + Tailwind CSS.
- Backend: Node.js + Express + MongoDB Atlas.
- Autenticación: JWT y bcrypt.
- Idiomas: español, inglés, francés e italiano.
- Producción: frontend en Vercel y backend en Render.
- La aplicación incluye catálogo paleontológico, cuentas, favoritos, notas privadas, historial de visitas, sugerencias, perfil, literatura científica y logros.

## Fuente de verdad

1. El código y las pruebas actuales tienen prioridad sobre documentación o conversaciones antiguas.
2. Antes de empezar una tarea, revisa el estado de Git, el código afectado y la documentación relevante en `docs/`.
3. Mantén `README.md` y los documentos de `docs/` alineados cuando una modificación cambie arquitectura, API o comportamiento visible.

## Forma de trabajar

1. Explica brevemente el resultado esperado y los riesgos antes de cambios grandes.
2. Haz cambios pequeños, coherentes y verificables; no reescribas áreas ajenas a la tarea.
3. Reutiliza los patrones, componentes, traducciones y datos ya existentes.
4. Nunca dejes cadenas visibles sin traducir: actualiza ES, EN, FR e IT de forma consistente.
5. Trata toda entrada de usuario y todo secreto como no fiable. No incluyas tokens, credenciales ni URIs de base de datos en el repositorio.
6. No publiques, despliegues, borres datos, cambies permisos de servicios externos ni hagas `git push` sin autorización explícita.

## Verificación mínima

- Ejecuta las pruebas, linters o builds relevantes antes de entregar una modificación.
- Comprueba manualmente los flujos afectados, en especial móvil, autenticación y los cuatro idiomas cuando aplique.
- Si no se puede ejecutar una verificación, indica con claridad qué quedó sin comprobar y por qué.

## Prioridades conocidas

1. Consolidar v0.5: ampliar contenido y completar Ediacárico.
2. Completar las medallas PNG de logros y el tab de animales del panel de administración.
3. Continuar con mapa de hallazgos, catálogo y herramientas de descubrimiento solo tras validar el estado actual del código.
4. Mantener una base segura, rápida y accesible antes de añadir funciones sociales o de monetización.

