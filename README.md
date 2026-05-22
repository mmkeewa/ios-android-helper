# iOS ↔ Android Helper

Курируемая база соответствий компонентов **Apple HIG ↔ Google Material 3** + Claude-скил, который ей пользуется. Для дизайнеров, которые делают кросс-платформенные продукты и устали запоминать, что Action Sheet на iOS — это **не** Bottom Sheet на Android.

## Что внутри

| Файл | Что это |
|---|---|
| `SKILL.md` | Claude-скил `ios-android-translator` — отвечает на вопросы по парам компонентов |
| `mappings/*.md` | База: один файл — одна пара компонентов |
| `sources.yaml` | Список официальных доков для еженедельной проверки актуальности |
| `scripts/refresh.ts` | Чек хешей официальных страниц HIG / M3 |

## Установка скила

```bash
claude plugin install github:mmkeewa/ios-android-helper
```

После установки скил активируется фразами:
- «Как на Android называется Segmented Control?»
- «Переведи этот экран на iOS»
- «В чём разница между HIG Tab Bar и M3 Navigation Bar?»

## Использование как базы данных

База — просто markdown с фронтматтером. Можно потреблять напрямую (git submodule, fetch, clone) из любого приложения. Сайт-портфолио `mmkeewa.ru` подключает её сабмодулем и показывает чат-интерфейс на `/labs/ios-android-helper`.

## Формат маппинга

```md
---
slug: navigation-bar
category: navigation
ios:
  name: Navigation Bar
  hig: https://developer.apple.com/design/human-interface-guidelines/navigation-bars
android:
  name: Top App Bar
  m3: https://m3.material.io/components/top-app-bar/overview
status: stable        # stable | beta | deprecated
lastVerified: 2026-05-22
tags: [navigation, header]
---

## Что это
…

## Ключевые отличия
| Аспект | iOS | Android |
|---|---|---|

## Когда что выбирать
- …

## Частые ошибки кросс-платформенного дизайна
- …
```

## Свежесть

Раз в неделю cron на сайте-потребителе вызывает скрипт из `scripts/refresh.ts`, который:
1. Читает `sources.yaml`
2. Фетчит каждую страницу HIG / M3
3. Хеширует контент SHA-256
4. Сравнивает с кэшем
5. При изменении помечает связанные маппинги `stale: true`

## Контрибьют

PR'ы с новыми парами компонентов приветствуются. Шаблон выше, проверьте, что:
- Указали и HIG, и M3 ссылки
- Описали именно **поведенческие** различия, не только внешний вид
- Поставили `lastVerified` сегодняшней датой

## Источники

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design 3](https://m3.material.io/)
- [Дизайн под iOS и Android — Red Mad Robot](https://habr.com/ru/companies/redmadrobot/articles/491674/)
- [iOS и Android: что учитывать в дизайне — vc.ru](https://vc.ru/design/871512-ios-i-android-chto-uchityvat-v-dizaine-analiz-populyarnyh-nativnyh-prilozhenii)

## License

MIT
