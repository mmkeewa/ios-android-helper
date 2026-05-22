---
slug: navigation-bar
category: navigation
ios:
  name: Navigation Bar
  hig: https://developer.apple.com/design/human-interface-guidelines/navigation-bars
android:
  name: Top App Bar
  m3: https://m3.material.io/components/top-app-bar/overview
status: stable
lastVerified: 2026-05-22
tags: [navigation, header, title]
---

## Что это
Верхняя панель с заголовком экрана и действиями. Базовый элемент навигации.

## Ключевые отличия

| Аспект | iOS — Navigation Bar | Android — Top App Bar |
|---|---|---|
| Возврат назад | Chevron + текст предыдущего экрана слева | Стрелка-вверх (back arrow), без текста |
| Выравнивание заголовка | По центру (Large Title — слева, скейлится) | Слева (или по центру в `centerAligned`) |
| Высота | 44pt compact, 96pt large | 64dp small, 112dp medium, 152dp large |
| Поиск | Search Bar встроен в Large Title | Отдельный компонент Search Bar |
| Действия справа | До 2 иконок или текст | До 3 иконок + overflow menu (три точки) |

## Когда что выбирать
- На iOS Large Title — стандарт для root-экранов раздела; compact — для вложенных
- На Android Medium/Large Top App Bar — аналог Large Title, скейлится при скролле
- Overflow menu (kebab) — это Android-паттерн, на iOS используй Action Sheet или контекстное меню

## Частые ошибки кросс-платформенного дизайна
- Перенос Android overflow (три точки) на iOS — на iOS это «More» кнопка или Action Sheet
- Заголовок по центру на Android в обычном Top App Bar — нестандартно, только если есть веская причина
- Текстовый back-label на Android — там только иконка
