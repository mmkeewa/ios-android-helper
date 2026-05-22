---
slug: segmented-control
category: input
ios:
  name: Segmented Control
  hig: https://developer.apple.com/design/human-interface-guidelines/segmented-controls
android:
  name: Segmented Button
  m3: https://m3.material.io/components/segmented-buttons/overview
status: stable
lastVerified: 2026-05-22
tags: [tabs, toggle, input]
---

## Что это
Горизонтальный переключатель из 2–5 взаимоисключающих опций. Не путать с табами навигации.

## Ключевые отличия

| Аспект | iOS — Segmented Control | Android — Segmented Button |
|---|---|---|
| Форма | Капсула с pill-сегментами | Прямоугольник со скругленными концами |
| Состояние выбора | Белый фон выбранного сегмента | Filled tonal + чекмарк-иконка |
| Иконка + текст | Либо иконка, либо текст | И иконка, и текст в одном сегменте |
| Кол-во опций | 2–6 | 2–5 (M3 рекомендует 2–4) |
| Multi-select | Нет, только single | Поддерживает multi-select |

## Когда что выбирать
- Переключение представления (List/Grid, Day/Week/Month) — обе системы
- Фильтры — на Android лучше Filter Chips, не Segmented Button
- Табы навигации — это другой компонент (Tab Bar / Tabs), не сегментированный контрол

## Частые ошибки кросс-платформенного дизайна
- Использовать Segmented Control как табы — на iOS табы это TabView, на Android — Tabs
- Класть чекмарк в выбранный iOS-сегмент — на iOS это не паттерн
- Multi-select на iOS Segmented — не делается, нужен другой компонент
