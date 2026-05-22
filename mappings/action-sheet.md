---
slug: action-sheet
category: modals
ios:
  name: Action Sheet
  hig: https://developer.apple.com/design/human-interface-guidelines/action-sheets
android:
  name: Modal Bottom Sheet
  m3: https://m3.material.io/components/bottom-sheets/overview
status: stable
lastVerified: 2026-05-22
tags: [modal, menu, choice]
---

## Что это
Модальное окно снизу со списком действий по контексту. Не основной поток — выбор или подтверждение.

## Ключевые отличия

| Аспект | iOS — Action Sheet | Android — Modal Bottom Sheet |
|---|---|---|
| Триггер | Кнопка в тулбаре или контекстное меню | FAB, иконка, длинное нажатие |
| Структура | Заголовок + опции + Cancel внизу | Drag handle сверху + список или произвольный контент |
| Деструктивное действие | Красный цвет, обычно вверху списка | Тот же цвет ошибки, но без особой позиции |
| Закрытие | Тап вне или Cancel | Тап вне, swipe вниз, drag handle |
| Контент | Только список текстовых действий | Любой контент: список, форма, превью |

## Когда что выбирать
- iOS Action Sheet — строго список действий, не больше 6
- Android Modal Bottom Sheet — гибче: можно положить картинку, форму, действия
- Если в iOS-макете в Action Sheet вложены поля ввода или картинки — это уже Sheet (`.sheet` modifier), не Action Sheet

## Частые ошибки кросс-платформенного дизайна
- Класть форму в Action Sheet на iOS — некорректно, нужен Sheet
- Cancel-кнопка в Android Bottom Sheet — лишняя, на Android закрывают свайпом
- Drag handle на iOS Action Sheet — не делается; на iOS Sheet — да
