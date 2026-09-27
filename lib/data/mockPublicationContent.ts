/**
 * Contenido MDX de ejemplo para las publicaciones.
 * Cada entrada está indexada por el slug de la publicación.
 *
 * En el backend real, este contenido vendrá como parte del
 * objeto Publication devuelto por GET /api/publications/:slug.
 */
export const mockPublicationContent: Record<string, string> = {
  "nueva-alianza-internacional-bienestar-animal": `
## Introducción

La Red Internacional de Investigación en Bienestar Animal (RED-RIIBA) ha firmado una nueva alianza internacional con tres instituciones de América Latina, ampliando su alcance a nuevos países y reforzando la cooperación científica bajo el enfoque **«Una Sola Salud – Un Bienestar»**.

## Detalles de la alianza

El acuerdo contempla un marco de colaboración en tres áreas prioritarias:

- **Investigación conjunta** sobre bienestar animal en sistemas de producción tropical
- **Intercambio de investigadores** y estudiantes de posgrado
- **Publicaciones científicas conjuntas** en revistas de alto impacto

> El bienestar animal es un componente esencial de la ética social, la salud pública y la sostenibilidad de los sistemas alimentarios.

## Próximos pasos

Las instituciones trabajarán durante los próximos meses en la elaboración de un plan de acción conjunto que será presentado en el próximo encuentro anual de la red.
`.trim(),

  "taller-internacional-diagnostico-fisiologico": `
## Sobre el taller

Investigadores de Cuba, México y Uruguay se reunieron en La Habana durante tres días para compartir avances en dispositivos de detección de parásitos gastrointestinales en rumiantes.

## Temas tratados

- Nuevas técnicas de diagnóstico no invasivo
- Dispositivos portátiles para trabajo de campo
- Análisis de datos en tiempo real
- Protocolos de bienestar animal durante el manejo

## Conclusiones

El taller concluyó con la firma de un acuerdo para el desarrollo conjunto de un prototipo de dispositivo de diagnóstico que pueda ser utilizado en condiciones tropicales.
`.trim(),

  "convocatoria-publicaciones-cientificas-2026": `
## Convocatoria abierta

Invitamos a todos los miembros de la red a enviar sus artículos originales para la edición especial de **Bienestar Animal y Sostenibilidad**, que será publicada a finales de 2026.

## Temáticas de interés

- Diagnóstico fisiológico en producción animal
- Alternativas naturales en el cuidado animal
- Sostenibilidad y seguridad alimentaria
- Legislación y políticas públicas en bienestar animal
- Impacto social del bienestar animal

## Fechas importantes

- **Recepción de artículos**: hasta el 30 de noviembre de 2026
- **Revisión por pares**: diciembre de 2026
- **Publicación**: enero de 2027

Los artículos deben ser originales y no haber sido publicados previamente.
`.trim(),

  "enfoque-una-sola-salud-bienestar": `
## Una perspectiva integradora

El enfoque **«Una Sola Salud – Un Bienestar»** reconoce la interdependencia entre la salud humana, la salud animal y la salud ambiental. Aplicado a la producción animal, este marco propone soluciones que benefician simultáneamente a los animales, a las personas y a los ecosistemas.

## Implicaciones para la producción

- Reducción del uso de antimicrobianos
- Mejora del bienestar animal como estrategia preventiva
- Sistemas productivos que respetan los ciclos naturales
- Trazabilidad y transparencia en la cadena alimentaria

## El papel de la investigación

La investigación interdisciplinaria es fundamental para traducir los principios de Una Sola Salud en prácticas concretas. RED-RIIBA articula estos esfuerzos a nivel internacional.
`.trim(),

  "fundacion-red-riiba-la-habana": `
## Un hito para la investigación en bienestar animal

El 15 de enero de 2026, representantes de seis países se reunieron en La Habana para formalizar la creación de la **Red Internacional de Investigación en Bienestar Animal (RED-RIIBA)**.

## Países fundadores

- Cuba
- México
- Uruguay
- Ecuador
- Argelia
- Guatemala

## Objetivos fundacionales

La red nace con el propósito de promover y coordinar esfuerzos de investigación, formación y cooperación internacional en bienestar animal, bajo el enfoque «Una Sola Salud – Un Bienestar».
`.trim(),
};